// Modal: opens and closes native <dialog class="ds-modal"> from data attributes. The browser handles focus trap, Esc, inertness and focus return.
//   open:  <button data-ds-modal-open="dialog-id">     close: <button data-ds-modal-close>
// A click on the backdrop (the dialog element itself) also closes it.
if (typeof document !== 'undefined' && !(window as any).__dsModal) {
  (window as any).__dsModal = true;
  document.addEventListener('click', (e) => {
    const t = e.target as Element;
    const opener = t.closest<HTMLElement>('[data-ds-modal-open]');
    if (opener) {
      (document.getElementById(opener.dataset.dsModalOpen!) as HTMLDialogElement | null)?.showModal();
      return;
    }
    if (t.closest('[data-ds-modal-close]')) {
      t.closest('dialog')?.close();
      return;
    }
    if (t instanceof HTMLDialogElement && t.classList.contains('ds-modal')) t.close();
  });
}
export {};
