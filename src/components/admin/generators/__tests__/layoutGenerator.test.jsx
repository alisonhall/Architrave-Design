import { generateLayoutPage } from '../layoutGenerator';

const pageConfig = {
  componentName: 'TestPage',
  mainClasses: 'testPage',
  defaultSectionClassName: 'contentWrapper layoutAll layoutTest defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutTest wideLayout',
  componentsPath: '../../components',
  staticPath: '../../../static'
};

const rowNode = (id, props, columns) => ({ id, columns, ...props });
const columnNode = (id, props, children) => ({ id, children, ...props });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });

const baseLayout = (overrides = {}) => ({
  tiles: overrides.tiles || { projectA: { kind: 'project', projectKey: 'projectA', num: 1 } },
  defaultLayout: overrides.defaultLayout || [
    rowNode('r1', { height: 300 }, [columnNode('c1', { width: '100%' }, [tileRef('p1', 'projectA')])])
  ],
  wideLayout: overrides.wideLayout || [
    rowNode('r1w', {}, [columnNode('c1w', {}, [tileRef('p1w', 'projectA')])])
  ]
});

describe('generateLayoutPage', () => {
  it('imports from the given components/static paths and names the component/export', () => {
    const text = generateLayoutPage(pageConfig, baseLayout());

    expect(text).toContain("import constants from '../../../static/app-constants';");
    expect(text).toContain("import Layout from '../../components/layout';");
    expect(text).toContain('const TestPage = (props) => (');
    expect(text).toContain('export default TestPage');
  });

  it('uses the given mainClasses and section class names', () => {
    const text = generateLayoutPage(pageConfig, baseLayout());

    expect(text).toContain('mainClasses=\'testPage\'');
    expect(text).toContain('<section className=\'contentWrapper layoutAll layoutTest defaultLayout\'>');
    expect(text).toContain('<section className=\'contentWrapper layoutAll layoutTest wideLayout\'>');
  });

  it('emits a buildProjectTile call for a project tile, including its number', () => {
    const text = generateLayoutPage(pageConfig, baseLayout());

    expect(text).toContain('projectA: buildProjectTile(projects.projectA, 1)');
  });

  it('includes a backgroundPosition override only when one is set', () => {
    const withOverride = baseLayout({
      tiles: { projectA: { kind: 'project', projectKey: 'projectA', num: 1, backgroundPosition: '10% 20%' } }
    });

    expect(generateLayoutPage(pageConfig, withOverride)).toContain(
      "buildProjectTile(projects.projectA, 1, { backgroundPosition: '10% 20%' })"
    );
  });

  it('emits a filler Item with isFiller and the given image URL', () => {
    const withFiller = baseLayout({
      tiles: {
        fillerTile: { kind: 'filler', projectKey: 'projectA', num: 2, imageUrl: 'https://example.com/filler.jpg' }
      },
      defaultLayout: [rowNode('r1', {}, [columnNode('c1', {}, [tileRef('p1', 'fillerTile')])])],
      wideLayout: [rowNode('r1w', {}, [columnNode('c1w', {}, [tileRef('p1w', 'fillerTile')])])]
    });

    const text = generateLayoutPage(pageConfig, withFiller);
    expect(text).toContain('isFiller');
    expect(text).toContain("imageUrl: 'https://example.com/filler.jpg'");
    expect(text).toContain('project={projects.projectA}');
  });

  it('emits a text tile using defaultIntroductionText when useIntroText is set', () => {
    const withText = baseLayout({
      tiles: { blurb: { kind: 'text', useIntroText: true } },
      defaultLayout: [rowNode('r1', {}, [columnNode('c1', {}, [tileRef('p1', 'blurb')])])],
      wideLayout: [rowNode('r1w', {}, [columnNode('c1w', {}, [tileRef('p1w', 'blurb')])])]
    });

    expect(generateLayoutPage(pageConfig, withText)).toContain('copy: defaultIntroductionText');
  });

  it('emits a text tile using its own literal copy when useIntroText is false', () => {
    const withText = baseLayout({
      tiles: { blurb: { kind: 'text', useIntroText: false, text: 'Custom blurb copy' } },
      defaultLayout: [rowNode('r1', {}, [columnNode('c1', {}, [tileRef('p1', 'blurb')])])],
      wideLayout: [rowNode('r1w', {}, [columnNode('c1w', {}, [tileRef('p1w', 'blurb')])])]
    });

    expect(generateLayoutPage(pageConfig, withText)).toContain("copy: 'Custom blurb copy'");
  });

  it('renders row height and column width attributes only when set', () => {
    const text = generateLayoutPage(pageConfig, baseLayout());

    expect(text).toContain('<Row height={300}>');
    expect(text).toContain("<Column width='100%'>");
    expect(text).toMatch(/<Row>\n/);
  });

  it('assigns sequential auto numbers to tiles without an explicit num', () => {
    const layout = baseLayout({
      tiles: {
        first: { kind: 'project', projectKey: 'a' },
        second: { kind: 'project', projectKey: 'b' }
      },
      defaultLayout: [
        rowNode('r1', {}, [
          columnNode('c1', {}, [tileRef('p1', 'first')]),
          columnNode('c2', {}, [tileRef('p2', 'second')])
        ])
      ],
      wideLayout: []
    });

    const text = generateLayoutPage(pageConfig, layout);
    expect(text).toContain('first: buildProjectTile(projects.a, 1)');
    expect(text).toContain('second: buildProjectTile(projects.b, 2)');
  });

  it('numbers a tile that only appears in the wide layout', () => {
    const layout = baseLayout({
      tiles: {
        onlyInWide: { kind: 'project', projectKey: 'c', num: 7 }
      },
      defaultLayout: [],
      wideLayout: [rowNode('r1', {}, [columnNode('c1', {}, [tileRef('p1', 'onlyInWide')])])]
    });

    expect(generateLayoutPage(pageConfig, layout)).toContain('onlyInWide: buildProjectTile(projects.c, 7)');
  });

  it('recurses into a nested row placed inside a column', () => {
    const layout = baseLayout({
      defaultLayout: [
        rowNode('outer', {}, [
          columnNode('outerCol', {}, [
            { id: 'nested', nodeType: 'row', row: rowNode('inner', { height: 100 }, [columnNode('innerCol', {}, [tileRef('p1', 'projectA')])]) }
          ])
        ])
      ]
    });

    const text = generateLayoutPage(pageConfig, layout);
    const outerIndex = text.indexOf('<Row>');
    const innerIndex = text.indexOf('<Row height={100}>');
    expect(innerIndex).toBeGreaterThan(-1);
    expect(innerIndex).toBeGreaterThan(outerIndex);
  });

  it('uses bracket notation for a tile key that is not a valid JS identifier', () => {
    const layout = baseLayout({
      tiles: { 1: { kind: 'project', projectKey: 'a', num: 1 } },
      defaultLayout: [rowNode('r1', {}, [columnNode('c1', {}, [tileRef('p1', '1')])])],
      wideLayout: []
    });

    const text = generateLayoutPage(pageConfig, layout);
    expect(text).toContain("{tiles['1']}");
    expect(text).not.toContain('{tiles.1}');
  });

  it('emits a bare <Item /> for an empty placeholder placement', () => {
    const layout = baseLayout({
      defaultLayout: [
        rowNode('r1', {}, [
          columnNode('c1', {}, [tileRef('p1', 'projectA')]),
          columnNode('c2', {}, [{ id: 'empty1', nodeType: 'empty' }])
        ])
      ],
      wideLayout: []
    });

    expect(generateLayoutPage(pageConfig, layout)).toContain('<Item />');
  });
});

describe('generateLayoutPage (detail pages)', () => {
  const detailPageConfig = {
    componentName: 'TestDetailPage',
    mainClasses: 'portfolio',
    type: 'detail',
    projectKey: 'projectA',
    sectionClassName: 'contentWrapper layoutAll layoutProject',
    componentsPath: '../../../components',
    staticPath: '../../../../static'
  };

  const detailLayout = (overrides = {}) => ({
    tiles: overrides.tiles || { image1: { kind: 'image', num: 1, imageUrl: 'https://example.com/a.jpg' } },
    layout: overrides.layout || [
      rowNode('r1', { height: 300 }, [columnNode('c1', {}, [tileRef('p1', 'image1')])])
    ]
  });

  it('binds a single project instead of destructuring projects, and has no buildProjectTile import', () => {
    const text = generateLayoutPage(detailPageConfig, detailLayout());

    expect(text).toContain('const project = constants.projects.projectA;');
    expect(text).not.toContain('buildProjectTile');
    expect(text).not.toContain('const { projects');
  });

  it('imports and renders PrevNextProjectLinks bound to the page project, inside the section', () => {
    const text = generateLayoutPage(detailPageConfig, detailLayout());

    expect(text).toContain("import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';");
    const sectionIndex = text.indexOf('<section');
    const linksIndex = text.indexOf('<PrevNextProjectLinks project={project} />');
    const sectionCloseIndex = text.indexOf('</section>');
    expect(linksIndex).toBeGreaterThan(sectionIndex);
    expect(linksIndex).toBeLessThan(sectionCloseIndex);
  });

  it('renders a single section with no defaultLayout/wideLayout split', () => {
    const text = generateLayoutPage(detailPageConfig, detailLayout());

    expect(text.match(/<section/g)).toHaveLength(1);
    expect(text).toContain("<section className='contentWrapper layoutAll layoutProject'>");
  });

  it('emits a plain image Item (no link, no isFiller) for an image tile', () => {
    const text = generateLayoutPage(detailPageConfig, detailLayout());

    expect(text).toContain("imageUrl: 'https://example.com/a.jpg'");
    expect(text).not.toContain('isFiller');
    expect(text).not.toContain('<Link');
  });

  it('includes a backgroundPosition on an image tile only when one is set', () => {
    const withPosition = detailLayout({
      tiles: {
        image1: { kind: 'image', num: 1, imageUrl: 'https://example.com/a.jpg', backgroundPosition: '100% 0%' }
      }
    });

    const text = generateLayoutPage(detailPageConfig, withPosition);
    expect(text).toContain("backgroundPosition: '100% 0%'");

    const withoutPosition = generateLayoutPage(detailPageConfig, detailLayout());
    expect(withoutPosition).not.toContain('backgroundPosition');
  });

  it('includes an overlay text block on an image tile only when one is set', () => {
    const withOverlay = detailLayout({
      tiles: { image1: { kind: 'image', num: 1, imageUrl: 'https://example.com/a.jpg', overlayText: 'Before' } }
    });

    const text = generateLayoutPage(detailPageConfig, withOverlay);
    expect(text).toContain("text={{\n        copy: 'Before'\n      }}");

    const withoutOverlay = generateLayoutPage(detailPageConfig, detailLayout());
    expect(withoutOverlay).not.toContain('text={{');
  });

  it('emits a description Item using the bound project\'s name and description', () => {
    const layout = detailLayout({
      tiles: { description: { kind: 'description' } },
      layout: [rowNode('r1', {}, [columnNode('c1', {}, [tileRef('p1', 'description')])])]
    });

    const text = generateLayoutPage(detailPageConfig, layout);
    expect(text).toContain('title: project.projectName');
    expect(text).toContain('copy: project.projectDescription');
  });

  it('ends the file with a semicolon after the default export, matching detail page style', () => {
    const text = generateLayoutPage(detailPageConfig, detailLayout());

    expect(text.trim().endsWith('export default TestDetailPage;')).toBe(true);
  });

  describe('a dual-layout detail page (defaultSectionClassName set)', () => {
    const dualDetailPageConfig = {
      ...detailPageConfig,
      defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
      wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout'
    };

    const dualDetailLayout = {
      tiles: { image1: { kind: 'image', num: 1, imageUrl: 'https://example.com/a.jpg' } },
      defaultLayout: [rowNode('r1', { height: 300 }, [columnNode('c1', {}, [tileRef('p1', 'image1')])])],
      wideLayout: [rowNode('r1w', { height: 400 }, [columnNode('c1w', {}, [tileRef('p1w', 'image1')])])]
    };

    it('renders two sections, each ending in its own PrevNextProjectLinks', () => {
      const text = generateLayoutPage(dualDetailPageConfig, dualDetailLayout);

      expect(text.match(/<section/g)).toHaveLength(2);
      expect(text.match(/<PrevNextProjectLinks project={project} \/>/g)).toHaveLength(2);
      expect(text).toContain("<section className='contentWrapper layoutAll layoutProject defaultLayout'>");
      expect(text).toContain("<section className='contentWrapper layoutAll layoutProject wideLayout'>");
    });

    it('numbers a tile using both the default and wide trees', () => {
      const layout = {
        tiles: { onlyInWide: { kind: 'image', imageUrl: 'https://example.com/b.jpg' } },
        defaultLayout: [],
        wideLayout: [rowNode('r1', {}, [columnNode('c1', {}, [tileRef('p1', 'onlyInWide')])])]
      };

      expect(generateLayoutPage(dualDetailPageConfig, layout)).toContain('num={1}');
    });
  });
});
