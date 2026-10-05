import { TooltipProvider } from '@/components/ui/tooltip';

import { ThemeProvider } from './theme-provider';
import TanStackQueryClientProvider from './query-client-provider';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <TanStackQueryClientProvider>
      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </TanStackQueryClientProvider>
  );
}
