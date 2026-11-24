import type { ReactNode } from 'react';
import { cx } from '../cx';
import { NavAnchor, type NavLink, type RenderLink } from './Link';
import type { SiteBrand } from './SiteHeader';

export interface FooterColumn { title: string; links: NavLink[] }

export interface SiteFooterProps {
  brand: SiteBrand;
  /** One or two sentences on what the product is. */
  tagline?: ReactNode;
  /** Titled link groups (App, Project, Legal...). */
  columns?: FooterColumn[];
  /** A single row of links, for simple footers. */
  links?: NavLink[];
  linksLabel?: string;
  /** Extra lines under everything: disclaimers, affiliation, licence. */
  notes?: ReactNode[];
  /** "(c) year name": defaults to the brand name when it is a string. */
  copyright?: ReactNode;
  year?: number;
  /** "Made with love by nyt87". Pass false to hide. */
  credit?: boolean | { name: string; href: string };
  renderLink?: RenderLink;
  className?: string;
}

const COMPANY = { name: 'nyt87', href: 'https://nyt87.github.io/' };

export function SiteFooter({
  brand, tagline, columns = [], links = [], linksLabel = 'Footer', notes = [], copyright, year, credit = true, renderLink, className,
}: SiteFooterProps) {
  const y = year ?? new Date().getFullYear();
  const company = typeof credit === 'object' ? credit : COMPANY;
  const owner = copyright ?? (typeof brand.name === 'string' ? brand.name : null);
  return (
    <footer className={cx('ds-footer', className)}>
      <div className="ds-container">
        <div className="ds-footer__top">
          <div className="ds-footer__brand">
            <a className="ds-brand" href={brand.href ?? '/'} aria-label={brand.label}>
              {brand.mark ? <span className="ds-brand__mark" aria-hidden="true">{brand.mark}</span> : null}
              <span className="ds-brand__name">{brand.name}</span>
            </a>
            {tagline ? <p className="ds-footer__tagline">{tagline}</p> : null}
          </div>

          {columns.map((c) => (
            <nav key={c.title} className="ds-footer__col" aria-label={c.title}>
              <h2 className="ds-footer__heading">{c.title}</h2>
              <ul>
                {c.links.map((l, i) => <li key={i}><NavAnchor link={l} className="ds-footer__link" renderLink={renderLink} /></li>)}
              </ul>
            </nav>
          ))}

          {links.length ? (
            <nav className="ds-footer__row" aria-label={linksLabel}>
              {links.map((l, i) => <NavAnchor key={i} link={l} className="ds-footer__link" renderLink={renderLink} />)}
            </nav>
          ) : null}
        </div>

        <div className="ds-footer__bottom">
          <p className="ds-footer__credit">
            {owner ? <>&copy; {y} {owner}. </> : <>&copy; {y}. </>}
            {credit ? (
              <>
                Made with <span role="img" aria-label="love" className="ds-footer__heart">&#10084;</span> by{' '}
                <a className="ds-footer__link ds-footer__link--inline" href={company.href} target="_blank" rel="noopener noreferrer">{company.name}</a>.
              </>
            ) : null}
          </p>
          {notes.map((n, i) => <p key={i} className="ds-footer__note">{n}</p>)}
        </div>
      </div>
    </footer>
  );
}
