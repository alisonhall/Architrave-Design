const INDENT = '  ';
const indent = (level) => INDENT.repeat(level);
const isValidIdentifier = (key) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);

// Picks whichever quote char needs fewer escapes, then escapes backslashes, that quote
// char, and literal newlines — needed since free-text fields (a review, an embed tile's
// pasted HTML) can contain either quote char or span multiple lines, and a plain string
// literal can do neither unescaped.
const quote = (value) => {
  const quoteChar = value.includes("'") ? '"' : "'";
  const escaped = value
    .replace(/\\/g, '\\\\')
    .replace(new RegExp(quoteChar, 'g'), `\\${quoteChar}`)
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
  return `${quoteChar}${escaped}${quoteChar}`;
};

/**
 * @description Serializes a plain JS value (string/number/boolean/array/object, nested
 * arbitrarily) to the JS source text for that literal — the shared core of every
 * static/*.js data-file generator (layouts, about, reviews). No JSX or class instances
 * involved anywhere in this data, so a plain literal is always sufficient.
 */
export const serializeValue = (value, level = 0) => {
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
 * @description Wraps a serialized value in the standard `const <name> = ...; export
 * default <name>;` shape every static/*.js data file uses.
 */
export const generateDataFileText = (varName, data) => `const ${varName} = ${serializeValue(data, 0)};\n\nexport default ${varName};\n`;
