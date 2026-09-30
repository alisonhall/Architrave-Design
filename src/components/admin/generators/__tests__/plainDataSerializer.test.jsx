import { serializeValue, generateDataFileText } from '../plainDataSerializer';

const evalSerialized = (text) => {
  // eslint-disable-next-line no-new-func
  return new Function(`return (${text});`)();
};

describe('serializeValue', () => {
  it('serializes strings, numbers, and booleans', () => {
    expect(evalSerialized(serializeValue('hello'))).toBe('hello');
    expect(evalSerialized(serializeValue(42))).toBe(42);
    expect(evalSerialized(serializeValue(true))).toBe(true);
    expect(evalSerialized(serializeValue(false))).toBe(false);
  });

  it('serializes an empty array and empty object as literals', () => {
    expect(serializeValue([])).toBe('[]');
    expect(serializeValue({})).toBe('{}');
  });

  it('serializes a nested array of objects', () => {
    const value = [{ a: 1 }, { a: 2 }];
    expect(evalSerialized(serializeValue(value))).toEqual(value);
  });

  it('omits keys whose value is undefined rather than emitting them', () => {
    const text = serializeValue({ a: 1, b: undefined, c: 3 });
    expect(text).not.toContain('b');
    expect(evalSerialized(text)).toEqual({ a: 1, c: 3 });
  });

  it('quotes a key that is not a valid JS identifier', () => {
    const text = serializeValue({ 1: 'a', 'has space': 'b' });
    expect(text).toContain("'1':");
    expect(text).toContain("'has space':");
    expect(evalSerialized(text)).toEqual({ 1: 'a', 'has space': 'b' });
  });

  it('does not quote a key that is a valid JS identifier', () => {
    const text = serializeValue({ validKey: 'a' });
    expect(text).toContain('validKey:');
    expect(text).not.toContain("'validKey'");
  });

  it('prefers single quotes, switching to double quotes when the value contains a single quote', () => {
    expect(serializeValue('plain')).toBe("'plain'");
    expect(serializeValue("it's")).toBe('"it\'s"');
  });

  it('escapes a value containing both quote characters', () => {
    const value = `she said "it's fine"`;
    expect(evalSerialized(serializeValue(value))).toBe(value);
  });

  it('escapes embedded newlines and carriage returns so the literal stays one line', () => {
    const value = 'line one\nline two\r\nline three';
    const text = serializeValue(value);
    expect(text).not.toContain('\n');
    expect(evalSerialized(text)).toBe(value);
  });

  it('escapes backslashes', () => {
    const value = 'a\\b';
    expect(evalSerialized(serializeValue(value))).toBe(value);
  });

  it('round-trips deeply nested arrays/objects/strings together', () => {
    const value = {
      title: "A \"quoted\" title with a\nnewline",
      tags: ['a', 'b', { nested: true }],
      meta: { count: 3, active: false }
    };
    expect(evalSerialized(serializeValue(value))).toEqual(value);
  });
});

describe('generateDataFileText', () => {
  it('wraps the serialized value in the standard const/export default shape', () => {
    const text = generateDataFileText('thing', { a: 1 });
    expect(text).toBe('const thing = {\n  a: 1\n};\n\nexport default thing;\n');
  });

  it('produces text that evaluates back to the original data under any variable name', () => {
    const data = { a: [1, 2, 3], b: 'text' };
    const text = generateDataFileText('myVar', data);
    const module = { exports: {} };
    // eslint-disable-next-line no-new-func
    const run = new Function('module', 'exports', text.replace('export default myVar;', 'module.exports = myVar;'));
    run(module, module.exports);
    expect(module.exports).toEqual(data);
  });
});
