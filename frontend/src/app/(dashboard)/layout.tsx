import { redirect } from 'next/navigation';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getAuthClaims } from '@/lib/supabase/auth';
import { isDevelopmentModeServer } from '@/lib/development-mode';

import DashboardLayoutSidebar from './components/sidebar';
import DashboardLayoutHeader from './components/header';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let authEmail = 'demo@example.com';

  if (!isDevelopmentModeServer) {
    const authClaims = await getAuthClaims();

    if (!authClaims || !authClaims.email) redirect('/auth/login');

    authEmail = authClaims.email;
  }

  return (
    <SidebarProvider>
      <DashboardLayoutSidebar authEmail={authEmail} />
      <SidebarInset>
        <DashboardLayoutHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
