import tokens from '@nyt87/tokens/tokens.json';
import { CodeBlock } from './ui';

type Theme = Record<string, string>;
const light = tokens.color.light as Theme;
const dark = tokens.color.dark as Theme;
const base = tokens.base as Theme;

const groups: Array<{ title: string; note: string; names: string[] }> = [
  { title: 'Surfaces', note: 'Page, raised (cards, popovers) and sunken (wells, hover rows).', names: ['bg', 'bg-raised', 'bg-sunken'] },
  { title: 'Text and edges', note: 'fg for text, fg-muted for secondary. border is decorative; border-strong is for anything whose edge must be seen.', names: ['fg', 'fg-muted', 'border', 'border-strong', 'ring'] },
  { title: 'Accent', note: 'One per product. accent fills primary actions; accent-ink is accent used as text and markers; link is the text-link colour (Console Teal).', names: ['accent', 'on-accent', 'accent-ink', 'link'] },
  { title: 'Status', note: 'Meaning only, never decoration.', names: ['ok', 'warn', 'danger', 'on-status'] },
  { title: 'Chart series', note: 'Five hues, each 3:1 against bg-raised, kept apart from status colours.', names: ['series-1', 'series-2', 'series-3', 'series-4', 'series-5'] },
];

export function Colors() {
  return (
    <>
      {groups.map((g) => (
        <section key={g.title} className="block">
          <h2>{g.title}</h2>
          <p className="muted">{g.note}</p>
          <div className="swatches">
            {g.names.map((n) => (
              <div key={n} className="swatch">
                <span className="swatch__chip" style={{ background: `var(--${n})` }} />
                <code>--{n}</code>
                <span className="muted small">{light[n]}</span>
                <span className="muted small">{dark[n]}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
      <p className="muted small">Each swatch shows the live colour, then the light and dark value. Use the theme and accent controls in the top bar to see it change.</p>
    </>
  );
}

export function Typography() {
  const sizes = Object.keys(base).filter((k) => k.startsWith('text-'));
  return (
    <>
      <section className="block">
        <h2>Type scale</h2>
        {sizes.reverse().map((s) => (
          <div key={s} className="type-row">
            <code>--{s}</code>
            <span className="muted small">{base[s]}</span>
            <span style={{ fontSize: `var(--${s})`, fontWeight: 600 }}>The quick brown fox</span>
          </div>
        ))}
      </section>
      <section className="block">
        <h2>Families</h2>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'var(--text-2xl)', letterSpacing: 'var(--tracking-heading)' }}><code>--font-heading</code> Space Grotesk 500: headings, buttons, navigation.</p>
        <p style={{ fontFamily: 'var(--font-sans)' }}><code>--font-sans</code> Manrope for body text. Self-hosted, no third-party font requests.</p>
        <p style={{ fontFamily: 'var(--font-mono)' }}><code>--font-mono</code> JetBrains Mono for identifiers, commands, JSON: <code>naver.search_news</code>. Never translated.</p>
      </section>
    </>
  );
}

export function Spacing() {
  const spaces = Object.keys(base).filter((k) => k.startsWith('space-'));
  const radii = Object.keys(base).filter((k) => k.startsWith('radius-'));
  return (
    <>
      <section className="block">
        <h2>Spacing</h2>
        <p className="muted">A 4px-based scale. Use these for padding, margins and gaps.</p>
        {spaces.map((s) => (
          <div key={s} className="type-row">
            <code>--{s}</code>
            <span className="muted small">{base[s]}</span>
            <span className="space-bar" style={{ width: `var(--${s})` }} />
          </div>
        ))}
      </section>
      <section className="block">
        <h2>Radius</h2>
        <div className="row">
          {radii.map((r) => (
            <div key={r} className="radius-demo">
              <span className="radius-demo__box" style={{ borderRadius: `var(--${r})` }} />
              <code>--{r}</code>
              <span className="muted small">{base[r]}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="block">
        <h2>Motion</h2>
        <p className="muted">
          <code>--duration-fast</code> {base['duration-fast']} for hover and press, <code>--duration-base</code> {base['duration-base']} for entering and leaving, <code>--ease</code> for both.
          Respect <code>prefers-reduced-motion</code>.
        </p>
      </section>
    </>
  );
}

export function GettingStarted() {
  return (
    <>
      <section className="block">
        <h2>1. Install</h2>
        <p className="muted">The packages live in GitHub Packages, which needs a token to install. Add this <code>.npmrc</code> to your project:</p>
        <CodeBlock language="ini" code={'@nyt87:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}'} />
        <p className="muted">Set <code>NODE_AUTH_TOKEN</code> to a GitHub token with <code>read:packages</code> (locally: <code>gh auth refresh -s read:packages</code>, then <code>export NODE_AUTH_TOKEN=$(gh auth token)</code>; in Actions: <code>secrets.GITHUB_TOKEN</code>). Then:</p>
        <CodeBlock language="bash" code={'npm i @nyt87/tokens @nyt87/ui'} />
      </section>
      <section className="block">
        <h2>2. Load the styles once</h2>
        <p className="muted">Plain CSS: it works in any framework, or none.</p>
        <CodeBlock language="js" code={`import '@nyt87/tokens/tokens.css';\nimport '@nyt87/ui/styles.css';`} />
        <p className="muted">Or in HTML: <code>&lt;link rel="stylesheet" href="…/tokens.css"&gt;</code> and the same for <code>styles.css</code>.</p>
      </section>
      <section className="block">
        <h2>3. Write HTML</h2>
        <CodeBlock language="html" code={`<section class="ds-card">\n  <header class="ds-card__head"><h3 class="ds-card__title">Hello</h3></header>\n  <div class="ds-card__body">\n    <button class="ds-btn ds-btn--primary ds-btn--md" type="button">Save</button>\n  </div>\n</section>`} />
        <p className="muted">Copy the HTML from any component page. Most components need nothing else.</p>
      </section>
      <section className="block">
        <h2>4. Add JavaScript only where a component needs it</h2>
        <p className="muted">Each component page says whether it needs a script. Import only those, so a page ships only what it uses. Each module is a few hundred bytes, works by event delegation, and needs no framework, so it also works with markup rendered by React, Vue, Svelte or Astro.</p>
        <CodeBlock language="js" code={`import '@nyt87/ui/menu';   // header menu        0.45 KB gzipped\nimport '@nyt87/ui/tabs';   // tabs               0.5 KB\nimport '@nyt87/ui/modal';  // modal dialog       0.26 KB\nimport '@nyt87/ui/copy';   // code copy button   0.33 KB\nimport '@nyt87/ui/drop';   // file drop zone     0.44 KB\nimport '@nyt87/ui/theme-scope'; // <ds-theme-scope>  0.6 KB + 1.5 KB contrast checker\n// or everything at once: import '@nyt87/ui';   (about 3.3 KB gzipped, with the contrast checker)`} />
      </section>
      <section className="block">
        <h2>5. Icons (optional)</h2>
        <p className="muted">Every product takes its icons from one set, <code>@nyt87/icons</code> (Lucide). Install it, then use the sprite or the inline helper. See the <a href="#/icons">Icons page</a> for the gallery and the rules.</p>
        <CodeBlock language="html" code={`<button class="ds-btn ds-btn--primary ds-btn--md" type="button">\n  <svg class="ds-icon" aria-hidden="true"><use href="/assets/sprite.svg#plus"/></svg>Add\n</button>`} />
      </section>
      <section className="block">
        <h2>Theme and accent</h2>
        <p className="muted">Dark mode follows the OS. Force it with <code>data-theme</code> on the root element; pick a product accent with <code>data-accent</code>.</p>
        <CodeBlock language="html" code={`<html data-theme="dark" data-accent="blue">`} />
      </section>
      <section className="block">
        <h2>Principles</h2>
        <ol>
          <li><strong>Tool, not brochure.</strong> Show real data and states. Precision beats decoration.</li>
          <li><strong>One accent per product.</strong> Status colours are for status only.</li>
          <li><strong>Both themes are first-class.</strong> Every colour has a light and dark value.</li>
          <li><strong>Accessible by construction.</strong> Contrast for every text pair is tested; keyboard and screen-reader behaviour is built in, not optional.</li>
          <li><strong>As little JavaScript as possible.</strong> Native elements first; a script only where the platform has no answer.</li>
          <li><strong>Identifiers are monospace and never translated.</strong></li>
        </ol>
      </section>
    </>
  );
}
