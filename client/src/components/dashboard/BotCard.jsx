import { useNavigate } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useBotSettingsStore } from "../../store/botSettingsStore";

const BotCard = ({ bot }) => {
  const navigate = useNavigate();
  const { getMergedBotConfig } = useBotSettingsStore();

  const mergedBot = getMergedBotConfig(bot);
  return (
    <div
      onClick={() => navigate(`/chat/${bot.id}`)}
      className="
        group relative bg-white dark:bg-gray-800
        rounded-2xl border border-gray-100 dark:border-gray-700
        hover:border-transparent hover:shadow-2xl
        transition-all duration-300 cursor-pointer
        hover:-translate-y-1 overflow-hidden
      "
    >
      {/* ── Top gradient bar ──────────────────────── */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${bot.gradient}`} />

      <div className="p-6">
        {/* ── Header ────────────────────────────────── */}
        <div className="flex items-start justify-between mb-4">
          {/* Bot avatar */}
          <div
            className={`
              w-14 h-14 rounded-2xl bg-gradient-to-br ${bot.gradient}
              flex items-center justify-center text-2xl
              shadow-md group-hover:shadow-lg
              group-hover:scale-110 transition-all duration-300
            `}
          >
            {bot.emoji}
          </div>

          {/* Arrow icon */}
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              bg-gray-100 dark:bg-gray-700
              group-hover:bg-gradient-to-br group-hover:${bot.gradient}
              transition-all duration-300
            `}
          >
            <ArrowRight
              size={14}
              className="
                text-gray-400 dark:text-gray-500
                group-hover:text-white
                group-hover:translate-x-0.5
                transition-all duration-300
              "
            />
          </div>
        </div>

        {/* ── Bot info ──────────────────────────────── */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">
          {mergedBot.name}
        </h3>
        <p className={`text-xs font-semibold ${mergedBot.text} mb-3`}>
          {mergedBot.tagline}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
          {mergedBot.description}
        </p>

        {/* ── Starter questions ─────────────────────── */}
        <div className="space-y-2 mb-5">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
            Try asking...
          </p>
          {mergedBot.starters.slice(0, 3).map((starter) => (
            <div
              key={starter}
              className={`
                flex items-start gap-2 px-3 py-2 rounded-lg
                ${mergedBot.bgLight} ${mergedBot.bgDark} ${mergedBot.border} border
                text-xs text-gray-600 dark:text-gray-300
                group-hover:border-opacity-60 transition-colors
              `}
            >
              <MessageSquare
                size={11}
                className={`mt-0.5 flex-shrink-0 ${mergedBot.text}`}
              />
              <span>{starter}</span>
            </div>
          ))}
        </div>

        {/* ── CTA button ────────────────────────────── */}
        <button
          className={`
            w-full py-2.5 rounded-xl text-sm font-semibold
            bg-gradient-to-r ${mergedBot.gradient}
            text-white shadow-sm
            hover:shadow-md active:scale-[0.98]
            transition-all duration-200
            flex items-center justify-center gap-2
          `}
        >
          Start Chatting
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default BotCard;
