import { Input, Select, Textarea } from '@nyt87/ui';

export default function Example() {
  return (
    <div className="stack" style={{ maxWidth: '24rem' }}>
      <Input label="Project name" placeholder="my-project" hint="Lowercase, no spaces." />
      <Input label="Email" type="email" required error="Enter a valid email address." defaultValue="not-an-email" />
      <Select label="Region" defaultValue="eu">
        <option value="eu">Europe</option>
        <option value="us">United States</option>
        <option value="kr">Korea</option>
      </Select>
      <Textarea label="Notes" placeholder="Anything we should know?" />
      <Input label="Disabled" disabled defaultValue="Read only" />
    </div>
  );
}
