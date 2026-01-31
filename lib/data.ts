// Site Password
export const SITE_PASSWORD = "iloveyou";

// Customer Data
export interface Customer {
  id: string;
  name: string;
  displayName: string;
}

export interface Letter {
  greeting: string;
  body: string[];
  closing: string;
  signature: string;
}

export interface Song {
  title: string;
  artist: string;
  coverImage: string;
  spotifyUrl: string;
}

export interface Photo {
  id: number;
  src: string;
  caption: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface CustomerData {
  letter: Letter;
  song: Song;
  photos: Photo[];
  quiz: QuizQuestion[];
}

export const customers: Customer[] = [
  { id: "jaja", name: "jaja", displayName: "Jaja" },
  { id: "baby", name: "baby", displayName: "My Baby" },
  { id: "love", name: "love", displayName: "My Love" },
];

export const customerData: Record<string, CustomerData> = {
  jaja: {
    letter: {
      greeting: "My Dearest Jaja,",
      body: [
        "Every moment with you feels like a beautiful dream I never want to wake up from. Your smile lights up my world in ways words could never fully capture.",
        "From the first day we met, I knew there was something magical about you. The way you laugh, the way you care, the way you make even ordinary moments feel extraordinary.",
        "You are my favorite person, my best friend, and the love of my life. Thank you for being you, and for choosing to share your journey with me.",
        "Here's to us, to our love story, and to all the adventures that await us together."
      ],
      closing: "Forever and always yours,",
      signature: "With all my love"
    },
    song: {
      title: "Perfect",
      artist: "Ed Sheeran",
      coverImage: "/images/song-cover.jpg",
      spotifyUrl: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v"
    },
    photos: [
      { id: 1, src: "/images/photo-1.jpg", caption: "Our first date" },
      { id: 2, src: "/images/photo-2.jpg", caption: "Beach sunset" },
      { id: 3, src: "/images/photo-3.jpg", caption: "Coffee mornings" },
      { id: 4, src: "/images/photo-4.jpg", caption: "Adventure time" },
      { id: 5, src: "/images/photo-5.jpg", caption: "Stargazing" },
      { id: 6, src: "/images/photo-6.jpg", caption: "Cooking together" },
      { id: 7, src: "/images/photo-7.jpg", caption: "Movie nights" },
      { id: 8, src: "/images/photo-8.jpg", caption: "Forever us" }
    ],
    quiz: [
      {
        id: 1,
        question: "What was the first movie we watched together?",
        options: ["The Notebook", "Titanic", "La La Land", "A Star Is Born"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "What is my favorite flower?",
        options: ["Tulips", "Roses", "Sunflowers", "Lilies"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Where did we have our first kiss?",
        options: ["At the park", "At the beach", "Under the stars", "In the rain"],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "What is my favorite way to spend time with you?",
        options: ["Watching movies", "Cooking together", "Going for walks", "All of the above"],
        correctAnswer: 3
      },
      {
        id: 5,
        question: "What song reminds me of you?",
        options: ["Perfect", "Thinking Out Loud", "All of Me", "A Thousand Years"],
        correctAnswer: 0
      },
      {
        id: 6,
        question: "What is my favorite thing about you?",
        options: ["Your smile", "Your laugh", "Your kindness", "Everything"],
        correctAnswer: 3
      },
      {
        id: 7,
        question: "What is our anniversary month?",
        options: ["January", "February", "March", "April"],
        correctAnswer: 1
      },
      {
        id: 8,
        question: "What do I call you most often?",
        options: ["Honey", "Baby", "Love", "Sweetheart"],
        correctAnswer: 1
      },
      {
        id: 9,
        question: "What is my dream vacation with you?",
        options: ["Paris", "Maldives", "Japan", "Italy"],
        correctAnswer: 0
      },
      {
        id: 10,
        question: "How much do I love you?",
        options: ["A lot", "So much", "More than words can say", "To infinity and beyond"],
        correctAnswer: 3
      }
    ]
  },
  baby: {
    letter: {
      greeting: "My Precious Baby,",
      body: [
        "You came into my life like a shooting star, unexpected but absolutely magical. Every day with you is a gift I cherish deeply.",
        "Your presence makes everything better. The way your eyes sparkle when you're happy, the warmth of your embrace, the sound of your voice - these are the things I live for.",
        "Thank you for loving me, for accepting me, and for being my safe place in this chaotic world.",
        "I promise to love you today, tomorrow, and for all the days that follow."
      ],
      closing: "Yours completely,",
      signature: "Your forever love"
    },
    song: {
      title: "All of Me",
      artist: "John Legend",
      coverImage: "/images/song-cover.jpg",
      spotifyUrl: "https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a"
    },
    photos: [
      { id: 1, src: "/images/photo-1.jpg", caption: "Sweet memories" },
      { id: 2, src: "/images/photo-2.jpg", caption: "Together" },
      { id: 3, src: "/images/photo-3.jpg", caption: "Happy days" },
      { id: 4, src: "/images/photo-4.jpg", caption: "Us" },
      { id: 5, src: "/images/photo-5.jpg", caption: "Love" },
      { id: 6, src: "/images/photo-6.jpg", caption: "Joy" },
      { id: 7, src: "/images/photo-7.jpg", caption: "Bliss" },
      { id: 8, src: "/images/photo-8.jpg", caption: "Always" }
    ],
    quiz: [
      {
        id: 1,
        question: "What was our first date activity?",
        options: ["Dinner", "Movie", "Walk in the park", "Coffee"],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "What is my favorite dessert?",
        options: ["Chocolate cake", "Ice cream", "Cheesecake", "Tiramisu"],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "What do I love most about weekends?",
        options: ["Sleeping in", "Being with you", "Relaxing", "Adventures"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is my favorite season?",
        options: ["Spring", "Summer", "Autumn", "Winter"],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "What color reminds me of our love?",
        options: ["Red", "Pink", "Gold", "All warm colors"],
        correctAnswer: 3
      },
      {
        id: 6,
        question: "What is my favorite thing to do together?",
        options: ["Travel", "Cook", "Watch sunsets", "Everything"],
        correctAnswer: 3
      },
      {
        id: 7,
        question: "What is my love language?",
        options: ["Words", "Touch", "Time", "Acts of service"],
        correctAnswer: 2
      },
      {
        id: 8,
        question: "What animal represents our love?",
        options: ["Swans", "Doves", "Butterflies", "Lovebirds"],
        correctAnswer: 0
      },
      {
        id: 9,
        question: "What is my favorite memory with you?",
        options: ["First meeting", "First kiss", "First trip", "Every moment"],
        correctAnswer: 3
      },
      {
        id: 10,
        question: "Will you be my Valentine forever?",
        options: ["Yes", "Absolutely", "Of course", "All of the above"],
        correctAnswer: 3
      }
    ]
  },
  love: {
    letter: {
      greeting: "To My One True Love,",
      body: [
        "In a world full of billions of people, I found you. And that, my love, is the greatest miracle of my life.",
        "You understand me in ways no one else ever has. You see past my flaws and love me anyway. You make me want to be a better person every single day.",
        "Our love story is my favorite story. It's written in the stars, destined by fate, and sealed with countless precious moments we've shared.",
        "I cannot wait to create more memories with you, to grow old with you, and to love you for eternity."
      ],
      closing: "Until the end of time,",
      signature: "Your soulmate"
    },
    song: {
      title: "A Thousand Years",
      artist: "Christina Perri",
      coverImage: "/images/song-cover.jpg",
      spotifyUrl: "https://open.spotify.com/track/6lanRgr6wXibZr8KgzXxBl"
    },
    photos: [
      { id: 1, src: "/images/photo-1.jpg", caption: "Destiny" },
      { id: 2, src: "/images/photo-2.jpg", caption: "Soulmates" },
      { id: 3, src: "/images/photo-3.jpg", caption: "Eternal" },
      { id: 4, src: "/images/photo-4.jpg", caption: "Infinite" },
      { id: 5, src: "/images/photo-5.jpg", caption: "Timeless" },
      { id: 6, src: "/images/photo-6.jpg", caption: "Precious" },
      { id: 7, src: "/images/photo-7.jpg", caption: "Magical" },
      { id: 8, src: "/images/photo-8.jpg", caption: "Forever" }
    ],
    quiz: [
      {
        id: 1,
        question: "What did I think when I first saw you?",
        options: ["Wow", "Beautiful", "The one", "All of these"],
        correctAnswer: 3
      },
      {
        id: 2,
        question: "What is our song?",
        options: ["A Thousand Years", "Perfect", "All of Me", "Thinking Out Loud"],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "What do I want most in life?",
        options: ["Success", "Happiness", "You", "Peace"],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "How long will I love you?",
        options: ["Forever", "Always", "Eternally", "All answers are correct"],
        correctAnswer: 3
      },
      {
        id: 5,
        question: "What makes you special to me?",
        options: ["Your heart", "Your soul", "Your being", "Everything about you"],
        correctAnswer: 3
      },
      {
        id: 6,
        question: "What is my favorite way to say I love you?",
        options: ["Words", "Actions", "Presence", "All of these"],
        correctAnswer: 3
      },
      {
        id: 7,
        question: "Where do I see us in 10 years?",
        options: ["Happy", "Together", "In love", "All of the above"],
        correctAnswer: 3
      },
      {
        id: 8,
        question: "What is the key to our love?",
        options: ["Trust", "Communication", "Respect", "All combined"],
        correctAnswer: 3
      },
      {
        id: 9,
        question: "What do you mean to me?",
        options: ["The world", "Everything", "My universe", "All descriptions fit"],
        correctAnswer: 3
      },
      {
        id: 10,
        question: "Are you my forever Valentine?",
        options: ["Yes!", "Definitely!", "Absolutely!", "Yes, yes, and yes!"],
        correctAnswer: 3
      }
    ]
  }
};

export function getCustomerData(customerId: string): CustomerData | null {
  return customerData[customerId] || null;
}

export function getCustomer(customerId: string): Customer | null {
  return customers.find(c => c.id === customerId) || null;
}
