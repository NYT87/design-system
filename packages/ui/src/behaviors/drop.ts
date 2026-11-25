// File drop zone: .ds-drop with a hidden <input type="file"> and a <button data-ds-drop-pick>.
// Dropping or choosing files fires a bubbling "ds-files" event with detail.files (File[]).
//   el.addEventListener('ds-files', (e) => handle(e.detail.files))
const emit = (zone: Element, files: File[]) => { if (files.length) zone.dispatchEvent(new CustomEvent('ds-files', { bubbles: true, detail: { files } })); };

if (typeof document !== 'undefined' && !(window as any).__dsDrop) {
  (window as any).__dsDrop = true;
  document.addEventListener('click', (e) => {
    const pick = (e.target as Element).closest('[data-ds-drop-pick]');
    pick?.closest('.ds-drop')?.querySelector<HTMLInputElement>('input[type="file"]')?.click();
  });
  document.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    const zone = input.closest?.('.ds-drop');
    if (!zone || input.type !== 'file') return;
    emit(zone, Array.from(input.files ?? []));
    input.value = '';
  });
  document.addEventListener('dragover', (e) => {
    const zone = (e.target as Element).closest?.('.ds-drop');
    if (!zone) return;
    e.preventDefault();
    zone.classList.add('ds-drop--over');
  });
  document.addEventListener('dragleave', (e) => (e.target as Element).closest?.('.ds-drop')?.classList.remove('ds-drop--over'));
  document.addEventListener('drop', (e) => {
    const zone = (e.target as Element).closest?.('.ds-drop');
    if (!zone) return;
    e.preventDefault();
    zone.classList.remove('ds-drop--over');
    const input = zone.querySelector<HTMLInputElement>('input[type="file"]');
    const files = Array.from(e.dataTransfer?.files ?? []);
    emit(zone, input?.multiple ? files : files.slice(0, 1));
  });
}
export {};
