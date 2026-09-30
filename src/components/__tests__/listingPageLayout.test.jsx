import React from 'react';
import { render, screen } from '@testing-library/react';

import ListingPageLayout from '../listingPageLayout';

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

describe('ListingPageLayout', () => {
  it('renders both the default and wide sections with their own class names', () => {
    const { container } = render(
      <ListingPageLayout
        mainClasses="testPage"
        defaultSectionClassName="contentWrapper layoutAll layoutTest defaultLayout"
        wideSectionClassName="contentWrapper layoutAll layoutTest wideLayout"
        tiles={{ blurb: { kind: 'text', text: 'Default text' } }}
        defaultLayout={[row({}, [column({}, [tileRef('blurb')])])]}
        wideLayout={[row({}, [column({}, [tileRef('blurb')])])]}
        location={{ pathname: '/test/' }}
      />
    );

    expect(container.querySelector('.contentWrapper.layoutAll.layoutTest.defaultLayout')).toBeInTheDocument();
    expect(container.querySelector('.contentWrapper.layoutAll.layoutTest.wideLayout')).toBeInTheDocument();
    expect(screen.getAllByText('Default text')).toHaveLength(2);
  });

  it('passes mainClasses through to the page shell', () => {
    const { container } = render(
      <ListingPageLayout
        mainClasses="myMainClass"
        defaultSectionClassName="a"
        wideSectionClassName="b"
        tiles={{}}
        defaultLayout={[]}
        wideLayout={[]}
        location={{ pathname: '/' }}
      />
    );

    expect(container.querySelector('.content.myMainClass')).toBeInTheDocument();
  });

  it('resolves projects and the shared introduction text from static/app-constants', () => {
    render(
      <ListingPageLayout
        mainClasses="testPage"
        defaultSectionClassName="a"
        wideSectionClassName="b"
        tiles={{ hoggsHollowFrench: { kind: 'project', projectKey: 'hoggsHollowFrench', num: 1 } }}
        defaultLayout={[row({}, [column({}, [tileRef('hoggsHollowFrench')])])]}
        wideLayout={[]}
        location={{ pathname: '/' }}
      />
    );

    expect(screen.getByText("Hogg's Hollow French")).toBeInTheDocument();
  });
});
