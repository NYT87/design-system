import { useEffect, useState } from 'react';
import '@nyt87/ui'; // registers the behaviours (menu, tabs, modal, copy, drop, theme scope)
import { components, groupOrder, type ComponentDoc } from './content';
import { Colors, GettingStarted, Spacing, Typography } from './Foundations';
import { Theming } from './Theming';
import { CodeBlock, Html } from './ui';

const raw = import.meta.glob<string>('./examples/*.html', { eager: true, query: '?raw', import: 'default' });

const foundations = [
  { id: 'colors', name: 'Colour', view: Colors, summary: 'Semantic colour tokens, each with a light and a dark value.' },
  { id: 'typography', name: 'Typography', view: Typography, summary: 'Type scale and font families.' },
  { id: 'spacing', name: 'Spacing, radius, motion', view: Spacing, summary: 'Layout scale, corner radii and timing.' },
  { id: 'theming', name: 'Theming', view: Theming, summary: 'Use your own brand colours: scoped to a section or for a whole product, checked for contrast.' },
];

const safe = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string | null) => { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch { /* storage blocked */ } },
};

type Theme = 'system' | 'light' | 'dark';

function useRoute() {
  const read = () => window.location.hash.replace(/^#\/?/, '') || 'start';
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => { setRoute(read()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

function ApiTable({ title, rows }: { title: string; rows: ComponentDoc['api'][string] }) {
  return (
    <div className="table-wrap" role="region" aria-label={`${title} classes and attributes`} tabIndex={0}>
      <table className="props">
        <caption>{title}</caption>
        <thead><tr><th scope="col">Class or attribute</th><th scope="col">Values</th><th scope="col">Default</th><th scope="col">Description</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <th scope="row"><code>{r.name}</code></th>
              <td>{r.values ? <code>{r.values}</code> : '—'}</td>
              <td>{r.default ? <code>{r.default}</code> : '—'}</td>
              <td>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComponentPage({ doc }: { doc: ComponentDoc }) {
  const html = raw[`./examples/${doc.example}.html`];
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">{doc.group}</p>
        <h1>{doc.name}</h1>
        <p className="lede">{doc.summary}</p>
        <p className="js-note">
          {doc.js
            ? <><span className="ds-badge ds-badge--warn"><span className="ds-badge__dot" aria-hidden="true" />Needs JavaScript</span> <code>{doc.js.import}</code> <span className="muted">({doc.js.size} gzipped)</span></>
            : <span className="ds-badge ds-badge--ok"><span className="ds-badge__dot" aria-hidden="true" />HTML and CSS only: no JavaScript</span>}
        </p>
      </header>

      <section className="block">
        <h2>Example</h2>
        <Html className="preview" html={html} />
        <details className="source">
          <summary>View HTML</summary>
          <CodeBlock language="html" code={html.trim()} />
        </details>
      </section>

      <section className="block two-col">
        <div>
          <h2>Do</h2>
          <ul className="do">{doc.use.map((u) => <li key={u}>{u}</li>)}</ul>
        </div>
        <div>
          <h2>Don't</h2>
          <ul className="dont">{doc.avoid.map((u) => <li key={u}>{u}</li>)}</ul>
        </div>
      </section>

      <section className="block">
        <h2>Accessibility</h2>
        <ul>{doc.a11y.map((u) => <li key={u}>{u}</li>)}</ul>
      </section>

      <section className="block">
        <h2>Classes and attributes</h2>
        {Object.entries(doc.api).map(([t, rows]) => <ApiTable key={t} title={t} rows={rows} />)}
      </section>
    </>
  );
}

function Home() {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">nyt87</p>
        <h1>Design System</h1>
        <p className="lede">Design tokens and framework-free components shared by every nyt87 product: plain HTML and CSS, with a few tiny scripts only where behaviour is needed. Pick a component on the left to see it live, with its HTML, usage rules, accessibility notes and API.</p>
        <div className="row">
          <a className="ds-btn ds-btn--primary ds-btn--md" href="#/button">Browse components</a>
          <a className="ds-btn ds-btn--secondary ds-btn--md" href="#/colors">Foundations</a>
        </div>
      </header>
      <GettingStarted />
    </>
  );
}

export function App() {
  const route = useRoute();
  const [theme, setTheme] = useState<Theme>(() => (safe.get('ds-theme') as Theme) || 'system');
  const [accent, setAccent] = useState<string>(() => safe.get('ds-accent') || 'company');
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    if (theme === 'system') delete el.dataset.theme; else el.dataset.theme = theme;
    if (accent === 'company') delete el.dataset.accent; else el.dataset.accent = accent;
    safe.set('ds-theme', theme === 'system' ? null : theme);
    safe.set('ds-accent', accent === 'company' ? null : accent);
  }, [theme, accent]);

  useEffect(() => setMenu(false), [route]);

  const comp = components.find((c) => c.id === route);
  const found = foundations.find((f) => f.id === route);
  const title = route === 'start' ? 'Getting started' : comp?.name ?? found?.name ?? 'Not found';
  useEffect(() => { document.title = `${title} · nyt87 Design System`; }, [title]);

  return (
    <div className="shell">
      <a className="skip" href="#main">Skip to content</a>
      <header className="topbar">
        <button type="button" className="ds-btn ds-btn--ghost ds-btn--sm menu-btn" aria-expanded={menu} aria-controls="nav" onClick={() => setMenu(!menu)}>Menu</button>
        <a className="brand" href="#/" aria-label="nyt87 design system home">
          <img className="brand__icon" src="./brand/logo-icon.png" alt="" width="28" height="28" />
          <img className="brand__text logo-light" src="./brand/logo-text.png" alt="" height="22" />
          <img className="brand__text logo-dark" src="./brand/logo-text-white.png" alt="" height="22" />
          <span className="muted">design system</span>
        </a>
        <div className="controls">
          <select className="ds-control ds-control--select" aria-label="Accent" value={accent} onChange={(e) => setAccent(e.target.value)}>
            <option value="company">nyt87 orange</option>
            <option value="green">Green accent</option>
            <option value="blue">Blue accent</option>
          </select>
          <div role="radiogroup" aria-label="Theme" className="ds-seg ds-seg--sm">
            {(['system', 'light', 'dark'] as Theme[]).map((t) => (
              <label key={t} className="ds-seg__item">
                <input type="radio" name="theme" value={t} checked={theme === t} onChange={() => setTheme(t)} />
                <span>{t === 'system' ? 'Auto' : t === 'light' ? 'Light' : 'Dark'}</span>
              </label>
            ))}
          </div>
          <a
            className="ds-btn ds-btn--ghost ds-btn--icon-only ds-btn--md gh-link"
            href="https://github.com/NYT87/design-system"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="nyt87 design system on GitHub (opens in a new tab)"
            title="View on GitHub"
          >
            <svg viewBox="0 0 16 16" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </header>

      <nav id="nav" className={`sidebar${menu ? ' is-open' : ''}`} aria-label="Documentation">
        <a href="#/" aria-current={route === 'start' ? 'page' : undefined}>Getting started</a>
        <h2>Foundations</h2>
        {foundations.map((f) => <a key={f.id} href={`#/${f.id}`} aria-current={route === f.id ? 'page' : undefined}>{f.name}</a>)}
        {groupOrder.map((g) => (
          <div key={g}>
            <h2>{g}</h2>
            {components.filter((c) => c.group === g).map((c) => <a key={c.id} href={`#/${c.id}`} aria-current={route === c.id ? 'page' : undefined}>{c.name}</a>)}
          </div>
        ))}
        <footer className="sidebar__foot">
          <span className="ds-badge"><span className="ds-badge__dot" aria-hidden="true" />v0.2.0</span>
          <p>&copy; {new Date().getFullYear()} nyt87</p>
          <p>Made with <span role="img" aria-label="love" className="heart">&#10084;</span> by{' '}
            <a href="https://nyt87.github.io/" target="_blank" rel="noopener noreferrer">nyt87</a></p>
        </footer>
      </nav>

      <div className="content">
        <main id="main" className="main" tabIndex={-1}>
          {route === 'start' ? <Home />
            : comp ? <ComponentPage doc={comp} />
            : found ? (<><header className="page-head"><p className="eyebrow">Foundations</p><h1>{found.name}</h1><p className="lede">{found.summary}</p></header><found.view /></>)
            : (<header className="page-head"><h1>Page not found</h1><p className="lede"><a href="#/">Back to the start</a></p></header>)}
        </main>
      </div>
    </div>
  );
}
