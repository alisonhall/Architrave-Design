import constants from '../../../../static/app-constants';
import { seedDraft, LAYOUT_PAGE_CONFIGS } from '../seedData';

describe('seedDraft', () => {
  it('clones projects and ordering data from app-constants', () => {
    expect(seedDraft.projects).toEqual(constants.projects);
    expect(seedDraft.newProjectsOrder).toEqual(constants.newProjectsOrder);
    expect(seedDraft.renovationProjectsOrder).toEqual(constants.renovationProjectsOrder);
    expect(seedDraft.upcomingProjectsOrder).toEqual(constants.upcomingProjectsOrder);
    expect(seedDraft.unusedNewProjects).toEqual(constants.unusedNewProjects);
    expect(seedDraft.unusedRenovationProjects).toEqual(constants.unusedRenovationProjects);
    expect(seedDraft.unusedUpcomingProjects).toEqual(constants.unusedUpcomingProjects);
    expect(seedDraft.defaultIntroductionText).toBe(constants.defaultIntroductionText);
  });

  it('deep clones rather than referencing app-constants, so edits cannot mutate it', () => {
    expect(seedDraft.projects).not.toBe(constants.projects);
    expect(seedDraft.newProjectsOrder).not.toBe(constants.newProjectsOrder);

    seedDraft.newProjectsOrder.push('mutated-in-test');
    expect(constants.newProjectsOrder).not.toContain('mutated-in-test');

    // undo the mutation so it can't leak into other test files sharing this import
    seedDraft.newProjectsOrder.pop();
  });

  it('seeds about content and reviews from their static data files', () => {
    expect(seedDraft.aboutContent.intro.heading).toBe('Architrave Design, Architect');
    expect(seedDraft.reviews.length).toBeGreaterThan(0);
    expect(seedDraft.reviews[0].id).toBeDefined();
  });

  it('seeds a transcribed layout for each supported listing page', () => {
    ['index', 'newHomes', 'renovationsAdditions'].forEach((key) => {
      const layout = seedDraft.layouts[key];
      expect(layout.tiles).toBeDefined();
      expect(layout.defaultLayout.length).toBeGreaterThan(0);
      expect(layout.wideLayout.length).toBeGreaterThan(0);
    });
  });

  it('seeds a transcribed layout for each supported detail page (single or dual tree)', () => {
    Object.keys(LAYOUT_PAGE_CONFIGS)
      .filter((key) => LAYOUT_PAGE_CONFIGS[key].type === 'detail')
      .forEach((key) => {
        const layout = seedDraft.layouts[key];
        expect(layout.tiles).toBeDefined();
        if (layout.layout) {
          expect(layout.layout.length).toBeGreaterThan(0);
        } else {
          expect(layout.defaultLayout.length).toBeGreaterThan(0);
          expect(layout.wideLayout.length).toBeGreaterThan(0);
        }
      });
  });

  it('registers a seed layout for every page listed in LAYOUT_PAGE_CONFIGS', () => {
    Object.keys(LAYOUT_PAGE_CONFIGS).forEach((key) => {
      expect(seedDraft.layouts[key]).toBeDefined();
    });
  });
});
