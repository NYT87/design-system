import { Alert, Badge, Button, Tabs, ThemeScope } from '@nyt87/ui';

// Only list the tokens you change. Components inside pick them up in light and dark mode.
export default function Example() {
  return (
    <ThemeScope
      className="stack"
      light={{ accent: '#0a5ad4', 'accent-ink': '#0a5ad4', ring: '#0a5ad4' }}
      dark={{ accent: '#5aa2ff', 'on-accent': '#08111c', 'accent-ink': '#5aa2ff', ring: '#5aa2ff' }}
    >
      <div className="row">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Badge tone="accent">Beta</Badge>
      </div>
      <Alert title="Your own brand colours">Everything here uses a blue accent defined in this component only.</Alert>
      <Tabs label="Demo" tabs={[{ id: 'a', label: 'Overview', content: 'Selected tab uses the accent.' }, { id: 'b', label: 'Details', content: 'Second tab.' }]} />
    </ThemeScope>
  );
}
