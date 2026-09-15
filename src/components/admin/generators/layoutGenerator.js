import { computeTileOrder, stripLayoutData } from '../layoutHelpers';

const INDENT = '  ';
const indent = (level) => INDENT.repeat(level);
const quote = (value) => (value.includes("'") ? `"${value}"` : `'${value}'`);
const isValidIdentifier = (key) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
const tilePropertyAccess = (tileKey) => (isValidIdentifier(tileKey) ? `.${tileKey}` : `['${tileKey}']`);

// Plain-value serializer for static/layouts/<slug>.js — the data-driven pages'
// canonical source (see layoutHelpers.js hydrateLayoutData/stripLayoutData). No JSX
// involved: placements are just `{ nodeType: 'tileRef', tileKey }` etc., resolved at
// render time by layoutTreeRenderer.jsx, so there's no dot-vs-bracket-notation concern
// here the way there was for generating real JSX text.
const serializeValue = (value, level) => {
  if (typeof value === 'string') return quote(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((item) => `${indent(level + 1)}${serializeValue(item, level + 1)}`).join(',\n');
    return `[\n${items}\n${indent(level)}]`;
  }

  const keys = Object.keys(value).filter((key) => value[key] !== undefined);
  if (keys.length === 0) return '{}';
  const entries = keys.map(
    (key) => `${indent(level + 1)}${isValidIdentifier(key) ? key : quote(key)}: ${serializeValue(value[key], level + 1)}`
  );
  return `{\n${entries.join(',\n')}\n${indent(level)}}`;
};

/**
 * @description Generates the full text of a page's static/layouts/<slug>.js data file
 * — the single source of truth both the real production page (via
 * listingPageLayout.jsx/detailPageLayout.jsx) and the admin tool read. Pure function of
 * its input; strips the draft's editor-only `id` fields first so the committed file
 * never carries them.
 *
 * @param {Object} layoutDraft - a hydrated layout draft (see layoutHelpers.js)
 */
export const generateLayoutData = (layoutDraft) => {
  const data = stripLayoutData(layoutDraft);
  return `const layout = ${serializeValue(data, 0)};\n\nexport default layout;\n`;
};

// Every tile needs a number (it's what image1..image5 fade-in CSS keys off — see
// item.scss). A tile keeps its explicit `num` if it was given one (that's how the live
// site's numbers are preserved when transcribed); anything without one is assigned the
// next free number in the order it's first placed, checking defaultLayout first and
// falling back to wideLayout for tiles that only appear there.
const tileNumbers = (tiles, defaultLayoutRows, wideLayoutRows) => {
  const order = [
    ...computeTileOrder(defaultLayoutRows, tiles),
    ...computeTileOrder(wideLayoutRows, tiles)
  ];
  const numbers = {};
  const used = new Set(Object.values(tiles).map((tile) => tile.num).filter((num) => num !== undefined));
  let nextAuto = 1;
  const nextFreeNumber = () => {
    while (used.has(nextAuto)) nextAuto += 1;
    used.add(nextAuto);
    return nextAuto;
  };

  order.forEach((tileKey) => {
    if (numbers[tileKey] !== undefined) return;
    numbers[tileKey] = tiles[tileKey].num ?? nextFreeNumber();
  });
  return numbers;
};

const generateTileExpression = (tileKey, tile, num, level) => {
  if (tile.kind === 'project') {
    const args = [`projects.${tile.projectKey}`, String(num)];
    if (tile.backgroundPosition) args.push(`{ backgroundPosition: ${quote(tile.backgroundPosition)} }`);
    return `buildProjectTile(${args.join(', ')})`;
  }

  if (tile.kind === 'filler') {
    const projectLine = tile.projectKey ? `\n${indent(level + 2)}project={projects.${tile.projectKey}}` : '';
    return `(
${indent(level + 1)}<Item
${indent(level + 2)}num={${num}}${projectLine}
${indent(level + 2)}isFiller
${indent(level + 2)}image={{
${indent(level + 3)}imageUrl: ${quote(tile.imageUrl)}
${indent(level + 2)}}}
${indent(level + 1)}/>
${indent(level)})`;
  }

  if (tile.kind === 'image') {
    const backgroundPositionLine = tile.backgroundPosition
      ? `,\n${indent(level + 3)}backgroundPosition: ${quote(tile.backgroundPosition)}`
      : '';
    const textLines = tile.overlayText
      ? `\n${indent(level + 2)}text={{\n${indent(level + 3)}copy: ${quote(tile.overlayText)}\n${indent(level + 2)}}}`
      : '';
    return `(
${indent(level + 1)}<Item
${indent(level + 2)}num={${num}}
${indent(level + 2)}image={{
${indent(level + 3)}imageUrl: ${quote(tile.imageUrl)}${backgroundPositionLine}
${indent(level + 2)}}}${textLines}
${indent(level + 1)}/>
${indent(level)})`;
  }

  if (tile.kind === 'description') {
    // A detail page's description tile is always the single project this page is
    // bound to — see generateDetailPage, which binds `const project = ...`.
    return `(
${indent(level + 1)}<Item
${indent(level + 2)}text={{
${indent(level + 3)}title: project.projectName,
${indent(level + 3)}copy: project.projectDescription
${indent(level + 2)}}}
${indent(level + 1)}/>
${indent(level)})`;
  }

  // text (a listing page's shared-introduction/free-text blurb)
  const copyExpression = tile.useIntroText ? 'defaultIntroductionText' : quote(tile.text || '');
  return `(
${indent(level + 1)}<Item
${indent(level + 2)}text={{
${indent(level + 3)}copy: ${copyExpression}
${indent(level + 2)}}}
${indent(level + 1)}/>
${indent(level)})`;
};

const generateTilesObject = (tiles, defaultLayoutRows, wideLayoutRows) => {
  const numbers = tileNumbers(tiles, defaultLayoutRows, wideLayoutRows);
  const entries = Object.keys(tiles).map(
    (key) => `${indent(1)}${key}: ${generateTileExpression(key, tiles[key], numbers[key], 1)}`
  );
  return `const tiles = {\n${entries.join(',\n')}\n};`;
};

const generatePlacement = (placement, level) => {
  if (placement.nodeType === 'tileRef') return `${indent(level)}{tiles${tilePropertyAccess(placement.tileKey)}}`;
  if (placement.nodeType === 'empty') return `${indent(level)}<Item />`;
  return generateRow(placement.row, level);
};

const generateColumn = (column, level) => {
  const widthAttr = column.width ? ` width=${quote(column.width)}` : '';
  const body = column.children.map((child) => generatePlacement(child, level + 1)).join('\n');
  return `${indent(level)}<Column${widthAttr}>\n${body}\n${indent(level)}</Column>`;
};

const generateRow = (row, level) => {
  const attrs = [];
  if (row.height !== undefined && row.height !== '') attrs.push(` height={${row.height}}`);
  if (row.imageHeight !== undefined && row.imageHeight !== '') attrs.push(` imageHeight={${row.imageHeight}}`);
  const body = row.columns.map((column) => generateColumn(column, level + 1)).join('\n');
  return `${indent(level)}<Row${attrs.join('')}>\n${body}\n${indent(level)}</Row>`;
};

const generateSection = (className, rows, level) => {
  const body = rows.map((row) => generateRow(row, level + 1)).join('\n');
  return `${indent(level)}<section className=${quote(className)}>\n${body}\n${indent(level)}</section>`;
};

const generateListingPage = (pageConfig, layoutDraft) => {
  const { tiles, defaultLayout, wideLayout } = layoutDraft;
  const { componentName, mainClasses, defaultSectionClassName, wideSectionClassName, componentsPath, staticPath } =
    pageConfig;

  return `import React from 'react';

import constants from '${staticPath}/app-constants';
import { buildProjectTile } from '${staticPath}/helpers';

import Layout from '${componentsPath}/layout';
import Seo from '${componentsPath}/seo';
import Row from '${componentsPath}/rowHOC';
import Column from '${componentsPath}/columnHOC';
import Item from '${componentsPath}/item';

const { projects, defaultIntroductionText } = constants;

${generateTilesObject(tiles, defaultLayout, wideLayout)}

const ${componentName} = (props) => (
${indent(1)}<Layout urlPath={props.location.pathname} mainClasses=${quote(mainClasses)}>
${indent(2)}<Seo />
${generateSection(defaultSectionClassName, defaultLayout, 2)}
${generateSection(wideSectionClassName, wideLayout, 2)}
${indent(1)}</Layout>
)

export default ${componentName}
`;
};

// A detail page's section, ending in a PrevNextProjectLinks bound to its one project —
// unlike a listing page's section, this is repeated inside each section on a
// dual-layout detail page (see generateDetailPage), not placed once outside them.
const generateDetailSection = (className, rows, level) => {
  const body = rows.map((row) => generateRow(row, level + 1)).join('\n');
  return `${indent(level)}<section className=${quote(className)}>
${body}
${indent(level + 1)}<PrevNextProjectLinks project={project} />
${indent(level)}</section>`;
};

const generateDetailPage = (pageConfig, layoutDraft) => {
  const { tiles } = layoutDraft;
  const { componentName, mainClasses, projectKey, componentsPath, staticPath } = pageConfig;
  // Most detail pages have a single flat layout tree; some (e.g. ones transcribed from
  // pages with a lot of content) also have a separate wide-screen tree, exactly like a
  // listing page's defaultLayout/wideLayout split — pageConfig.defaultSectionClassName
  // being set is what distinguishes the two shapes.
  const isDual = Boolean(pageConfig.defaultSectionClassName);

  const sectionsText = isDual
    ? [
        generateDetailSection(pageConfig.defaultSectionClassName, layoutDraft.defaultLayout, 2),
        generateDetailSection(pageConfig.wideSectionClassName, layoutDraft.wideLayout, 2)
      ].join('\n')
    : generateDetailSection(pageConfig.sectionClassName, layoutDraft.layout, 2);

  const primaryRows = isDual ? layoutDraft.defaultLayout : layoutDraft.layout;
  const secondaryRows = isDual ? layoutDraft.wideLayout : [];

  return `import React from 'react';

import constants from '${staticPath}/app-constants';

import Layout from '${componentsPath}/layout';
import Seo from '${componentsPath}/seo';
import Row from '${componentsPath}/rowHOC';
import Column from '${componentsPath}/columnHOC';
import Item from '${componentsPath}/item';
import PrevNextProjectLinks from '${componentsPath}/prevNextProjectLinks';

const project = constants.projects.${projectKey};

${generateTilesObject(tiles, primaryRows, secondaryRows)}

const ${componentName} = (props) => (
${indent(1)}<Layout urlPath={props.location.pathname} mainClasses=${quote(mainClasses)}>
${indent(2)}<Seo />
${sectionsText}
${indent(1)}</Layout>
)

export default ${componentName};
`;
};

/**
 * @description Generates the full text of a portfolio page from its admin layout
 * draft — either a listing page (index.jsx, new-homes.jsx, etc., with `defaultLayout`/
 * `wideLayout` trees sharing a `tiles` library) or a single project's detail page
 * (`pageConfig.type === 'detail'`, one flat `layout` tree bound to one project, ending
 * in PrevNextProjectLinks). Pure function of its inputs — the live preview renders the
 * same data with the real Row/Column/Item components, so what you see there is what
 * this produces.
 *
 * @param {Object} pageConfig
 * @param {Object} layoutDraft
 */
export const generateLayoutPage = (pageConfig, layoutDraft) => {
  if (pageConfig.type === 'detail') return generateDetailPage(pageConfig, layoutDraft);
  return generateListingPage(pageConfig, layoutDraft);
};
