import React from 'react';
import { render, screen } from '@testing-library/react';

import Column from '../columnHOC';

describe('ColumnHOC', () => {
  it('renders its children', () => {
    render(
      <Column>
        <p>child content</p>
      </Column>
    );

    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('applies the column class', () => {
    const { container } = render(
      <Column>
        <p>child content</p>
      </Column>
    );

    expect(container.querySelector('.column')).toBeInTheDocument();
  });

  it('clones children with a dimensions prop derived from width', () => {
    const Probe = ({ dimensions }) => (
      <p>dimensions-width:{dimensions && dimensions.width}</p>
    );

    render(
      <Column width="48%">
        <Probe />
      </Column>
    );

    expect(screen.getByText('dimensions-width:48%')).toBeInTheDocument();
  });

  it('passes through an explicit dimensions prop to children', () => {
    const Probe = ({ dimensions }) => (
      <p>dimensions-height:{dimensions && dimensions.height}</p>
    );

    render(
      <Column dimensions={{ height: 300 }}>
        <Probe />
      </Column>
    );

    expect(screen.getByText('dimensions-height:300')).toBeInTheDocument();
  });
});
