'use client';

import { usePathname } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import { Toaster } from '@/components/ui/toaster';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppPage =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/explore') ||
    pathname.startsWith('/quiz') ||
    pathname.startsWith('/jobs') ||
    pathname.startsWith('/roadmap');

  return (
    <>
      {isAppPage ? <AppLayout>{children}</AppLayout> : <>{children}</>}
      <Toaster />
    </>
  );
}
