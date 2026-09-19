import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

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
});
