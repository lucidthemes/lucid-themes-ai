import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import DashboardLayoutHeaderBreadcrumb from './breadcrumb';
import DashboardLayoutHeaderThemeSwitcher from './theme-switcher';

export default function DashboardLayoutHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 cursor-w-resize" title="Toggle Sidebar" />
        <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
        <DashboardLayoutHeaderBreadcrumb />
      </div>
      <DashboardLayoutHeaderThemeSwitcher />
    </header>
  );
}
