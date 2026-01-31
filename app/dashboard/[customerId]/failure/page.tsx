"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Heart, HeartCrack, Frown, ArrowLeft, RotateCcw } from "lucide-react";
import { getCustomer } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ customerId: string }>;
}

export default function FailurePage({ params }: PageProps) {
  const { customerId } = use(params);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  if (!customer) {
    notFound();
  }

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-2">
          <Heart
            className="w-6 h-6 text-primary animate-pulse"
            fill="currentColor"
          />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Falling broken hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-50px",
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            <HeartCrack
              className="text-muted-foreground"
              size={20 + Math.random() * 20}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10">
        {/* Failure card */}
        <div className="bg-card rounded-3xl shadow-2xl border border-border p-8 md:p-12 max-w-lg w-full text-center animate-shake-in">
          {/* Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
              <Frown className="w-12 h-12 text-muted-foreground" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Oh No!
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            All attempts used
          </p>
          <p className="text-muted-foreground mb-8">
            Don&apos;t worry, {customer.displayName}. This doesn&apos;t change how much I
            love you. Maybe we need to spend more time together making new
            memories!
          </p>

          {/* Cute meme-style illustration */}
          <div className="bg-muted/50 rounded-2xl p-8 mb-8 border border-border">
            <div className="flex flex-col items-center gap-4">
              {/* Sad face illustration */}
              <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center gap-4 mb-2">
                    <div className="w-4 h-4 rounded-full bg-foreground/20" />
                    <div className="w-4 h-4 rounded-full bg-foreground/20" />
                  </div>
                  <div className="w-8 h-2 mx-auto rounded-full bg-foreground/20 rotate-180 mt-4" style={{ borderRadius: "0 0 50% 50%" }} />
                </div>
              </div>
              <p className="font-cursive text-xl text-muted-foreground">
                &quot;I still love you anyway!&quot;
              </p>
            </div>
          </div>

          {/* Encouraging message */}
          <div className="bg-primary/5 rounded-2xl p-6 mb-8 border border-primary/20">
            <p className="text-foreground mb-2">
              Remember...
            </p>
            <p className="font-cursive text-xl text-primary">
              Love isn&apos;t about perfect scores, it&apos;s about perfect moments
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => router.push(`/dashboard/${customerId}`)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 h-auto"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Envelope
            </Button>
            <Button
              onClick={() => router.push(`/dashboard/${customerId}/quiz`)}
              variant="outline"
              className="px-6 py-3 h-auto"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          </div>
        </div>

        {/* Footer message */}
        <p className="text-center text-muted-foreground/60 mt-12 font-cursive text-xl">
          Every day with you is a chance to learn more about us
        </p>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.2;
          }
          100% {
            transform: translateY(120vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        @keyframes shake-in {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          20% {
            transform: translateX(10px);
          }
          40% {
            transform: translateX(-10px);
          }
          60% {
            transform: translateX(5px);
          }
          80% {
            transform: translateX(-5px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-shake-in {
          animation: shake-in 0.5s ease-out;
        }
      `}</style>
    </main>
  );
}
