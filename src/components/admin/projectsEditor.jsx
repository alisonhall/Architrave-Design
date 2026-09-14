import React, { useState } from 'react';

import { useDraftSection } from './draftContext';
import { PROJECT_TYPES, makeUniqueProjectKey } from './projectHelpers';
import ProjectForm from './projectForm';
import ProjectPreview from './projectPreview';

const arrayWithout = (array, value) => array.filter((item) => item !== value);
const arrayMoved = (array, index, delta) => {
  const next = [...array];
  const target = index + delta;
  if (target < 0 || target >= next.length) return array;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
};

/**
 * @description The Projects section of the admin tool: manage every project's data,
 * which portfolio listing pages show it (and in what order), and the shared
 * introduction text used on those listing pages.
 */
const ProjectsEditor = () => {
  const [projects, setProjects] = useDraftSection('projects');
  const [defaultIntroductionText, setDefaultIntroductionText] = useDraftSection('defaultIntroductionText');

  const [newProjectsOrder, setNewProjectsOrder] = useDraftSection('newProjectsOrder');
  const [renovationProjectsOrder, setRenovationProjectsOrder] = useDraftSection('renovationProjectsOrder');
  const [upcomingProjectsOrder, setUpcomingProjectsOrder] = useDraftSection('upcomingProjectsOrder');
  const [unusedNewProjects, setUnusedNewProjects] = useDraftSection('unusedNewProjects');
  const [unusedRenovationProjects, setUnusedRenovationProjects] = useDraftSection('unusedRenovationProjects');
  const [unusedUpcomingProjects, setUnusedUpcomingProjects] = useDraftSection('unusedUpcomingProjects');

  const sections = {
    'new-homes': {
      order: newProjectsOrder, setOrder: setNewProjectsOrder,
      unused: unusedNewProjects, setUnused: setUnusedNewProjects
    },
    'renovations-additions': {
      order: renovationProjectsOrder, setOrder: setRenovationProjectsOrder,
      unused: unusedRenovationProjects, setUnused: setUnusedRenovationProjects
    },
    upcoming: {
      order: upcomingProjectsOrder, setOrder: setUpcomingProjectsOrder,
      unused: unusedUpcomingProjects, setUnused: setUnusedUpcomingProjects
    }
  };

  const [editingKey, setEditingKey] = useState(null);
  const [addingType, setAddingType] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);

  const closeForms = () => {
    setEditingKey(null);
    setAddingType(null);
    setPreviewProject(null);
  };

  const moveWithinOrder = (typeValue, index, delta) => {
    sections[typeValue].setOrder(arrayMoved(sections[typeValue].order, index, delta));
  };

  const hideProject = (typeValue, key) => {
    sections[typeValue].setOrder(arrayWithout(sections[typeValue].order, key));
    sections[typeValue].setUnused([...sections[typeValue].unused, key]);
  };

  const showProject = (typeValue, key) => {
    sections[typeValue].setUnused(arrayWithout(sections[typeValue].unused, key));
    sections[typeValue].setOrder([...sections[typeValue].order, key]);
  };

  const deleteProject = (typeValue, key) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Delete "${projects[key].projectName}"? This can't be undone within this session.`)) return;

    const nextProjects = { ...projects };
    delete nextProjects[key];
    setProjects(nextProjects);
    sections[typeValue].setOrder(arrayWithout(sections[typeValue].order, key));
    sections[typeValue].setUnused(arrayWithout(sections[typeValue].unused, key));
    if (editingKey === key) closeForms();
  };

  const saveProject = (key, values) => {
    setProjects({ ...projects, [key]: { ...projects[key], ...values, key } });
    closeForms();
  };

  const addProject = (typeValue, values) => {
    const key = makeUniqueProjectKey(values.projectName, projects);
    setProjects({ ...projects, [key]: { ...values, key, type: typeValue } });
    // New projects start hidden — promote with "Show" once you're ready for it to
    // appear on a listing page (its tile placement is handled by the layout editor).
    sections[typeValue].setUnused([...sections[typeValue].unused, key]);
    closeForms();
  };

  const renderProjectRow = (typeValue, key, { showUpDown, index, listLength } = {}) => {
    const project = projects[key];
    if (!project) return null;

    return (
      <li key={key} className="adminProjectsEditor-row">
        <span className="adminProjectsEditor-name">{project.projectName}</span>
        <span className="adminProjectsEditor-rowActions">
          {showUpDown && (
            <>
              <button type="button" disabled={index === 0} onClick={() => moveWithinOrder(typeValue, index, -1)}>
                Up
              </button>
              <button
                type="button"
                disabled={index === listLength - 1}
                onClick={() => moveWithinOrder(typeValue, index, 1)}
              >
                Down
              </button>
              <button type="button" onClick={() => hideProject(typeValue, key)}>Hide</button>
            </>
          )}
          {!showUpDown && (
            <button type="button" onClick={() => showProject(typeValue, key)}>Show</button>
          )}
          <button
            type="button"
            onClick={() => {
              setAddingType(null);
              setEditingKey(key);
              setPreviewProject(project);
            }}
          >
            Edit
          </button>
          <button type="button" onClick={() => deleteProject(typeValue, key)}>Delete</button>
        </span>
      </li>
    );
  };

  return (
    <div className="adminProjectsEditor">
      <section className="adminProjectsEditor-intro">
        <label htmlFor="intro-text">Portfolio introduction text</label>
        <textarea
          id="intro-text"
          rows={2}
          value={defaultIntroductionText}
          onChange={(event) => setDefaultIntroductionText(event.target.value)}
        />
      </section>

      {PROJECT_TYPES.map(({ value, label }) => (
        <section key={value} className="adminProjectsEditor-type">
          <h2>{label}</h2>

          <h3>Shown, in order</h3>
          <ul>
            {sections[value].order.map((key, index) =>
              renderProjectRow(value, key, { showUpDown: true, index, listLength: sections[value].order.length })
            )}
          </ul>

          <h3>Not shown</h3>
          <ul>
            {sections[value].unused.map((key) => renderProjectRow(value, key, { showUpDown: false }))}
          </ul>

          {addingType === value ? (
            <ProjectForm
              onChange={(values) => setPreviewProject({ ...values, type: value })}
              onSubmit={(values) => addProject(value, values)}
              onCancel={closeForms}
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setEditingKey(null);
                setAddingType(value);
                setPreviewProject({ type: value });
              }}
            >
              Add {label} project
            </button>
          )}
        </section>
      ))}

      {editingKey && (
        <section className="adminProjectsEditor-editing">
          <h2>Editing: {projects[editingKey].projectName}</h2>
          <ProjectForm
            initialProject={projects[editingKey]}
            onChange={(values) => setPreviewProject({ ...projects[editingKey], ...values })}
            onSubmit={(values) => saveProject(editingKey, values)}
            onCancel={closeForms}
          />
        </section>
      )}

      {previewProject && previewProject.mainImageUrl && (
        <section className="adminProjectsEditor-preview">
          <h2>Preview</h2>
          <ProjectPreview project={previewProject} />
        </section>
      )}
    </div>
  );
};

export default ProjectsEditor;
