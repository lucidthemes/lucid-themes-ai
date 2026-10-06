'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { EllipsisVertical, LogOutIcon } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner';
import { createClient } from '@/lib/supabase/client';

export default function DashboardLayoutSidebarFooter({ authEmail }: { authEmail: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const avatarInitial = authEmail?.charAt(0);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />}>
            <Avatar>
              <AvatarFallback className="capitalize">{avatarInitial}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-xs">{authEmail}</span>
            </div>
            <EllipsisVertical className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit" side="top" align="center" sideOffset={10}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal text-inherit">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar>
                    <AvatarFallback className="capitalize">{avatarInitial}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate text-xs">{authEmail}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                startTransition(async () => {
                  const supabase = createClient();

                  const { error } = await supabase.auth.signOut({ scope: 'local' });

                  if (!error) router.push('/auth/login');
                });
              }}
            >
              <LogOutIcon />
              Log out
              {isPending && <Spinner />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
