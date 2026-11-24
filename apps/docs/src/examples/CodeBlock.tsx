import { CodeBlock } from '@nyt87/ui';

export default function Example() {
  return <CodeBlock language="bash" code={'curl https://api.example.com/v1/tools \\\n  -H "Authorization: Bearer $TOKEN"'} />;
}
