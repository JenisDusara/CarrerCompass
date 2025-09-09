'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Award, BarChart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const quizQuestions = [
  {
    question: "When starting a new project, what's your first instinct?",
    options: [
      { id: 'a', text: 'Create a detailed plan and timeline.' },
      { id: 'b', text: 'Brainstorm creative and unconventional ideas.' },
      { id: 'c', text: 'Assemble a team and delegate tasks.' },
      { id: 'd', text: 'Dive right in and start experimenting.' },
    ],
  },
  {
    question: 'You feel most energized in a work environment that is:',
    options: [
      { id: 'a', text: 'Structured and predictable.' },
      { id: 'b', text: 'Dynamic and fast-paced.' },
      { id: 'c', text: 'Collaborative and social.' },
      { id: 'd', text: 'Independent and autonomous.' },
    ],
  },
  {
    question: 'Which of these tasks sounds most appealing?',
    options: [
      { id: 'a', text: 'Analyzing data to find trends.' },
      { id: 'b', text: 'Designing a visually stunning presentation.' },
      { id: 'c', text: 'Mentoring a junior team member.' },
      { id: 'd', text: 'Negotiating a high-stakes deal.' },
    ],
  },
  {
    question: 'When faced with a difficult problem, you are more likely to:',
    options: [
      { id: 'a', text: 'Rely on proven methods and logic.' },
      { id: 'b', text: 'Think outside the box for a novel solution.' },
      { id: 'c', text: 'Seek input and advice from others.' },
      { id: 'd', text: 'Trust your intuition and take decisive action.' },
    ],
  },
];

const personalityTypes = {
  a: { name: 'The Analyst', icon: BarChart, description: "You're logical, data-driven, and excel at finding patterns and creating order." },
  b: { name: 'The Innovator', icon: Award, description: "You're creative, visionary, and thrive on generating new ideas and beautiful designs." },
  c: { name: 'The Collaborator', icon: Users, description: "You're a people person, excelling in teamwork, communication, and leadership." },
  d: { name: 'The Driver', icon: Award, description: "You're action-oriented, decisive, and motivated by achieving results and taking risks." },
};

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = [...answers, selectedOption];
      setAnswers(newAnswers);
      setSelectedOption(null);
      if (isLastQuestion) {
        setShowResult(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
  }

  const getResult = () => {
    if (answers.length === 0) {
      return personalityTypes.a;
    }
    
    const counts = answers.reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const majority = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    return personalityTypes[majority as keyof typeof personalityTypes] || personalityTypes.a;
  };
  
  const result = getResult();

  return (
    <div className="space-y-8 flex flex-col items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Aptitude Quiz</h1>
        <p className="text-muted-foreground">Discover your work style and personality.</p>
      </div>

      <Card className="w-full max-w-2xl shadow-lg">
        {!showResult ? (
          <>
            <CardHeader>
              <Progress value={progress} className="w-full mb-4" />
              <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
              <CardDescription className="text-lg pt-2">{quizQuestions[currentQuestionIndex].question}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={setSelectedOption}
                value={selectedOption || ''}
                className="space-y-4"
              >
                {quizQuestions[currentQuestionIndex].options.map((option) => (
                  <div key={option.id} className={cn("flex items-center space-x-2 p-4 rounded-md border transition-all", selectedOption === option.id ? "bg-accent/20 border-accent" : "hover:bg-muted/50")}>
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="text-base flex-1 cursor-pointer">{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>
              <Button onClick={handleNext} disabled={!selectedOption} className="mt-8 w-full">
                {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </CardContent>
          </>
        ) : (
          <CardContent className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-headline">Quiz Complete!</h2>
            <p className="text-muted-foreground mb-6">You are...</p>
            
            <div className="bg-accent/10 p-6 rounded-lg">
              <result.icon className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-primary">{result.name}</h3>
              <p className="text-lg mt-2">{result.description}</p>
            </div>

            <Button onClick={handleRestart} className="mt-8">
              Take Again
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
