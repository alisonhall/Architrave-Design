import { slugify, camelCase, makeUniqueProjectKey, getProjectTypeConfig, PROJECT_TYPES } from '../projectHelpers';

describe('slugify', () => {
  it('lowercases and hyphenates words', () => {
    expect(slugify('Credit River Manor')).toBe('credit-river-manor');
  });

  it('strips punctuation', () => {
    expect(slugify("Hogg's Hollow French Country")).toBe('hogg-s-hollow-french-country');
  });

  it('trims leading/trailing hyphens from stray punctuation', () => {
    expect(slugify('  --Fancy Project!!--  ')).toBe('fancy-project');
  });
});

describe('camelCase', () => {
  it('lowercases the first word and capitalizes the rest', () => {
    expect(camelCase('Credit River Manor')).toBe('creditRiverManor');
  });

  it('drops punctuation, treating an apostrophe as a word break', () => {
    expect(camelCase("St. George's Rebuild")).toBe('stGeorgeSRebuild');
  });

  it('returns an empty string for input with no usable characters', () => {
    expect(camelCase('!!!')).toBe('');
  });
});

describe('makeUniqueProjectKey', () => {
  it('uses the camelCase form when it is not already taken', () => {
    expect(makeUniqueProjectKey('Brand New Project', {})).toBe('brandNewProject');
  });

  it('appends a numeric suffix on collision', () => {
    const existing = { brandNewProject: {} };
    expect(makeUniqueProjectKey('Brand New Project', existing)).toBe('brandNewProject2');
  });

  it('keeps incrementing the suffix past multiple collisions', () => {
    const existing = { brandNewProject: {}, brandNewProject2: {} };
    expect(makeUniqueProjectKey('Brand New Project', existing)).toBe('brandNewProject3');
  });

  it('falls back to "newProject" when the name has no usable characters', () => {
    expect(makeUniqueProjectKey('!!!', {})).toBe('newProject');
  });
});

describe('getProjectTypeConfig', () => {
  it('finds the config for a known type value', () => {
    expect(getProjectTypeConfig('new-homes')).toEqual(PROJECT_TYPES[0]);
  });

  it('returns undefined for an unknown type value', () => {
    expect(getProjectTypeConfig('not-a-real-type')).toBeUndefined();
  });
});
