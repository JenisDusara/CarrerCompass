'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { generatePersonalizedRoadmap, type PersonalizedRoadmapOutput } from '@/ai/flows/personalized-roadmap-generation';
import { Loader2, CheckCircle, BookOpen, ExternalLink, Flag } from 'lucide-react';

const formSchema = z.object({
  careerGoals: z.string().min(10, 'Please describe your career goals in more detail.'),
});

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<PersonalizedRoadmapOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      careerGoals: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRoadmap(null);
    try {
      const result = await generatePersonalizedRoadmap({
        ...values,
        userProfile: 'A mid-level software developer with skills in React and Node.js.',
        quizResults: 'Personality type: Innovator. Strengths: Problem-solving, creativity.',
      });
      setRoadmap(result);
    } catch (error) {
      console.error('Failed to generate roadmap:', error);
      toast({
        title: 'Error',
        description: 'Could not generate your roadmap. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Personalized Roadmap</h1>
        <p className="text-muted-foreground">Your AI-generated path to success.</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Define Your Destination</CardTitle>
          <CardDescription>What is your ultimate career goal? Be as specific as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="careerGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>My Career Goal</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Become a Senior Product Manager at a tech company within 5 years.'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Flag className="mr-2 h-4 w-4" />}
                Generate My Roadmap
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <Card className="shadow-md animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-3/4 mt-2"></div>
          </CardHeader>
          <CardContent className="space-y-4">
             {[...Array(3)].map((_, i) => (
               <div key={i} className="h-12 bg-muted rounded-md"></div>
             ))}
          </CardContent>
         </Card>
      )}

      {roadmap && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Your Custom Roadmap to Success</CardTitle>
            <CardDescription>{roadmap.summary}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
              {roadmap.roadmap.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-4">
                       <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold">
                         {index + 1}
                       </div>
                       {item.step}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-14">
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    {item.isOptional && (
                        <p className="text-sm font-semibold text-accent mb-4">This step is optional but recommended.</p>
                    )}
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><BookOpen className="h-4 w-4" /> Learning Resources</h4>
                    <ul className="space-y-2">
                      {item.resources.map((resource, i) => (
                        <li key={i} className="flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2 text-primary" />
                          <a href="#" className="text-primary hover:underline">{resource}</a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
