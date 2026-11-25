// Copy button for .ds-code: <button data-ds-copy>. Copies the text of the <pre> in the same block (or of data-ds-copy="#id").
// The button shows data-copied-label ("Copied") for 1.5 s and is a live region, so the result is announced.
if (typeof document !== 'undefined' && !(window as any).__dsCopy) {
  (window as any).__dsCopy = true;
  document.addEventListener('click', async (e) => {
    const b = (e.target as Element).closest<HTMLElement>('[data-ds-copy]');
    if (!b) return;
    const src = b.dataset.dsCopy ? document.querySelector(b.dataset.dsCopy) : b.closest('.ds-code')?.querySelector('pre');
    if (!src) return;
    try {
      await navigator.clipboard.writeText(src.textContent ?? '');
    } catch { return; } // clipboard blocked: leave the button as it is
    const label = b.textContent;
    b.setAttribute('aria-live', 'polite');
    b.textContent = b.dataset.copiedLabel ?? 'Copied';
    setTimeout(() => { b.textContent = label; }, 1500);
  });
}
export {};
