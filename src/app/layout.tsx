'use client';
import type { Metadata } from 'next';
import './globals.css';
import PageLayout from '@/components/PageLayout';
import { useSearchParams } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // By calling useSearchParams() here, we ensure the searchParams object is
  // correctly unwrapped for all child components, preventing the Next.js error.
  useSearchParams();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
