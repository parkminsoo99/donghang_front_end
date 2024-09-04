'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import StyledComponentsRegistry from './lib/registry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components/compounds/Header';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StyledComponentsRegistry>
        <AntdRegistry>
          <html lang="en">
            <body className={inter.className}>
              <Header />
              {children}
            </body>
          </html>
        </AntdRegistry>
      </StyledComponentsRegistry>
    </QueryClientProvider>
  );
}
