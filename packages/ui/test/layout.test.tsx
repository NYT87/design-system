import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { SiteFooter, SiteHeader, SkipLink, ThemeScope } from '../src';

const nav = [
  { label: 'About', href: '/about', current: true },
  { label: 'GitHub', href: 'https://github.com/NYT87', external: true },
  { label: '한국어', href: '/ko/', lang: 'ko', hrefLang: 'ko' },
];

describe('SiteHeader', () => {
  it('names the brand link, marks the current page and flags external links', () => {
    render(<SiteHeader brand={{ name: 'magomap', href: '/', mark: <svg /> }} nav={nav} />);
    const primary = screen.getByRole('navigation', { name: 'Primary' });
    expect(within(primary).getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
    const gh = within(primary).getByRole('link', { name: 'GitHub' });
    expect(gh).toHaveAttribute('target', '_blank');
    expect(gh).toHaveAttribute('rel', 'noopener noreferrer');
    expect(within(primary).getByRole('link', { name: '한국어' })).toHaveAttribute('lang', 'ko');
  });

  it('menu button toggles the panel, closes on Escape and gives focus back', () => {
    render(<SiteHeader brand={{ name: 'x' }} nav={nav} />);
    const btn = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    const panel = document.getElementById(btn.getAttribute('aria-controls')!)!;
    expect(panel).toHaveAttribute('hidden');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    expect(btn).toHaveAccessibleName('Close navigation menu');
    expect(panel).not.toHaveAttribute('hidden');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    expect(btn).toHaveFocus();
  });

  it('closes when a menu link is chosen and when clicking elsewhere', () => {
    render(<><SiteHeader brand={{ name: 'x' }} nav={nav} /><p>outside</p></>);
    const btn = screen.getByRole('button', { name: 'Open navigation menu' });
    fireEvent.click(btn);
    const panel = document.getElementById(btn.getAttribute('aria-controls')!)!;
    fireEvent.click(within(panel).getByRole('link', { name: 'About' }));
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(btn);
    fireEvent.pointerDown(screen.getByText('outside'));
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('has no menu button without navigation, and renders actions', () => {
    render(<SiteHeader brand={{ name: 'x' }} actions={<button>EN</button>} />);
    expect(screen.queryByRole('button', { name: /navigation menu/ })).toBeNull();
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
  });

  it('lets a router render the links', () => {
    const renderLink = vi.fn(({ href, children, ...p }) => <a data-router href={href} {...p}>{children}</a>);
    render(<SiteHeader brand={{ name: 'x' }} nav={nav} renderLink={renderLink} />);
    expect(renderLink).toHaveBeenCalled();
    // external links bypass the router
    expect(screen.getAllByRole('link', { name: 'GitHub' })[0]).not.toHaveAttribute('data-router');
    expect(screen.getAllByRole('link', { name: 'About' })[0]).toHaveAttribute('data-router');
  });
});

describe('SiteFooter', () => {
  it('renders titled columns as labelled navs, the year and the company credit', () => {
    render(
      <SiteFooter
        brand={{ name: 'OpenTrack Viewer' }}
        tagline="Files stay on your device."
        columns={[{ title: 'Project', links: [{ label: 'GitHub', href: 'https://github.com/NYT87/opentrack-viewer', external: true }] }]}
        year={2026}
        notes={['Not affiliated with Garmin.']}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Project' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Project' })).toBeInTheDocument();
    expect(screen.getByText(/© 2026 OpenTrack Viewer/)).toBeInTheDocument();
    const credit = screen.getByRole('link', { name: 'nyt87' });
    expect(credit).toHaveAttribute('href', 'https://nyt87.github.io/');
    expect(credit).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('Not affiliated with Garmin.')).toBeInTheDocument();
  });

  it('can hide the credit and use a single row of links', () => {
    render(<SiteFooter brand={{ name: 'Gori' }} credit={false} links={[{ label: 'Docs', href: '/docs' }]} linksLabel="Footer links" />);
    expect(screen.queryByRole('link', { name: 'nyt87' })).toBeNull();
    expect(within(screen.getByRole('navigation', { name: 'Footer links' })).getByRole('link', { name: 'Docs' })).toBeInTheDocument();
  });
});

describe('SkipLink', () => {
  it('points at the main content by default', () => {
    render(<SkipLink />);
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main');
  });
});

describe('ThemeScope', () => {
  it('scopes custom colours to its own class for light and dark', () => {
    const { container } = render(<ThemeScope light={{ accent: '#0a5ad4' }} dark={{ accent: '#5aa2ff', 'on-accent': '#08111c' }}>hi</ThemeScope>);
    const el = container.firstElementChild as HTMLElement;
    const cls = [...el.classList].find((c) => c.startsWith('ds-scope-'))!;
    const css = el.querySelector('style')!.textContent!;
    expect(css).toContain(`.${cls} {`);
    expect(css).toContain('--accent: #0a5ad4');
    expect(css).toContain(`:root[data-theme='dark'] .${cls}`);
  });

  it('warns when the colours fail contrast, and reports them to onContrastFailures', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ThemeScope light={{ accent: '#ffe000' }}>x</ThemeScope>);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('on-accent'));
    const cb = vi.fn();
    render(<ThemeScope light={{ accent: '#ffe000' }} onContrastFailures={cb}>x</ThemeScope>);
    expect(cb).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ fg: 'on-accent', bg: 'accent' })]));
    warn.mockRestore();
  });

  it('stays quiet for an accessible theme', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ThemeScope light={{ accent: '#0a5ad4' }} dark={{ accent: '#5aa2ff', 'on-accent': '#08111c' }}>x</ThemeScope>);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('rejects unknown token names', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    // @ts-expect-error deliberate typo
    expect(() => render(<ThemeScope light={{ accnet: '#000000' }}>x</ThemeScope>)).toThrow(/Unknown colour token/);
    err.mockRestore();
  });
});
