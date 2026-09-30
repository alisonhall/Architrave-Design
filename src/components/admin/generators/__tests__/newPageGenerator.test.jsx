import { generateNewPageFile, toComponentName } from '../newPageGenerator';

describe('toComponentName', () => {
  it('converts a kebab-case slug to PascalCase', () => {
    expect(toComponentName('lorne-park-interior')).toBe('LorneParkInterior');
  });

  it('handles a single-word slug', () => {
    expect(toComponentName('upcoming')).toBe('Upcoming');
  });
});

describe('generateNewPageFile', () => {
  it('generates a thin wrapper importing the matching layout data file', () => {
    const text = generateNewPageFile({ slug: 'test-manor' });

    expect(text).toContain("import layoutData from '../../../../static/layouts/test-manor';");
    expect(text).toContain("import DetailPageLayout from '../../../components/detailPageLayout';");
    expect(text).toContain('const TestManor = (props) => <DetailPageLayout {...layoutData} location={props.location} />;');
    expect(text).toContain('export default TestManor;');
  });
});
