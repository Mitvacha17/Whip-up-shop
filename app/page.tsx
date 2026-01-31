"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_PASSWORD } from "@/lib/data";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (password === SITE_PASSWORD) {
      // Store auth in sessionStorage
      sessionStorage.setItem("valentine-auth", "true");
      router.push("/dashboard");
    } else {
      setError("Incorrect password. Try again with love!");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
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
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-card rounded-2xl shadow-2xl p-8 md:p-10 border border-border/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">
              Welcome, My Love
            </h1>
            <p className="text-muted-foreground">
              Enter the secret password to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 text-base bg-background border-border focus:border-primary focus:ring-primary"
                required
              />
            </div>

            {error && (
              <p className="text-destructive text-sm text-center animate-shake">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Checking...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Unlock My Heart
                </span>
              )}
            </Button>
          </form>

          {/* Footer hint */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Hint: What do we say to each other every day?
          </p>
        </div>

        {/* Decorative text */}
        <p className="text-center text-muted-foreground/60 text-sm mt-8 font-cursive">
          Made with love, for you
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </main>
  );
}
