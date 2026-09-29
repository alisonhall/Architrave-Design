import React, { useState } from 'react';
import { render, screen, act } from '@testing-library/react';

import { measureLayout, useLayoutMeasurement } from '../layoutDomMeasurement';

const rect = (overrides) => ({ top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => {}, ...overrides });

// row1 [col1: [nested row2 [col2]], col3], with made-up rendered positions for each.
const rows = [
  {
    id: 'row1',
    columns: [
      { id: 'col1', children: [{ id: 'p1', nodeType: 'row', row: { id: 'row2', columns: [{ id: 'col2', children: [] }] } }] },
      { id: 'col3', children: [] }
    ]
  }
];

const RECTS = {
  container: { top: 100, left: 50, width: 400, height: 300 },
  row1: { top: 100, left: 50, width: 400, height: 300 },
  col1: { top: 100, left: 50, width: 200, height: 300 },
  row2: { top: 100, left: 50, width: 200, height: 120 },
  col2: { top: 100, left: 50, width: 200, height: 120 },
  col3: { top: 100, left: 250, width: 200, height: 300 }
};

const buildDom = () => {
  const container = document.createElement('div');
  container.innerHTML = `
    <div data-row-id="row1">
      <div data-column-id="col1"><div data-row-id="row2"><div data-column-id="col2"></div></div></div>
      <div data-column-id="col3"></div>
    </div>`;
  document.body.appendChild(container);
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mockImpl() {
    const id = this.dataset.rowId || this.dataset.columnId || 'container';
    return rect(RECTS[id]);
  });
  return container;
};

afterEach(() => {
  jest.restoreAllMocks();
  document.body.innerHTML = '';
});

describe('measureLayout', () => {
  it('returns empty lists without a container', () => {
    expect(measureLayout(null, rows)).toEqual({ rowBoxes: [], columnBoxes: [] });
  });

  it('measures every row and column, nested ones included, relative to the container', () => {
    const { rowBoxes, columnBoxes } = measureLayout(buildDom(), rows);

    expect(rowBoxes).toEqual([
      expect.objectContaining({ rowId: 'row1', depth: 0, topLevel: true, top: 0, left: 0, width: 400, height: 300 }),
      expect.objectContaining({ rowId: 'row2', depth: 1, topLevel: false, parentColumnId: 'col1', parentRowId: 'row1', height: 120 })
    ]);
    expect(columnBoxes).toEqual([
      expect.objectContaining({ columnId: 'col1', rowId: 'row1', index: 0, siblingCount: 2, width: 200, rowContentWidth: 400 }),
      expect.objectContaining({ columnId: 'col2', rowId: 'row2', depth: 1, width: 200, rowContentWidth: 200 }),
      expect.objectContaining({ columnId: 'col3', rowId: 'row1', index: 1, left: 200, rowContentWidth: 400 })
    ]);
  });

  it('skips nodes with no id or no rendered element', () => {
    const container = buildDom();
    const withExtras = [...rows, { columns: [] }, { id: 'unrendered', columns: [{ id: 'alsoUnrendered', children: [] }] }];

    const { rowBoxes, columnBoxes } = measureLayout(container, withExtras);
    expect(rowBoxes.map((box) => box.rowId)).toEqual(['row1', 'row2']);
    expect(columnBoxes.map((box) => box.columnId)).toEqual(['col1', 'col2', 'col3']);
  });

  it('falls back to the column\'s own width for rowContentWidth when its row wasn\'t measured', () => {
    const container = document.createElement('div');
    container.innerHTML = '<div data-column-id="col3"></div>';
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mockImpl() {
      return rect(this.dataset.columnId ? RECTS.col3 : RECTS.container);
    });

    const { columnBoxes } = measureLayout(container, rows);
    expect(columnBoxes).toEqual([expect.objectContaining({ columnId: 'col3', rowContentWidth: 200 })]);
  });
});

describe('measureLayout — content size', () => {
  it('reports the inside (clientWidth/clientHeight — no borders) alongside the border box', () => {
    const container = buildDom();
    jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function mockWidth() {
      return this.dataset.rowId === 'row1' ? 350 : 0;
    });
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(function mockHeight() {
      return this.dataset.rowId === 'row1' ? 250 : 0;
    });

    const { rowBoxes, columnBoxes } = measureLayout(container, rows);

    expect(rowBoxes[0]).toMatchObject({ width: 400, height: 300, contentWidth: 350, contentHeight: 250 });
    // A column reports its row's inside width; with no clientWidth of its own, it falls back to its border box.
    expect(columnBoxes[0]).toMatchObject({ contentWidth: 200, rowContentWidth: 350 });
  });
});

describe('useLayoutMeasurement', () => {
  const Probe = ({ containerEl }) => {
    const { rowBoxes } = useLayoutMeasurement(containerEl, rows);
    return <span data-testid="count">{rowBoxes.length}</span>;
  };

  const Harness = ({ container }) => {
    const [el] = useState(container);
    return <Probe containerEl={el} />;
  };

  it('measures on mount and re-measures on window resize', () => {
    const container = buildDom();
    render(<Harness container={container} />);
    expect(screen.getByTestId('count')).toHaveTextContent('2');

    container.querySelector('[data-row-id="row2"]').remove();
    act(() => { window.dispatchEvent(new Event('resize')); });
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('re-measures whenever a ResizeObserver reports the container changed size, and disconnects on unmount', () => {
    let observerCallback;
    const observe = jest.fn();
    const disconnect = jest.fn();
    window.ResizeObserver = jest.fn((callback) => {
      observerCallback = callback;
      return { observe, disconnect };
    });

    const container = buildDom();
    const { unmount } = render(<Harness container={container} />);
    expect(observe).toHaveBeenCalledWith(container);

    container.querySelector('[data-row-id="row2"]').remove();
    act(() => observerCallback());
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    unmount();
    expect(disconnect).toHaveBeenCalled();
    delete window.ResizeObserver;
  });

  it('reports nothing before the container exists', () => {
    render(<Probe containerEl={null} />);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });
});
