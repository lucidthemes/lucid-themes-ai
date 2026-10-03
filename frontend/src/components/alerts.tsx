import { cn } from 'cn';
import { CheckCircle2, TriangleAlert, CircleAlert } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function RenderAlert({
  type,
  icon,
  alertTitle,
  alertDescription,
}: {
  type: 'success' | 'amber' | 'error';
  icon: LucideIcon;
  alertTitle: string;
  alertDescription?: string;
}) {
  const alertColors =
    type === 'success'
      ? 'border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-50'
      : type === 'amber'
        ? ' border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50'
        : type === 'error'
          ? ' border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50'
          : '';

  const AlertIcon = icon;

  return (
    <Alert className={cn('max-w-md', alertColors)}>
      <AlertIcon />
      {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
      {alertDescription && <AlertDescription>{alertDescription}</AlertDescription>}
    </Alert>
  );
}

function SuccessAlert({ alertTitle, alertDescription }: { alertTitle: string; alertDescription?: string }) {
  return RenderAlert({ type: 'success', icon: CheckCircle2, alertTitle, alertDescription });
}

function AmberAlert({ alertTitle, alertDescription }: { alertTitle: string; alertDescription?: string }) {
  return RenderAlert({ type: 'amber', icon: TriangleAlert, alertTitle, alertDescription });
}

function ErrorAlert({ alertTitle, alertDescription }: { alertTitle: string; alertDescription?: string }) {
  return RenderAlert({ type: 'error', icon: CircleAlert, alertTitle, alertDescription });
}

export { SuccessAlert, AmberAlert, ErrorAlert };
