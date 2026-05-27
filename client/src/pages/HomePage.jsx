import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  History,
  Star,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { BOT_LIST } from "../utils/botConfig";

// ── Hero Section ───────────────────────────────────────────────
const HeroSection = ({ isAuthenticated }) => (
  <section className="relative overflow-hidden bg-white dark:bg-gray-900 pt-16 pb-20">
    {/* Background gradient */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-60" />
    </div>

    <div className="relative max-w-5xl mx-auto px-6 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
        <Sparkles size={14} />
        Powered by Claude AI
        <Sparkles size={14} />
      </div>

      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
        Your Personal{" "}
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          AI Assistants
        </span>
        <br />
        for Every Goal
      </h1>

      <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Five specialized AI chatbots — fitness, finance, science, wellness, and
        coding. Get expert guidance in every area of your life, available 24/7.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to={isAuthenticated ? "/dashboard" : "/register"}
          className="
            flex items-center gap-2 px-8 py-3.5
            bg-gradient-to-r from-blue-500 to-purple-600
            hover:from-blue-600 hover:to-purple-700
            text-white font-semibold rounded-2xl
            shadow-lg hover:shadow-xl
            transition-all duration-200 text-sm
            active:scale-[0.98]
          "
        >
          {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
          <ArrowRight size={16} />
        </Link>

        {!isAuthenticated && (
          <Link
            to="/login"
            className="
              flex items-center gap-2 px-8 py-3.5
              border border-gray-200 dark:border-gray-700
              text-gray-700 dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-gray-800
              font-semibold rounded-2xl text-sm
              transition-all duration-200
            "
          >
            Sign In
            <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {/* Social proof */}
      <div className="flex items-center justify-center gap-6 mt-10 text-sm text-gray-400 dark:text-gray-500">
        {[
          {
            icon: <Star size={14} className="text-yellow-400" />,
            text: "4.9/5 rating",
          },
          {
            icon: <Zap size={14} className="text-blue-400" />,
            text: "Instant responses",
          },
          {
            icon: <Shield size={14} className="text-green-400" />,
            text: "Secure & private",
          },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-1.5">
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Bot Cards Section ───────────────────────────────────────────
const BotShowcase = ({ isAuthenticated }) => (
  <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Meet Your AI Team
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Each bot is a specialist trained with deep domain expertise and a
          unique personality.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BOT_LIST.map((bot) => (
          <Link
            key={bot.id}
            to={isAuthenticated ? `/chat/${bot.id}` : "/register"}
            className="
              group relative bg-white dark:bg-gray-800
              rounded-2xl p-6 border border-gray-100 dark:border-gray-700
              hover:border-transparent hover:shadow-2xl
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            {/* Gradient top bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${bot.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Bot emoji */}
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bot.gradient} flex items-center justify-center text-2xl mb-4 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}
            >
              {bot.emoji}
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {bot.name}
            </h3>
            <p className={`text-xs font-semibold ${bot.text} mb-3`}>
              {bot.tagline}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              {bot.description}
            </p>

            {/* Sample starters */}
            <div className="space-y-1.5">
              {bot.starters.slice(0, 2).map((s) => (
                <div
                  key={s}
                  className="flex items-start gap-2 text-xs text-gray-400 dark:text-gray-500"
                >
                  <ChevronRight size={12} className="mt-0.5 flex-shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`mt-4 flex items-center gap-1 text-xs font-semibold ${bot.text} group-hover:gap-2 transition-all`}
            >
              Chat now <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

// ── Features Section ────────────────────────────────────────────
const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap size={22} className="text-yellow-500" />,
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      title: "Lightning Fast",
      desc: "Get AI responses in under 2 seconds. No waiting, no delays — just instant expert answers whenever you need them.",
    },
    {
      icon: <History size={22} className="text-blue-500" />,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      title: "Full Chat History",
      desc: "Every conversation is saved automatically. Pick up exactly where you left off, across any device.",
    },
    {
      icon: <Shield size={22} className="text-green-500" />,
      bg: "bg-green-50 dark:bg-green-900/20",
      title: "Secure by Design",
      desc: "Your data is protected with JWT auth, encrypted cookies, and rate limiting. Your privacy is our priority.",
    },
    {
      icon: <Bot size={22} className="text-purple-500" />,
      bg: "bg-purple-50 dark:bg-purple-900/20",
      title: "Expert Personalities",
      desc: "Each bot has a unique system prompt crafted by domain experts — not generic AI, but specialized intelligence.",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why ChatAI?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Built for real people with real goals. Not just another chatbot.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}
              >
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── CTA Section ─────────────────────────────────────────────────
const CTASection = ({ isAuthenticated }) => (
  <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
    </div>

    <div className="relative max-w-3xl mx-auto px-6 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        Ready to meet your AI team?
      </h2>
      <p className="text-blue-100 text-lg mb-8">
        Start chatting for free. No credit card required.
      </p>
      <Link
        to={isAuthenticated ? "/dashboard" : "/register"}
        className="
          inline-flex items-center gap-2
          px-8 py-3.5 bg-white
          text-blue-600 font-bold rounded-2xl
          hover:bg-blue-50 shadow-xl
          transition-all duration-200 text-sm
          active:scale-[0.98]
        "
      >
        {isAuthenticated ? "Open Dashboard" : "Start for Free"}
        <ArrowRight size={16} />
      </Link>
    </div>
  </section>
);

// ── Footer ───────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 py-10">
    <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Bot size={14} className="text-white" />
        </div>
        <span className="text-white font-bold">ChatAI</span>
      </div>
      <p className="text-sm text-center">
        © {new Date().getFullYear()} ChatAI. Built with MERN Stack + Claude AI.
      </p>
      <div className="flex items-center gap-4 text-sm">
        <span className="hover:text-white cursor-pointer transition-colors">
          Privacy
        </span>
        <span className="hover:text-white cursor-pointer transition-colors">
          Terms
        </span>
        <span className="hover:text-white cursor-pointer transition-colors">
          Contact
        </span>
      </div>
    </div>
  </footer>
);

// ── Main HomePage ────────────────────────────────────────────────
const HomePage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="overflow-hidden">
      <HeroSection isAuthenticated={isAuthenticated} />
      <BotShowcase isAuthenticated={isAuthenticated} />
      <FeaturesSection />
      <CTASection isAuthenticated={isAuthenticated} />
      <Footer />
    </div>
  );
};

export default HomePage;
