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
      <SidebarInset className="overflow-x-auto">
        <DashboardLayoutHeader />
        <div className="h-full p-5 sm:p-7.5 md:p-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
