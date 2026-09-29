const fs = require('fs');
const path = require('path');

const SOURCE_DIRS = [
  { dir: path.join(__dirname, '..', 'pages'), requireSnapshot: true },
  { dir: path.join(__dirname, '..', 'components'), requireSnapshot: false },
];

function findSourceFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.reduce((files, entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return entry.name === '__tests__' ? files : files.concat(findSourceFiles(fullPath));
    }

    return entry.isFile() && entry.name.endsWith('.jsx') ? files.concat(fullPath) : files;
  }, []);
}

function testFileFor(filePath) {
  return path.join(
    path.dirname(filePath),
    '__tests__',
    path.basename(filePath).replace(/\.jsx$/, '.test.jsx')
  );
}

const sourceFiles = SOURCE_DIRS.flatMap(({ dir, requireSnapshot }) =>
  findSourceFiles(dir).map((filePath) => ({ filePath, requireSnapshot }))
);

describe('every page and component has a matching test file', () => {
  it('found at least one page and component to check', () => {
    expect(sourceFiles.length).toBeGreaterThan(0);
  });

  it.each(sourceFiles)('$filePath has a corresponding test file with at least one test', ({ filePath }) => {
    const testFile = testFileFor(filePath);

    expect(fs.existsSync(testFile)).toBe(true);

    const contents = fs.readFileSync(testFile, 'utf8');
    expect(contents).toMatch(/\b(it|test)\s*\(/);
  });

  it.each(sourceFiles.filter((f) => f.requireSnapshot))(
    '$filePath has a snapshot test',
    ({ filePath }) => {
      const contents = fs.readFileSync(testFileFor(filePath), 'utf8');
      expect(contents).toMatch(/\.toMatchSnapshot\s*\(/);
    }
  );
});
