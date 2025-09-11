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

  const isAuthPage = pathname === '/' || pathname === '/signup';

  if (isAppPage) {
    return (
      <>
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </>
    );
  }

  if (isAuthPage) {
     return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
