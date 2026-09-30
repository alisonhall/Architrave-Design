import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import RevealOrderEditor from '../revealOrderEditor';

const projects = { p: { key: 'p', projectName: 'Project P', mainImageUrl: 'https://example.com/p.jpg' } };
const baseTiles = () => ({
  hero: { kind: 'project', projectKey: 'p', num: 1 },
  side: { kind: 'image', imageUrl: 'https://example.com/s.jpg', num: 1 },
  late: { kind: 'image', imageUrl: 'https://example.com/l.jpg', num: 8 },
  words: { kind: 'text', useIntroText: true }
});

const renderEditor = (overrides = {}) => {
  const props = {
    tiles: baseTiles(),
    projects,
    onChangeTiles: jest.fn(),
    onReplay: jest.fn(),
    showSteps: true,
    onShowStepsChange: jest.fn(),
    ...overrides
  };
  render(<RevealOrderEditor {...props} />);
  return props;
};

const slot = (name) => screen.getByRole('region', { name });

describe('RevealOrderEditor', () => {
  afterEach(() => { delete document.elementFromPoint; });

  it('groups the revealed tiles by step — several can share one — and leaves text tiles out', () => {
    renderEditor();
    expect(within(slot('Step 1 — 1s')).getAllByRole('listitem')).toHaveLength(2);
    expect(within(slot('With the rest — 3.5s')).getByText('late')).toBeInTheDocument();
    expect(within(slot('Step 2 — 1.5s')).getByText('No tiles.')).toBeInTheDocument();
    expect(screen.queryByText('words')).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /By position/ })).not.toBeInTheDocument();
  });

  it('lists tiles with no number yet separately', () => {
    renderEditor({ tiles: { ...baseTiles(), unset: { kind: 'image', imageUrl: 'x' } } });
    expect(within(slot('By position — not set yet')).getByText('unset')).toBeInTheDocument();
  });

  it('moves a tile with its dropdown', () => {
    const { onChangeTiles } = renderEditor();
    fireEvent.change(screen.getByLabelText('Reveal step for late'), { target: { value: '2' } });
    expect(onChangeTiles).toHaveBeenCalledWith(expect.objectContaining({ late: expect.objectContaining({ num: 2 }) }));

    fireEvent.change(screen.getByLabelText('Reveal step for hero'), { target: { value: 'rest' } });
    expect(onChangeTiles).toHaveBeenLastCalledWith(expect.objectContaining({ hero: expect.objectContaining({ num: 9 }) }));
  });

  it('doesn\'t report a change when a tile is moved to where it already is', () => {
    const { onChangeTiles } = renderEditor();
    fireEvent.change(screen.getByLabelText('Reveal step for hero'), { target: { value: '1' } });
    expect(onChangeTiles).not.toHaveBeenCalled();
  });

  describe('dragging', () => {
    const dragTo = (handle, target) => {
      document.elementFromPoint = jest.fn(() => target);
      fireEvent.pointerDown(handle, { button: 0, clientX: 0, clientY: 0 });
      fireEvent.pointerMove(document, { buttons: 1, clientX: 50, clientY: 50 });
      fireEvent.pointerUp(document, { clientX: 50, clientY: 50 });
    };

    it('drops a tile onto a step', () => {
      const { onChangeTiles } = renderEditor();
      dragTo(screen.getByRole('button', { name: 'Drag late to a step' }), within(slot('Step 3 — 2s')).getByText('No tiles.'));
      expect(onChangeTiles).toHaveBeenCalledWith(expect.objectContaining({ late: expect.objectContaining({ num: 3 }) }));
    });

    it('highlights the step under the pointer while dragging, and marks the tile being dragged', () => {
      renderEditor();
      document.elementFromPoint = jest.fn(() => slot('Step 4 — 2.5s'));
      fireEvent.pointerDown(screen.getByRole('button', { name: 'Drag late to a step' }), { button: 0, clientX: 0, clientY: 0 });
      fireEvent.pointerMove(document, { buttons: 1, clientX: 50, clientY: 50 });

      expect(slot('Step 4 — 2.5s')).toHaveClass('adminRevealOrder-slot--over');
      expect(screen.getByText('late').closest('li')).toHaveClass('adminRevealOrder-tile--dragging');
      fireEvent.pointerUp(document, { clientX: 50, clientY: 50 });
    });

    it('does nothing when dropped outside every step, onto "By position", or without really moving', () => {
      const { onChangeTiles } = renderEditor({ tiles: { ...baseTiles(), unset: { kind: 'image', imageUrl: 'x' } } });
      const handle = screen.getByRole('button', { name: 'Drag late to a step' });

      dragTo(handle, document.body);
      dragTo(handle, slot('By position — not set yet'));
      document.elementFromPoint = jest.fn(() => null);
      fireEvent.pointerDown(handle, { button: 0, clientX: 0, clientY: 0 });
      fireEvent.pointerMove(document, { buttons: 1, clientX: 50, clientY: 50 });
      fireEvent.pointerUp(document, { clientX: 50, clientY: 50 });

      document.elementFromPoint = jest.fn(() => slot('Step 2 — 1.5s'));
      fireEvent.pointerDown(handle, { button: 0, clientX: 0, clientY: 0 });
      fireEvent.pointerMove(document, { buttons: 1, clientX: 1, clientY: 1 });
      fireEvent.pointerUp(document, { clientX: 1, clientY: 1 });

      expect(onChangeTiles).not.toHaveBeenCalled();
    });

    it('ignores a right-click, and drops a drag whose release was never seen', () => {
      const { onChangeTiles } = renderEditor();
      const handle = screen.getByRole('button', { name: 'Drag late to a step' });
      document.elementFromPoint = jest.fn(() => slot('Step 2 — 1.5s'));

      fireEvent.pointerDown(handle, { button: 2, clientX: 0, clientY: 0 });
      fireEvent.pointerMove(document, { buttons: 1, clientX: 50, clientY: 50 });
      fireEvent.pointerUp(document, { clientX: 50, clientY: 50 });

      fireEvent.pointerDown(handle, { button: 0, clientX: 0, clientY: 0 });
      fireEvent.pointerMove(document, { buttons: 1, clientX: 50, clientY: 50 });
      fireEvent.pointerMove(document, { buttons: 0, clientX: 60, clientY: 60 });
      fireEvent.pointerUp(document, { clientX: 50, clientY: 50 });

      expect(onChangeTiles).not.toHaveBeenCalled();
    });
  });

  it('replays the reveal and toggles the preview steps', () => {
    const { onReplay, onShowStepsChange } = renderEditor();
    fireEvent.click(screen.getByRole('button', { name: 'Replay reveal' }));
    expect(onReplay).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Show steps on the previews' }));
    expect(onShowStepsChange).toHaveBeenCalledWith(false);
  });
});
