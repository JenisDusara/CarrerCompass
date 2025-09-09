'use server';

/**
 * @fileOverview Career path suggestion AI agent.
 *
 * - careerExplorerSuggestions - A function that suggests career paths and details based on user interests.
 * - CareerExplorerSuggestionsInput - The input type for the careerExplorerSuggestions function.
 * - CareerExplorerSuggestionsOutput - The return type for the careerExplorerSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerExplorerSuggestionsInputSchema = z.object({
  userInterests: z
    .string()
    .describe('The interests of the user, used to tailor career suggestions.'),
  locality: z
    .string()
    .optional()
    .describe('The general locality of the user, can be used to add salary information to the output.'),
});
export type CareerExplorerSuggestionsInput = z.infer<
  typeof CareerExplorerSuggestionsInputSchema
>;

const CareerExplorerSuggestionsOutputSchema = z.object({
  careerSuggestions: z.array(
    z.object({
      jobTitle: z.string().describe('The title of the job.'),
      jobDescription: z.string().describe('A description of the job.'),
      requiredSkills: z.array(z.string()).describe('The skills required for the job.'),
      averageSalary: z.string().optional().describe('The average salary for the job in the specified locality, if available.'),
      onlineCourses: z.array(z.object({
        courseName: z.string().describe('The name of the online course.'),
        platform: z.string().describe('The platform offering the course (e.g., Coursera, Udemy).'),
        url: z.string().url().describe('A placeholder URL to the course.'),
      })).describe('A list of suggested online courses from platforms like Coursera or Udemy. Use placeholder URLs.'),
    })
  ).describe('A list of career suggestions based on the user interests.'),
});
export type CareerExplorerSuggestionsOutput = z.infer<
  typeof CareerExplorerSuggestionsOutputSchema
>;

export async function careerExplorerSuggestions(
  input: CareerExplorerSuggestionsInput
): Promise<CareerExplorerSuggestionsOutput> {
  return careerExplorerSuggestionsFlow(input);
}

const getSalaryInformation = ai.defineTool({
  name: 'getSalaryInformation',
  description: 'Retrieves the average salary for a job in a given locality.',
  inputSchema: z.object({
    jobTitle: z.string().describe('The title of the job.'),
    locality: z.string().describe('The locality to search for salary information in.'),
  }),
  outputSchema: z.string().optional().describe('The average salary for the job in the specified locality.'),
},
async (input) => {
  // In a real application, this would call an external API or database to get salary information.
  // This is a placeholder implementation.
  console.log("Getting salary information for " + input.jobTitle + " in " + input.locality);
  return `Placeholder: Average salary for ${input.jobTitle} in ${input.locality}`;
}
);

const prompt = ai.definePrompt({
  name: 'careerExplorerSuggestionsPrompt',
  input: {schema: CareerExplorerSuggestionsInputSchema},
  output: {schema: CareerExplorerSuggestionsOutputSchema},
  tools: [getSalaryInformation],
  prompt: `Based on the user's interests: {{{userInterests}}}, suggest several possible career paths. 

For each career path, provide a job title, a brief job description, a list of required skills, and a list of 2-3 relevant online courses from platforms like Coursera or Udemy.

If the user provided a locality: {{{locality}}}, use the getSalaryInformation tool to retrieve and include the average salary for the job in that locality.

Return the results as a JSON object. For course URLs, provide placeholder links like https://www.coursera.org/search?query=...`,
});

const careerExplorerSuggestionsFlow = ai.defineFlow(
  {
    name: 'careerExplorerSuggestionsFlow',
    inputSchema: CareerExplorerSuggestionsInputSchema,
    outputSchema: CareerExplorerSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
