"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Music,
  Camera,
  HelpCircle,
  ArrowLeft,
  X,
  ExternalLink,
} from "lucide-react";
import { getCustomerData, getCustomer } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ customerId: string }>;
}

export default function CustomerPage({ params }: PageProps) {
  const { customerId } = use(params);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [envelopeState, setEnvelopeState] = useState<
    "closed" | "opening" | "open" | "closing"
  >("closed");
  const [showLetter, setShowLetter] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);

  // Modal states
  const [showSongModal, setShowSongModal] = useState(false);
  const [showPhotosModal, setShowPhotosModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

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

  if (!customerData || !customer) {
    notFound();
  }

  const handleEnvelopeClick = () => {
    if (envelopeState === "closed" && !hasOpenedEnvelope) {
      setEnvelopeState("opening");
      setTimeout(() => {
        setEnvelopeState("open");
        setShowLetter(true);
      }, 800);
    }
  };

  const handleCloseLetter = () => {
    setShowLetter(false);
    setEnvelopeState("closing");
    setTimeout(() => {
      setEnvelopeState("closed");
      setHasOpenedEnvelope(true);
      setTimeout(() => {
        setShowButtons(true);
      }, 300);
    }, 600);
  };

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
      {/* Back button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/dashboard")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Main content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
        {/* Title */}
        {/* <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2 text-center">
          For {customer.displayName}
        </h1>
        <p className="text-muted-foreground mb-12 text-center">
          {!hasOpenedEnvelope
            ? "Click the envelope to reveal your message"
            : "Your special message awaits"}
        </p> */}

        {/* Envelope */}
        <div
          className={`relative cursor-pointer transition-transform duration-500 ${envelopeState === "closed" && !hasOpenedEnvelope
            ? "hover:scale-105"
            : ""
            }`}
          onClick={handleEnvelopeClick}
        >
          {/* Envelope SVG */}
          <svg
            width="280"
            height="400"
            viewBox="0 0 280 200"
            className="drop-shadow-2xl"
          >
            {/* Envelope body */}
            <rect
              x="10"
              y="40"
              width="260"
              height="150"
              rx="8"
              fill="#fef7f5"
              stroke="#e8c4bc"
              strokeWidth="2"
            />

            {/* Inner shadow/depth */}
            <rect
              x="15"
              y="45"
              width="250"
              height="140"
              rx="6"
              fill="#fff9f7"
            />

            {/* Envelope back flap (V shape at bottom) */}
            <path
              d="M15 50 L140 130 L265 50"
              fill="none"
              stroke="#e8c4bc"
              strokeWidth="1.5"
            />

            {/* Envelope front flap */}
            <path
              d={
                envelopeState === "opening" || envelopeState === "open"
                  ? "M10 40 L140 -30 L270 40"
                  : "M10 40 L140 120 L270 40"
              }
              fill="#fbeae6"
              stroke="#e8c4bc"
              strokeWidth="2"
              className="transition-all duration-700 ease-in-out origin-top"
            />

            {/* Heart seal */}
            {envelopeState === "closed" && !hasOpenedEnvelope && (
              <g className="animate-pulse">
                <circle cx="140" cy="90" r="22" fill="#c9646a" />
                <path
                  d="M140 80 C134 74, 125 78, 125 85 C125 93, 140 103, 140 103 C140 103, 155 93, 155 85 C155 78, 146 74, 140 80"
                  fill="#fff5f5"
                />
              </g>
            )}

            {/* Decorative edge pattern */}
            <path
              d="M20 185 Q30 180 40 185 Q50 190 60 185 Q70 180 80 185 Q90 190 100 185 Q110 180 120 185 Q130 190 140 185 Q150 180 160 185 Q170 190 180 185 Q190 180 200 185 Q210 190 220 185 Q230 180 240 185 Q250 190 260 185"
              fill="none"
              stroke="#e8c4bc"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>

          {/* Prompt text */}
          {envelopeState === "closed" && !hasOpenedEnvelope && (
            <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground whitespace-nowrap animate-bounce">
              Click to open
            </p>
          )}
        </div>

        {/* Action buttons */}
        {showButtons && (
          <div className="flex flex-wrap gap-4 mt-12 justify-center animate-fade-in">
            <Button
              onClick={() => {
                setEnvelopeState("opening");
                setTimeout(() => {
                  setEnvelopeState("open");
                  setShowLetter(true);
                }, 800);
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 h-auto"
            >
              <Heart className="w-5 h-5 mr-2" />
              Read Letter
            </Button>
            <Button
              onClick={() => setShowSongModal(true)}
              variant="secondary"
              className="px-6 py-3 h-auto"
            >
              <Music className="w-5 h-5 mr-2" />
              Our Song
            </Button>
            <Button
              onClick={() => setShowPhotosModal(true)}
              variant="secondary"
              className="px-6 py-3 h-auto"
            >
              <Camera className="w-5 h-5 mr-2" />
              Photos
            </Button>
            <Button
              onClick={() => router.push(`/dashboard/${customerId}/quiz`)}
              variant="secondary"
              className="px-6 py-3 h-auto"
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              Quiz
            </Button>
          </div>
        )}
      </div>

      {/* Letter Modal */}
      {showLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-card rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden animate-slide-up">
            {/* Letter paper */}
            <div className="relative bg-secondary/30 overflow-y-auto max-h-[80vh]">
              {/* Close button */}
              <button
                onClick={handleCloseLetter}
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-muted transition-colors z-10"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Decorative border wrapper */}
              <div className="m-3 md:m-4 border-2 border-primary/20 rounded-lg">
                {/* Letter content */}
                <div className="p-5 md:p-8 space-y-6">
                  <p className="font-cursive text-2xl text-primary">
                    {customerData.letter.greeting}
                  </p>

                  <div className="space-y-4">
                    {customerData.letter.body.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-foreground/90 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="pt-4">
                    <p className="text-foreground/80 italic">
                      {customerData.letter.closing}
                    </p>
                    <p className="font-cursive text-xl text-primary mt-2">
                      {customerData.letter.signature}
                    </p>
                  </div>

                  {/* Heart decoration */}
                  <div className="flex justify-center pt-4">
                    <Heart
                      className="w-8 h-8 text-primary"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Song Modal */}
      {showSongModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slide-up">
            {/* Close button */}
            <button
              onClick={() => setShowSongModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Song cover */}
            <div className="aspect-square bg-primary/10 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/5" />
              <div className="relative z-10 text-center p-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Music className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-2xl font-serif text-foreground mb-2">
                  {customerData.song.title}
                </h3>
                <p className="text-muted-foreground">
                  {customerData.song.artist}
                </p>
              </div>
            </div>

            {/* Spotify link */}
            <div className="p-6">
              <p className="text-muted-foreground text-sm text-center mb-4">
                This song reminds me of you and all our beautiful moments
                together
              </p>
              <a
                href={customerData.song.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-full font-medium transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Listen on Spotify
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Photos Modal */}
      {showPhotosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] animate-slide-up">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-serif text-foreground">
                Our Memories
              </h3>
              <button
                onClick={() => setShowPhotosModal(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Photo grid */}
            <div className="p-4 overflow-hidden max-h-[calc(85vh-80px)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {customerData.photos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo.id)}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-muted hover:ring-2 hover:ring-primary transition-all"
                  >
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-primary/40" />
                    </div>
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-foreground/60 backdrop-blur-sm">
                      <p className="text-sm text-card truncate">
                        {photo.caption}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 p-2 rounded-full hover:bg-card/20 transition-colors"
            >
              <X className="w-6 h-6 text-card" />
            </button>

            {/* Image placeholder */}
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted flex items-center justify-center">
              <div className="text-center p-8">
                <Camera className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                <p className="text-xl font-serif text-foreground">
                  {
                    customerData.photos.find((p) => p.id === selectedPhoto)
                      ?.caption
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}
