import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] flex">
      {/* ── Left Panel (form) ───────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-900">
        <RegisterForm />
      </div>

      {/* ── Right Panel (decorative) ────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500">
        {/* Background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-4">
              Free to get started
            </span>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Everything you need, powered by AI
            </h2>
            <p className="text-pink-100 text-lg leading-relaxed">
              Join thousands of users who supercharge their daily life with
              personalized AI assistance.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              {
                icon: "⚡",
                title: "Instant AI Responses",
                desc: "Get expert answers in seconds, not hours",
              },
              {
                icon: "🧠",
                title: "5 Specialized Bots",
                desc: "Each bot is an expert in its domain",
              },
              {
                icon: "💬",
                title: "Full Chat History",
                desc: "Access all your past conversations anytime",
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                desc: "Your data is encrypted and protected",
              },
              {
                icon: "🌙",
                title: "Dark Mode Support",
                desc: "Easy on the eyes, day and night",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20"
              >
                <span className="text-xl mt-0.5">{feature.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {feature.title}
                  </p>
                  <p className="text-pink-200 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
