'use client';
import { Inter } from 'next/font/google';
import { CustomModal } from '@/hooks/useModal';
const inter = Inter({ subsets: ['latin'] });

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <CustomModal />
    </>
  );
}
