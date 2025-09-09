'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Award, Timer, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const allQuizQuestions = [
  {
    question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: [
      { id: 'a', text: '120 metres' },
      { id: 'b', text: '150 metres' },
      { id: 'c', text: '180 metres' },
      { id: 'd', text: '200 metres' },
    ],
    answer: 'b'
  },
  {
    question: "A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?",
    options: [
      { id: 'a', text: '12 days' },
      { id: 'b', text: '15 days' },
      { id: 'c', text: '16 days' },
      { id: 'd', text: '18 days' },
    ],
    answer: 'b'
  },
  {
    question: "Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?",
    options: [
      { id: 'a', text: '7' },
      { id: 'b', text: '10' },
      { id: 'c', text: '12' },
      { id: 'd', text: '13' },
    ],
    answer: 'b'
  },
  {
    question: "A man buys a cycle for 1400 and sells it at a loss of 15%. What is the selling price of the cycle?",
    options: [
      { id: 'a', text: '1190' },
      { id: 'b', text: '1160' },
      { id: 'c', text: '1202' },
      { id: 'd', text: '1000' },
    ],
    answer: 'a'
  },
  {
    question: "Find the greatest number that will divide 43, 91 and 183 so as to leave the same remainder in each case.",
    options: [
        { id: 'a', text: '4' },
        { id: 'b', text: '7' },
        { id: 'c', text: '9' },
        { id: 'd', text: '13' }
    ],
    answer: 'a'
  },
  {
    question: "Which of the following fraction is the largest?",
    options: [
        { id: 'a', text: '7/8' },
        { id: 'b', text: '13/16' },
        { id: 'c', text: '31/40' },
        { id: 'd', text: '63/80' }
    ],
    answer: 'a'
  },
  {
      question: "The sum of ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
      options: [
          { id: 'a', text: '4 years' },
          { id: 'b', text: '8 years' },
          { id: 'c', text: '10 years' },
          { id: 'd', text: 'None of these' }
      ],
      answer: 'a'
  },
  {
      question: "What is 15% of 34?",
      options: [
          { id: 'a', text: '5.10' },
          { id: 'b', text: '4.10' },
          { id: 'c', text: '3.10' },
          { id: 'd', text: '2.10' }
      ],
      answer: 'a'
  },
  {
      question: "If 20% of a = b, then b% of 20 is the same as:",
      options: [
          { id: 'a', text: '4% of a' },
          { id: 'b', text: '5% of a' },
          { id: 'c', text: '20% of a' },
          { id: 'd', text: 'None of these' }
      ],
      answer: 'a'
  },
  {
      question: "36% of 245 - 40% of 210 = 10 - ?",
      options: [
          { id: 'a', text: '4.2' },
          { id: 'b', text: '6.8' },
          { id: 'c', text: '5.8' },
          { id: 'd', 'text': '4.8' }
      ],
      answer: 'c'
  },
  {
      question: "A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?",
      options: [
          { id: 'a', text: '3' },
          { id: 'b', text: '4' },
          { id: 'c', text: '5' },
          { id: 'd', text: 'Cannot be determined' }
      ],
      answer: 'c'
  },
  {
      question: "A person crosses a 600 m long street in 5 minutes. What is his speed in km per hour?",
      options: [
          { id: 'a', text: '3.6' },
          { id: 'b', text: '7.2' },
          { id: 'c', text: '8.4' },
          { id: 'd', text: '10' }
      ],
      answer: 'b'
  },
  {
      question: "If a person walks at 14 km/hr instead of 10 km/hr, he would have walked 20 km more. The actual distance travelled by him is:",
      options: [
          { id: 'a', text: '50 km' },
          { id: 'b', text: '56 km' },
          { id: 'c', text: '70 km' },
          { id: 'd', text: '80 km' }
      ],
      answer: 'a'
  },
  {
      question: "A boat can travel with a speed of 13 km/hr in still water. If the speed of the stream is 4 km/hr, find the time taken by the boat to go 68 km downstream.",
      options: [
          { id: 'a', text: '2 hours' },
          { id: 'b', text: '3 hours' },
          { id: 'c', text: '4 hours' },
          { id: 'd', text: '5 hours' }
      ],
      answer: 'c'
  },
  {
      question: "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is :",
      options: [
          { id: 'a', text: '1/4' },
          { id: 'b', text: '1/10' },
          { id: 'c', text: '7/15' },
          { id: 'd', text: '8/15' }
      ],
      answer: 'd'
  },
  {
      question: "The cost price of 20 articles is the same as the selling price of x articles. If the profit is 25%, then the value of x is:",
      options: [
          { id: 'a', text: '15' },
          { id: 'b', text: '16' },
          { id: 'c', text: '18' },
          { id: 'd', text: '25' }
      ],
      answer: 'b'
  },
  {
      question: "In how many different ways can the letters of the word 'CORPORATION' be arranged so that the vowels always come together?",
      options: [
          { id: 'a', text: '810' },
          { id: 'b', text: '1440' },
          { id: 'c', text: '2880' },
          { id: 'd', text: '50400' }
      ],
      answer: 'd'
  },
  {
      question: "Out of 7 consonants and 4 vowels, how many words of 3 consonants and 2 vowels can be formed?",
      options: [
          { id: 'a', text: '210' },
          { id: 'b', text: '1050' },
          { id: 'c', text: '25200' },
          { id: 'd', text: '21400' }
      ],
      answer: 'c'
  },
  {
      question: "From a pack of 52 cards, two cards are drawn together at random. What is the probability of both the cards being kings?",
      options: [
          { id: 'a', text: '1/15' },
          { id: 'b', text: '25/57' },
          { id: 'c', text: '35/256' },
          { id: 'd', text: '1/221' }
      ],
      answer: 'd'
  },
  {
      question: "Find the odd man out: 41, 43, 47, 53, 61, 71, 73, 81",
      options: [
          { id: 'a', text: '61' },
          { id: 'b', text: '71' },
          { id: 'c', text: '73' },
          { id: 'd', text: '81' }
      ],
      answer: 'd'
  },
  {
      question: "Look at this series: 36, 34, 30, 28, 24, ... What number should come next?",
      options: [
          { id: 'a', text: '20' },
          { id: 'b', text: '22' },
          { id: 'c', text: '23' },
          { id: 'd', text: '26' }
      ],
      answer: 'b'
  },
  {
      question: "Two numbers are respectively 20% and 50% more than a third number. The ratio of the two numbers is:",
      options: [
          { id: 'a', text: '2:5' },
          { id: 'b', text: '3:5' },
          { id: 'c', text: '4:5' },
          { id: 'd', text: '6:7' }
      ],
      answer: 'c'
  },
  {
      question: "A sum of money is to be distributed among A, B, C, D in the proportion of 5 : 2 : 4 : 3. If C gets Rs. 1000 more than D, what is B's share?",
      options: [
          { id: 'a', text: '500' },
          { id: 'b', text: '1500' },
          { id: 'c', text: '2000' },
          { id: 'd', text: 'None of these' }
      ],
      answer: 'c'
  },
  {
      question: "If the price of a book is first decreased by 25% and then increased by 20%, then the net change in the price will be :",
      options: [
          { id: 'a', text: '-10%' },
          { id: 'b', text: '20%' },
          { id: 'c', text: '10%' },
          { id: 'd', text: '-20%' }
      ],
      answer: 'a'
  },
  {
      question: "The banker's discount on a bill due 6 months hence at 16% p.a. is Rs. 50. The true discount is:",
      options: [
          { id: 'a', text: '40' },
          { id: 'b', text: '45.33' },
          { id: 'c', text: '46.30' },
          { id: 'd', text: '48' }
      ],
      answer: 'c'
  },
  {
      question: "What is the volume of a cube with a surface area of 150 square units?",
      options: [
          { id: 'a', text: '125' },
          { id: 'b', text: '100' },
          { id: 'c', text: '75' },
          { id: 'd', text: '90' }
      ],
      answer: 'a'
  },
  {
      question: "A man's speed with the current is 15 km/hr and the speed of the current is 2.5 km/hr. The man's speed against the current is:",
      options: [
          { id: 'a', text: '8.5 km/hr' },
          { id: 'b', text: '9 km/hr' },
          { id: 'c', text: '10 km/hr' },
          { id: 'd', text: '12.5 km/hr' }
      ],
      answer: 'c'
  },
  {
      question: "A clock is started at noon. By 10 minutes past 5, the hour hand has turned through:",
      options: [
          { id: 'a', text: '145°' },
          { id: 'b', text: '150°' },
          { id: 'c', text: '155°' },
          { id: 'd', text: '160°' }
      ],
      answer: 'c'
  },
  {
      question: "Which one of the following is not a prime number?",
      options: [
          { id: 'a', text: '31' },
          { id: 'b', text: '61' },
          { id: 'c', text: '71' },
          { id: 'd', text: '91' }
      ],
      answer: 'd'
  },
  {
      question: "What decimal of an hour is a second?",
      options: [
          { id: 'a', text: '.0025' },
          { id: 'b', text: '.0256' },
          { id: 'c', text: '.00027' },
          { id: 'd', text: '.00012' }
      ],
      answer: 'c'
  },
  {
    question: "How many bricks, each measuring 25 cm x 11.25 cm x 6 cm, will be needed to build a wall of 8 m x 6 m x 22.5 cm?",
    options: [
      { id: 'a', text: '5600' },
      { id: 'b', text: '6000' },
      { id: 'c', text: '6400' },
      { id: 'd', text: '7200' },
    ],
    answer: 'c'
  },
];


const QUIZ_LENGTH = 30;
const QUIZ_TIME_LIMIT = 20 * 60; // 20 minutes in seconds

export default function QuizPage() {
  const [quizQuestions, setQuizQuestions] = useState<(typeof allQuizQuestions)>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_LIMIT);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const shuffled = [...allQuizQuestions].sort(() => 0.5 - Math.random());
    const initialAnswers = new Array(QUIZ_LENGTH).fill(null);
    setQuizQuestions(shuffled.slice(0, QUIZ_LENGTH));
    setAnswers(initialAnswers);
  }, []);
  
  useEffect(() => {
    if (quizQuestions.length > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsTimeUp(true);
            setShowResult(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizQuestions, showResult]);

  if (quizQuestions.length === 0) {
    return (
        <div className="flex justify-center items-center h-screen">
          <Card className="p-8">
            <CardTitle>Loading Quiz...</CardTitle>
            <CardDescription>Please wait while we prepare your questions.</CardDescription>
          </Card>
        </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleRestart = () => {
    const shuffled = [...allQuizQuestions].sort(() => 0.5 - Math.random());
    const initialAnswers = new Array(QUIZ_LENGTH).fill(null);
    setQuizQuestions(shuffled.slice(0, QUIZ_LENGTH));
    setAnswers(initialAnswers);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setTimeLeft(QUIZ_TIME_LIMIT);
    setIsTimeUp(false);
  }

  const getResult = () => {
      let correctAnswers = 0;
      quizQuestions.forEach((question, index) => {
          if (answers[index] === question.answer) {
              correctAnswers++;
          }
      });
      return correctAnswers;
  };
  
  const result = getResult();
  const scorePercentage = (result / quizQuestions.length) * 100;
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;


  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Aptitude Quiz</h1>
        <p className="text-muted-foreground">Discover your work style and personality.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <Card className="w-full lg:w-3/4 shadow-lg">
          {!showResult ? (
            <>
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <Progress value={progress} className="w-full" />
                  <div className="flex items-center ml-4 shrink-0">
                    <Timer className="h-5 w-5 mr-2" />
                    <span className="font-semibold">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                  </div>
                </div>
                <CardTitle>Question {currentQuestionIndex + 1}/{quizQuestions.length}</CardTitle>
                <CardDescription className="text-lg pt-2">{quizQuestions[currentQuestionIndex].question}</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  onValueChange={handleAnswerChange}
                  value={answers[currentQuestionIndex] || ''}
                  className="space-y-4"
                >
                  {quizQuestions[currentQuestionIndex].options.map((option) => (
                    <div key={option.id} className={cn("flex items-center space-x-2 p-4 rounded-md border transition-all", answers[currentQuestionIndex] === option.id ? "bg-accent/20 border-accent" : "hover:bg-muted/50")}>
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="text-base flex-1 cursor-pointer">{option.text}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="mt-8 flex justify-between w-full">
                  <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                    <ArrowLeft className="mr-2" />
                    Previous
                  </Button>
                   <Button onClick={handleNext}>
                    {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next / Skip'}
                    <ArrowRight className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="text-center p-8 flex flex-col items-center justify-center min-h-[400px]">
               <AlertDialog open={isTimeUp} onOpenChange={setIsTimeUp}>
                  <AlertDialogContent>
                      <AlertDialogHeader>
                      <AlertDialogTitle>Time's Up!</AlertDialogTitle>
                      <AlertDialogDescription>
                          Your time for the quiz has run out. Your answers have been submitted automatically.
                      </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                      <AlertDialogAction onClick={() => setIsTimeUp(false)}>View Results</AlertDialogAction>
                      </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold font-headline">Quiz Complete!</h2>
              <p className="text-muted-foreground mb-6">Here is your result:</p>
              
              <div className="bg-accent/10 p-6 rounded-lg">
                <Award className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-primary">You scored {result} out of {quizQuestions.length}</h3>
                <p className="text-lg mt-2">That's {scorePercentage.toFixed(2)}%!</p>
              </div>

              <Button onClick={handleRestart} className="mt-8">
                Take Again
              </Button>
            </CardContent>
          )}
        </Card>

        {!showResult && (
          <Card className="w-full lg:w-1/4 shadow-lg sticky top-24">
            <CardHeader>
                <CardTitle>Questions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-5 gap-2">
                {quizQuestions.map((_, index) => (
                    <Button
                        key={index}
                        variant={
                            currentQuestionIndex === index
                            ? 'default'
                            : answers[index]
                            ? 'secondary'
                            : 'outline'
                        }
                        className="h-10 w-10 p-0"
                        onClick={() => setCurrentQuestionIndex(index)}
                    >
                        {index + 1}
                    </Button>
                ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
