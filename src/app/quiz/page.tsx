'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Award, Timer, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
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
  // Arithmetic Aptitude
  {
    question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: [
      { id: 'a', text: '120 metres' },
      { id: 'b', text: '150 metres' },
      { id: 'c', text: '180 metres' },
      { id: 'd', text: '200 metres' },
    ],
    answer: 'b',
    category: 'Arithmetic Aptitude'
  },
  {
    question: "A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?",
    options: [
      { id: 'a', text: '12 days' },
      { id: 'b', text: '15 days' },
      { id: 'c', text: '16 days' },
      { id: 'd', text: '18 days' },
    ],
    answer: 'b',
    category: 'Arithmetic Aptitude'
  },
  {
    question: "A man buys a cycle for 1400 and sells it at a loss of 15%. What is the selling price of the cycle?",
    options: [
      { id: 'a', text: '1190' },
      { id: 'b', text: '1160' },
      { id: 'c', text: '1202' },
      { id: 'd', text: '1000' },
    ],
    answer: 'a',
    category: 'Arithmetic Aptitude'
  },
  {
    question: "The sum of ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
    options: [
        { id: 'a', text: '4 years' },
        { id: 'b', text: '8 years' },
        { id: 'c', text: '10 years' },
        { id: 'd', text: 'None of these' }
    ],
    answer: 'a',
    category: 'Arithmetic Aptitude'
  },
  {
      question: "If a person walks at 14 km/hr instead of 10 km/hr, he would have walked 20 km more. The actual distance travelled by him is:",
      options: [
          { id: 'a', text: '50 km' },
          { id: 'b', text: '56 km' },
          { id: 'c', text: '70 km' },
          { id: 'd', text: '80 km' }
      ],
      answer: 'a',
      category: 'Arithmetic Aptitude'
  },
  {
      question: "The cost price of 20 articles is the same as the selling price of x articles. If the profit is 25%, then the value of x is:",
      options: [
          { id: 'a', text: '15' },
          { id: 'b', text: '16' },
          { id: 'c', text: '18' },
          { id: 'd', text: '25' }
      ],
      answer: 'b',
      category: 'Arithmetic Aptitude'
  },

  // Logical Reasoning
  {
    question: "Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?",
    options: [
      { id: 'a', text: '7' },
      { id: 'b', text: '10' },
      { id: 'c', text: '12' },
      { id: 'd', text: '13' },
    ],
    answer: 'b',
    category: 'Logical Reasoning'
  },
  {
    question: "Find the odd man out: 41, 43, 47, 53, 61, 71, 73, 81",
    options: [
        { id: 'a', text: '61' },
        { id: 'b', text: '71' },
        { id: 'c', text: '73' },
        { id: 'd', text: '81' }
    ],
    answer: 'd',
    category: 'Logical Reasoning'
  },
  {
    question: "CMM, EOO, GQQ, ___, KUU",
    options: [
      { id: 'a', text: 'GRR' },
      { id: 'b', text: 'GSS' },
      { id: 'c', text: 'ISS' },
      { id: 'd', text: 'ITT' }
    ],
    answer: 'c',
    category: 'Logical Reasoning'
  },
  {
    question: "Marathon is to race as hibernation is to",
    options: [
      { id: 'a', text: 'winter' },
      { id: 'b', text: 'bear' },
      { id: 'c', text: 'dream' },
      { id: 'd', text: 'sleep' }
    ],
    answer: 'd',
    category: 'Logical Reasoning'
  },
   {
    question: "Here are some words translated from an artificial language. 'gorblflur' means fan belt, 'pixngorbl' means ceiling fan, 'arthtusl' means tile roof. Which word could mean 'ceiling tile'?",
    options: [
      { id: 'a', text: 'gorbltusl' },
      { id: 'b', text: 'flurgorbl' },
      { id: 'c', text: 'arthflur' },
      { id: 'd', text: 'pixnarth' }
    ],
    answer: 'd',
    category: 'Logical Reasoning'
  },

  // Verbal Ability
  {
    question: "Choose the word which is the exact OPPOSITE of the word: RELINQUISH",
    options: [
      { id: 'a', text: 'Abdicate' },
      { id: 'b', text: 'Renounce' },
      { id: 'c', text: 'Possess' },
      { id: 'd', text: 'Deny' }
    ],
    answer: 'c',
    category: 'Verbal Ability'
  },
  {
    question: "Arrange the jumbled parts to form a meaningful sentence: 1. to make a speech 2. I was asked 3. at the conference 4. by the organizers",
    options: [
      { id: 'a', text: '2, 1, 4, 3' },
      { id: 'b', text: '2, 4, 1, 3' },
      { id: 'c', text: '4, 2, 1, 3' },
      { id: 'd', text: '1, 2, 3, 4' }
    ],
    answer: 'b',
    category: 'Verbal Ability'
  },
  {
    question: "Find the correctly spelt word.",
    options: [
      { id: 'a', text: 'Embarass' },
      { id: 'b', text: 'Embarrass' },
      { id: 'c', text: 'Embaras' },
      { id: 'd', text: 'Embarras' }
    ],
    answer: 'b',
    category: 'Verbal Ability'
  },
  {
    question: "The statement that the dazzling sunshine was ________ for my sensitive eyes.",
    options: [
      { id: 'a', text: 'overpowering' },
      { id:'b', text: 'overwhelming' },
      { id: 'c', text: 'overbearing' },
      { id: 'd', text: 'overjoyed' }
    ],
    answer: 'a',
    category: 'Verbal Ability'
  },
  {
    question: "To be successful in today's world, we require the combination of technical skills and soft skills. (Find the error)",
    options: [
      { id: 'a', text: 'To be successful in today\'s world' },
      { id: 'b', text: 'we require the combination' },
      { id: 'c', text: 'of technical skills and soft skills' },
      { id: 'd', text: 'No error' }
    ],
    answer: 'd',
    category: 'Verbal Ability'
  },

  // English
  {
    question: "Synonym of 'Ephemeral'",
    options: [
      { id: 'a', text: 'Eternal' },
      { id: 'b', text: 'Transient' },
      { id: 'c', text: 'Permanent' },
      { id: 'd', text: 'Lasting' }
    ],
    answer: 'b',
    category: 'English'
  },
  {
    question: "Antonym of 'Abundant'",
    options: [
      { id: 'a', text: 'Plentiful' },
      { id: 'b', text: 'Scarce' },
      { id: 'c', text: 'Ample' },
      { id: 'd', text: 'Copious' }
    ],
    answer: 'b',
    category: 'English'
  },
  {
    question: "Choose the correct sentence: ",
    options: [
      { id: 'a', text: 'He do not know how to swim.' },
      { id: 'b', text: 'He does not knows how to swim.' },
      { id: 'c', text: 'He does not know how to swim.' },
      { id: 'd', text: 'He are not knowing how to swim.' }
    ],
    answer: 'c',
    category: 'English'
  },
  {
    question: "Fill in the blank: The ship, with its crew, _____ lost at sea.",
    options: [
      { id: 'a', text: 'were' },
      { id: 'b', text: 'was' },
      { id: 'c', text: 'are' },
      { id: 'd', text: 'have been' }
    ],
    answer: 'b',
    category: 'English'
  },
  {
    question: "Identify the figure of speech: 'The wind whispered through the trees.'",
    options: [
      { id: 'a', text: 'Metaphor' },
      { id: 'b', text: 'Simile' },
      { id: 'c', text: 'Personification' },
      { id: 'd', text: 'Hyperbole' }
    ],
    answer: 'c',
    category: 'English'
  },

  // More questions to reach 30+
  {
    question: "Find the greatest number that will divide 43, 91 and 183 so as to leave the same remainder in each case.",
    options: [
        { id: 'a', text: '4' },
        { id: 'b', text: '7' },
        { id: 'c', text: '9' },
        { id: 'd', text: '13' }
    ],
    answer: 'a',
    category: 'Arithmetic Aptitude'
  },
  {
    question: "Which of the following fraction is the largest?",
    options: [
        { id: 'a', text: '7/8' },
        { id: 'b', text: '13/16' },
        { id: 'c', text: '31/40' },
        { id: 'd', text: '63/80' }
    ],
    answer: 'a',
    category: 'Arithmetic Aptitude'
  },
  {
      question: "What is 15% of 34?",
      options: [
          { id: 'a', text: '5.10' },
          { id: 'b', text: '4.10' },
          { id: 'c', text: '3.10' },
          { id: 'd', text: '2.10' }
      ],
      answer: 'a',
      category: 'Arithmetic Aptitude'
  },
  {
      question: "If 20% of a = b, then b% of 20 is the same as:",
      options: [
          { id: 'a', text: '4% of a' },
          { id: 'b', text: '5% of a' },
          { id: 'c', text: '20% of a' },
          { id: 'd', text: 'None of these' }
      ],
      answer: 'a',
      category: 'Arithmetic Aptitude'
  },
  {
      question: "A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?",
      options: [
          { id: 'a', text: '3' },
          { id: 'b', text: '4' },
          { id: 'c', text: '5' },
          { id: 'd', text: 'Cannot be determined' }
      ],
      answer: 'c',
      category: 'Arithmetic Aptitude'
  },
  {
      question: "A person crosses a 600 m long street in 5 minutes. What is his speed in km per hour?",
      options: [
          { id: 'a', text: '3.6' },
          { id: 'b', text: '7.2' },
          { id: 'c', text: '8.4' },
          { id: 'd', text: '10' }
      ],
      answer: 'b',
      category: 'Arithmetic Aptitude'
  },
  {
      question: "A boat can travel with a speed of 13 km/hr in still water. If the speed of the stream is 4 km/hr, find the time taken by the boat to go 68 km downstream.",
      options: [
          { id: 'a', text: '2 hours' },
          { id: 'b', text: '3 hours' },
          { id: 'c', text: '4 hours' },
          { id: 'd', text: '5 hours' }
      ],
      answer: 'c',
      category: 'Arithmetic Aptitude'
  },
  {
      question: "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is :",
      options: [
          { id: 'a', text: '1/4' },
          { id: 'b', text: '1/10' },
          { id: 'c', text: '7/15' },
          { id: 'd', text: '8/15' }
      ],
      answer: 'd',
      category: 'Arithmetic Aptitude'
  },
  {
      question: "In how many different ways can the letters of the word 'CORPORATION' be arranged so that the vowels always come together?",
      options: [
          { id: 'a', text: '810' },
          { id: 'b', text: '1440' },
          { id: 'c', text: '2880' },
          { id: 'd', text: '50400' }
      ],
      answer: 'd',
      category: 'Logical Reasoning'
  },
  {
      question: "Out of 7 consonants and 4 vowels, how many words of 3 consonants and 2 vowels can be formed?",
      options: [
          { id: 'a', text: '210' },
          { id: 'b', text: '1050' },
          { id: 'c', text: '25200' },
          { id: 'd', text: '21400' }
      ],
      answer: 'c',
      category: 'Logical Reasoning'
  },
  {
      question: "From a pack of 52 cards, two cards are drawn together at random. What is the probability of both the cards being kings?",
      options: [
          { id: 'a', text: '1/15' },
          { id: 'b', text: '25/57' },
          { id: 'c', text: '35/256' },
          { id: 'd', text: '1/221' }
      ],
      answer: 'd',
      category: 'Logical Reasoning'
  },
  {
      question: "Look at this series: 36, 34, 30, 28, 24, ... What number should come next?",
      options: [
          { id: 'a', text: '20' },
          { id: 'b', text: '22' },
          { id: 'c', text: '23' },
          { id: 'd', text: '26' }
      ],
      answer: 'b',
      category: 'Logical Reasoning'
  },
  {
      question: "Which one of the following is not a prime number?",
      options: [
          { id: 'a', text: '31' },
          { id: 'b', text: '61' },
          { id: 'c', text: '71' },
          { id: 'd', text: '91' }
      ],
      answer: 'd',
      category: 'Logical Reasoning'
  }
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
  const [quizStarted, setQuizStarted] = useState(false);

  // In a real app, you'd fetch this from localStorage or a database
  const lastScore = "85%"; 

  const startQuiz = () => {
    // Shuffle all questions and pick the first 30
    const shuffled = [...allQuizQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, QUIZ_LENGTH);
    setQuizQuestions(selectedQuestions);
    // Initialize answers array for the selected questions
    const initialAnswers = new Array(selectedQuestions.length).fill(null);
    setAnswers(initialAnswers);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setTimeLeft(QUIZ_TIME_LIMIT);
    setIsTimeUp(false);
  };
  
  useEffect(() => {
    if (quizStarted && quizQuestions.length > 0 && !showResult) {
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
  }, [quizStarted, quizQuestions, showResult]);


  const progress = quizQuestions.length > 0 ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100 : 0;

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
    setQuizStarted(false);
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
  const scorePercentage = quizQuestions.length > 0 ? (result / quizQuestions.length) * 100 : 0;
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;


  if (!quizStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-2xl text-center shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline">Aptitude Quiz</CardTitle>
            <CardDescription className="text-lg">Ready to test your skills?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-lg font-semibold">Your Last Score: <span className="text-primary">{lastScore}</span></p>
              <p className="text-sm text-muted-foreground">Keep practicing to improve!</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 flex items-center justify-center gap-2 font-headline"><BookOpen/> Preparation Resources</h3>
              <ul className="space-y-2 text-primary">
                <li><a href="https://www.indiabix.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">IndiaBIX</a></li>
                <li><a href="https://www.geeksforgeeks.org/aptitude/aptitude-for-placements/" target="_blank" rel="noopener noreferrer" className="hover:underline">GeeksforGeeks Aptitude</a></li>
                <li><a href="https://aptitude-test.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Aptitude-Test.com</a></li>
              </ul>
            </div>

            <Button onClick={startQuiz} size="lg" className="w-full">
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Aptitude Quiz</h1>
        <p className="text-muted-foreground">Test your skills across various categories.</p>
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
                <div className="flex justify-between items-baseline">
                    <CardTitle className="font-headline">Question {currentQuestionIndex + 1}/{quizQuestions.length}</CardTitle>
                    <p className='text-sm font-semibold text-primary'>{quizQuestions[currentQuestionIndex].category}</p>
                </div>
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
                <h3 className="text-3xl font-bold text-primary font-headline">You scored {result} out of {quizQuestions.length}</h3>
                <p className="text-lg mt-2">That's {scorePercentage.toFixed(2)}%!</p>
              </div>

              <Button onClick={handleRestart} className="mt-8">
                Take Again
              </Button>
            </CardContent>
          )}
        </Card>

        {!showResult && quizQuestions.length > 0 && (
          <Card className="w-full lg:w-1/4 shadow-lg sticky top-24">
            <CardHeader>
                <CardTitle className="font-headline">Questions</CardTitle>
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
