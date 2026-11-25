import test from 'node:test';
import assert from 'node:assert/strict';
import { color, accents } from '../src/tokens.mjs';
import { checkTheme, defineTheme, themeCss, contrast, COLOR_TOKENS } from '../src/theme.mjs';

// The base theme and every built-in preset must be accessible in both modes.
test('base theme meets WCAG', () => assert.deepEqual(checkTheme({}), []));
for (const [name, a] of Object.entries(accents)) {
  test(`preset "${name}" meets WCAG`, () => assert.deepEqual(checkTheme(a), []));
}

test('light and dark define exactly the same tokens', () => {
  assert.deepEqual(Object.keys(color.light).sort(), Object.keys(color.dark).sort());
});

test('checkTheme reports a failing pair with the numbers', () => {
  const f = checkTheme({ light: { accent: '#ffe000' } });
  assert.ok(f.some((x) => x.fg === 'on-accent' && x.bg === 'accent' && x.mode === 'light'));
  assert.ok(f[0].ratio < f[0].min);
});

test('contrast matches known values', () => {
  assert.equal(contrast('#000000', '#ffffff').toFixed(1), '21.0');
  assert.equal(contrast('#fff', '#fff').toFixed(1), '1.0');
  assert.equal(contrast('rgb(0 0 0)', '#fff'), null);
});

test('defineTheme rejects unknown token names', () => {
  assert.throws(() => defineTheme({ name: 'x', light: { accnet: '#000000' } }), /Unknown colour token "accnet"/);
});

test('defineTheme returns css scoped to the attribute, for light, OS dark and forced dark', () => {
  const { css, failures } = defineTheme({ name: 'acme', light: { accent: '#0a5ad4' }, dark: { accent: '#5aa2ff', 'on-accent': '#08111c' } });
  assert.deepEqual(failures, []);
  assert.match(css, /:root\[data-accent='acme'\] \{\n  --accent: #0a5ad4;/);
  assert.match(css, /@media \(prefers-color-scheme: dark\)[\s\S]*:root\[data-accent='acme'\]:not\(\[data-theme='light'\]\)/);
  assert.match(css, /:root\[data-accent='acme'\]\[data-theme='dark'\]/);
});

test('themeCss on a scope nests under :root for dark', () => {
  const css = themeCss('.t', { dark: { accent: '#fff' } }, { on: 'scope' });
  assert.match(css, /:root:not\(\[data-theme='light'\]\) \.t \{/);
  assert.match(css, /:root\[data-theme='dark'\] \.t \{/);
});

test('COLOR_TOKENS lists every colour token', () => assert.ok(COLOR_TOKENS.includes('accent') && COLOR_TOKENS.includes('link')));

test('theme.d.ts ColorToken union lists exactly the tokens', async () => {
  const { readFileSync } = await import('node:fs');
  const src = readFileSync(new URL('../src/theme.d.ts', import.meta.url), 'utf8');
  const union = src.slice(src.indexOf('export type ColorToken'), src.indexOf(';', src.indexOf('export type ColorToken')));
  const names = [...union.matchAll(/'([^']+)'/g)].map((m) => m[1]).sort();
  assert.deepEqual(names, [...COLOR_TOKENS].sort());
});

import { themes } from '../src/themes.mjs';
import { defineTheme as define } from '../src/theme.mjs';
import { test as t2 } from 'node:test';
import assert2 from 'node:assert/strict';
for (const theme of Object.values(themes)) {
  t2(`shared theme "${theme.name}" passes WCAG contrast and uses known tokens`, () => {
    assert2.deepEqual(define(theme).failures, []);
  });
}
