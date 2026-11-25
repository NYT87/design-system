export interface ApiRow { name: string; values: string; default?: string; description: string }
export interface ComponentDoc {
  id: string;
  name: string;
  group: 'Actions' | 'Forms' | 'Display' | 'Feedback' | 'Navigation' | 'Overlays' | 'Layout' | 'Theming';
  summary: string;
  /** What JavaScript the component needs. "none" means HTML and CSS only. */
  js: { import: string; size: string } | null;
  use: string[];
  avoid: string[];
  a11y: string[];
  /** Classes, attributes and events, grouped by element. */
  api: Record<string, ApiRow[]>;
  /** File name in ./examples, without the extension. */
  example: string;
}

const modifiers = (rows: ApiRow[]) => rows;

export const components: ComponentDoc[] = [
  {
    id: 'site-header', name: 'Site header', group: 'Layout', example: 'site-header',
    summary: 'The top bar of every public page: brand, primary navigation, and the controls that always stay visible. Collapses into a menu button on narrow screens.',
    js: { import: "import '@nyt87/ui/menu'", size: '0.45 KB' },
    use: ['Brand on the left, navigation next, one primary action on the right.', 'Mark the current page with aria-current="page".', 'Give a language link lang and hreflang so screen readers pronounce it correctly.', 'Repeat the links inside the panel: it is the menu shown on narrow screens.'],
    avoid: ['More than about six links: group them or move them to the footer.', 'A different header on each page of the same product.', 'Leaving the panel out: below 830px the links would disappear.'],
    a11y: ['The brand link needs an aria-label when its name is an image.', 'Navigation is a labelled <nav>; the menu is a disclosure button with aria-expanded and aria-controls.', 'Esc closes the menu and returns focus to the button; so do choosing a link and clicking outside.', 'Links and the menu button are at least 44px tall. Put a skip link ("ds-skip") first on the page.'],
    api: {
      'Elements and classes': [
        { name: 'header.ds-header', values: '+ ds-header--sticky', description: 'The bar. Sticky keeps it at the top while scrolling.' },
        { name: '.ds-container', values: '', description: 'Centres content at --max-width with the page gutter.' },
        { name: 'a.ds-brand', values: 'with .ds-brand__mark, .ds-brand__name', description: 'Logo lockup. The mark is decorative.' },
        { name: 'nav.ds-header__nav', values: 'a.ds-header__link', description: 'Desktop navigation, hidden below 830px.' },
        { name: '.ds-header__actions', values: '', description: 'Always-visible controls on the right.' },
        { name: 'button.ds-header__menu', values: 'aria-controls, aria-expanded', description: 'Menu button, shown below 830px. Add data-label-open / data-label-close to translate its label.' },
        { name: 'nav.ds-header__panel', values: 'hidden', description: 'The mobile menu: the same links, opened by the button.' },
        { name: 'a.ds-skip', values: 'href="#main"', description: 'Skip link, visible only when focused.' },
      ],
    },
  },
  {
    id: 'site-footer', name: 'Site footer', group: 'Layout', example: 'site-footer',
    summary: 'The bottom of every public page: what the product is, where to go next, and who made it, with the shared "Made with love by nyt87" credit.',
    js: null,
    use: ['A tagline of one or two sentences, then link columns or one row of links.', 'Use ds-footer__note for disclaimers, affiliation and licence lines.', 'Keep the credit: it ties every product back to the studio.'],
    avoid: ['Repeating the whole header navigation.', 'Legal text in the tagline: use a note.'],
    a11y: ['Each column is a <nav> named by its heading, and the heading is a real <h2>.', 'External links open in a new tab with rel="noopener noreferrer".', 'The heart has role="img" and aria-label="love".'],
    api: {
      'Elements and classes': [
        { name: 'footer.ds-footer', values: '', description: 'The footer. Wrap its content in .ds-container.' },
        { name: '.ds-footer__top', values: '', description: 'Brand, tagline and link groups.' },
        { name: '.ds-footer__brand', values: '.ds-brand + p.ds-footer__tagline', description: 'The brand and one or two sentences.' },
        { name: 'nav.ds-footer__col', values: 'h2.ds-footer__heading + ul', description: 'A titled link group. Name it with aria-label.' },
        { name: 'nav.ds-footer__row', values: 'a.ds-footer__link', description: 'A single row of links, instead of columns.' },
        { name: '.ds-footer__bottom', values: 'p.ds-footer__credit, p.ds-footer__note', description: 'Copyright, studio credit and notes.' },
      ],
    },
  },
  {
    id: 'app-shell', name: 'App shell', group: 'Layout', example: 'app-shell',
    summary: 'The frame of a dashboard: a sidebar of icon links, a top bar with the page title and actions, and the main area. Below 860px the sidebar becomes a drawer.',
    js: { import: "import '@nyt87/ui/menu'", size: '0.5 KB' },
    use: ['One h1 per page, in the top bar.', 'Group related destinations; mark the current one with aria-current="page".', 'Pair every nav link with an icon from @nyt87/icons so the same section looks the same across products.'],
    avoid: ['More than about eight sidebar links: use headings to group them.', 'Putting page actions in the sidebar: they belong in the top bar.'],
    a11y: ['The sidebar is a labelled landmark and its links sit in a <nav>.', 'The toggle is a disclosure button with aria-expanded and aria-controls; Esc, a click outside and choosing a link close the drawer.', 'The toggle is only visible below 860px, where the sidebar is hidden.'],
    api: {
      'Elements and classes': [
        { name: '.ds-app', values: '--app-height', description: 'Grid with sidebar, bar and main. --app-height limits the height inside a frame (default full viewport).' },
        { name: 'aside.ds-app__sidebar', values: 'id, aria-label', description: 'The sidebar. Opens as a drawer by setting data-open on narrow screens.' },
        { name: 'header.ds-app__bar', values: '.ds-app__title, .ds-app__bar-actions', description: 'Top bar.' },
        { name: 'button.ds-app__toggle', values: 'aria-controls, aria-expanded', description: 'Opens the sidebar drawer. Hidden on wide screens.' },
        { name: '.ds-app__scrim', values: 'after the sidebar', description: 'Dims the page behind the open drawer.' },
        { name: 'ul.ds-nav', values: 'a.ds-nav__link, li.ds-nav__heading', description: 'Sidebar links and group headings.' },
        { name: 'main.ds-app__main', values: '', description: 'Page content.' },
      ],
    },
  },
  {
    id: 'data-table', name: 'Data table', group: 'Display', example: 'data-table',
    summary: 'Extras on top of Table for lists of records: a toolbar for filter and bulk actions, sortable headers, selected rows, row actions and an empty row.',
    js: null,
    use: ['Put filter and bulk actions in the toolbar above the table.', 'Mark only the sorted column with aria-sort; the others "none".', 'Use ds-table--dense for long lists.'],
    avoid: ['Sorting by colour or icon alone.', 'More than two actions per row: use a side sheet.'],
    a11y: ['Sort buttons are real <button>s inside the <th>; aria-sort carries the direction.', 'A selected row is tinted; tint is not enough on its own, so pair it with a checked checkbox in the row.', 'Icon-only row actions need aria-label.'],
    api: {
      'Elements and classes': [
        { name: '.ds-toolbar', values: '.ds-toolbar__grow, .ds-toolbar__end', description: 'Filter field and actions above the table.' },
        { name: 'th[aria-sort]', values: 'ascending | descending | none', description: 'Sorted state; wrap the label in button.ds-table__sort.' },
        { name: 'tr[data-selected]', values: '', description: 'Selected row tint.' },
        { name: 'td.ds-table__actions', values: '', description: 'Right-aligned, shrink-to-fit actions cell.' },
        { name: 'td.ds-table__empty', values: 'colspan', description: 'The "nothing here" row.' },
        { name: 'ds-table--dense', values: 'on table', description: 'Tighter rows.' },
      ],
    },
  },
  {
    id: 'pager', name: 'Pager', group: 'Navigation', example: 'pager',
    summary: 'Previous, next and numbered pages with a "showing" summary.',
    js: null,
    use: ['Use links when each page has a URL, buttons when the list updates in place.', 'Show the range and total.'],
    avoid: ['Pages of 5 rows: raise the page size.', 'Infinite lists with no way to reach the end.'],
    a11y: ['A labelled <nav>; the current page has aria-current="page".', 'Each item has an aria-label ("Page 2", "Next page"): icons alone are not names.', 'Disabled items use aria-disabled="true" so they stay discoverable.'],
    api: {
      'Elements and classes': [
        { name: 'nav.ds-pager', values: 'aria-label', description: 'Wrapper: summary on the left, list on the right.' },
        { name: 'ul.ds-pager__list', values: '', description: 'The row of items.' },
        { name: '.ds-pager__item', values: 'a or button; aria-current, aria-disabled', description: 'One page or step.' },
      ],
    },
  },
  {
    id: 'side-sheet', name: 'Side sheet', group: 'Overlays', example: 'side-sheet',
    summary: 'A panel docked to the right edge for details and edit forms that should not leave the list. A native dialog, like Modal.',
    js: { import: "import '@nyt87/ui/modal'", size: '0.33 KB' },
    use: ['Details or editing of one record while the list stays in context.', 'Put the primary action in the footer.'],
    avoid: ['Stacking a sheet over a modal.', 'Long multi-step flows: give them a page.'],
    a11y: ['Native <dialog>: focus is trapped, Esc closes it and focus returns to the opener.', 'Name it with aria-labelledby; the close button needs aria-label.', 'It is full width on phones.'],
    api: {
      'Elements and classes': [
        { name: 'dialog.ds-modal.ds-sheet', values: '+ ds-sheet--lg', description: 'The sheet. Same open and close attributes as Modal.' },
        { name: '.ds-sheet__head', values: '.ds-modal__title + close button', description: 'Title row with a close button.' },
        { name: '.ds-modal__body, .ds-modal__foot', values: '', description: 'Scrolling content and footer actions, as in Modal.' },
      ],
    },
  },
  {
    id: 'tooltip', name: 'Tooltip', group: 'Overlays', example: 'tooltip',
    summary: 'Short supplementary text for a control, shown on hover and keyboard focus.',
    js: null,
    use: ['Explain an icon-only control or add a short hint.', 'One short sentence.'],
    avoid: ['Essential information, links or buttons inside it: use a popover or text on the page.', 'Tooltips on touch-only features.'],
    a11y: ['The trigger references the text with aria-describedby, and the control still has its own accessible name.', 'It appears on focus as well as hover and never takes focus itself.'],
    api: {
      'Elements and classes': [
        { name: 'span.ds-tip', values: '+ ds-tip--below', description: 'Wrapper around the trigger and the text.' },
        { name: 'span.ds-tip__text', values: 'role="tooltip", id', description: 'The text. Reference its id from the trigger.' },
      ],
    },
  },
  {
    id: 'skeleton', name: 'Skeleton', group: 'Feedback', example: 'skeleton',
    summary: 'A placeholder shaped like the content that is loading.',
    js: null,
    use: ['Match the shape and rough size of the real content to avoid layout shift.', 'Use for waits longer than about a second.'],
    avoid: ['Skeletons for a spinner-sized wait.', 'Leaving them in after an error: show an alert instead.'],
    a11y: ['Mark the loading region aria-busy="true" and include a screen-reader-only "Loading …" message.', 'Skeleton shapes are aria-hidden; the shimmer stops under reduced motion.'],
    api: {
      'Elements and classes': [
        { name: '.ds-skeleton', values: '--text | --title | --block', description: 'A placeholder bar. Set width inline if needed.' },
      ],
    },
  },
  {
    id: 'button', name: 'Button', group: 'Actions', example: 'button',
    summary: 'Triggers an action. The same classes style a link that acts like a button.',
    js: null,
    use: ['One primary button per view or dialog.', 'Verbs for labels: "Save", "Import file", not "OK".', 'Use danger only for destructive, irreversible actions; danger-outline for the same action when it is not the main one (a row or toolbar).'],
    avoid: ['A <button> to navigate: use a link.', 'Several primary buttons side by side.', 'Disabling without saying why nearby.'],
    a11y: ['Always write type="button" outside a form, so it never submits by accident.', 'Loading: set aria-busy="true" and disabled, and keep the label so the width does not jump.', 'An icon-only button needs aria-label.', 'ds-btn--lg is 44px: use it on touch layouts.'],
    api: {
      'Button': modifiers([
        { name: '.ds-btn', values: '', description: 'Required base class.' },
        { name: 'variant', values: 'ds-btn--primary | --secondary | --ghost | --danger | --danger-outline', description: 'Visual weight.' },
        { name: 'size', values: 'ds-btn--sm | --md | --lg', description: '32px, 40px or 44px tall.' },
        { name: 'ds-btn--icon-only', values: '', description: 'A square button for one icon. Needs aria-label.' },
        { name: 'svg.ds-icon', values: 'aria-hidden="true"', description: 'A decorative icon before the label, from @nyt87/icons. An icon-only button still needs aria-label.' },
        { name: 'span.ds-spinner', values: 'inside a busy button', description: 'Shows progress while aria-busy.' },
      ]),
    },
  },
  {
    id: 'input', name: 'Input, textarea, select', group: 'Forms', example: 'input',
    summary: 'Text-like form controls with a visible label, optional hint and error.',
    js: null,
    use: ['Always give a label; use placeholder only for an example value.', 'Put the fix in the error: "Enter a valid email", not "Invalid".'],
    avoid: ['Hiding the label.', 'Colour-only error states: the message is always shown.'],
    a11y: ['Connect label and control with for / id, and hint and error with aria-describedby.', 'An invalid control has aria-invalid="true", and its message has role="alert" so it is announced.', 'The border uses --border-strong (3:1 against the surface).'],
    api: {
      'Field': modifiers([
        { name: '.ds-field', values: '', description: 'Wrapper: label, control, hint, error.' },
        { name: 'label.ds-field__label', values: 'for="id"', description: 'Visible label. Add span.ds-field__req (aria-hidden) after required fields.' },
        { name: 'p.ds-field__hint', values: 'id', description: 'Help text. Reference it from aria-describedby.' },
        { name: 'p.ds-field__error', values: 'id, role="alert"', description: 'Error message. Reference it from aria-describedby and set aria-invalid on the control.' },
      ]),
      'Controls': modifiers([
        { name: '.ds-control', values: 'on <input>, <select>, <textarea>', description: 'Required class for every text-like control.' },
        { name: 'ds-control--select', values: 'on <select>', description: 'Adds the chevron.' },
        { name: 'ds-control--area', values: 'on <textarea>', description: 'Padding and vertical resize.' },
      ]),
    },
  },
  {
    id: 'choice', name: 'Checkbox, switch', group: 'Forms', example: 'choice',
    summary: 'Checkbox for a choice that is submitted later. Switch for a setting that applies immediately.',
    js: null,
    use: ['Switch labels describe the setting, not the action ("Background sync").', 'Use the hint to explain the effect.'],
    avoid: ['A switch inside a form that needs a Save button.', 'Negative labels ("Disable X").'],
    a11y: ['Native checkbox inputs: keyboard and form behaviour come for free.', 'The switch has role="switch".', 'The whole label is clickable.'],
    api: {
      'Choice': modifiers([
        { name: 'label.ds-choice', values: '', description: 'Wraps the input and its text, so the whole row is clickable.' },
        { name: 'input.ds-choice__box', values: 'type="checkbox"', description: 'The checkbox.' },
        { name: 'input.ds-switch', values: 'type="checkbox" role="switch"', description: 'The switch.' },
        { name: 'span.ds-choice__text', values: '+ span.ds-choice__hint', description: 'Label text and an optional hint line.' },
      ]),
    },
  },
  {
    id: 'segmented', name: 'Segmented', group: 'Forms', example: 'segmented',
    summary: 'Pick exactly one of two to five short options, such as a chart metric or a view mode.',
    js: null,
    use: ['Options that change the view in place.', 'Short labels (one or two words).'],
    avoid: ['More than five options: use a select.', 'Navigation between pages: use tabs or links.'],
    a11y: ['A radiogroup of native radios: arrow keys move and select, with no script.', 'aria-label names the group.'],
    api: {
      'Segmented': modifiers([
        { name: 'div.ds-seg', values: 'role="radiogroup" aria-label', description: 'The group. Add ds-seg--sm or ds-seg--md.' },
        { name: 'label.ds-seg__item', values: 'input[type=radio] + span', description: 'One option. Radios share a name.' },
      ]),
    },
  },
  {
    id: 'file-drop-zone', name: 'File drop zone', group: 'Forms', example: 'file-drop-zone',
    summary: 'Drag-and-drop target that is also a normal file picker.',
    js: { import: "import '@nyt87/ui/drop'", size: '0.44 KB' },
    use: ['Say which formats are accepted.'],
    avoid: ['Drag-only upload.'],
    a11y: ['The "Choose file" button covers keyboard and touch users.'],
    api: {
      'Markup': modifiers([
        { name: '.ds-drop', values: '', description: 'The zone. Gets ds-drop--over while a file is dragged over it.' },
        { name: 'input[type=file]', values: 'hidden, accept, multiple', description: 'The real picker. Cleared after each selection.' },
        { name: 'button[data-ds-drop-pick]', values: '', description: 'Opens the picker.' },
      ]),
      'Event': modifiers([
        { name: 'ds-files', values: 'detail.files: File[]', description: 'Fired on the zone (and bubbles) for dropped or chosen files.' },
      ]),
    },
  },
  {
    id: 'card', name: 'Card', group: 'Display', example: 'card',
    summary: 'A raised surface that groups related content, with an optional header.',
    js: null,
    use: ['Group things that belong together.', 'Pick the heading level (h2, h3, h4) so the page outline stays correct.'],
    avoid: ['Cards inside cards.', 'Using a card for a single line of text.'],
    a11y: ['Use a <section> so the title is a real heading in the outline.'],
    api: {
      'Card': modifiers([
        { name: '.ds-card', values: '', description: 'The surface.' },
        { name: 'header.ds-card__head', values: '.ds-card__title + .ds-card__actions', description: 'Optional header: title and controls.' },
        { name: '.ds-card__body', values: '', description: 'The content.' },
      ]),
    },
  },
  {
    id: 'badge', name: 'Badge', group: 'Display', example: 'badge',
    summary: 'A short status or category label.',
    js: null,
    use: ['One or two words.', 'Pick the tone by meaning: ok = healthy, warn = needs attention soon, danger = broken.'],
    avoid: ['Relying on colour alone: the text always carries the meaning.', 'Using accent for status.'],
    a11y: ['Text colour is --fg; the tone is a dot and tint, so contrast does not depend on the tone.'],
    api: {
      'Badge': modifiers([
        { name: '.ds-badge', values: '', description: 'The label. Start it with span.ds-badge__dot (aria-hidden).' },
        { name: 'tone', values: 'ds-badge--accent | --ok | --warn | --danger', default: 'neutral', description: 'Meaning of the label.' },
      ]),
    },
  },
  {
    id: 'stat', name: 'Stat', group: 'Display', example: 'stat',
    summary: 'Key numbers at a glance, in a responsive grid.',
    js: null,
    use: ['Put the unit in .ds-stat__unit, not in the number.', 'Four to six stats per grid.'],
    avoid: ['Long text values.', 'Stats with no label.'],
    a11y: ['A definition list: each value is announced with its label.', 'Numbers use tabular figures so they do not jitter.'],
    api: {
      'Stat': modifiers([
        { name: 'dl.ds-stats', values: '', description: 'The grid.' },
        { name: '.ds-stat', values: 'dt.ds-stat__label + dd.ds-stat__value', description: 'One figure.' },
        { name: '.ds-stat__num, .ds-stat__unit, .ds-stat__hint', values: 'inside the dd', description: 'The number, a smaller unit, and a context line.' },
      ]),
    },
  },
  {
    id: 'table', name: 'Table', group: 'Display', example: 'table',
    summary: 'A styled native table inside a horizontal scroller.',
    js: null,
    use: ['Use <th scope="col"> and <th scope="row">.', 'Add class "ds-num" to numeric cells to right-align them.'],
    avoid: ['Layout tables.', 'Hiding columns on mobile: let it scroll.'],
    a11y: ['The <caption> names the table; use class "ds-sr-only" to hide it visually but keep it for screen readers.', 'The scroller is focusable (tabindex="0") so keyboard users can scroll it, and has role="region" with a label.'],
    api: {
      'Table': modifiers([
        { name: 'div.ds-table-wrap', values: 'role="region" aria-label tabindex="0"', description: 'Horizontal scroller.' },
        { name: 'table.ds-table', values: '', description: 'The table.' },
        { name: 'caption.ds-sr-only | .ds-table__caption', values: '', description: 'Hidden or visible caption.' },
        { name: '.ds-num', values: 'on th or td', description: 'Right-aligned, tabular numbers.' },
      ]),
    },
  },
  {
    id: 'code-block', name: 'Code block', group: 'Display', example: 'code-block',
    summary: 'A monospace block with a copy button, for commands, IDs and payloads.',
    js: { import: "import '@nyt87/ui/copy'", size: '0.33 KB' },
    use: ['Identifiers, commands and JSON: they are never translated.'],
    avoid: ['Long files: link to them.'],
    a11y: ['The <pre> is focusable (tabindex="0") so long lines can be scrolled by keyboard.', 'The copy button is a live region and announces "Copied".'],
    api: {
      'Code block': modifiers([
        { name: '.ds-code', values: '.ds-code__bar + pre', description: 'The block.' },
        { name: 'button.ds-code__copy', values: 'data-ds-copy', description: 'Copies the text of the <pre> in the same block. Use data-ds-copy="#id" to copy another element.' },
        { name: 'data-copied-label', values: 'string', default: "'Copied'", description: 'Translate the confirmation.' },
      ]),
    },
  },
  {
    id: 'alert', name: 'Alert', group: 'Feedback', example: 'alert',
    summary: 'An inline message about the state of the page or an operation.',
    js: null,
    use: ['Say what happened and what to do next.', 'Offer the fix in ds-alert__action (retry, reconnect).'],
    avoid: ['Stacking several alerts.', 'Using danger for things the user cannot act on.'],
    a11y: ['warn and danger use role="alert" (announced at once); info and ok use role="status".', 'Never colour-only: the left bar is reinforced by the title.'],
    api: {
      'Alert': modifiers([
        { name: '.ds-alert', values: 'role="alert" | role="status"', description: 'The message. Use alert for warn and danger.' },
        { name: 'tone', values: 'ds-alert--ok | --warn | --danger', default: 'info', description: 'Severity.' },
        { name: '.ds-alert__main', values: 'p.ds-alert__title + .ds-alert__body', description: 'Summary and details.' },
        { name: '.ds-alert__action', values: '', description: 'A button, usually.' },
      ]),
    },
  },
  {
    id: 'empty-state', name: 'Empty state', group: 'Feedback', example: 'empty-state',
    summary: 'What to show when there is nothing yet.',
    js: null,
    use: ['Explain what will appear here and how to get it.', 'Include one clear primary action.'],
    avoid: ['A bare "No data".'],
    a11y: ['The icon is decorative: aria-hidden="true".'],
    api: {
      'Empty state': modifiers([
        { name: '.ds-empty', values: '', description: 'The container.' },
        { name: '.ds-empty__icon, __title, __body, __action', values: '', description: 'Optional glyph, short statement, next-step explanation, primary action.' },
      ]),
    },
  },
  {
    id: 'spinner', name: 'Spinner', group: 'Feedback', example: 'spinner',
    summary: 'Indicates work in progress when duration is unknown.',
    js: null,
    use: ['Pair with a label for longer waits.'],
    avoid: ['Spinners for under ~300 ms.'],
    a11y: ['role="status" with an aria-label; make it aria-hidden when it sits inside something already labelled (a busy button).', 'Spins slower under prefers-reduced-motion.'],
    api: {
      'Spinner': modifiers([
        { name: 'span.ds-spinner', values: 'role="status" aria-label', description: 'The spinner.' },
        { name: '--ds-spinner-size', values: 'CSS length', default: '1.25rem', description: 'Set it in style="" to resize.' },
      ]),
    },
  },
  {
    id: 'tabs', name: 'Tabs', group: 'Navigation', example: 'tabs',
    summary: 'Switch between sibling panels of the same page.',
    js: { import: "import '@nyt87/ui/tabs'", size: '0.5 KB' },
    use: ['Two to six tabs with short labels.', 'Write the initial state in the markup: the selected tab, tabindex="-1" on the others, hidden on the other panels.'],
    avoid: ['Tabs that change the URL or page: use links.', 'Hiding content the user must see.'],
    a11y: ['The full WAI-ARIA tabs pattern: arrow keys, Home and End; only the active tab is in the tab order.', 'Each panel is labelled by its tab.'],
    api: {
      'Markup': modifiers([
        { name: '.ds-tabs', values: '', description: 'Container for the list and panels.' },
        { name: '[role=tablist].ds-tabs__list', values: 'aria-label', description: 'The tab list.' },
        { name: 'button[role=tab].ds-tabs__tab', values: 'id, aria-controls, aria-selected, tabindex', description: 'One tab.' },
        { name: '[role=tabpanel].ds-tabs__panel', values: 'id, aria-labelledby, tabindex="0", hidden', description: 'One panel.' },
      ]),
      'Event': modifiers([
        { name: 'ds-tab-change', values: 'detail.id', description: 'Fired on the chosen tab (and bubbles).' },
      ]),
    },
  },
  {
    id: 'modal', name: 'Modal', group: 'Overlays', example: 'modal',
    summary: 'A focused dialog that blocks the page until dismissed.',
    js: { import: "import '@nyt87/ui/modal'", size: '0.26 KB' },
    use: ['Short, self-contained tasks.', 'Title says what the dialog is for; the footer holds the actions.'],
    avoid: ['Long flows: use a page.', 'A modal on top of a modal.'],
    a11y: ['Built on the native <dialog>: focus is trapped, Esc closes, the page behind is inert, focus returns to the opener.', 'aria-labelledby points at the title.'],
    api: {
      'Markup': modifiers([
        { name: 'dialog.ds-modal', values: 'id, aria-labelledby + ds-modal--sm | --md | --lg', description: 'The dialog: 24, 32 or 48 rem wide.' },
        { name: '.ds-modal__panel', values: 'h2.ds-modal__title + .ds-modal__body + .ds-modal__foot', description: 'Title, content and actions.' },
      ]),
      'Attributes': modifiers([
        { name: '[data-ds-modal-open]', values: 'dialog id', description: 'On any element: opens that dialog.' },
        { name: '[data-ds-modal-close]', values: '', description: 'On any element inside: closes the dialog. A click on the backdrop closes it too.' },
      ]),
    },
  },
  {
    id: 'theme-scope', name: 'Theme scope', group: 'Theming', example: 'theme-scope',
    summary: 'Re-colour everything inside an element with your own colours, in light and dark mode, without writing global CSS. Use the theme builder to pick colours that pass contrast.',
    js: { import: "import '@nyt87/ui/theme-scope'", size: '0.6 KB + 1.5 KB contrast checker' },
    use: ['List only the tokens you change; the rest inherit from the brand.', 'Provide both light and dark values for the accent family: accent, on-accent, accent-ink, ring.', 'For a whole product, generate CSS once with defineTheme and set data-accent instead: no script at all (see the theme builder).'],
    avoid: ['Changing status colours (ok, warn, danger): they carry meaning.', 'Overriding tokens with hex values in component CSS.', 'Using a pale accent: on-accent text must reach 4.5:1.'],
    a11y: ['The theme is checked against the same WCAG rules as the built-in themes; failures are logged to the console and fired as an event.', 'Unknown token names throw, so typos do not silently do nothing.'],
    api: {
      '<ds-theme-scope>': modifiers([
        { name: 'light', values: 'JSON of colour tokens', description: 'Overrides for light mode.' },
        { name: 'dark', values: 'JSON of colour tokens', description: 'Overrides for dark mode (OS preference or data-theme="dark").' },
        { name: 'ds-contrast-failures', values: 'event, detail.failures', description: 'Fired (and bubbles) when the colours fail contrast.' },
      ]),
    },
  },
];

export const groupOrder: ComponentDoc['group'][] = ['Layout', 'Actions', 'Forms', 'Display', 'Feedback', 'Navigation', 'Overlays', 'Theming'];
