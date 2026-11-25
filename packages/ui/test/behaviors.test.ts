import { beforeEach, describe, expect, it, vi } from 'vitest';
import '../src/index';

const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const key = (el: Element, k: string) => el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));

beforeEach(() => { document.body.innerHTML = ''; });

describe('header menu', () => {
  const html = `
    <header class="ds-header"><div class="ds-container ds-header__bar">
      <button class="ds-header__menu" type="button" aria-expanded="false" aria-controls="p" aria-label="Open navigation menu"
        data-label-open="Open navigation menu" data-label-close="Close navigation menu"></button></div>
      <nav id="p" class="ds-header__panel" hidden><a href="/a">A</a></nav></header><p id="out">outside</p>`;
  it('toggles the panel, aria-expanded and the label', () => {
    document.body.innerHTML = html;
    const b = $('.ds-header__menu');
    b.click();
    expect(b).toHaveAttribute('aria-expanded', 'true');
    expect(b).toHaveAttribute('aria-label', 'Close navigation menu');
    expect($('#p')).not.toHaveAttribute('hidden');
    b.click();
    expect($('#p')).toHaveAttribute('hidden');
    expect(b).toHaveAttribute('aria-label', 'Open navigation menu');
  });
  it('Escape closes it and returns focus to the button', () => {
    document.body.innerHTML = html;
    const b = $('.ds-header__menu');
    b.click();
    key(document.body, 'Escape');
    expect(b).toHaveAttribute('aria-expanded', 'false');
    expect(b).toHaveFocus();
  });
  it('closes on a click outside and when a menu link is chosen', () => {
    document.body.innerHTML = html;
    const b = $('.ds-header__menu');
    b.click();
    $('#out').dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(b).toHaveAttribute('aria-expanded', 'false');
    b.click();
    $<HTMLAnchorElement>('.ds-header__panel a').addEventListener('click', (e) => e.preventDefault());
    $('.ds-header__panel a').click();
    expect(b).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('tabs', () => {
  const html = `
    <div class="ds-tabs"><div role="tablist" aria-label="S">
      <button role="tab" id="t1" aria-controls="p1" aria-selected="true">One</button>
      <button role="tab" id="t2" aria-controls="p2" aria-selected="false" tabindex="-1">Two</button>
      <button role="tab" id="t3" aria-controls="p3" aria-selected="false" tabindex="-1">Three</button></div>
      <div role="tabpanel" id="p1">A</div><div role="tabpanel" id="p2" hidden>B</div><div role="tabpanel" id="p3" hidden>C</div></div>`;
  it('selects on click and shows only that panel', () => {
    document.body.innerHTML = html;
    $('#t2').click();
    expect($('#t2')).toHaveAttribute('aria-selected', 'true');
    expect($('#t2')).toHaveAttribute('tabindex', '0');
    expect($('#t1')).toHaveAttribute('tabindex', '-1');
    expect($('#p2')).not.toHaveAttribute('hidden');
    expect($('#p1')).toHaveAttribute('hidden');
  });
  it('arrow keys wrap, Home and End jump, and focus follows', () => {
    document.body.innerHTML = html;
    key($('#t1'), 'ArrowLeft');
    expect($('#t3')).toHaveAttribute('aria-selected', 'true');
    expect($('#t3')).toHaveFocus();
    key($('#t3'), 'ArrowRight');
    expect($('#t1')).toHaveAttribute('aria-selected', 'true');
    key($('#t1'), 'End');
    expect($('#t3')).toHaveAttribute('aria-selected', 'true');
    key($('#t3'), 'Home');
    expect($('#t1')).toHaveAttribute('aria-selected', 'true');
  });
  it('emits ds-tab-change', () => {
    document.body.innerHTML = html;
    const on = vi.fn();
    document.addEventListener('ds-tab-change', on, { once: true });
    $('#t2').click();
    expect(on).toHaveBeenCalled();
  });
});

describe('modal', () => {
  const html = `<button data-ds-modal-open="m">Open</button>
    <dialog id="m" class="ds-modal"><div class="ds-modal__panel"><button data-ds-modal-close>Close</button></div></dialog>`;
  it('opens from the trigger and closes from the close button', () => {
    document.body.innerHTML = html;
    $('[data-ds-modal-open]').click();
    expect($('#m')).toHaveAttribute('open');
    $('[data-ds-modal-close]').click();
    expect($('#m')).not.toHaveAttribute('open');
  });
  it('closes when the backdrop (the dialog itself) is clicked, not its content', () => {
    document.body.innerHTML = html;
    $('[data-ds-modal-open]').click();
    $('.ds-modal__panel').click();
    expect($('#m')).toHaveAttribute('open');
    $('#m').click();
    expect($('#m')).not.toHaveAttribute('open');
  });
});

describe('copy', () => {
  it('copies the code block text and shows the copied label', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    document.body.innerHTML = `<div class="ds-code"><button data-ds-copy data-copied-label="Copiado">Copy</button><pre><code>npm i x</code></pre></div>`;
    $('[data-ds-copy]').click();
    await vi.advanceTimersByTimeAsync(0);
    expect(writeText).toHaveBeenCalledWith('npm i x');
    expect($('[data-ds-copy]')).toHaveTextContent('Copiado');
    await vi.advanceTimersByTimeAsync(1600);
    expect($('[data-ds-copy]')).toHaveTextContent('Copy');
    vi.useRealTimers();
  });
});

describe('drop zone', () => {
  it('emits ds-files for chosen files and clears the input', () => {
    document.body.innerHTML = `<div class="ds-drop"><input type="file" hidden><button data-ds-drop-pick>Choose</button></div>`;
    const on = vi.fn();
    document.addEventListener('ds-files', (e) => on((e as CustomEvent).detail.files.map((f: File) => f.name)), { once: true });
    const input = $<HTMLInputElement>('input');
    const file = new File(['x'], 'a.gpx');
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    input.dispatchEvent(new Event('change', { bubbles: true }));
    expect(on).toHaveBeenCalledWith(['a.gpx']);
  });
  it('highlights while dragging over and clears on leave', () => {
    document.body.innerHTML = `<div class="ds-drop"><p>x</p></div>`;
    $('.ds-drop p').dispatchEvent(new Event('dragover', { bubbles: true, cancelable: true }));
    expect($('.ds-drop')).toHaveClass('ds-drop--over');
    $('.ds-drop p').dispatchEvent(new Event('dragleave', { bubbles: true }));
    expect($('.ds-drop')).not.toHaveClass('ds-drop--over');
  });
});

describe('<ds-theme-scope>', () => {
  it('scopes custom colours to itself for light and dark, and updates when attributes change', () => {
    document.body.innerHTML = `<ds-theme-scope light='{"accent":"#0a5ad4"}' dark='{"accent":"#5aa2ff","on-accent":"#08111c"}'><button class="ds-btn">x</button></ds-theme-scope>`;
    const el = $('ds-theme-scope');
    const cls = [...el.classList].find((c) => c.startsWith('ds-scope-'))!;
    const css = () => el.querySelector('style')!.textContent!;
    expect(css()).toContain(`.${cls} {`);
    expect(css()).toContain('--accent: #0a5ad4');
    expect(css()).toContain(`:root[data-theme='dark'] .${cls}`);
    el.setAttribute('light', '{"accent":"#7a1fa2"}');
    expect(css()).toContain('--accent: #7a1fa2');
  });
  it('warns and emits ds-contrast-failures when the colours fail contrast', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const on = vi.fn();
    document.addEventListener('ds-contrast-failures', on, { once: true });
    document.body.innerHTML = `<ds-theme-scope light='{"accent":"#ffe000"}'>x</ds-theme-scope>`;
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('on-accent'));
    expect(on).toHaveBeenCalled();
    warn.mockRestore();
  });
  it('stays quiet for an accessible theme', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    document.body.innerHTML = `<ds-theme-scope light='{"accent":"#0a5ad4"}' dark='{"accent":"#5aa2ff","on-accent":"#08111c"}'>x</ds-theme-scope>`;
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
