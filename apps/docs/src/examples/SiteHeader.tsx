import { Button, SiteHeader } from '@nyt87/ui';

const Mark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
);

export default function Example() {
  return (
    <div className="stack">
      {/* Studio site: image logo, section links, call to action */}
      <SiteHeader
        brand={{
          label: 'nyt87 home',
          name: <><img className="logo-light" src="./brand/logo-text.png" alt="" /><img className="logo-dark" src="./brand/logo-text-white.png" alt="" /></>,
          mark: <img src="./brand/logo-icon.png" alt="" />,
        }}
        nav={[
          { label: 'Services', href: '#services' },
          { label: 'Work', href: '#work', current: true },
          { label: 'Approach', href: '#approach' },
          { label: 'Team', href: '#team' },
        ]}
        actions={<Button variant="secondary" size="sm">Contact</Button>}
      />

      {/* Product site: wordmark, language link, primary action */}
      <SiteHeader
        brand={{ name: 'magomap', mark: <Mark /> }}
        nav={[
          { label: 'About', href: '#about', current: true },
          { label: 'Get started', href: '#start' },
          { label: 'Privacy', href: '#privacy' },
          { label: '한국어', href: '#ko', lang: 'ko', hrefLang: 'ko' },
        ]}
        actions={<Button size="sm">Open magomap</Button>}
      />

      {/* Brand only */}
      <SiteHeader brand={{ name: 'OpenTrack Viewer', mark: <Mark /> }} />
    </div>
  );
}
