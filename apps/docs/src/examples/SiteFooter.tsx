import { SiteFooter } from '@nyt87/ui';

export default function Example() {
  return (
    <div className="stack">
      {/* App footer: tagline + link columns */}
      <SiteFooter
        brand={{ name: 'OpenTrack Viewer' }}
        tagline="Open GPX, FIT and TCX files in your browser. Parsing happens on your device: your file is never uploaded."
        columns={[
          { title: 'App', links: [{ label: 'Home', href: '#home' }, { label: 'Open an activity', href: '#viewer' }, { label: 'Terms and Conditions', href: '#terms' }] },
          { title: 'Project', links: [{ label: 'GitHub', href: 'https://github.com/NYT87/opentrack-viewer', external: true }, { label: 'Report an issue', href: 'https://github.com/NYT87/opentrack-viewer/issues', external: true }] },
        ]}
      />

      {/* Product footer: disclaimer lines */}
      <SiteFooter
        brand={{ name: 'magomap' }}
        notes={[
          "magomap is an independent personal project. It isn't affiliated with Kakao.",
          <a key="gh" href="https://github.com/NYT87/magomap">The code is on GitHub.</a>,
        ]}
      />

      {/* Developer-tool footer: one row of links, custom copyright */}
      <SiteFooter
        brand={{ name: 'Gori' }}
        copyright="Gori 고리"
        links={[{ label: 'Docs', href: '#docs' }, { label: 'Pricing', href: '#pricing' }, { label: 'GitHub', href: 'https://github.com/NYT87/gori', external: true }, { label: 'AGPL-3.0-only', href: '#license' }]}
      />
    </div>
  );
}
