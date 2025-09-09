'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a personalized career roadmap based on user profile, quiz results, and career goals.
 *
 * - generatePersonalizedRoadmap - A function that generates a personalized career roadmap.
 * - PersonalizedRoadmapInput - The input type for the generatePersonalizedRoadmap function.
 * - PersonalizedRoadmapOutput - The return type for the generatePersonalizedRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRoadmapInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The user profile, including skills, experience, and education.'),
  quizResults: z
    .string()
    .describe('The results of the aptitude quiz, including personality traits and cognitive strengths.'),
  careerGoals: z.string().describe('The user specified career goals.'),
});
export type PersonalizedRoadmapInput = z.infer<typeof PersonalizedRoadmapInputSchema>;

const RoadmapItemSchema = z.object({
  step: z.string().describe('A step in the career roadmap.'),
  description: z.string().describe('A description of the step.'),
  resources: z.array(z.string()).describe('Learning resources for the step.'),
  isOptional: z.boolean().describe('Whether the step is optional or required.'),
});

const PersonalizedRoadmapOutputSchema = z.object({
  roadmap: z.array(RoadmapItemSchema).describe('The personalized career roadmap.'),
  summary: z.string().describe('A summary of the roadmap.'),
});
export type PersonalizedRoadmapOutput = z.infer<typeof PersonalizedRoadmapOutputSchema>;


export async function generatePersonalizedRoadmap(input: PersonalizedRoadmapInput): Promise<PersonalizedRoadmapOutput> {
  return personalizedRoadmapFlow(input);
}

const reviewRoadmapItemTool = ai.defineTool(
  {
    name: 'reviewRoadmapItem',
    description: 'Reviews information and decides if the information needs to be added to the roadmap item output.',
    inputSchema: z.object({
      information: z.string().describe('The information to review.'),
      currentRoadmap: z.string().describe('The current roadmap.'),
    }),
    outputSchema: z.boolean().describe('Whether the information needs to be added.'),
  },
  async input => {
    // TODO: Implement the logic for reviewing information and deciding if it needs to be added.
    // For now, always return true.
    return true;
  }
);

const prompt = ai.definePrompt({
  name: 'personalizedRoadmapPrompt',
  input: {schema: PersonalizedRoadmapInputSchema},
  output: {schema: PersonalizedRoadmapOutputSchema},
  tools: [reviewRoadmapItemTool],
  prompt: `You are a career coach who can provide the optimal advice.

  Based on the user's profile, quiz results, and career goals, generate a personalized career roadmap.

  User Profile: {{{userProfile}}}
  Quiz Results: {{{quizResults}}}
  Career Goals: {{{careerGoals}}}

  Consider optimal skill paths and learning resources.

  Return the roadmap as a list of steps, descriptions, and resources.
  Roadmap:
  `, // TODO: Format the roadmap inside the prompt
});

const personalizedRoadmapFlow = ai.defineFlow(
  {
    name: 'personalizedRoadmapFlow',
    inputSchema: PersonalizedRoadmapInputSchema,
    outputSchema: PersonalizedRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
