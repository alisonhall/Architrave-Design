import constants from '../../../../static/app-constants';
import { seedDraft } from '../seedData';

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

  it('leaves the not-yet-built sections as placeholders', () => {
    expect(seedDraft.aboutContent).toBeNull();
    expect(seedDraft.reviews).toBeNull();
  });

  it('seeds a transcribed layout for new-homes.jsx', () => {
    expect(Object.keys(seedDraft.layouts)).toEqual(['newHomes']);
    expect(seedDraft.layouts.newHomes.tiles).toBeDefined();
    expect(seedDraft.layouts.newHomes.defaultLayout.length).toBeGreaterThan(0);
    expect(seedDraft.layouts.newHomes.wideLayout.length).toBeGreaterThan(0);
  });
});
