"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Folder, ArrowRight, LogOut } from "lucide-react";
import { customers } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem("valentine-auth");
    if (auth !== "true") {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("valentine-auth");
    router.push("/");
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

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            <h1 className="text-xl font-serif text-foreground">Valentine&apos;s Hub</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Title section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Choose Your Valentine
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Select a special person to view their personalized love letter, photos, and more
          </p>
        </div>

        {/* Customer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer, index) => (
            <button
              key={customer.id}
              onClick={() => router.push(`/dashboard/${customer.id}`)}
              className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/50 hover:shadow-xl transition-all duration-300 text-left relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              
              {/* Folder icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Folder className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Customer info */}
              <div className="relative">
                <h3 className="text-2xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
                  {customer.displayName}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  A special message awaits...
                </p>

                {/* Arrow indicator */}
                <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Open letter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Heart decoration */}
              <Heart
                className="absolute bottom-4 right-4 w-6 h-6 text-primary/20 group-hover:text-primary/40 transition-colors"
                fill="currentColor"
              />
            </button>
          ))}
        </div>

        {/* Footer message */}
        <p className="text-center text-muted-foreground/60 mt-16 font-cursive text-xl">
          Every love story is beautiful, but ours is my favorite
        </p>
      </div>
    </main>
  );
}
