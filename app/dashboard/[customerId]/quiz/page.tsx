"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Heart, ArrowLeft, ArrowRight, RotateCcw, Check, X } from "lucide-react";
import { getCustomerData, getCustomer } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ customerId: string }>;
}

const MAX_ATTEMPTS = 3;

export default function QuizPage({ params }: PageProps) {
  const { customerId } = use(params);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
  const [showResults, setShowResults] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);

  const customerData = getCustomerData(customerId);
  const customer = getCustomer(customerId);

  useEffect(() => {
    const auth = sessionStorage.getItem("valentine-auth");
    if (auth !== "true") {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    if (customerData) {
      setAnswers(new Array(customerData.quiz.length).fill(null));
    }
  }, [customerData]);

  if (!customerData || !customer) {
    notFound();
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < customerData.quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 300);
  };

  const handleSubmit = () => {
    // Check answers
    const wrong: number[] = [];
    customerData.quiz.forEach((question, index) => {
      if (answers[index] !== question.correctAnswer) {
        wrong.push(index);
      }
    });

    setWrongAnswers(wrong);

    if (wrong.length === 0) {
      // All correct - redirect to success
      router.push(`/dashboard/${customerId}/success`);
    } else {
      // Some wrong
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      
      if (newAttempts <= 0) {
        // No more attempts - redirect to failure
        router.push(`/dashboard/${customerId}/failure`);
      } else {
        setShowResults(true);
      }
    }
  };

  const handleRetry = () => {
    setAnswers(new Array(customerData.quiz.length).fill(null));
    setCurrentQuestion(0);
    setShowResults(false);
    setWrongAnswers([]);
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary animate-pulse" fill="currentColor" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  const currentQuestionData = customerData.quiz[currentQuestion];
  const allAnswered = answers.every((a) => a !== null);

  return (
    <main className="min-h-screen bg-background relative">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/dashboard/${customerId}`)}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Envelope
        </Button>
      </div>

      {/* Attempts indicator */}
      <div className="absolute top-4 right-4 z-50">
        <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
          <span className="text-sm text-muted-foreground">Attempts:</span>
          <div className="flex gap-1">
            {[...Array(MAX_ATTEMPTS)].map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 ${
                  i < attempts ? "text-primary" : "text-muted"
                }`}
                fill={i < attempts ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {!showResults ? (
          <>
            {/* Question counter */}
            <div className="mb-8 text-center">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {customerData.quiz.length}
              </span>
              {/* Progress bar */}
              <div className="mt-2 w-64 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / customerData.quiz.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question card */}
            <div className="bg-card rounded-2xl shadow-xl border border-border p-8 md:p-10 max-w-xl w-full">
              <h2 className="text-xl md:text-2xl font-serif text-foreground text-center mb-8">
                {currentQuestionData.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestionData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      answers[currentQuestion] === index
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background hover:border-primary/50 text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                          answers[currentQuestion] === index
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground text-muted-foreground"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentQuestion < customerData.quiz.length - 1 ? (
                <Button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  disabled={answers[currentQuestion] === null}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Submit Quiz
                </Button>
              )}
            </div>

            {/* Question dots */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-md">
              {customerData.quiz.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
                    currentQuestion === index
                      ? "bg-primary text-primary-foreground"
                      : answers[index] !== null
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Results view */
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8 md:p-10 max-w-xl w-full">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <X className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="text-2xl font-serif text-foreground mb-2">
                Not quite right!
              </h2>
              <p className="text-muted-foreground">
                You got {customerData.quiz.length - wrongAnswers.length} out of{" "}
                {customerData.quiz.length} correct
              </p>
              <p className="text-sm text-primary mt-2">
                {attempts} attempt{attempts !== 1 ? "s" : ""} remaining
              </p>
            </div>

            {/* Wrong answers list */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Questions to review:
              </h3>
              {wrongAnswers.map((questionIndex) => {
                const question = customerData.quiz[questionIndex];
                const userAnswer = answers[questionIndex];
                return (
                  <div
                    key={questionIndex}
                    className="p-4 rounded-xl bg-destructive/5 border border-destructive/20"
                  >
                    <p className="text-sm text-muted-foreground mb-1">
                      Question {questionIndex + 1}
                    </p>
                    <p className="text-foreground font-medium mb-2">
                      {question.question}
                    </p>
                    <p className="text-sm text-destructive">
                      Your answer:{" "}
                      {userAnswer !== null
                        ? question.options[userAnswer]
                        : "Not answered"}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Retry button */}
            <Button
              onClick={handleRetry}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
