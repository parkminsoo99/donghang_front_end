'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import StyledComponentsRegistry from './lib/registry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components/compounds/Header';
import { CustomModal } from '@/hooks/useModal';
const inter = Inter({ subsets: ['latin'] });
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Script from 'next/script';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const theme = createTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <StyledComponentsRegistry>
        <AntdRegistry>
          <ThemeProvider theme={theme}>
            <html lang="en">
              <Script
                strategy="afterInteractive"
                src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
              />
              <body className={inter.className}>
                <Header />
                <CustomModal />
                {children}
              </body>
            </html>
          </ThemeProvider>
        </AntdRegistry>
      </StyledComponentsRegistry>
    </QueryClientProvider>
  );
}
