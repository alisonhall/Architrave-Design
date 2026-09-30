import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

import OutputPanel from '../outputPanel';

describe('OutputPanel', () => {
  it('shows an empty-state message when there are no files', () => {
    render(<OutputPanel files={[]} />);

    expect(screen.getByText(/no changes yet/i)).toBeInTheDocument();
  });

  it('lists each file with its path and full content', () => {
    render(
      <OutputPanel
        files={[
          { path: 'static/app-constants.js', content: 'const constants = {};' },
          { path: 'src/pages/about.jsx', content: 'const About = () => null;' }
        ]}
      />
    );

    expect(screen.getByText('static/app-constants.js')).toBeInTheDocument();
    expect(screen.getByText('const constants = {};')).toBeInTheDocument();
    expect(screen.getByText('src/pages/about.jsx')).toBeInTheDocument();
    expect(screen.getByText('const About = () => null;')).toBeInTheDocument();
  });

  it('shows a note when one is provided for a file', () => {
    render(
      <OutputPanel
        files={[
          {
            path: 'src/pages/portfolio/new-homes/__tests__/new-project.test.jsx',
            content: 'test content',
            note: 'Run npm test -- -u locally to generate the snapshot for this file.'
          }
        ]}
      />
    );

    expect(screen.getByText(/run npm test -- -u locally/i)).toBeInTheDocument();
  });

  it('copies a file\'s content to the clipboard when Copy is clicked', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(
      <OutputPanel files={[{ path: 'static/app-constants.js', content: 'const constants = {};' }]} />
    );

    fireEvent.click(screen.getByRole('button', { name: /copy/i }));

    expect(writeText).toHaveBeenCalledWith('const constants = {};');
    await waitFor(() => expect(screen.getByText('Copied!')).toBeInTheDocument());
  });

  it('shows a file to delete with its path and note, but no content or Copy button', () => {
    render(<OutputPanel files={[{ path: 'static/layouts/gone.js', deleted: true, note: 'Its project was deleted.' }]} />);

    expect(screen.getByText('Delete this file')).toBeInTheDocument();
    expect(screen.getByText('static/layouts/gone.js')).toBeInTheDocument();
    expect(screen.getByText('Its project was deleted.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Copy' })).not.toBeInTheDocument();
  });

  it('says so when copying to the clipboard isn\'t allowed', async () => {
    Object.assign(navigator, { clipboard: { writeText: jest.fn().mockRejectedValue(new Error('NotAllowedError')) } });
    render(<OutputPanel files={[{ path: 'static/about.js', content: 'x' }]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    await waitFor(() => expect(screen.getByRole('button', { name: 'Copy failed' })).toBeInTheDocument());
    expect(screen.getByRole('alert')).toHaveTextContent('Select the text below and copy it by hand');
  });

  it('clears "Copied!" after a moment', async () => {
    jest.useFakeTimers();
    Object.assign(navigator, { clipboard: { writeText: jest.fn().mockResolvedValue(undefined) } });
    render(<OutputPanel files={[{ path: 'static/about.js', content: 'x' }]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Copied!' })).toBeInTheDocument());
    act(() => { jest.advanceTimersByTime(1600); });
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('summarizes problems at the top and lists each under its file', () => {
    render(
      <OutputPanel
        files={[
          { path: 'static/layouts/a.js', content: 'a', problems: [{ where: 'Layout, row 1', problem: 'has no columns.' }, { where: 'Tile "x"', problem: 'is lost.' }] },
          { path: 'static/layouts/b.js', content: 'b', problems: [] }
        ]}
      />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('2 problems to fix before applying these changes');
    expect(screen.getByRole('alert')).toHaveTextContent('static/layouts/a.js');
    expect(screen.getByRole('alert')).not.toHaveTextContent('static/layouts/b.js');
    expect(screen.getByText('Layout, row 1')).toBeInTheDocument();
    expect(screen.getByText('has no columns.', { exact: false })).toBeInTheDocument();
  });

  it('uses the singular for a single problem, and shows no summary without any', () => {
    const { rerender } = render(<OutputPanel files={[{ path: 'a.js', content: 'a', problems: [{ where: 'W', problem: 'P' }] }]} />);
    expect(screen.getByRole('alert')).toHaveTextContent('1 problem to fix');

    rerender(<OutputPanel files={[{ path: 'a.js', content: 'a' }]} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
