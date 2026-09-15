import { generateLayoutData } from '../layoutGenerator';
import { hydrateLayoutData } from '../../layoutHelpers';

const evalGeneratedData = (text) => {
  const module = { exports: {} };
  // eslint-disable-next-line no-new-func
  const run = new Function('module', 'exports', text.replace('export default layout;', 'module.exports = layout;'));
  run(module, module.exports);
  return module.exports;
};

describe('generateLayoutData', () => {
  it('serializes a simple single-tree detail page', () => {
    const draft = hydrateLayoutData({
      mainClasses: 'portfolio',
      sectionClassName: 'contentWrapper layoutAll layoutProject',
      projectKey: 'someProject',
      tiles: { image1: { kind: 'image', num: 1, imageUrl: 'https://example.com/a.jpg' } },
      layout: [{ height: 300, columns: [{ children: [{ nodeType: 'tileRef', tileKey: 'image1' }] }] }]
    });

    const generated = evalGeneratedData(generateLayoutData(draft));
    expect(generated).toEqual({
      mainClasses: 'portfolio',
      sectionClassName: 'contentWrapper layoutAll layoutProject',
      projectKey: 'someProject',
      tiles: { image1: { kind: 'image', num: 1, imageUrl: 'https://example.com/a.jpg' } },
      layout: [{ height: 300, columns: [{ children: [{ nodeType: 'tileRef', tileKey: 'image1' }] }] }]
    });
  });

  it('strips id fields entirely from the generated text', () => {
    const draft = hydrateLayoutData({
      tiles: {},
      layout: [{ height: 100, columns: [{ children: [{ nodeType: 'empty' }] }] }]
    });

    const text = generateLayoutData(draft);
    expect(text).not.toContain('id:');
  });

  it('omits undefined fields (e.g. an unset row height) rather than emitting them', () => {
    const draft = hydrateLayoutData({
      tiles: {},
      layout: [{ columns: [{ children: [] }] }]
    });

    const text = generateLayoutData(draft);
    expect(text).not.toContain('height');
    expect(text).not.toContain('width');

    const generated = evalGeneratedData(text);
    expect(generated.layout[0].height).toBeUndefined();
  });

  it('quotes a tile key that is not a valid JS identifier', () => {
    const draft = hydrateLayoutData({
      tiles: { 1: { kind: 'image', num: 1, imageUrl: 'https://example.com/a.jpg' } },
      layout: []
    });

    const text = generateLayoutData(draft);
    expect(text).toContain("'1': {");
  });

  it('serializes a dual-tree listing page', () => {
    const draft = hydrateLayoutData({
      mainClasses: 'index home',
      defaultSectionClassName: 'contentWrapper layoutAll layoutHome defaultLayout',
      wideSectionClassName: 'contentWrapper layoutAll layoutHome wideLayout',
      tiles: { blurb: { kind: 'text', useIntroText: true } },
      defaultLayout: [{ columns: [{ children: [{ nodeType: 'tileRef', tileKey: 'blurb' }] }] }],
      wideLayout: [{ columns: [{ children: [{ nodeType: 'tileRef', tileKey: 'blurb' }] }] }]
    });

    const generated = evalGeneratedData(generateLayoutData(draft));
    expect(generated.defaultLayout).toBeDefined();
    expect(generated.wideLayout).toBeDefined();
  });

  it('recurses into a nested row placement', () => {
    const draft = hydrateLayoutData({
      tiles: { a: { kind: 'image', num: 1, imageUrl: 'https://example.com/a.jpg' } },
      layout: [{
        columns: [{
          children: [{
            nodeType: 'row',
            row: { height: 50, columns: [{ children: [{ nodeType: 'tileRef', tileKey: 'a' }] }] }
          }]
        }]
      }]
    });

    const generated = evalGeneratedData(generateLayoutData(draft));
    expect(generated.layout[0].columns[0].children[0].nodeType).toBe('row');
    expect(generated.layout[0].columns[0].children[0].row.height).toBe(50);
  });
});
