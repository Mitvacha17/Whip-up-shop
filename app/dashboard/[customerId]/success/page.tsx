"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Heart, PartyPopper, Sparkles, ArrowLeft } from "lucide-react";
import { getCustomer } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ customerId: string }>;
}

// Confetti particle component
function Confetti() {
  const [particles, setParticles] = useState<
    { id: number; x: number; delay: number; duration: number; color: string }[]
  >([]);

  useEffect(() => {
    const colors = [
      "hsl(var(--primary))",
      "hsl(var(--accent))",
      "#FFD700",
      "#FF69B4",
      "#FFA500",
    ];
    const newParticles = [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-sm animate-confetti"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function SuccessPage({ params }: PageProps) {
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
      {/* Confetti */}
      <Confetti />

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-up opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-50px",
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <Heart
              className="text-primary"
              size={20 + Math.random() * 30}
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10">
        {/* Success card */}
        <div className="bg-card rounded-3xl shadow-2xl border border-border p-8 md:p-12 max-w-lg w-full text-center animate-bounce-in">
          {/* Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <PartyPopper className="w-12 h-12 text-primary" />
            </div>
            <Sparkles className="absolute top-0 right-1/4 w-6 h-6 text-accent animate-pulse" />
            <Sparkles className="absolute bottom-0 left-1/4 w-4 h-4 text-primary animate-pulse delay-300" />
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            You Did It!
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Perfect Score!
          </p>
          <p className="text-muted-foreground mb-8">
            You really do know me so well, {customer.displayName}. This proves
            just how special our connection is.
          </p>

          {/* Decorative hearts */}
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="w-6 h-6 text-primary animate-pulse"
                fill="currentColor"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>

          {/* Love message */}
          <div className="bg-primary/5 rounded-2xl p-6 mb-8 border border-primary/20">
            <p className="font-cursive text-2xl text-primary mb-2">
              I love you more than words can say
            </p>
            <p className="text-muted-foreground text-sm">
              Thank you for being my everything
            </p>
          </div>

          {/* Back button */}
          <Button
            onClick={() => router.push(`/dashboard/${customerId}`)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 h-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Envelope
          </Button>
        </div>

        {/* Footer message */}
        <p className="text-center text-muted-foreground/60 mt-12 font-cursive text-xl">
          Forever yours, with all my heart
        </p>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up linear infinite;
        }
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          50% {
            transform: scale(1.02) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}
