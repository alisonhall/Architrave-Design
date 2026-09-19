import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { slugify } from './projectHelpers';

const blankValues = () => ({
  projectName: '',
  fileName: '',
  projectDescription: '',
  completion: '',
  mainImageUrl: '',
  beforeImageUrl: ''
});

/**
 * @description A project's editable fields (everything except its key and type, which
 * are fixed once a project exists — see projectsEditor.jsx for how those are set).
 * Reports every keystroke via onChange (for a live preview) as well as a final onSubmit.
 *
 * @param {Object} param
 * @param {Object} param.initialProject - omit for "add new project" mode
 * @param {Function} param.onChange - called with the current field values on every edit
 * @param {Function} param.onSubmit - called with the current field values on save
 * @param {Function} param.onCancel
 */
const ProjectForm = ({ initialProject, onChange, onSubmit, onCancel }) => {
  const [values, setValues] = useState(() => ({ ...blankValues(), ...initialProject }));

  useEffect(() => {
    onChange(values);
    // Only re-run when the values themselves change; onChange is provided fresh each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const updateField = (field, value) => setValues((current) => ({ ...current, [field]: value }));

  const handleSuggestFileName = () => updateField('fileName', slugify(values.projectName));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form className="adminProjectForm" onSubmit={handleSubmit}>
      <label htmlFor="project-name">Project name</label>
      <input
        id="project-name"
        type="text"
        required
        value={values.projectName}
        onChange={(event) => updateField('projectName', event.target.value)}
      />

      <label htmlFor="project-fileName">
        File name <span className="adminProjectForm-hint">(used in its page URL)</span>
      </label>
      <div className="adminProjectForm-row">
        <input
          id="project-fileName"
          type="text"
          value={values.fileName}
          onChange={(event) => updateField('fileName', event.target.value)}
        />
        <button type="button" onClick={handleSuggestFileName} disabled={!values.projectName}>
          Suggest from name
        </button>
      </div>

      <label htmlFor="project-description">Description</label>
      <textarea
        id="project-description"
        rows={4}
        value={values.projectDescription}
        onChange={(event) => updateField('projectDescription', event.target.value)}
      />

      <label htmlFor="project-completion">
        Completion <span className="adminProjectForm-hint">(upcoming projects only)</span>
      </label>
      <input
        id="project-completion"
        type="text"
        value={values.completion}
        onChange={(event) => updateField('completion', event.target.value)}
      />

      <label htmlFor="project-mainImageUrl">Main image URL</label>
      <input
        id="project-mainImageUrl"
        type="text"
        required
        value={values.mainImageUrl}
        onChange={(event) => updateField('mainImageUrl', event.target.value)}
      />

      <label htmlFor="project-beforeImageUrl">
        Before image URL <span className="adminProjectForm-hint">(optional)</span>
      </label>
      <input
        id="project-beforeImageUrl"
        type="text"
        value={values.beforeImageUrl}
        onChange={(event) => updateField('beforeImageUrl', event.target.value)}
      />

      <div className="adminProjectForm-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

ProjectForm.propTypes = {
  initialProject: PropTypes.shape({
    projectName: PropTypes.string,
    fileName: PropTypes.string,
    projectDescription: PropTypes.string,
    completion: PropTypes.string,
    mainImageUrl: PropTypes.string,
    beforeImageUrl: PropTypes.string
  }),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

ProjectForm.defaultProps = {
  initialProject: undefined,
  onChange: () => {}
};

export default ProjectForm;
