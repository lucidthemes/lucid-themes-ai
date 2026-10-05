'use client';

import { Moon, Sun, Check } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function DashboardLayoutHeaderThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon" className="h-8 w-8 cursor-pointer">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme('light')} className="flex cursor-pointer justify-between">
          <div className="flex items-center gap-2">
            <Sun />
            Light
          </div>
          {theme && theme === 'light' && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="flex cursor-pointer justify-between">
          <div className="flex items-center gap-2">
            <Moon />
            Dark
          </div>
          {theme && theme === 'dark' && <Check />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
