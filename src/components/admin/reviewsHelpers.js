import { makeId } from './layoutHelpers';

/**
 * @description `static/reviews.js` never stores `id` fields (an editing-only concern —
 * a React key stable across add/edit/delete/reorder, since a review's own fields can
 * all change and its position in the array isn't a safe key either). These two
 * functions are the only place ids get added (on load) and removed (before generating
 * output), mirroring hydrateLayoutData/stripLayoutData in layoutHelpers.js.
 */
export const hydrateReviews = (reviews) => reviews.map((review) => ({ id: makeId('review'), ...review }));

export const stripReviews = (reviews) => reviews.map(({ id, ...rest }) => rest);

export const makeBlankReview = () => ({ id: makeId('review'), name: '', projectDate: '', text: '' });
