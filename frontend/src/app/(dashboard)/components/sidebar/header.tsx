import Link from 'next/link';
import { Brain } from 'lucide-react';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export default function DashboardLayoutSidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          render={
            <Link href="/">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Brain className="size-4" />
              </div>
              <div className="flex min-w-fit flex-col gap-0.5 leading-none opacity-100 transition-all delay-200 group-has-data-[collapsible=icon]/sidebar-wrapper:opacity-0">
                <span className="font-medium">Lucid Themes AI</span>
              </div>
            </Link>
          }
        ></SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
