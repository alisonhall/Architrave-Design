import { hydrateReviews, stripReviews, makeBlankReview } from '../reviewsHelpers';

describe('hydrateReviews / stripReviews', () => {
  const rawReviews = [
    { name: 'A', projectDate: 'June 2025', text: 'Great.' },
    { name: 'B', projectDate: 'May 2025', text: ['Para one.', 'Para two.'] }
  ];

  it('hydrateReviews adds a unique id to every review', () => {
    const hydrated = hydrateReviews(rawReviews);
    expect(hydrated).toHaveLength(2);
    hydrated.forEach((review) => expect(review.id).toBeDefined());
    expect(hydrated[0].id).not.toBe(hydrated[1].id);
  });

  it('hydrateReviews leaves the original fields untouched', () => {
    const [hydrated] = hydrateReviews(rawReviews);
    expect(hydrated.name).toBe('A');
    expect(hydrated.projectDate).toBe('June 2025');
    expect(hydrated.text).toBe('Great.');
  });

  it('stripReviews removes every id added by hydrateReviews, round-tripping exactly', () => {
    expect(stripReviews(hydrateReviews(rawReviews))).toEqual(rawReviews);
  });

  it('stripReviews leaves data with no ids unchanged', () => {
    expect(stripReviews(rawReviews)).toEqual(rawReviews);
  });
});

describe('makeBlankReview', () => {
  it('builds a blank review with an id and empty fields', () => {
    const review = makeBlankReview();
    expect(review.id).toBeDefined();
    expect(review.name).toBe('');
    expect(review.projectDate).toBe('');
    expect(review.text).toBe('');
  });
});
