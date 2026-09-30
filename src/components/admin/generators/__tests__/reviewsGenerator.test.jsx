import { generateReviewsData } from '../reviewsGenerator';
import { hydrateReviews } from '../../reviewsHelpers';
import reviewsData from '../../../../../static/reviews';

const evalGenerated = (text) => {
  const module = { exports: {} };
  // eslint-disable-next-line no-new-func
  const run = new Function('module', 'exports', text.replace('export default reviews;', 'module.exports = reviews;'));
  run(module, module.exports);
  return module.exports;
};

describe('generateReviewsData', () => {
  it('strips editor-only id fields from the generated text', () => {
    const draft = hydrateReviews([{ name: 'A', projectDate: 'June 2025', text: 'Great work.' }]);

    const text = generateReviewsData(draft);
    expect(text).not.toContain('id:');

    const generated = evalGenerated(text);
    expect(generated).toEqual([{ name: 'A', projectDate: 'June 2025', text: 'Great work.' }]);
  });

  it('preserves a multi-paragraph review as an array of strings', () => {
    const draft = hydrateReviews([{ name: 'B', projectDate: 'May 2025', text: ['Para one.', 'Para two.'] }]);

    const generated = evalGenerated(generateReviewsData(draft));
    expect(generated[0].text).toEqual(['Para one.', 'Para two.']);
  });

  it('round-trips the real static/reviews.js content exactly', () => {
    const draft = hydrateReviews(reviewsData);
    const generated = evalGenerated(generateReviewsData(draft));
    expect(generated).toEqual(reviewsData);
  });
});
