// Header menu: toggles the mobile navigation panel of .ds-header. Esc, a click outside, or choosing a link closes it.
// Markup: a <button class="ds-header__menu" aria-controls="panel-id" aria-expanded="false"> and a <nav id="panel-id" hidden>.
// Optional data-label-open / data-label-close on the button swap its aria-label (translate them).
const BUTTON = '.ds-header__menu';
const panelOf = (b: Element) => document.getElementById(b.getAttribute('aria-controls') ?? '');

function setOpen(b: HTMLElement, open: boolean) {
  b.setAttribute('aria-expanded', String(open));
  const label = open ? b.dataset.labelClose : b.dataset.labelOpen;
  if (label) b.setAttribute('aria-label', label);
  const panel = panelOf(b);
  if (panel) panel.hidden = !open;
}

const openButtons = () => [...document.querySelectorAll<HTMLElement>(`${BUTTON}[aria-expanded='true']`)];

if (typeof document !== 'undefined' && !(window as any).__dsMenu) {
  (window as any).__dsMenu = true;
  document.addEventListener('click', (e) => {
    const t = e.target as Element;
    const b = t.closest<HTMLElement>(BUTTON);
    if (b) return setOpen(b, b.getAttribute('aria-expanded') !== 'true');
    // choosing a link inside an open panel closes it
    if (t.closest('.ds-header__panel a')) openButtons().forEach((o) => setOpen(o, false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    openButtons().forEach((o) => { setOpen(o, false); o.focus(); });
  });
  document.addEventListener('pointerdown', (e) => {
    const t = e.target as Element;
    openButtons().forEach((o) => {
      if (!o.closest('.ds-header')?.contains(t)) setOpen(o, false);
    });
  });
}
export {};
