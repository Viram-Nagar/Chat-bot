import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  History,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import { BOT_LIST, getBotConfig } from "../utils/botConfig";
import { formatDate } from "../utils/helpers";
import BotCard from "../components/dashboard/BotCard";
import Avatar from "../components/shared/Avatar";

// ── Stats Bar ────────────────────────────────────────────────────
const StatsBar = ({ conversations, user }) => {
  const totalMessages = conversations.reduce(
    (sum, c) => sum + (c.messageCount || 0),
    0,
  );

  // Most used bot
  const botCounts = conversations.reduce((acc, c) => {
    acc[c.botType] = (acc[c.botType] || 0) + 1;
    return acc;
  }, {});
  const topBot = Object.entries(botCounts).sort((a, b) => b[1] - a[1])[0];
  const topBotConfig = topBot ? getBotConfig(topBot[0]) : null;

  const stats = [
    {
      icon: <MessageSquare size={18} className="text-blue-500" />,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      label: "Total Chats",
      value: conversations.length,
    },
    {
      icon: <TrendingUp size={18} className="text-green-500" />,
      bg: "bg-green-50 dark:bg-green-900/20",
      label: "Messages Sent",
      value: totalMessages,
    },
    {
      icon: <Sparkles size={18} className="text-purple-500" />,
      bg: "bg-purple-50 dark:bg-purple-900/20",
      label: "Favourite Bot",
      value: topBotConfig ? `${topBotConfig.emoji} ${topBotConfig.name}` : "—",
    },
    {
      icon: <Clock size={18} className="text-orange-500" />,
      bg: "bg-orange-50 dark:bg-orange-900/20",
      label: "Member Since",
      value: formatDate(user?.createdAt || new Date()),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700"
        >
          <div
            className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}
          >
            {stat.icon}
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

// ── Recent Conversations ──────────────────────────────────────────
const RecentConversations = ({ conversations }) => {
  if (!conversations.length) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Recent Conversations
        </h2>
        <Link
          to="/history"
          className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center gap-1 transition-colors"
        >
          View all
          <History size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {conversations.slice(0, 6).map((conv) => {
          const bot = getBotConfig(conv.botType);
          if (!bot) return null;
          return (
            <Link
              key={conv._id}
              to={`/chat/${conv.botType}?conv=${conv._id}`}
              className="
                flex items-start gap-3 p-4
                bg-white dark:bg-gray-800
                rounded-xl border border-gray-100 dark:border-gray-700
                hover:border-gray-200 dark:hover:border-gray-600
                hover:shadow-md transition-all duration-200
              "
            >
              {/* Bot emoji */}
              <div
                className={`
                  w-10 h-10 rounded-xl flex-shrink-0
                  bg-gradient-to-br ${bot.gradient}
                  flex items-center justify-center text-lg
                `}
              >
                {bot.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-xs font-semibold ${bot.text}`}>
                    {bot.name}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
                    {formatDate(conv.updatedAt)}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                  {conv.title}
                </p>
                {conv.lastMessage && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// ── Main Dashboard ────────────────────────────────────────────────
const DashboardPage = () => {
  const { user } = useAuthStore();
  const { conversations, loadConversations } = useChatStore();

  useEffect(() => {
    loadConversations();
  }, []);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Welcome Header ──────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar user={user} size="lg" />
            <div>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {getGreeting()} 👋
              </p>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.name}
              </h1>
            </div>
          </div>

          <Link
            to="/history"
            className="
              hidden sm:flex items-center gap-2 px-4 py-2
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              text-sm font-medium text-gray-600 dark:text-gray-300
              rounded-xl hover:shadow-sm transition-all
            "
          >
            <History size={15} />
            Chat History
          </Link>
        </div>

        {/* ── Stats ───────────────────────────────────── */}
        <StatsBar conversations={conversations} user={user} />

        {/* ── Recent conversations ─────────────────────── */}
        <RecentConversations conversations={conversations} />

        {/* ── Bot Grid ────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={18} className="text-purple-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Choose Your AI Assistant
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {BOT_LIST.map((bot) => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
