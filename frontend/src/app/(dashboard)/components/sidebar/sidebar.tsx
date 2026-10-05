import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

import DashboardLayoutSidebarHeader from './header';
import DashboardLayoutSidebarGroupSearch from './group-search';
import DashboardLayoutSidebarGroupSummarize from './group-summarize';
import DashboardLayoutSidebarGroupGenerate from './group-generate';
import DashboardLayoutSidebarGroupValidate from './group-validate';
import DashboardLayoutSidebarFooter from './footer';

export default function DashboardLayoutSidebar({ authEmail }: { authEmail: string }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <DashboardLayoutSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <DashboardLayoutSidebarGroupSearch />
        <DashboardLayoutSidebarGroupSummarize />
        <DashboardLayoutSidebarGroupGenerate />
        <DashboardLayoutSidebarGroupValidate />
      </SidebarContent>
      <SidebarFooter>
        <DashboardLayoutSidebarFooter authEmail={authEmail} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
