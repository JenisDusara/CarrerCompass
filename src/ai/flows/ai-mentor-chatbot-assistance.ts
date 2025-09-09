'use server';

/**
 * @fileOverview An AI mentor chatbot assistance flow.
 *
 * - aiMentorChatbotAssistance - A function that provides real-time career guidance and answers user questions.
 * - AiMentorChatbotAssistanceInput - The input type for the aiMentorChatbotAssistance function.
 * - AiMentorChatbotAssistanceOutput - The return type for the aiMentorChatbotAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiMentorChatbotAssistanceInputSchema = z.object({
  userProfile: z.string().describe('The user profile, including details such as skills, experience, and career goals.'),
  pastInteractions: z.string().describe('A summary of past interactions with the chatbot.'),
  userQuestion: z.string().describe('The user question requiring career guidance.'),
});
export type AiMentorChatbotAssistanceInput = z.infer<typeof AiMentorChatbotAssistanceInputSchema>;

const AiMentorChatbotAssistanceOutputSchema = z.object({
  chatbotResponse: z.string().describe('The chatbot response providing career guidance and answering the user question.'),
});
export type AiMentorChatbotAssistanceOutput = z.infer<typeof AiMentorChatbotAssistanceOutputSchema>;

export async function aiMentorChatbotAssistance(input: AiMentorChatbotAssistanceInput): Promise<AiMentorChatbotAssistanceOutput> {
  return aiMentorChatbotAssistanceFlow(input);
}

const aiMentorChatbotAssistancePrompt = ai.definePrompt({
  name: 'aiMentorChatbotAssistancePrompt',
  input: {schema: AiMentorChatbotAssistanceInputSchema},
  output: {schema: AiMentorChatbotAssistanceOutputSchema},
  prompt: `You are an AI career mentor chatbot providing real-time career guidance to users.

  Consider the user's profile, past interactions, and current question to provide personalized and helpful advice.

  User Profile: {{{userProfile}}}
  Past Interactions: {{{pastInteractions}}}
  User Question: {{{userQuestion}}}

  Response:`,
});

const aiMentorChatbotAssistanceFlow = ai.defineFlow(
  {
    name: 'aiMentorChatbotAssistanceFlow',
    inputSchema: AiMentorChatbotAssistanceInputSchema,
    outputSchema: AiMentorChatbotAssistanceOutputSchema,
  },
  async input => {
    const {output} = await aiMentorChatbotAssistancePrompt(input);
    return output!;
  }
);
