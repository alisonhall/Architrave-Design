import React from 'react';
import PropTypes from 'prop-types';

import { useDraftSection } from './draftContext';
import AboutPreview from './aboutPreview';

const replaceAt = (array, index, value) => array.map((item, i) => (i === index ? value : item));
const removeAt = (array, index) => array.filter((_, i) => i !== index);

const SectionFields = ({ label, section, onChange }) => {
  const updateParagraph = (index, value) => onChange({ ...section, paragraphs: replaceAt(section.paragraphs, index, value) });
  const removeParagraph = (index) => onChange({ ...section, paragraphs: removeAt(section.paragraphs, index) });
  const addParagraph = () => onChange({ ...section, paragraphs: [...section.paragraphs, ''] });

  return (
    <section className="adminAboutEditor-section">
      <h3>{label}</h3>
      <label>
        Heading
        <input type="text" value={section.heading} onChange={(e) => onChange({ ...section, heading: e.target.value })} />
      </label>
      {section.paragraphs.map((paragraph, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="adminAboutEditor-paragraph" key={index}>
          <label>
            Paragraph {index + 1}
            <textarea rows={3} value={paragraph} onChange={(e) => updateParagraph(index, e.target.value)} />
          </label>
          <button type="button" onClick={() => removeParagraph(index)}>Remove paragraph</button>
        </div>
      ))}
      <button type="button" onClick={addParagraph}>Add paragraph</button>
    </section>
  );
};

SectionFields.propTypes = {
  label: PropTypes.string.isRequired,
  section: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

/**
 * @description The About section of the admin tool: edit the three fixed text sections
 * (intro, bio, approach) with a live preview alongside. The bio photo and page
 * background image are fixed in _about.scss, not editable here.
 */
const AboutEditor = () => {
  const [about, setAbout] = useDraftSection('aboutContent');

  return (
    <div className="adminAboutEditor">
      <div className="adminAboutEditor-columns">
        <div>
          <SectionFields label="Introduction" section={about.intro} onChange={(intro) => setAbout({ ...about, intro })} />
          <SectionFields label="Bio" section={about.bio} onChange={(bio) => setAbout({ ...about, bio })} />
          <SectionFields label="Approach" section={about.approach} onChange={(approach) => setAbout({ ...about, approach })} />
        </div>
        <AboutPreview intro={about.intro} bio={about.bio} approach={about.approach} />
      </div>
    </div>
  );
};

export default AboutEditor;
