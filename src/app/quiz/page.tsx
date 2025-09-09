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
    question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: [
      { id: 'a', text: '120 metres' },
      { id: 'b', text: '150 metres' },
      { id: 'c', text: '180 metres' },
      { id: 'd', text: '200 metres' },
    ],
  },
  {
    question: "A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?",
    options: [
      { id: 'a', text: '12 days' },
      { id: 'b', text: '15 days' },
      { id: 'c', text: '16 days' },
      { id: 'd', text: '18 days' },
    ],
  },
  {
    question: "Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?",
    options: [
      { id: 'a', text: '7' },
      { id: 'b', text: '10' },
      { id: 'c', text: '12' },
      { id: 'd', text: '13' },
    ],
  },
  {
    question: "A man buys a cycle for 1400 and sells it at a loss of 15%. What is the selling price of the cycle?",
    options: [
      { id: 'a', text: '1190' },
      { id: 'b', text: '1160' },
      { id: 'c', text: '1202' },
      { id: 'd', text: '1000' },
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
    if (answers.length !== quizQuestions.length) {
      // Default to a personality type if the quiz is not complete
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
