import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] flex">
      {/* ── Left Panel (decorative) ─────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        {/* Background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-4">
              5 Specialized AI Assistants
            </span>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Your personal AI squad is waiting
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              From crushing fitness goals to mastering finances — get expert
              guidance across every area of your life.
            </p>
          </div>

          {/* Bot showcase */}
          <div className="space-y-3">
            {[
              {
                emoji: "💪",
                name: "FitBot",
                desc: "Workout & Nutrition plans",
              },
              {
                emoji: "💰",
                name: "FinBot",
                desc: "Budget & Investment advice",
              },
              {
                emoji: "🔬",
                name: "SciBot",
                desc: "Physics, Chemistry, Biology",
              },
              {
                emoji: "🧘",
                name: "ZenBot",
                desc: "Mental wellness & mindfulness",
              },
              { emoji: "👨‍💻", name: "CodeBot", desc: "Programming & DSA help" },
            ].map((bot) => (
              <div
                key={bot.name}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20"
              >
                <span className="text-2xl">{bot.emoji}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{bot.name}</p>
                  <p className="text-blue-200 text-xs">{bot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel (form) ──────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-900">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
