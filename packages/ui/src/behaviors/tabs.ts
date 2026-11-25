// Tabs: WAI-ARIA tabs pattern for .ds-tabs. Arrow keys, Home and End move and select; only the active tab is in the tab order.
// Markup: role="tablist" with <button role="tab" aria-controls aria-selected tabindex>, and role="tabpanel" elements (hidden unless active).
function select(tab: HTMLElement, focus = false) {
  const root = tab.closest('.ds-tabs');
  if (!root) return;
  root.querySelectorAll<HTMLElement>('[role="tab"]').forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
    if (panel) panel.hidden = !on;
  });
  if (focus) tab.focus();
  tab.dispatchEvent(new CustomEvent('ds-tab-change', { bubbles: true, detail: { id: tab.id } }));
}

if (typeof document !== 'undefined' && !(window as any).__dsTabs) {
  (window as any).__dsTabs = true;
  document.addEventListener('click', (e) => {
    const tab = (e.target as Element).closest<HTMLElement>('.ds-tabs [role="tab"]');
    if (tab) select(tab);
  });
  document.addEventListener('keydown', (e) => {
    const tab = (e.target as Element).closest<HTMLElement>('.ds-tabs [role="tab"]');
    if (!tab) return;
    const tabs = [...tab.closest('[role="tablist"]')!.querySelectorAll<HTMLElement>('[role="tab"]')];
    const i = tabs.indexOf(tab), last = tabs.length - 1;
    const next = e.key === 'ArrowRight' ? (i === last ? 0 : i + 1) : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    select(tabs[next], true);
  });
}
export {};
