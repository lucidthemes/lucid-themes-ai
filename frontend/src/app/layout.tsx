import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import TanStackQueryClientProvider from '@/components/query-client-provider';
import { Toaster } from '@/components/ui/toast';
import { DEFAULT_METADATA } from '@/lib/metadata';

import './globals.css';

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanStackQueryClientProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </TanStackQueryClientProvider>
  );
}
