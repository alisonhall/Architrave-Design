import React from 'react';
import { render, screen } from '@testing-library/react';

import Row from '../rowHOC';

describe('RowHOC', () => {
  it('renders its children', () => {
    render(
      <Row>
        <p>child content</p>
      </Row>
    );

    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('applies the row class', () => {
    const { container } = render(
      <Row>
        <p>child content</p>
      </Row>
    );

    expect(container.querySelector('.row')).toBeInTheDocument();
  });

  it('clones children with a dimensions prop derived from height', () => {
    const Probe = ({ dimensions }) => (
      <p>dimensions-height:{dimensions && dimensions.height}</p>
    );

    render(
      <Row height={300}>
        <Probe />
      </Row>
    );

    expect(screen.getByText('dimensions-height:300')).toBeInTheDocument();
  });

  it('lets imageHeight override height on the dimensions prop', () => {
    const Probe = ({ dimensions }) => (
      <p>dimensions-height:{dimensions && dimensions.height}</p>
    );

    render(
      <Row height={300} imageHeight={150}>
        <Probe />
      </Row>
    );

    expect(screen.getByText('dimensions-height:150')).toBeInTheDocument();
  });
});
