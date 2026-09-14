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
});
