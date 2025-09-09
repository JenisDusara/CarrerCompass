import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, BotMessageSquare, Compass, Lightbulb, User } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome Back!</h1>
          <p className="text-muted-foreground">Here's your career snapshot.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col md:flex-row items-center gap-6 p-6 shadow-md hover:shadow-lg transition-shadow">
          <Image
            src="https://picsum.photos/600/400"
            alt="Hero image for dashboard"
            data-ai-hint="office professional"
            width={300}
            height={200}
            className="rounded-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold font-headline text-primary">Ready to Navigate Your Career?</h2>
            <p className="text-muted-foreground mt-2 mb-4">
              Your journey to a fulfilling career starts now. Explore personalized roadmaps, discover new opportunities, and get guidance from your AI mentor.
            </p>
            <Link href="/roadmap">
              <Button>
                View My Roadmap <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Career Matches</CardTitle>
            <Compass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Product Manager</div>
            <p className="text-xs text-muted-foreground">+3 other suggestions</p>
          </CardContent>
          <CardContent>
            <Link href="/explore">
              <Button variant="outline" className="w-full">
                Explore Careers
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Key Skills to Learn</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Agile Methodologies</li>
              <li>Market Research</li>
              <li>User-Centric Design</li>
            </ul>
          </CardContent>
           <CardContent>
            <Link href="/roadmap">
              <Button variant="outline" className="w-full">
                Build Skills
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Your Personality Type</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">The Innovator</div>
             <p className="text-xs text-muted-foreground">Based on your quiz results</p>
          </CardContent>
          <CardContent>
            <Link href="/quiz">
              <Button variant="outline" className="w-full">
                Take the Quiz
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
