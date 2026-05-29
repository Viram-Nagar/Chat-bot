import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Bot,
  Star,
  MessageSquare,
  Sliders,
  Globe,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
} from "lucide-react";
import { useBotSettingsStore } from "../store/botSettingsStore";
import { getBotConfig, BOT_LIST } from "../utils/botConfig";
import ConfirmModal from "../components/shared/ConfirmModal";
import toast from "react-hot-toast";
import { useBotSettingsStore } from "../store/botSettingsStore";

// ── Section wrapper ───────────────────────────────────────────────
const Section = ({ title, subtitle, icon: Icon, iconBg, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center`}
        >
          <Icon size={17} className="text-white" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// ── Star rating display ───────────────────────────────────────────
const StarDisplay = ({ rating, total }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }
        />
      ))}
    </div>
    <span className="text-sm font-bold text-gray-900 dark:text-white">
      {rating > 0 ? Number(rating).toFixed(1) : "—"}
    </span>
    <span className="text-xs text-gray-400 dark:text-gray-500">
      ({total} {total === 1 ? "rating" : "ratings"})
    </span>
  </div>
);

// ── Bot selector sidebar ──────────────────────────────────────────
const BotSelector = ({ activeBotType, onSelect }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
      Select Bot
    </p>
    <div className="space-y-1.5">
      {BOT_LIST.map((bot) => (
        <button
          key={bot.id}
          onClick={() => onSelect(bot.id)}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
            text-left transition-all duration-150
            ${
              activeBotType === bot.id
                ? `bg-gradient-to-r ${bot.gradient} text-white shadow-sm`
                : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }
          `}
        >
          <span className="text-xl">{bot.emoji}</span>
          <div>
            <p className={`text-sm font-semibold`}>{bot.name}</p>
            <p
              className={`text-xs ${
                activeBotType === bot.id
                  ? "text-white/70"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {bot.tagline}
            </p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

// ── Main BotSettingsPage ──────────────────────────────────────────
const BotSettingsPage = () => {
  const { botType: paramBotType } = useParams();
  const navigate = useNavigate();

  const [activeBotType, setActiveBotType] = useState(paramBotType || "fitness");
  const [resetModal, setResetModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [customName, setCustomName] = useState("");
  const [customGreeting, setCustomGreeting] = useState("");
  const [responseStyle, setResponseStyle] = useState("friendly");
  const [language, setLanguage] = useState("english");
  const [isEnabled, setIsEnabled] = useState(true);

  const { loadBotSettings, updateBotSettings, resetBotSettings, getSettings } =
    useBotSettingsStore();

  const bot = getBotConfig(activeBotType);
  const settings = getSettings(activeBotType);

  // Load settings when bot changes
  useEffect(() => {
    loadBotSettings(activeBotType);
  }, [activeBotType]);

  // Sync form with loaded settings
  useEffect(() => {
    const s = getSettings(activeBotType);
    setCustomName(s.customName || "");
    setCustomGreeting(s.customGreeting || "");
    setResponseStyle(s.responseStyle || "friendly");
    setLanguage(s.language || "english");
    setIsEnabled(s.isEnabled !== false);
  }, [activeBotType, settings.customName]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateBotSettings(activeBotType, {
        customName: customName.trim() || null,
        customGreeting: customGreeting.trim() || null,
        responseStyle,
        language,
        isEnabled,
      });
      await loadAllSettings();
      toast.success(`${bot?.name} settings saved!`);
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await resetBotSettings(activeBotType);
      setCustomName("");
      setCustomGreeting("");
      setResponseStyle("friendly");
      setLanguage("english");
      setIsEnabled(true);
      toast.success("Settings reset to default");
    } catch {
      toast.error("Failed to reset settings");
    } finally {
      setIsResetting(false);
      setResetModal(false);
    }
  };

  const styleOptions = [
    {
      value: "friendly",
      label: "Friendly",
      desc: "Warm, casual and encouraging",
      emoji: "😊",
    },
    {
      value: "professional",
      label: "Professional",
      desc: "Formal and structured",
      emoji: "💼",
    },
    {
      value: "detailed",
      label: "Detailed",
      desc: "Thorough and comprehensive",
      emoji: "📋",
    },
    {
      value: "concise",
      label: "Concise",
      desc: "Short and to the point",
      emoji: "⚡",
    },
  ];

  const languageOptions = [
    { value: "english", label: "English", flag: "🇺🇸" },
    { value: "hindi", label: "Hindi", flag: "🇮🇳" },
    { value: "hinglish", label: "Hinglish", flag: "🌐" },
  ];

  if (!bot) return null;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Header ──────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Chatbot Settings
            </h1>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
              Customize each AI assistant to match your preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ── Bot Selector ─────────────────────────── */}
          <div className="lg:col-span-1">
            <BotSelector
              activeBotType={activeBotType}
              onSelect={setActiveBotType}
            />
          </div>

          {/* ── Settings Panel ───────────────────────── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Current bot header */}
            <div
              className={`
                relative overflow-hidden rounded-2xl p-6
                bg-gradient-to-br ${bot.gradient}
              `}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">
                    {bot.emoji}
                  </div>
                  <div>
                    {/* Show custom name if set */}
                    <h2 className="text-xl font-bold text-white">
                      {customName || bot.name}
                    </h2>
                    <p className="text-white/70 text-sm">{bot.tagline}</p>
                    <StarDisplay
                      rating={settings.averageRating || 0}
                      total={settings.totalRatings || 0}
                    />
                  </div>
                </div>

                {/* Enable / Disable toggle */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => setIsEnabled(!isEnabled)}
                    className="text-white hover:scale-110 transition-transform"
                    title={isEnabled ? "Disable bot" : "Enable bot"}
                  >
                    {isEnabled ? (
                      <ToggleRight size={36} />
                    ) : (
                      <ToggleLeft size={36} className="opacity-50" />
                    )}
                  </button>
                  <span className="text-xs text-white/70">
                    {isEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Bot Identity ──────────────────────── */}
            <Section
              title="Bot Identity"
              subtitle="Customize how this bot presents itself"
              icon={Bot}
              iconBg={`bg-gradient-to-br ${bot.gradient}`}
            >
              <div className="space-y-5">
                {/* Custom name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Custom Bot Name
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    maxLength={30}
                    placeholder={`Default: ${bot.name}`}
                    className="
                      w-full px-4 py-2.5 text-sm rounded-xl border
                      bg-white dark:bg-gray-900
                      text-gray-900 dark:text-white
                      placeholder-gray-400 dark:placeholder-gray-500
                      border-gray-200 dark:border-gray-700
                      focus:border-blue-500 dark:focus:border-blue-500
                      focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20
                      outline-none transition-all
                    "
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Give your bot a personal name (e.g. "My Coach")
                    </p>
                    <span className="text-xs text-gray-400">
                      {customName.length}/30
                    </span>
                  </div>
                </div>

                {/* Custom greeting */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Custom Greeting Message
                  </label>
                  <textarea
                    value={customGreeting}
                    onChange={(e) => setCustomGreeting(e.target.value)}
                    maxLength={200}
                    rows={3}
                    placeholder={`Default: "${bot.name}" welcome message`}
                    className="
                      w-full px-4 py-2.5 text-sm rounded-xl border
                      bg-white dark:bg-gray-900
                      text-gray-900 dark:text-white
                      placeholder-gray-400 dark:placeholder-gray-500
                      border-gray-200 dark:border-gray-700
                      focus:border-blue-500 dark:focus:border-blue-500
                      focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20
                      outline-none transition-all resize-none
                    "
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      First message shown when you start a new chat
                    </p>
                    <span className="text-xs text-gray-400">
                      {customGreeting.length}/200
                    </span>
                  </div>
                </div>
              </div>
            </Section>

            {/* ── Response Style ────────────────────── */}
            <Section
              title="Response Style"
              subtitle="How should the bot communicate with you?"
              icon={Sliders}
              iconBg="bg-gradient-to-br from-purple-500 to-violet-600"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {styleOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setResponseStyle(option.value)}
                    className={`
                      flex items-start gap-3 p-4 rounded-xl border-2
                      text-left transition-all duration-150
                      ${
                        responseStyle === option.value
                          ? `border-transparent bg-gradient-to-br ${bot.gradient} text-white shadow-md`
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900"
                      }
                    `}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          responseStyle === option.value
                            ? "text-white"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {option.label}
                      </p>
                      <p
                        className={`text-xs mt-0.5 ${
                          responseStyle === option.value
                            ? "text-white/70"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        {option.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </Section>

            {/* ── Language ──────────────────────────── */}
            <Section
              title="Response Language"
              subtitle="Choose your preferred language"
              icon={Globe}
              iconBg="bg-gradient-to-br from-teal-500 to-cyan-600"
            >
              <div className="flex flex-wrap gap-3">
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setLanguage(option.value)}
                    className={`
                      flex items-center gap-2 px-5 py-3 rounded-xl
                      border-2 font-semibold text-sm transition-all
                      ${
                        language === option.value
                          ? `border-transparent bg-gradient-to-br ${bot.gradient} text-white shadow-md`
                          : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 bg-white dark:bg-gray-900"
                      }
                    `}
                  >
                    <span className="text-xl">{option.flag}</span>
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                ⚠️ Language preference is sent as instruction to the AI.
                Accuracy may vary.
              </p>
            </Section>

            {/* ── Stats ─────────────────────────────── */}
            <Section
              title="Your Ratings & Feedback"
              subtitle="How you've rated this bot's responses"
              icon={Star}
              iconBg="bg-gradient-to-br from-yellow-400 to-orange-500"
            >
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    {settings.averageRating > 0
                      ? Number(settings.averageRating).toFixed(1)
                      : "—"}
                  </p>
                  <StarDisplay
                    rating={settings.averageRating || 0}
                    total={settings.totalRatings || 0}
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Average rating
                  </p>
                </div>

                <div className="flex-1 text-center py-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                  <MessageSquare
                    size={24}
                    className="text-gray-300 dark:text-gray-600 mx-auto mb-2"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Rate responses using the ⭐ button
                    <br />
                    in the chat window
                  </p>
                </div>
              </div>
            </Section>

            {/* ── Action buttons ────────────────────── */}
            <div className="flex items-center justify-between gap-4">
              {/* Reset */}
              <button
                onClick={() => setResetModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
              >
                <RotateCcw size={15} />
                Reset to Default
              </button>

              {/* Save */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`
                  flex items-center gap-2 px-6 py-2.5 text-sm font-semibold
                  text-white rounded-xl shadow-md hover:shadow-lg
                  transition-all active:scale-[0.98]
                  disabled:opacity-60 disabled:cursor-not-allowed
                  bg-gradient-to-r ${bot.gradient}
                `}
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                {isSaving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Reset Confirm Modal ──────────────────────── */}
      <ConfirmModal
        isOpen={resetModal}
        onClose={() => setResetModal(false)}
        onConfirm={handleReset}
        isLoading={isResetting}
        title="Reset bot settings?"
        message={`All custom settings for ${bot?.name} will be reset to default. This cannot be undone.`}
        confirmText="Reset"
      />
    </main>
  );
};

export default BotSettingsPage;
