'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { ArrowRight } from 'lucide-react';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="items-center text-center">
            <Logo />
            <CardTitle className="pt-4 text-3xl font-bold font-headline">Welcome to CareerCompass</CardTitle>
            <CardDescription>Your AI-powered guide to a brighter career.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" defaultValue="guest@careercompass.ai" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" defaultValue="password" />
                </div>
              </div>
              <Link href="/dashboard" passHref>
                <Button className="w-full mt-6" size="lg">
                  Login
                  <ArrowRight />
                </Button>
              </Link>
            </form>
            <div className="my-4 flex items-center">
              <Separator className="flex-1" />
              <span className="mx-4 text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>
            <GoogleSignInButton />
            <div className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <Link href="#" className="underline text-primary">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
