import { stripReviews } from '../reviewsHelpers';
import { generateDataFileText } from './plainDataSerializer';

/**
 * @description Generates the full text of static/reviews.js from the admin's reviews
 * draft — the single source of truth both the real reviews page and this editor read.
 * Strips the draft's editor-only `id` fields first so the committed file never carries
 * them.
 *
 * @param {Array} reviewsDraft - a hydrated reviews draft (see reviewsHelpers.js)
 */
export const generateReviewsData = (reviewsDraft) => generateDataFileText('reviews', stripReviews(reviewsDraft));
