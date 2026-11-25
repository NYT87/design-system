import { useId, useMemo, useState } from 'react';
import { icon, names, type IconName } from '@nyt87/icons';
import { CodeBlock, Html } from './ui';

const SUGGESTED: Array<[string, Array<[string, IconName]>]> = [
  ['Dashboard navigation', [['Overview', 'layout-dashboard'], ['Connections', 'plug'], ['Tools', 'wrench'], ['Executions', 'rotate-ccw-clock'], ['API keys', 'key-round'], ['Credentials', 'lock-keyhole'], ['Settings', 'settings']]],
  ['Status', [['Success', 'circle-check'], ['Error', 'circle-exclamation-point'], ['Warning', 'triangle-exclamation-point'], ['Info', 'info'], ['Pending', 'clock'], ['Blocked', 'ban'], ['Loading', 'loader']]],
  ['Actions', [['Add', 'plus'], ['Copy', 'copy'], ['Copied', 'check'], ['Edit', 'pencil'], ['Delete', 'trash'], ['Refresh', 'refresh-cw'], ['Search', 'search'], ['Filter', 'funnel'], ['Reveal', 'eye'], ['Hide', 'eye-off']]],
  ['Navigation', [['Menu', 'menu'], ['Close', 'x'], ['Back', 'arrow-left'], ['Forward', 'arrow-right'], ['External link', 'external-link'], ['More', 'ellipsis'], ['Expand', 'chevron-down']]],
  ['Theme and language', [['Light', 'sun'], ['Dark', 'moon'], ['System', 'monitor'], ['Language', 'globe']]],
  ['Contact and brands', [['Email', 'mail'], ['GitHub', 'github'], ['LinkedIn', 'linkedin']]],
];

export function Icons() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<IconName>('settings');
  const searchId = useId();
  const shown = useMemo(() => names.filter((n) => n.includes(query.trim().toLowerCase())), [query]);

  return (
    <>
      <section className="block">
        <h2>The set</h2>
        <p className="muted">
          {names.length} icons in <code>@nyt87/icons</code>: a curated selection of <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer">Lucide</a> (stroke icons, ISC licence) plus two solid brand marks.
          Every product takes its icons from here, so they all look alike. Names are Lucide's own, so what you find on lucide.dev is what you use. Pick one below to get its code.
        </p>
        <div className="ds-field" style={{ maxWidth: '22rem', marginBottom: 'var(--space-4)' }}>
          <label className="ds-field__label" htmlFor={searchId}>Search icons</label>
          <input id={searchId} className="ds-control" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. key, arrow, chevron" />
          <p className="ds-field__hint" aria-live="polite">{shown.length} of {names.length} shown</p>
        </div>
        <div className="icon-grid" role="list">
          {shown.map((n) => (
            <button key={n} type="button" role="listitem" className="icon-tile" aria-pressed={n === selected} onClick={() => setSelected(n)} title={n}>
              <Html html={icon(n, { size: '1.5rem' })} />
              <span>{n}</span>
            </button>
          ))}
        </div>
        {shown.length === 0 ? <p className="muted">No icon matches "{query}". Missing one? See "Adding an icon" below.</p> : null}

        <div className="icon-detail" aria-live="polite">
          <h3 className="h3"><code>{selected}</code></h3>
          <CodeBlock language="html" code={`<svg class="ds-icon" aria-hidden="true"><use href="#${selected}"/></svg>`} />
          <CodeBlock language="js" code={`import { icon } from '@nyt87/icons';\n\nicon('${selected}');                          // decorative\nicon('${selected}', { label: 'Settings' });   // when the icon alone carries meaning`} />
        </div>
      </section>

      <section className="block">
        <h2>Using icons</h2>
        <p className="muted">Three ways, from smallest to most self-contained. All of them take the colour of the surrounding text.</p>
        <h3 className="h3">1. The sprite file (static pages)</h3>
        <p className="muted small">One cached file, 12 KB for the whole set, referenced by name. Copy it next to your pages, or let your bundler emit it.</p>
        <CodeBlock language="html" code={`<svg class="ds-icon" aria-hidden="true"><use href="/assets/sprite.svg#check"/></svg>`} />
        <CodeBlock language="js" code={`// Astro / Vite: import the file and get its URL\nimport sprite from '@nyt87/icons/sprite.svg?url';\n// <use href={\`\${sprite}#check\`} />`} />
        <h3 className="h3">2. The inline sprite (server-rendered pages, no extra request)</h3>
        <p className="muted small">Put the sprite once at the top of <code>&lt;body&gt;</code>, then reference icons by id.</p>
        <CodeBlock language="js" code={`import { sprite } from '@nyt87/icons';\n\nconst page = \`<body>\${sprite}  …  <svg class="ds-icon" aria-hidden="true"><use href="#check"/></svg>\`;`} />
        <h3 className="h3">3. The inline helper (templates, emails, anywhere a string is needed)</h3>
        <p className="muted small">Returns a self-contained <code>&lt;svg&gt;</code>: it does not need the stylesheet or the sprite.</p>
        <CodeBlock language="js" code={`import { icon } from '@nyt87/icons';\n\nicon('check');                                  // decorative, 1.25em\nicon('github', { label: 'GitHub', size: '24px' }); // labelled, fixed size`} />
        <p className="muted small">The sprite file and the helper both need <code>@nyt87/icons</code>; the <code>.ds-icon</code> classes come from <code>@nyt87/ui/styles.css</code>.</p>
      </section>

      <section className="block">
        <h2>Size and colour</h2>
        <div className="preview" style={{ borderRadius: 'var(--radius-lg)' }}>
          <Html className="row" html={`
            <svg class="ds-icon ds-icon--sm" aria-hidden="true"><use href="#circle-check"/></svg>
            <svg class="ds-icon" aria-hidden="true"><use href="#circle-check"/></svg>
            <svg class="ds-icon ds-icon--lg" aria-hidden="true"><use href="#circle-check"/></svg>
            <svg class="ds-icon ds-icon--xl" aria-hidden="true"><use href="#circle-check"/></svg>
            <span style="color: var(--ok)"><svg class="ds-icon ds-icon--lg" aria-hidden="true"><use href="#circle-check"/></svg></span>
            <span style="color: var(--danger)"><svg class="ds-icon ds-icon--lg" aria-hidden="true"><use href="#circle-exclamation-point"/></svg></span>
            <span style="color: var(--accent-ink)"><svg class="ds-icon ds-icon--lg" aria-hidden="true"><use href="#rocket"/></svg></span>
            <button class="ds-btn ds-btn--primary ds-btn--md" type="button"><svg class="ds-icon" aria-hidden="true"><use href="#plus"/></svg>Add</button>
            <button class="ds-btn ds-btn--secondary ds-btn--icon-only ds-btn--md" type="button" aria-label="Copy"><svg class="ds-icon" aria-hidden="true"><use href="#copy"/></svg></button>`} />
        </div>
        <ul>
          <li>Sizes: <code>ds-icon--sm</code> 16px, default 1.25em (it scales with the text), <code>ds-icon--lg</code> 24px, <code>ds-icon--xl</code> 32px.</li>
          <li>Colour is <code>currentColor</code>: set <code>color</code> on the icon or its parent, with a token (<code>--ok</code>, <code>--danger</code>, <code>--accent-ink</code>). Never a hex value.</li>
          <li>Inside a button the icon is slightly smaller than the text and sits on its centre line, with the button's gap.</li>
        </ul>
      </section>

      <section className="block">
        <h2>Accessibility</h2>
        <ul>
          <li><strong>Decorative icons</strong> next to a text label get <code>aria-hidden="true"</code>: the text already says it.</li>
          <li><strong>An icon alone</strong> (an icon-only button, a status mark) needs a name: <code>aria-label</code> on the button, or <code>role="img"</code> with <code>aria-label</code> on the icon.</li>
          <li><strong>Never rely on colour or shape alone</strong> for status: pair the icon with a word, as the Alert and Badge do.</li>
          <li>Icons carry no animation. The spinner is a separate component with a reduced-motion rule.</li>
        </ul>
      </section>

      <section className="block">
        <h2>Which icon for what</h2>
        <p className="muted">Use the same icon for the same idea in every product.</p>
        <div className="suggest">
          {SUGGESTED.map(([title, items]) => (
            <div key={title} className="suggest__group">
              <h3 className="h3">{title}</h3>
              <ul className="suggest__list">
                {items.map(([label, name]) => (
                  <li key={name}><Html className="suggest__icon" html={icon(name, { size: '1.25rem' })} /><span>{label}</span><code>{name}</code></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <h2>Adding an icon</h2>
        <p className="muted">The set is deliberately small, so every icon is one the products use. Need another?</p>
        <ol>
          <li>Find it on <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer">lucide.dev</a> and add its name to <code>packages/icons/icons.config.json</code>.</li>
          <li>Run <code>npm run build -w @nyt87/icons</code>. The build fails if the name does not exist in the pinned Lucide version.</li>
          <li>Add it to the table above if it names a concept, and open a PR with a <code>feat(icons):</code> commit. Release Please publishes the new version.</li>
        </ol>
        <p className="muted small">Brand marks (not in Lucide) live in <code>packages/icons/scripts/brands.mjs</code>. They stay the property of their owners: follow each brand's logo guidelines.</p>
      </section>

      <section className="block">
        <h2>Licences</h2>
        <p className="muted small">Lucide is © Lucide Icons and Contributors, ISC licence (the notice ships with the package as <code>LICENSE-LUCIDE</code>). The GitHub mark is from Octicons (MIT); the LinkedIn mark is from Simple Icons (CC0).</p>
      </section>
    </>
  );
}
