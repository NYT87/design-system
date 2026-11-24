import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Alert, Button, Checkbox, IconButton, Input, Modal, Segmented, Switch, Table, Tabs } from '../src';

describe('Button', () => {
  it('blocks clicks and is marked busy while loading', () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Save</Button>);
    const b = screen.getByRole('button', { name: 'Save' });
    expect(b).toBeDisabled();
    expect(b).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(b);
    expect(onClick).not.toHaveBeenCalled();
  });
  it('defaults to type=button so it never submits a form by accident', () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
  it('IconButton exposes its label as the accessible name', () => {
    render(<IconButton label="Close">×</IconButton>);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});

describe('Input / Field', () => {
  it('links label, hint and error to the control', () => {
    render(<Input label="Email" hint="Work address" error="Required" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const described = input.getAttribute('aria-describedby')!.split(' ').map((id) => document.getElementById(id)?.textContent);
    expect(described).toEqual(['Work address', 'Required']);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });
  it('is not invalid without an error', () => {
    render(<Input label="Name" />);
    expect(screen.getByLabelText('Name')).not.toHaveAttribute('aria-invalid');
  });
});

describe('Checkbox / Switch', () => {
  it('Switch has the switch role and toggles', () => {
    const Demo = () => { const [on, set] = useState(false); return <Switch label="Sync" checked={on} onChange={(e) => set(e.target.checked)} />; };
    render(<Demo />);
    const s = screen.getByRole('switch', { name: 'Sync' });
    expect(s).not.toBeChecked();
    fireEvent.click(s);
    expect(s).toBeChecked();
  });
  it('Checkbox is labelled', () => {
    render(<Checkbox label="Agree" />);
    expect(screen.getByRole('checkbox', { name: 'Agree' })).toBeInTheDocument();
  });
});

describe('Segmented', () => {
  it('reports the chosen value', () => {
    const onChange = vi.fn();
    render(<Segmented label="Metric" value="a" onChange={onChange} options={[{ value: 'a', label: 'Speed' }, { value: 'b', label: 'Pace' }]} />);
    expect(screen.getByRole('radiogroup', { name: 'Metric' })).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Pace'));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});

describe('Alert', () => {
  it('announces danger immediately and info politely', () => {
    render(<><Alert tone="danger" title="Failed" /><Alert tone="info" title="FYI" /></>);
    expect(screen.getByRole('alert')).toHaveTextContent('Failed');
    expect(screen.getByRole('status')).toHaveTextContent('FYI');
  });
});

describe('Modal', () => {
  it('opens, names itself by its title and closes via the default button', () => {
    const onClose = vi.fn();
    const { rerender } = render(<Modal open={false} onClose={onClose} title="Settings">Body</Modal>);
    expect(document.querySelector('dialog')).not.toHaveAttribute('open');
    rerender(<Modal open onClose={onClose} title="Settings">Body</Modal>);
    expect(screen.getByRole('dialog', { name: 'Settings' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });
});

describe('Tabs', () => {
  const tabs = [{ id: 'a', label: 'One', content: 'Panel A' }, { id: 'b', label: 'Two', content: 'Panel B' }, { id: 'c', label: 'Three', content: 'Panel C' }];
  it('moves with arrow keys, wraps, and only the active tab is tabbable', () => {
    render(<Tabs label="Sections" tabs={tabs} />);
    const one = screen.getByRole('tab', { name: 'One' });
    expect(one).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('tabindex', '-1');
    fireEvent.keyDown(one, { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel C')).toBeVisible();
    fireEvent.keyDown(screen.getByRole('tab', { name: 'Three' }), { key: 'Home' });
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  });
});

describe('Table', () => {
  it('names the table and its scroll region', () => {
    render(<Table caption="Laps"><tbody><tr><td>1</td></tr></tbody></Table>);
    expect(screen.getByRole('table', { name: 'Laps' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Laps' })).toBeInTheDocument();
  });
});
