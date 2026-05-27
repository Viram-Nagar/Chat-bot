export const BOT_CONFIG = {
  fitness: {
    id: "fitness",
    name: "FitBot",
    tagline: "Your Personal Fitness Coach",
    description:
      "Get personalized workout plans, nutrition advice, and health tips to crush your fitness goals.",
    emoji: "💪",
    icon: "Dumbbell",
    gradient: "from-green-400 to-emerald-600",
    gradientDark: "from-green-500 to-emerald-700",
    bgLight: "bg-green-50",
    bgDark: "dark:bg-green-950",
    border: "border-green-200 dark:border-green-800",
    badge: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    button: "bg-green-500 hover:bg-green-600",
    ring: "ring-green-500",
    text: "text-green-600 dark:text-green-400",
    userBubble: "bg-green-500 text-white",
    starters: [
      "Create a beginner workout plan for weight loss",
      "What should I eat before a morning workout?",
      "How many calories should I eat to build muscle?",
      "Give me a 7-day diet plan for fat loss",
    ],
  },

  finance: {
    id: "finance",
    name: "FinBot",
    tagline: "Your Smart Finance Advisor",
    description:
      "Master budgeting, saving strategies, and make informed financial decisions with AI guidance.",
    emoji: "💰",
    icon: "TrendingUp",
    gradient: "from-blue-400 to-indigo-600",
    gradientDark: "from-blue-500 to-indigo-700",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-950",
    border: "border-blue-200 dark:border-blue-800",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    button: "bg-blue-500 hover:bg-blue-600",
    ring: "ring-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    userBubble: "bg-blue-500 text-white",
    starters: [
      "Help me create a monthly budget on ₹30,000 salary",
      "How should I start investing with ₹5000/month?",
      "What's the 50/30/20 budgeting rule?",
      "How can I save for an emergency fund?",
    ],
  },

  science: {
    id: "science",
    name: "SciBot",
    tagline: "Your Science Learning Companion",
    description:
      "Explore Physics, Chemistry, and Biology through interactive explanations and step-by-step problem solving.",
    emoji: "🔬",
    icon: "FlaskConical",
    gradient: "from-purple-400 to-violet-600",
    gradientDark: "from-purple-500 to-violet-700",
    bgLight: "bg-purple-50",
    bgDark: "dark:bg-purple-950",
    border: "border-purple-200 dark:border-purple-800",
    badge:
      "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    button: "bg-purple-500 hover:bg-purple-600",
    ring: "ring-purple-500",
    text: "text-purple-600 dark:text-purple-400",
    userBubble: "bg-purple-500 text-white",
    starters: [
      "Explain Newton's laws of motion with examples",
      "How does photosynthesis work?",
      "What is the periodic table and how to read it?",
      "Solve this problem: A car travels 60km/h for 2 hours...",
    ],
  },

  wellness: {
    id: "wellness",
    name: "ZenBot",
    tagline: "Your Mental Wellness Companion",
    description:
      "Find calm, manage stress, and build healthy habits with mindfulness guidance and emotional support.",
    emoji: "🧘",
    icon: "Heart",
    gradient: "from-teal-400 to-cyan-600",
    gradientDark: "from-teal-500 to-cyan-700",
    bgLight: "bg-teal-50",
    bgDark: "dark:bg-teal-950",
    border: "border-teal-200 dark:border-teal-800",
    badge: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
    button: "bg-teal-500 hover:bg-teal-600",
    ring: "ring-teal-500",
    text: "text-teal-600 dark:text-teal-400",
    userBubble: "bg-teal-500 text-white",
    starters: [
      "I'm feeling stressed about work. Help me.",
      "Teach me a quick 5-minute meditation",
      "How can I improve my sleep quality?",
      "Give me tips to build a healthy morning routine",
    ],
  },

  code: {
    id: "code",
    name: "CodeBot",
    tagline: "Your Programming Mentor",
    description:
      "Get expert help with coding, debugging, DSA problems, and system design from your AI dev mentor.",
    emoji: "👨‍💻",
    icon: "Code2",
    gradient: "from-orange-400 to-red-500",
    gradientDark: "from-orange-500 to-red-600",
    bgLight: "bg-orange-50",
    bgDark: "dark:bg-orange-950",
    border: "border-orange-200 dark:border-orange-800",
    badge:
      "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    button: "bg-orange-500 hover:bg-orange-600",
    ring: "ring-orange-500",
    text: "text-orange-600 dark:text-orange-400",
    userBubble: "bg-orange-500 text-white",
    starters: [
      "Explain the difference between var, let, and const",
      "How do I reverse a linked list in JavaScript?",
      "Debug my React useEffect code",
      "Explain Big O notation with examples",
    ],
  },
};

export const BOT_LIST = Object.values(BOT_CONFIG);

export const getBotConfig = (botType) => BOT_CONFIG[botType] || null;
