import { useState } from 'react';
import { Button, Input, Modal } from '@nyt87/ui';

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open settings</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Settings"
        footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Save</Button></>}
      >
        <Input label="Display name" defaultValue="Ada" />
      </Modal>
    </>
  );
}
