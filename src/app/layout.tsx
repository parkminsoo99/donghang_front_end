'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import StyledComponentsRegistry from './lib/registry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <StyledComponentsRegistry>
            <AntdRegistry>{children}</AntdRegistry>
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
