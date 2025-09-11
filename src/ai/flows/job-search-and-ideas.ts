'use server';

/**
 * @fileOverview A job search AI agent that provides project ideas and hiring links.
 *
 * - findJobsAndIdeas - A function that suggests project ideas and finds job openings.
 * - JobSearchInput - The input type for the findJobsAndIdeas function.
 * - JobSearchOutput - The return type for the findJobsAndIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobSearchInputSchema = z.object({
  jobType: z.string().describe('The type of job the user is looking for (e.g., "Software Engineer").'),
  experience: z.string().describe('The user\'s experience level (e.g., "Entry Level", "Mid-Level", "Senior").'),
  location: z.string().describe('The desired job location.'),
});
export type JobSearchInput = z.infer<typeof JobSearchInputSchema>;

const JobSearchOutputSchema = z.object({
    projectIdeas: z.array(z.string()).describe('A list of project ideas related to the job type.'),
    hiringLinks: z.array(z.object({
        platform: z.string().describe('The platform where the job is listed (e.g., LinkedIn, Indeed).'),
        url: z.string().url().describe('The direct URL to the job search results on the platform.'),
    })).describe('A list of links to job search results on various platforms.'),
});
export type JobSearchOutput = z.infer<typeof JobSearchOutputSchema>;

export async function findJobsAndIdeas(input: JobSearchInput): Promise<JobSearchOutput> {
  return jobSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobSearchPrompt',
  input: {schema: JobSearchInputSchema},
  output: {schema: JobSearchOutputSchema},
  prompt: `You are a helpful career assistant. Your task is to provide project ideas and find job opportunities based on the user's preferences.

User Preferences:
- Job Type: {{{jobType}}}
- Experience Level: {{{experience}}}
- Location: {{{location}}}

Instructions:
1.  Generate 3-4 creative and relevant project ideas that someone with this profile could work on to enhance their portfolio.
2.  Generate job search URLs for the following platforms: LinkedIn, Indeed, and foundit.
3.  The URLs should be correctly formatted to search for the specified job type and location. For example, for "Software Engineer" in "Bengaluru", the LinkedIn URL should be "https://www.linkedin.com/jobs/search/?keywords=Software%20Engineer&location=Bengaluru".
4.  Ensure the generated URLs are valid and properly encoded.

Return the results as a JSON object matching the output schema.`,
});

const jobSearchFlow = ai.defineFlow(
  {
    name: 'jobSearchFlow',
    inputSchema: JobSearchInputSchema,
    outputSchema: JobSearchOutputSchema,
  },
  async (input: JobSearchInput) => {
    const { output } = await prompt(input);

    if (!output) {
      throw new Error('Failed to generate job search results.');
    }
    
    // Construct the URLs manually for better reliability
    const encodedJobType = encodeURIComponent(input.jobType);
    const encodedLocation = encodeURIComponent(input.location);

    const hiringLinks = [
        {
            platform: 'LinkedIn',
            url: `https://www.linkedin.com/jobs/search/?keywords=${encodedJobType}&location=${encodedLocation}`
        },
        {
            platform: 'Indeed',
            url: `https://in.indeed.com/jobs?q=${encodedJobType}&l=${encodedLocation}`
        },
        {
            platform: 'foundit',
            url: `https://www.foundit.in/search/${encodedJobType}-jobs-in-${input.location.toLowerCase().replace(/\s+/g, '-')}`
        }
    ];

    return {
        projectIdeas: output.projectIdeas,
        hiringLinks: hiringLinks,
    };
  }
);
