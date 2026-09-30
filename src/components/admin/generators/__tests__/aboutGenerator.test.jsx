import { generateAboutData } from '../aboutGenerator';
import aboutData from '../../../../../static/about';

const evalGenerated = (text) => {
  const module = { exports: {} };
  // eslint-disable-next-line no-new-func
  const run = new Function('module', 'exports', text.replace('export default about;', 'module.exports = about;'));
  run(module, module.exports);
  return module.exports;
};

describe('generateAboutData', () => {
  it('serializes the three sections as plain data', () => {
    const draft = {
      intro: { heading: 'Intro', paragraphs: ['One.'] },
      bio: { heading: 'Bio', paragraphs: ['Two.'] },
      approach: { heading: 'Approach', paragraphs: ['Three.', 'Four.'] }
    };

    const generated = evalGenerated(generateAboutData(draft));
    expect(generated).toEqual(draft);
  });

  it('round-trips the real static/about.js content exactly', () => {
    const generated = evalGenerated(generateAboutData(aboutData));
    expect(generated).toEqual(aboutData);
  });
});
