import constants from '../../../../../static/app-constants';
import { seedDraft } from '../../seedData';
import { generateAppConstants } from '../appConstantsGenerator';

// Executes the generated file text as real JS and returns its default export, so
// assertions check actual behaviour rather than string-matching generated source.
const evalGeneratedConstants = (text) => {
  const module = { exports: {} };
  // eslint-disable-next-line no-new-func
  const run = new Function('module', 'exports', text.replace('export default constants;', 'module.exports = constants;'));
  run(module, module.exports);
  return module.exports;
};

describe('generateAppConstants', () => {
  it('round-trips the live app-constants.js data exactly', () => {
    const generated = evalGeneratedConstants(generateAppConstants(seedDraft));
    expect(generated).toEqual(constants);
  });

  it('reflects an edited project field', () => {
    const draft = {
      ...seedDraft,
      projects: {
        ...seedDraft.projects,
        creditRiverManor: { ...seedDraft.projects.creditRiverManor, projectName: 'Updated Manor Name' }
      }
    };

    const generated = evalGeneratedConstants(generateAppConstants(draft));
    expect(generated.projects.creditRiverManor.projectName).toBe('Updated Manor Name');
  });

  it('reflects a reordered project list', () => {
    const reordered = [...seedDraft.newProjectsOrder].reverse();
    const draft = { ...seedDraft, newProjectsOrder: reordered };

    const generated = evalGeneratedConstants(generateAppConstants(draft));
    expect(generated.newProjectsOrder).toEqual(reordered);
  });

  it('reflects a project moved from unused to shown', () => {
    const [movedKey, ...remainingUnused] = seedDraft.unusedNewProjects;
    const draft = {
      ...seedDraft,
      newProjectsOrder: [...seedDraft.newProjectsOrder, movedKey],
      unusedNewProjects: remainingUnused
    };

    const generated = evalGeneratedConstants(generateAppConstants(draft));
    expect(generated.newProjectsOrder).toContain(movedKey);
    expect(generated.unusedNewProjects).not.toContain(movedKey);
  });

  it('reflects a newly added project', () => {
    const draft = {
      ...seedDraft,
      projects: {
        ...seedDraft.projects,
        brandNewProject: {
          key: 'brandNewProject',
          fileName: 'brand-new-project',
          type: 'new-homes',
          projectName: 'Brand New Project',
          mainImageUrl: 'https://example.com/image.jpg'
        }
      },
      unusedNewProjects: [...seedDraft.unusedNewProjects, 'brandNewProject']
    };

    const generated = evalGeneratedConstants(generateAppConstants(draft));
    expect(generated.projects.brandNewProject).toEqual(draft.projects.brandNewProject);
    expect(generated.unusedNewProjects).toContain('brandNewProject');
  });

  it('quotes a project name containing an apostrophe correctly', () => {
    const draft = {
      ...seedDraft,
      projects: {
        ...seedDraft.projects,
        apostropheProject: {
          key: 'apostropheProject',
          type: 'upcoming',
          projectName: "St. George's Rebuild 2",
          mainImageUrl: 'https://example.com/image.jpg'
        }
      }
    };

    const text = generateAppConstants(draft);
    expect(text).toContain('projectName: "St. George\'s Rebuild 2"');

    const generated = evalGeneratedConstants(text);
    expect(generated.projects.apostropheProject.projectName).toBe("St. George's Rebuild 2");
  });

  it('omits fields the project does not have, rather than emitting them as undefined', () => {
    const draft = {
      ...seedDraft,
      projects: {
        ...seedDraft.projects,
        minimalProject: {
          key: 'minimalProject',
          type: 'upcoming',
          projectName: 'Minimal Project',
          mainImageUrl: 'https://example.com/image.jpg'
        }
      }
    };

    const text = generateAppConstants(draft);
    expect(text).not.toMatch(/minimalProject[\s\S]*?fileName/);

    const generated = evalGeneratedConstants(text);
    expect(generated.projects.minimalProject.fileName).toBeUndefined();
  });
});
