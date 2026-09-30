import React from 'react';
import { render, screen } from '@testing-library/react';

import DetailPageLayout from '../detailPageLayout';

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

describe('DetailPageLayout', () => {
  it('renders a single section for a page with only `layout`', () => {
    const { container } = render(
      <DetailPageLayout
        mainClasses="portfolio"
        projectKey="creditRiverManor"
        sectionClassName="contentWrapper layoutAll layoutProject"
        tiles={{ description: { kind: 'description' } }}
        layout={[row({}, [column({}, [tileRef('description')])])]}
        location={{ pathname: '/portfolio/new-homes/credit-river-manor/' }}
      />
    );

    expect(container.querySelectorAll('section.contentWrapper').length).toBe(1);
    expect(screen.getByText('Credit River Manor')).toBeInTheDocument();
  });

  it('renders two sections, each with their own PrevNextProjectLinks, for a dual-tree page', () => {
    const { container } = render(
      <DetailPageLayout
        mainClasses="portfolio"
        projectKey="creditRiverManor"
        defaultSectionClassName="contentWrapper layoutAll layoutProject defaultLayout"
        wideSectionClassName="contentWrapper layoutAll layoutProject wideLayout"
        tiles={{ description: { kind: 'description' } }}
        defaultLayout={[row({}, [column({}, [tileRef('description')])])]}
        wideLayout={[row({}, [column({}, [tileRef('description')])])]}
        location={{ pathname: '/portfolio/new-homes/credit-river-manor/' }}
      />
    );

    expect(container.querySelectorAll('section.contentWrapper').length).toBe(2);
    expect(container.querySelectorAll('.prevProject, .nextProject').length).toBeGreaterThan(0);
  });

  it('binds the description tile to the project named by projectKey', () => {
    render(
      <DetailPageLayout
        mainClasses="portfolio"
        projectKey="lyttonParkManor"
        sectionClassName="contentWrapper layoutAll layoutProject"
        tiles={{ description: { kind: 'description' } }}
        layout={[row({}, [column({}, [tileRef('description')])])]}
        location={{ pathname: '/portfolio/renovations-additions/lytton-park-manor/' }}
      />
    );

    expect(screen.getByText('Lytton Park Manor')).toBeInTheDocument();
  });

  it('renders a plain image tile that is not itself a link', () => {
    render(
      <DetailPageLayout
        mainClasses="portfolio"
        projectKey="creditRiverManor"
        sectionClassName="contentWrapper layoutAll layoutProject"
        tiles={{ img1: { kind: 'image', num: 1, imageUrl: 'https://example.com/a.jpg' } }}
        layout={[row({}, [column({}, [tileRef('img1')])])]}
        location={{ pathname: '/portfolio/new-homes/credit-river-manor/' }}
      />
    );

    // A plain image tile (unlike a project tile) isn't wrapped in a link — only the
    // page's PrevNextProjectLinks (always present) contribute any <a> elements here.
    const image = document.querySelector('img[src="https://example.com/a.jpg"]');
    expect(image).not.toBeNull();
    expect(image.closest('a')).toBeNull();
  });
});
