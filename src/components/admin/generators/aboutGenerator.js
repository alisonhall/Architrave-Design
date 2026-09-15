import { generateDataFileText } from './plainDataSerializer';

/**
 * @description Generates the full text of static/about.js from the admin's about
 * draft — the single source of truth both the real about page and this editor read.
 *
 * @param {Object} aboutDraft - { intro, bio, approach }, each { heading, paragraphs }
 */
export const generateAboutData = (aboutDraft) => generateDataFileText('about', aboutDraft);
