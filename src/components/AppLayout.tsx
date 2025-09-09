'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  LayoutDashboard,
  BotMessageSquare,
  ClipboardCheck,
  Lightbulb,
  LogOut,
  Search,
  User,
  PanelLeft,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Chatbot from '@/components/Chatbot';
import { Input } from './ui/input';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/roadmap', icon: Compass, label: 'My Roadmap' },
  { href: '/explore', icon: Search, label: 'Career Explorer' },
  { href: '/quiz', icon: Lightbulb, label: 'Aptitude Quiz' },
];

function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 text-xl font-bold text-primary p-2">
          <Compass className="h-6 w-6" />
          <h1 className="font-headline group-data-[collapsible=icon]:hidden">CareerCompass</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton as="a" isActive={pathname === item.href} tooltip={item.label}>
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Link href="/" passHref legacyBehavior>
          <SidebarMenuButton as="a" tooltip="Logout">
            <LogOut />
            <span>Logout</span>
          </SidebarMenuButton>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

function AppHeader() {
  const { isMobile, toggleSidebar } = useSidebar();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
      {isMobile && (
        <Button variant="outline" size="icon" className="shrink-0" onClick={toggleSidebar}>
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      )}
      <div className="w-full flex-1">
        {/* Placeholder for potential breadcrumbs or page title */}
      </div>
      <ChatbotTrigger />
      <UserMenu />
    </header>
  );
}

function ChatbotTrigger() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <BotMessageSquare className="h-5 w-5" />
          <span className="sr-only">Open AI Mentor</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] p-0">
        <Chatbot />
      </SheetContent>
    </Sheet>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="https://picsum.photos/id/237/40/40" data-ai-hint="person face" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link href="/" passHref>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-4 lg:p-6 bg-background">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
