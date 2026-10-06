import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

type SidebarNavMenuSubItems = {
  title: string;
  url: string;
  isActive?: boolean;
  items?: SidebarNavMenuSubItems[];
};

export type SidebarNavMenu = {
  title: string;
  url: string;
  icon: React.ReactNode;
  isActive?: boolean;
  isCollapsible?: boolean;
  items?: SidebarNavMenuSubItems[];
};

export default function DashboardLayoutSidebarNavMenu({ items }: { items: SidebarNavMenu[] }) {
  if (!items) return;

  return (
    <SidebarMenu>
      {items.map((item) => {
        if (!item.isCollapsible) {
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} render={<Link href={item.url} className="transition-colors" />}>
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        }

        if (item.isCollapsible) {
          return (
            <Collapsible
              key={item.title}
              defaultOpen={item.isActive}
              className="group/collapsible"
              render={<SidebarMenuItem />}
            >
              <CollapsibleTrigger render={<SidebarMenuButton tooltip={item.title} className="transition-colors" />}>
                {item.icon}
                <span>{item.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items &&
                    item.items?.map((secondLevelItem) => {
                      if (!secondLevelItem.items) {
                        return (
                          <SidebarMenuSubItem key={secondLevelItem.title}>
                            <SidebarMenuSubButton
                              render={<Link href={secondLevelItem.url} className="h-9 transition-colors" />}
                            >
                              <span>{secondLevelItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      }

                      if (secondLevelItem.items) {
                        return (
                          <Collapsible
                            key={item.title}
                            defaultOpen={secondLevelItem.isActive}
                            className="group/collapsible-submenu"
                            render={<SidebarMenuItem />}
                          >
                            <CollapsibleTrigger
                              render={
                                <SidebarMenuButton tooltip={secondLevelItem.title} className="transition-colors" />
                              }
                            >
                              <span>{secondLevelItem.title}</span>
                              <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible-submenu:rotate-90" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {secondLevelItem.items?.map((thirdLevelItem) => (
                                  <SidebarMenuSubItem key={thirdLevelItem.title}>
                                    <SidebarMenuSubButton
                                      render={<Link href={thirdLevelItem.url} className="transition-colors" />}
                                    >
                                      <span>{thirdLevelItem.title}</span>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>
                        );
                      }
                    })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          );
        }
      })}
    </SidebarMenu>
  );
}
