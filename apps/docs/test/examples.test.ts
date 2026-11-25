import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { components } from '../src/content';
import { names as iconNames } from '@nyt87/icons';

// Structural accessibility checks on every example. They catch the mistakes plain HTML makes easy:
// a broken id reference, an unnamed control, a missing alt. (Contrast is tested in @nyt87/tokens.)
const dir = join(process.cwd(), 'src/examples'); // vitest runs with apps/docs as the working directory
const files = readdirSync(dir).filter((f) => f.endsWith('.html'));

function parse(name: string) {
  const root = document.createElement('div');
  root.innerHTML = readFileSync(join(dir, name), 'utf8');
  return root;
}
const name = (el: Element) => (el.getAttribute('aria-label') ?? el.getAttribute('title') ?? el.textContent ?? '').trim();

describe('docs content', () => {
  it('has an example file for every component, and no unused ones', () => {
    expect(files.sort()).toEqual(components.map((c) => `${c.example}.html`).sort());
  });
});

describe.each(files)('example %s', (file) => {
  const root = parse(file);

  it('has unique ids', () => {
    const ids = [...root.querySelectorAll('[id]')].map((e) => e.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });

  it('resolves every id reference', () => {
    const ids = new Set([...root.querySelectorAll('[id]')].map((e) => e.id));
    const missing: string[] = [];
    for (const attr of ['aria-controls', 'aria-labelledby', 'aria-describedby']) {
      root.querySelectorAll(`[${attr}]`).forEach((e) => e.getAttribute(attr)!.split(/\s+/).forEach((id) => { if (!ids.has(id)) missing.push(`${attr}=${id}`); }));
    }
    root.querySelectorAll('label[for]').forEach((l) => { if (!ids.has(l.getAttribute('for')!)) missing.push(`for=${l.getAttribute('for')}`); });
    root.querySelectorAll<HTMLElement>('[data-ds-modal-open]').forEach((b) => { if (!ids.has(b.dataset.dsModalOpen!)) missing.push(`modal=${b.dataset.dsModalOpen}`); });
    expect(missing).toEqual([]);
  });

  it('names every button and link', () => {
    const unnamed = [...root.querySelectorAll('button, a[href]')].filter((e) => !name(e) && !e.querySelector('img[alt]:not([alt=""])')).map((e) => e.outerHTML.slice(0, 80));
    expect(unnamed).toEqual([]);
  });

  it('labels every form control', () => {
    const bad = [...root.querySelectorAll('input:not([type=hidden]):not([hidden]), select, textarea')].filter((c) => {
      if (c.getAttribute('aria-label') || c.closest('label')) return false;
      return !(c.id && [...root.querySelectorAll('label[for]')].some((l) => l.getAttribute('for') === c.id));
    }).map((e) => e.outerHTML.slice(0, 80));
    expect(bad).toEqual([]);
  });

  it('gives images alt text and hides decorative svg', () => {
    expect([...root.querySelectorAll('img:not([alt])')].length).toBe(0);
    expect([...root.querySelectorAll('svg')].filter((v) => !v.closest('[aria-hidden="true"]') && !v.getAttribute('role')).length).toBe(0);
  });

  it('only references icons that exist in @nyt87/icons', () => {
    const used = [...root.querySelectorAll('use')].map((u) => (u.getAttribute('href') ?? '').split('#')[1]);
    expect(used.filter((n) => !iconNames.includes(n as never))).toEqual([]);
  });

  it('uses type="button" on buttons outside a form', () => {
    expect([...root.querySelectorAll('button:not([type])')].length).toBe(0);
  });
});
