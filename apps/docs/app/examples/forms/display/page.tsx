import { Separator } from '@codefast/ui/separator';
import { DisplayForm } from '@/app/examples/forms/display/_components/display-form';
import type { JSX } from 'react';

export default function SettingsDisplayPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Display</h3>
        <p className="text-muted-foreground text-sm">
          Turn items on or off to control what&apos;s displayed in the app.
        </p>
      </div>
      <Separator />
      <DisplayForm />
    </div>
  );
}
