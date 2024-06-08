import { Separator } from '@codefast/ui/separator';
import { NotificationsForm } from '@/app/examples/forms/notifications/_components/notifications-form';
import type { JSX } from 'react';

export default function SettingsNotificationsPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-muted-foreground text-sm">Configure how you receive notifications.</p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  );
}
