'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { findJobs, type JobSearchOutput } from '@/ai/flows/job-search-and-ideas';
import { Loader2, Search, ExternalLink, Building2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  jobType: z.string().min(2, 'Please enter a valid job title.'),
  experience: z.string({ required_error: 'Please select an experience level.' }),
  location: z.string().min(2, 'Please enter a valid location.'),
});

export default function JobSearchPage() {
  const [results, setResults] = useState<JobSearchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobType: '',
      location: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults(null);
    try {
      const response = await findJobs(values);
      setResults(response);
    } catch (error) {
      console.error('Failed to get job search results:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch job results. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Job Search</h1>
        <p className="text-muted-foreground">Find your next opportunity.</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Search for Your Next Role</CardTitle>
          <CardDescription>Fill in the details below to find jobs.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type / Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'Software Engineer'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Entry Level">Entry Level</SelectItem>
                          <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                          <SelectItem value="Lead/Manager">Lead / Manager</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'Bengaluru'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Find Jobs
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="shadow-md animate-pulse">
            <CardHeader>
                <div className="h-6 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-8 bg-muted rounded w-1/3 mt-2"></div>
                 </div>
            </CardContent>
        </Card>
      )}

      {results && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Your Custom Results</CardTitle>
            <CardDescription>Based on your search for a {form.getValues('experience')} {form.getValues('jobType')} in {form.getValues('location')}.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-3"><Building2 className="text-primary"/> Live Job Openings</h3>
                <p className="text-muted-foreground mb-4">Click the links below to see live job listings on popular platforms.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {results.hiringLinks.map((link, index) => (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" key={index}>
                            <Button variant="outline" className="w-full justify-between h-12">
                                Search on {link.platform}
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </a>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
