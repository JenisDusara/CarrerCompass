'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { careerExplorerSuggestions, type CareerExplorerSuggestionsOutput } from '@/ai/flows/career-explorer-suggestions';
import { Loader2, Zap, GraduationCap, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  userInterests: z.string().min(10, 'Please describe your interests in a bit more detail.'),
  locality: z.string().optional(),
});

export default function CareerExplorerPage() {
  const [suggestions, setSuggestions] = useState<CareerExplorerSuggestionsOutput['careerSuggestions']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInterests: '',
      locality: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await careerExplorerSuggestions(values);
      setSuggestions(result.careerSuggestions);
    } catch (error) {
      console.error('Failed to get career suggestions:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch career suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Career Explorer</h1>
        <p className="text-muted-foreground">Discover career paths tailored to your passions.</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Find Your Calling</CardTitle>
          <CardDescription>Tell us what you're passionate about, and our AI will suggest potential career paths.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userInterests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'I love creative writing, video games, and technology.'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Location (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'San Francisco, CA' for salary estimates" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                Generate Suggestions
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full mt-2"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-20 bg-muted rounded-full"></div>
                  <div className="h-6 w-24 bg-muted rounded-full"></div>
                  <div className="h-6 w-16 bg-muted rounded-full"></div>
                </div>
                 <div className="h-4 bg-muted rounded w-1/4 mt-4"></div>
                 <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                 </div>
              </CardContent>
              <CardFooter>
                 <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-headline">Your Suggested Careers</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="flex flex-col shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{suggestion.jobTitle}</CardTitle>
                  <CardDescription>{suggestion.jobDescription}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.requiredSkills.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                   {suggestion.onlineCourses && suggestion.onlineCourses.length > 0 && (
                    <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2"><GraduationCap className="h-5 w-5"/> Recommended Courses</h4>
                        <ul className="space-y-2">
                        {suggestion.onlineCourses.map((course, i) => (
                            <li key={i} className="text-sm">
                                <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-2">
                                   {course.courseName} <span className="text-muted-foreground">({course.platform})</span>
                                   <ExternalLink className="h-4 w-4 shrink-0" />
                                </a>
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}
                </CardContent>
                <CardFooter className="flex-wrap items-center justify-between gap-2">
                    {suggestion.averageSalary && (
                        <p className="text-sm text-muted-foreground font-medium">
                        Avg. Salary: <span className="text-primary">{suggestion.averageSalary}</span>
                        </p>
                    )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
