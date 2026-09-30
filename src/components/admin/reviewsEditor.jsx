import React, { useState } from 'react';

import { useDraftSection } from './draftContext';
import { makeBlankReview } from './reviewsHelpers';
import { moveAt } from './layoutHelpers';
import ReviewsPreview from './reviewsPreview';

const textToTextarea = (text) => (Array.isArray(text) ? text.join('\n\n') : text);
const textareaToText = (value) => {
  const paragraphs = value.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  return paragraphs.length > 1 ? paragraphs : value;
};

/**
 * @description The Reviews section of the admin tool: manage the review list (add,
 * edit, delete, reorder) with a live preview alongside. A review's `text` is edited as
 * one textarea, blank-line-separated into paragraphs on save — matching how a handful
 * of existing reviews on the live site span more than one paragraph.
 */
const ReviewsEditor = () => {
  const [reviews, setReviews] = useDraftSection('reviews');
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [draftValues, setDraftValues] = useState(null);

  const startAdd = () => {
    setEditingId(null);
    setAdding(true);
    setDraftValues(makeBlankReview());
  };

  const startEdit = (review) => {
    setAdding(false);
    setEditingId(review.id);
    setDraftValues({ ...review, text: textToTextarea(review.text) });
  };

  const cancel = () => {
    setEditingId(null);
    setAdding(false);
    setDraftValues(null);
  };

  const saveEdit = () => {
    setReviews(reviews.map((review) => (review.id === editingId
      ? { ...draftValues, text: textareaToText(draftValues.text) }
      : review)));
    cancel();
  };

  const saveAdd = () => {
    setReviews([...reviews, { ...draftValues, text: textareaToText(draftValues.text) }]);
    cancel();
  };

  const deleteReview = (id) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Delete this review? This can\'t be undone within this session.')) return;
    setReviews(reviews.filter((review) => review.id !== id));
    if (editingId === id) cancel();
  };

  const moveReview = (index, delta) => setReviews(moveAt(reviews, index, delta));

  return (
    <div className="adminReviewsEditor">
      <div className="adminReviewsEditor-columns">
        <div>
          <ul>
            {reviews.map((review, index) => (
              <li key={review.id} className="adminProjectsEditor-row">
                <span className="adminProjectsEditor-name">{review.name} — {review.projectDate}</span>
                <span className="adminProjectsEditor-rowActions">
                  <button type="button" disabled={index === 0} onClick={() => moveReview(index, -1)}>Up</button>
                  <button type="button" disabled={index === reviews.length - 1} onClick={() => moveReview(index, 1)}>
                    Down
                  </button>
                  <button type="button" onClick={() => startEdit(review)}>Edit</button>
                  <button type="button" onClick={() => deleteReview(review.id)}>Delete</button>
                </span>
              </li>
            ))}
          </ul>

          {editingId && (
            <div className="adminProjectForm">
              <h4>Editing review</h4>
              <label>
                Name
                <input
                  type="text"
                  value={draftValues.name}
                  onChange={(e) => setDraftValues({ ...draftValues, name: e.target.value })}
                />
              </label>
              <label>
                Project date <span className="adminProjectForm-hint">(e.g. "April 2025")</span>
                <input
                  type="text"
                  value={draftValues.projectDate}
                  onChange={(e) => setDraftValues({ ...draftValues, projectDate: e.target.value })}
                />
              </label>
              <label>
                Text <span className="adminProjectForm-hint">(blank line between paragraphs)</span>
                <textarea
                  rows={6}
                  value={draftValues.text}
                  onChange={(e) => setDraftValues({ ...draftValues, text: e.target.value })}
                />
              </label>
              <div className="adminProjectForm-actions">
                <button type="button" onClick={saveEdit}>Save</button>
                <button type="button" onClick={cancel}>Cancel</button>
              </div>
            </div>
          )}

          {adding && (
            <div className="adminProjectForm">
              <h4>New review</h4>
              <label>
                Name
                <input
                  type="text"
                  value={draftValues.name}
                  onChange={(e) => setDraftValues({ ...draftValues, name: e.target.value })}
                />
              </label>
              <label>
                Project date <span className="adminProjectForm-hint">(e.g. "April 2025")</span>
                <input
                  type="text"
                  value={draftValues.projectDate}
                  onChange={(e) => setDraftValues({ ...draftValues, projectDate: e.target.value })}
                />
              </label>
              <label>
                Text <span className="adminProjectForm-hint">(blank line between paragraphs)</span>
                <textarea
                  rows={6}
                  value={draftValues.text}
                  onChange={(e) => setDraftValues({ ...draftValues, text: e.target.value })}
                />
              </label>
              <div className="adminProjectForm-actions">
                <button type="button" onClick={saveAdd}>Add review</button>
                <button type="button" onClick={cancel}>Cancel</button>
              </div>
            </div>
          )}

          {!editingId && !adding && (
            <button type="button" onClick={startAdd}>Add review</button>
          )}
        </div>
        <ReviewsPreview reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewsEditor;
