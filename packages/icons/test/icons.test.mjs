import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { icons, names, icon, sprite } from '../dist/icons.js';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const config = JSON.parse(read('icons.config.json'));

test('every configured Lucide icon, and both brand marks, are built', () => {
  for (const n of config.lucide) assert.ok(icons[n], `${n} missing from the build`);
  assert.ok(icons.github && icons.linkedin);
  assert.equal(names.length, config.lucide.length + 2);
});

test('icon names are unique and kebab-case', () => {
  assert.equal(new Set(config.lucide).size, config.lucide.length, 'duplicate in icons.config.json');
  for (const n of names) assert.match(n, /^[a-z0-9]+(-[a-z0-9]+)*$/, n);
});

test('the file sprite has one symbol per icon, and the same ids as the module', () => {
  const file = read('dist/sprite.svg');
  const ids = [...file.matchAll(/<symbol id="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(ids.sort(), [...names].sort());
  const inline = [...sprite.matchAll(/<symbol id="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(inline.sort(), [...names].sort());
});

test('the sprite is safe and self-contained: no scripts, styles, event handlers or external references', () => {
  for (const [label, markup] of [['file', read('dist/sprite.svg')], ['inline', sprite.replace(/style="position:absolute"/, '')]]) {
    assert.doesNotMatch(markup, /<script|<style|\son\w+=|href=|xlink:href|<image|<foreignObject/i, `${label} sprite`);
  }
});

test('every icon draws something, with a valid viewBox, and keeps the stroke model (no hard-coded colours)', () => {
  for (const [n, i] of Object.entries(icons)) {
    assert.match(i.viewBox, /^0 0 \d+ \d+$/, n);
    assert.match(i.body, /<(path|circle|rect|line|polyline|polygon|ellipse)\b/, `${n} has no shapes`);
    assert.doesNotMatch(i.body, /#[0-9a-f]{3,8}|rgb\(/i, `${n} hard-codes a colour`);
  }
});

test('brand marks are solid and inherit the text colour', () => {
  for (const n of ['github', 'linkedin']) assert.match(icons[n].body, /fill="currentColor" stroke="none"/, n);
});

test('icon() is decorative by default and labelled on request', () => {
  const decorative = icon('check');
  assert.match(decorative, /aria-hidden="true"/);
  assert.doesNotMatch(decorative, /role=|aria-label/);
  const labelled = icon('github', { label: 'GitHub' });
  assert.match(labelled, /role="img" aria-label="GitHub"/);
  assert.doesNotMatch(labelled, /aria-hidden/);
});

test('icon() escapes the label and options, and styles itself without the stylesheet', () => {
  const html = icon('check', { label: '"><script>x</script>', size: '2rem', class: 'a"b' });
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /width="2rem" height="2rem"/);
  assert.match(html, /class="ds-icon a&quot;b"/);
  assert.match(icon('check'), /fill="none" stroke="currentColor" stroke-width="1.75"/);
});

test('icon() fails loudly for an unknown name', () => {
  assert.throws(() => icon('no-such-icon'), /Unknown icon "no-such-icon"/);
});

test('icons.d.ts lists exactly the built names', () => {
  const dts = read('dist/icons.d.ts');
  const union = dts.slice(dts.indexOf('export type IconName'), dts.indexOf(';', dts.indexOf('export type IconName')));
  assert.deepEqual([...union.matchAll(/'([^']+)'/g)].map((m) => m[1]).sort(), [...names].sort());
});

test('the Lucide licence travels with the package, and the size stays small', () => {
  assert.ok(existsSync(new URL('../LICENSE-LUCIDE', import.meta.url)));
  assert.match(read('LICENSE-LUCIDE'), /ISC License/);
  assert.ok(JSON.parse(read('package.json')).files.includes('LICENSE-LUCIDE'));
  assert.ok(statSync(new URL('../dist/sprite.svg', import.meta.url)).size < 30_000, 'sprite grew past 30 KB: curate the set');
});
