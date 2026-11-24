import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface NavLink {
  label: ReactNode;
  href: string;
  /** Marks the page the visitor is on (aria-current="page"). */
  current?: boolean;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  /** Language of the link text, when it differs from the page (e.g. "ko"). */
  lang?: string;
  hrefLang?: string;
}

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Lets an app with a client-side router render its own link component:
 *   renderLink={({ href, ...p }) => <RouterLink to={href} {...p} />}
 * Without it, plain <a> is used.
 */
export type RenderLink = (props: LinkProps) => ReactNode;

export function NavAnchor({ link, className, renderLink, onClick }: { link: NavLink; className?: string; renderLink?: RenderLink; onClick?: () => void }) {
  const props: LinkProps = {
    href: link.href,
    className,
    onClick,
    'aria-current': link.current ? 'page' : undefined,
    lang: link.lang,
    hrefLang: link.hrefLang,
    ...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
    children: link.label,
  };
  return <>{renderLink && !link.external ? renderLink(props) : <a {...props} />}</>;
}
