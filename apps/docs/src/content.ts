export interface Prop { name: string; type: string; default?: string; description: string }
export interface ComponentDoc {
  id: string;
  name: string;
  group: 'Actions' | 'Forms' | 'Display' | 'Feedback' | 'Navigation' | 'Overlays' | 'Layout' | 'Theming';
  summary: string;
  use: string[];
  avoid: string[];
  a11y: string[];
  props: Record<string, Prop[]>;
  example: string; // file name in ./examples
}

export const components: ComponentDoc[] = [
  {
    id: 'button', name: 'Button', group: 'Actions', example: 'Button',
    summary: 'Triggers an action. Use IconButton when there is no visible text.',
    use: ['One primary button per view or dialog.', 'Verbs for labels: "Save", "Import file", not "OK".', 'danger only for destructive, irreversible actions.'],
    avoid: ['Using a Button to navigate: use a link.', 'Several primary buttons side by side.', 'Disabling without saying why nearby.'],
    a11y: ['Defaults to type="button" so it never submits a form by accident.', 'loading sets aria-busy and blocks clicks; the label stays.', 'IconButton requires a label, used as accessible name and tooltip.', 'lg is 44px: use it on touch layouts.'],
    props: {
      Button: [
        { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: 'Visual weight.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '32px, 40px or 44px tall.' },
        { name: 'loading', type: 'boolean', description: 'Shows a spinner and blocks clicks.' },
        { name: 'icon', type: 'ReactNode', description: 'Decorative icon before the label.' },
        { name: '…rest', type: 'ButtonHTMLAttributes', description: 'Everything a <button> accepts.' },
      ],
      IconButton: [
        { name: 'label', type: 'string', description: 'Required accessible name.' },
        { name: 'variant / size', type: 'as Button', default: "'ghost' / 'md'", description: 'Same options as Button.' },
      ],
    },
  },
  {
    id: 'input', name: 'Input, Textarea, Select', group: 'Forms', example: 'Input',
    summary: 'Text-like form controls with a visible label, optional hint and error, wired for assistive tech.',
    use: ['Always give a label; use placeholder only for an example value.', 'Put the fix in the error: "Enter a valid email", not "Invalid".'],
    avoid: ['Hiding the label.', 'Colour-only error states: the message is always shown.'],
    a11y: ['Label, hint and error are linked with for / aria-describedby.', 'An error sets aria-invalid and is announced (role="alert").', 'Border uses --border-strong (3:1 against the surface).'],
    props: {
      'Input / Textarea / Select': [
        { name: 'label', type: 'ReactNode', description: 'Required visible label.' },
        { name: 'hint', type: 'ReactNode', description: 'Help text under the control.' },
        { name: 'error', type: 'ReactNode', description: 'Marks the field invalid and shows the message.' },
        { name: 'required', type: 'boolean', description: 'Adds a required marker.' },
        { name: '…rest', type: 'native attributes', description: 'Passed to the underlying element.' },
      ],
    },
  },
  {
    id: 'choice', name: 'Checkbox, Switch', group: 'Forms', example: 'Choice',
    summary: 'Checkbox for a choice that is submitted later. Switch for a setting that applies immediately.',
    use: ['Switch labels describe the setting, not the action ("Background sync").', 'Use hint to explain the effect.'],
    avoid: ['A Switch inside a form that needs a Save button.', 'Negative labels ("Disable X").'],
    a11y: ['Native checkbox inputs: keyboard and form behaviour for free.', 'Switch has role="switch".', 'The whole label is clickable.'],
    props: {
      'Checkbox / Switch': [
        { name: 'label', type: 'ReactNode', description: 'Required visible label.' },
        { name: 'hint', type: 'ReactNode', description: 'Secondary line under the label.' },
        { name: '…rest', type: 'input attributes', description: 'checked, onChange, disabled, name…' },
      ],
    },
  },
  {
    id: 'segmented', name: 'Segmented', group: 'Forms', example: 'Segmented',
    summary: 'Pick exactly one of two to five short options, such as a chart metric or a view mode.',
    use: ['Options that change the view in place.', 'Short labels (one or two words).'],
    avoid: ['More than five options: use Select.', 'Navigation between pages: use Tabs or links.'],
    a11y: ['A radiogroup of native radios: arrow keys move and select.', 'label names the group.'],
    props: {
      Segmented: [
        { name: 'label', type: 'string', description: 'Required accessible name of the group.' },
        { name: 'options', type: '{ value, label }[]', description: 'The choices.' },
        { name: 'value', type: 'string', description: 'Selected value (controlled).' },
        { name: 'onChange', type: '(value) => void', description: 'Called with the new value.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Control height.' },
      ],
    },
  },
  {
    id: 'card', name: 'Card', group: 'Display', example: 'Card',
    summary: 'A raised surface that groups related content, with an optional header.',
    use: ['Group things that belong together.', 'Set headingLevel so the page outline stays correct.'],
    avoid: ['Cards inside cards.', 'Using a card for a single line of text.'],
    a11y: ['Renders a section; the title is a real heading.'],
    props: {
      Card: [
        { name: 'title', type: 'ReactNode', description: 'Heading text.' },
        { name: 'actions', type: 'ReactNode', description: 'Controls on the right of the header.' },
        { name: 'headingLevel', type: '2 | 3 | 4', default: '3', description: 'Which heading element the title uses.' },
        { name: 'as', type: "'section' | 'div' | 'article'", default: "'section'", description: 'Wrapper element.' },
      ],
    },
  },
  {
    id: 'badge', name: 'Badge', group: 'Display', example: 'Badge',
    summary: 'A short status or category label.',
    use: ['One or two words.', 'Pick the tone by meaning: ok = healthy, warn = needs attention soon, danger = broken.'],
    avoid: ['Relying on colour alone: the text always carries the meaning.', 'Using accent for status.'],
    a11y: ['Text colour is --fg; the tone is a dot and tint, so contrast does not depend on the tone.'],
    props: { Badge: [{ name: 'tone', type: "'neutral' | 'accent' | 'ok' | 'warn' | 'danger'", default: "'neutral'", description: 'Meaning of the label.' }] },
  },
  {
    id: 'stat', name: 'Stat, StatGrid', group: 'Display', example: 'Stat',
    summary: 'Key numbers at a glance, in a responsive grid.',
    use: ['Put the unit in unit, not in value.', 'Four to six stats per grid.'],
    avoid: ['Long text values.', 'Stats with no label.'],
    a11y: ['Renders a definition list: each value is announced with its label.', 'Numbers use tabular figures so they do not jitter.'],
    props: {
      Stat: [
        { name: 'label', type: 'ReactNode', description: 'What is measured.' },
        { name: 'value', type: 'ReactNode', description: 'The number.' },
        { name: 'unit', type: 'string', description: 'Smaller unit after the value.' },
        { name: 'hint', type: 'ReactNode', description: 'Context line, e.g. a comparison.' },
      ],
    },
  },
  {
    id: 'table', name: 'Table', group: 'Display', example: 'Table',
    summary: 'A styled native table inside a horizontal scroller.',
    use: ['Use <th scope="col"> and <th scope="row">.', 'Add className="ds-num" to numeric cells to right-align them.'],
    avoid: ['Layout tables.', 'Hiding columns on mobile: let it scroll.'],
    a11y: ['caption names the table (visually hidden by default).', 'The scroller is focusable so keyboard users can scroll it.'],
    props: {
      Table: [
        { name: 'caption', type: 'string', description: 'Required accessible name.' },
        { name: 'showCaption', type: 'boolean', description: 'Show the caption visibly.' },
      ],
    },
  },
  {
    id: 'code-block', name: 'CodeBlock', group: 'Display', example: 'CodeBlock',
    summary: 'A monospace block with a copy button, for commands, IDs and payloads.',
    use: ['Identifiers, commands and JSON: they are never translated.'],
    avoid: ['Long files: link to them.'],
    a11y: ['The block is focusable so long lines can be scrolled by keyboard.', 'The copy button announces "Copied".'],
    props: { CodeBlock: [{ name: 'code', type: 'string', description: 'The text.' }, { name: 'language', type: 'string', description: 'Small tag in the corner.' }] },
  },
  {
    id: 'alert', name: 'Alert', group: 'Feedback', example: 'Alert',
    summary: 'An inline message about the state of the page or an operation.',
    use: ['Say what happened and what to do next.', 'Offer the fix in action (retry, reconnect).'],
    avoid: ['Stacking several alerts.', 'Using danger for things the user cannot act on.'],
    a11y: ['warn and danger use role="alert" (announced at once); info and ok use role="status".', 'Never colour-only: the left bar is reinforced by the title.'],
    props: {
      Alert: [
        { name: 'tone', type: "'info' | 'ok' | 'warn' | 'danger'", default: "'info'", description: 'Severity.' },
        { name: 'title', type: 'ReactNode', description: 'One-line summary.' },
        { name: 'children', type: 'ReactNode', description: 'Details.' },
        { name: 'action', type: 'ReactNode', description: 'A button, usually.' },
      ],
    },
  },
  {
    id: 'empty-state', name: 'EmptyState', group: 'Feedback', example: 'EmptyState',
    summary: 'What to show when there is nothing yet.',
    use: ['Explain what will appear here and how to get it.', 'Include one clear primary action.'],
    avoid: ['A bare "No data".'],
    a11y: ['The icon is decorative and hidden from assistive tech.'],
    props: {
      EmptyState: [
        { name: 'title', type: 'ReactNode', description: 'Short statement.' },
        { name: 'children', type: 'ReactNode', description: 'Next-step explanation.' },
        { name: 'action', type: 'ReactNode', description: 'Primary action.' },
        { name: 'icon', type: 'ReactNode', description: 'Decorative glyph.' },
      ],
    },
  },
  {
    id: 'spinner', name: 'Spinner', group: 'Feedback', example: 'Spinner',
    summary: 'Indicates work in progress when duration is unknown.',
    use: ['Pair with a label for longer waits.'],
    avoid: ['Spinners for under ~300 ms.'],
    a11y: ['role="status" with an accessible label; pass label="" when inside a labelled control.', 'Spins slower under prefers-reduced-motion.'],
    props: { Spinner: [{ name: 'size', type: 'string', default: "'1.25rem'", description: 'CSS length.' }, { name: 'label', type: 'string', default: "'Loading'", description: 'Announced text.' }] },
  },
  {
    id: 'tabs', name: 'Tabs', group: 'Navigation', example: 'Tabs',
    summary: 'Switch between sibling panels of the same page.',
    use: ['Two to six tabs with short labels.'],
    avoid: ['Tabs that change the URL or page: use links.', 'Hiding content the user must see.'],
    a11y: ['Full WAI-ARIA tabs pattern: arrow keys, Home and End; only the active tab is in the tab order.'],
    props: {
      Tabs: [
        { name: 'label', type: 'string', description: 'Required name of the tab list.' },
        { name: 'tabs', type: '{ id, label, content }[]', description: 'The tabs and their panels.' },
        { name: 'defaultId / value / onChange', type: 'string / string / fn', description: 'Uncontrolled or controlled selection.' },
      ],
    },
  },
  {
    id: 'modal', name: 'Modal', group: 'Overlays', example: 'Modal',
    summary: 'A focused dialog that blocks the page until dismissed.',
    use: ['Short, self-contained tasks.', 'Title says what the dialog is for; footer holds the actions.'],
    avoid: ['Long flows: use a page.', 'Modal on top of modal.'],
    a11y: ['Built on native <dialog>: focus is trapped, Esc closes, the page behind is inert, focus returns to the opener.', 'The title names the dialog.'],
    props: {
      Modal: [
        { name: 'open', type: 'boolean', description: 'Controlled visibility.' },
        { name: 'onClose', type: '() => void', description: 'Esc, backdrop click or the Close button.' },
        { name: 'title', type: 'ReactNode', description: 'Required dialog name.' },
        { name: 'footer', type: 'ReactNode', description: 'Actions. Defaults to a Close button.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '24, 32 or 48 rem wide.' },
      ],
    },
  },
  {
    id: 'file-drop-zone', name: 'FileDropZone', group: 'Forms', example: 'FileDropZone',
    summary: 'Drag-and-drop target that is also a normal file picker.',
    use: ['Say which formats are accepted.'],
    avoid: ['Drag-only upload.'],
    a11y: ['The "Choose file" button covers keyboard and touch users.'],
    props: {
      FileDropZone: [
        { name: 'onFiles', type: '(files: File[]) => void', description: 'Called with the chosen or dropped files.' },
        { name: 'accept', type: 'string', description: 'File types for the picker.' },
        { name: 'multiple', type: 'boolean', description: 'Allow more than one file.' },
      ],
    },
  },
  {
    id: 'site-header', name: 'SiteHeader', group: 'Layout', example: 'SiteHeader',
    summary: 'The top bar of every public page: brand, primary navigation, and the controls that always stay visible. Collapses into a menu button on narrow screens.',
    use: ['Brand on the left, navigation next, one primary action on the right (put it in actions).', 'Mark the current page with current: true.', 'Add a language link with lang and hrefLang so screen readers pronounce it correctly.', 'Pass renderLink to use your router\'s link component for internal links.'],
    avoid: ['More than about six links: group them or move them to the footer.', 'Putting the whole navigation in actions: it would not collapse.', 'A different header on each page of the same product.'],
    a11y: ['The brand link needs a label when the name is an image (brand.label).', 'Navigation is a labelled <nav>; the mobile menu is a disclosure button with aria-expanded and aria-controls.', 'Esc closes the menu and returns focus to the button; so does choosing a link or clicking outside.', 'Links and the menu button are at least 44px tall. Pair with SkipLink as the first element on the page.'],
    props: {
      SiteHeader: [
        { name: 'brand', type: '{ name, href?, mark?, label? }', description: 'Wordmark or logo, where it links to, optional decorative mark.' },
        { name: 'nav', type: 'NavLink[]', description: 'Primary links: { label, href, current?, external?, lang?, hrefLang? }.' },
        { name: 'navLabel', type: 'string', default: "'Primary'", description: 'Accessible name of the navigation.' },
        { name: 'actions', type: 'ReactNode', description: 'Always-visible controls on the right.' },
        { name: 'sticky', type: 'boolean', description: 'Keep the header at the top while scrolling.' },
        { name: 'renderLink', type: '(props) => ReactNode', description: 'Render internal links with your router.' },
        { name: 'menuLabel', type: '{ open, close }', description: 'Translate the menu button label.' },
      ],
      'Related: SkipLink, Container': [
        { name: 'SkipLink', type: 'href?, children?', default: "'#main', 'Skip to content'", description: 'Visible only when focused.' },
        { name: 'Container', type: 'div attributes', description: 'Centres content at --max-width with the page gutter.' },
      ],
    },
  },
  {
    id: 'site-footer', name: 'SiteFooter', group: 'Layout', example: 'SiteFooter',
    summary: 'The bottom of every public page: what the product is, where to go next, and who made it, with the shared "Made with love by nyt87" credit.',
    use: ['A tagline of one or two sentences, then link columns or one row of links.', 'Use notes for disclaimers, affiliation and licence lines.', 'Keep the credit: it ties every product back to the studio.'],
    avoid: ['Repeating the whole header navigation.', 'Legal text in the tagline: use notes.'],
    a11y: ['Each column is a <nav> named by its title, and the title is a real heading.', 'External links open in a new tab with rel="noopener noreferrer".', 'The heart is announced as "love".'],
    props: {
      SiteFooter: [
        { name: 'brand', type: '{ name, href?, mark?, label? }', description: 'Same shape as the header brand.' },
        { name: 'tagline', type: 'ReactNode', description: 'What the product is.' },
        { name: 'columns', type: '{ title, links }[]', description: 'Titled link groups.' },
        { name: 'links / linksLabel', type: 'NavLink[] / string', description: 'A single row of links instead of columns.' },
        { name: 'notes', type: 'ReactNode[]', description: 'Disclaimer and licence lines under the credit.' },
        { name: 'copyright', type: 'ReactNode', description: 'Owner in the copyright line. Defaults to the brand name.' },
        { name: 'credit', type: "boolean | { name, href }", default: 'true', description: 'The studio credit. false hides it.' },
        { name: 'year', type: 'number', default: 'current year', description: 'Copyright year.' },
        { name: 'renderLink', type: '(props) => ReactNode', description: 'Render internal links with your router.' },
      ],
    },
  },
  {
    id: 'theme-scope', name: 'ThemeScope', group: 'Theming', example: 'ThemeScope',
    summary: 'Re-colour everything inside it with your own colours, in light and dark mode, without writing global CSS. Use the theme builder to pick colours that pass contrast.',
    use: ['List only the tokens you change; the rest inherit from the brand.', 'Provide both light and dark values for the accent family: accent, on-accent, accent-ink, ring.', 'For a whole product, set the theme once with defineTheme and data-accent instead (see the theme builder).'],
    avoid: ['Changing status colours (ok, warn, danger): they carry meaning.', 'Overriding tokens with hex values in component CSS.', 'Using a pale accent: on-accent text must reach 4.5:1.'],
    a11y: ['The theme is checked against the same WCAG rules as the built-in themes; failures are logged to the console, or passed to onContrastFailures.', 'Unknown token names throw, so typos do not silently do nothing.'],
    props: {
      ThemeScope: [
        { name: 'light', type: 'Partial<ColorTokens>', description: 'Colour overrides for light mode.' },
        { name: 'dark', type: 'Partial<ColorTokens>', description: 'Colour overrides for dark mode (OS preference or data-theme="dark").' },
        { name: 'as', type: 'ElementType', default: "'div'", description: 'Wrapper element.' },
        { name: 'onContrastFailures', type: '(failures) => void', description: 'Replaces the default console warning.' },
      ],
    },
  },
];

export const groupOrder: ComponentDoc['group'][] = ['Layout', 'Actions', 'Forms', 'Display', 'Feedback', 'Navigation', 'Overlays', 'Theming'];
