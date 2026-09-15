import { generateTestScaffold } from '../testScaffoldGenerator';

describe('generateTestScaffold', () => {
  it('generates a snapshot test matching the existing convention (generic "Page" import, real pathname)', () => {
    const text = generateTestScaffold({ slug: 'test-manor', folder: 'new-homes' });

    expect(text).toContain("import Page from '../test-manor';");
    expect(text).toContain("describe('test-manor page', () => {");
    expect(text).toContain("pathname: '/portfolio/new-homes/test-manor/'");
    expect(text).toContain('expect(container).toMatchSnapshot();');
  });

  it('uses the given folder for the pathname', () => {
    const text = generateTestScaffold({ slug: 'a-project', folder: 'renovations-additions' });
    expect(text).toContain("pathname: '/portfolio/renovations-additions/a-project/'");
  });
});
