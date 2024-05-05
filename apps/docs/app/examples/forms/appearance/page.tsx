import { Separator } from '@codefast/ui/separator';
import { type JSX } from 'react';
import { AppearanceForm } from '@/app/examples/forms/appearance/components/appearance-form';

export default function SettingsAppearancePage(): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-muted-foreground text-sm">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
