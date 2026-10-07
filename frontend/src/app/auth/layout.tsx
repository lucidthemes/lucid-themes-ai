import { redirect } from 'next/navigation';
import { Brain } from 'lucide-react';

import { getAuthClaims } from '@/lib/supabase/auth';
import { isDevelopmentEnvironment } from '@/lib/project-environment';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  if (!isDevelopmentEnvironment) {
    const authClaims = await getAuthClaims();

    if (authClaims) redirect('/');
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="https://www.lucid-themes.com"
          target="_blank"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Brain className="size-4" />
          </div>
          Lucid Themes AI
        </a>
        {children}
      </div>
    </div>
  );
}
