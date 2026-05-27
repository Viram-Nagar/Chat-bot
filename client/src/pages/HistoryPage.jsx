import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  History,
  Search,
  Filter,
  Trash2,
  MessageSquare,
  Calendar,
  ChevronRight,
  SlidersHorizontal,
  X,
  RefreshCw,
} from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { getBotConfig, BOT_LIST } from "../utils/botConfig";
import { formatDate } from "../utils/helpers";
import ConfirmModal from "../components/shared/ConfirmModal";
import Loader from "../components/shared/Loader";
import toast from "react-hot-toast";

// ── Filter bar ───────────────────────────────────────────────────
const FilterBar = ({
  activeBot,
  onBotChange,
  search,
  onSearchChange,
  onClear,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 mb-6">
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search input */}
      <div className="relative flex-1">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search conversations..."
          className="
            w-full pl-10 pr-4 py-2.5 text-sm
            bg-gray-50 dark:bg-gray-900
            border border-gray-200 dark:border-gray-700
            rounded-xl outline-none
            text-gray-800 dark:text-gray-200
            placeholder-gray-400 dark:placeholder-gray-500
            focus:border-blue-400 dark:focus:border-blue-600
            focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30
            transition-all
          "
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Bot filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 flex-shrink-0">
          <SlidersHorizontal size={13} />
          <span>Filter:</span>
        </div>

        {/* All */}
        <button
          onClick={() => onBotChange("")}
          className={`
            flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold
            transition-all duration-150
            ${
              !activeBot
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }
          `}
        >
          All
        </button>

        {BOT_LIST.map((bot) => (
          <button
            key={bot.id}
            onClick={() => onBotChange(bot.id)}
            className={`
              flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold
              transition-all duration-150
              ${
                activeBot === bot.id
                  ? `bg-gradient-to-r ${bot.gradient} text-white shadow-sm`
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }
            `}
          >
            <span>{bot.emoji}</span>
            <span>{bot.name}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

// ── Conversation card ────────────────────────────────────────────
const ConversationCard = ({ conversation, onOpen, onDelete }) => {
  const bot = getBotConfig(conversation.botType);
  if (!bot) return null;

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Top color bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${bot.gradient}`} />

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Bot avatar */}
          <div
            className={`
              w-11 h-11 rounded-xl flex-shrink-0
              bg-gradient-to-br ${bot.gradient}
              flex items-center justify-center text-xl shadow-sm
            `}
          >
            {bot.emoji}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <span className={`text-xs font-bold ${bot.text}`}>
                  {bot.name}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5 leading-snug">
                  {conversation.title}
                </h3>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => onDelete(conversation._id)}
                  className="
                    p-1.5 rounded-lg text-gray-300 dark:text-gray-600
                    hover:text-red-500 dark:hover:text-red-400
                    hover:bg-red-50 dark:hover:bg-red-900/20
                    transition-all opacity-0 group-hover:opacity-100
                  "
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Last message preview */}
            {conversation.lastMessage && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                {conversation.lastMessage}
              </p>
            )}

            {/* Meta row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                <div className="flex items-center gap-1">
                  <MessageSquare size={11} />
                  <span>{conversation.messageCount || 0} messages</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={11} />
                  <span>{formatDate(conversation.updatedAt)}</span>
                </div>
              </div>

              {/* Open button */}
              <button
                onClick={() => onOpen(conversation)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5
                  bg-gradient-to-r ${bot.gradient}
                  text-white text-xs font-semibold rounded-lg
                  hover:shadow-md active:scale-[0.98]
                  transition-all duration-150
                `}
              >
                Open
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Empty state ──────────────────────────────────────────────────
const EmptyState = ({ hasFilters, onReset }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mb-4">
      <History size={28} className="text-gray-300 dark:text-gray-600" />
    </div>
    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
      {hasFilters ? "No matching conversations" : "No conversations yet"}
    </h3>
    <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs mb-6">
      {hasFilters
        ? "Try adjusting your search or filter to find what you're looking for."
        : "Start chatting with any of your AI assistants to see your history here."}
    </p>
    {hasFilters ? (
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <X size={14} />
        Clear Filters
      </button>
    ) : (
      <a
        href="/dashboard"
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
      >
        Start Chatting
        <ChevronRight size={14} />
      </a>
    )}
  </div>
);

// ── Main HistoryPage ──────────────────────────────────────────────
const HistoryPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeBotFilter, setActiveBotFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    conversations,
    totalConversations,
    isLoading,
    loadConversations,
    deleteConversation,
    clearAllConversations,
    loadConversation,
  } = useChatStore();

  // Load on mount + filter change
  useEffect(() => {
    loadConversations({ botType: activeBotFilter || undefined });
  }, [activeBotFilter]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadConversations({ botType: activeBotFilter || undefined });
    setIsRefreshing(false);
  };

  // Open conversation
  const handleOpen = useCallback(async (conversation) => {
    try {
      await loadConversation(conversation._id);
      navigate(`/chat/${conversation.botType}?conv=${conversation._id}`);
    } catch {
      toast.error("Failed to load conversation");
    }
  }, []);

  // Delete single
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      if (deleteTarget === "all") {
        await clearAllConversations();
        toast.success("All conversations cleared");
      } else {
        await deleteConversation(deleteTarget);
        toast.success("Conversation deleted");
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  // Client-side search filter
  const filtered = conversations.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.title?.toLowerCase().includes(q) ||
      c.lastMessage?.toLowerCase().includes(q)
    );
  });

  const hasFilters = !!search || !!activeBotFilter;

  // Group by date
  const grouped = filtered.reduce((acc, conv) => {
    const date = new Date(conv.updatedAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let label;
    if (date.toDateString() === today.toDateString()) {
      label = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      label = "Yesterday";
    } else if (date > new Date(today.setDate(today.getDate() - 7))) {
      label = "This Week";
    } else {
      label = "Older";
    }

    if (!acc[label]) acc[label] = [];
    acc[label].push(conv);
    return acc;
  }, {});

  const groupOrder = ["Today", "Yesterday", "This Week", "Older"];

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Page header ──────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <History size={20} className="text-blue-500" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Chat History
              </h1>
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {totalConversations} conversation
              {totalConversations !== 1 ? "s" : ""} total
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Refresh */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm transition-all disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw
                size={15}
                className={isRefreshing ? "animate-spin" : ""}
              />
            </button>

            {/* Clear all */}
            {conversations.length > 0 && (
              <button
                onClick={() => setDeleteTarget("all")}
                className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-red-500 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
              >
                <Trash2 size={13} />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* ── Filter bar ─────────────────────────────── */}
        <FilterBar
          activeBot={activeBotFilter}
          onBotChange={setActiveBotFilter}
          search={search}
          onSearchChange={setSearch}
        />

        {/* ── Content ──────────────────────────────── */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <Loader size="lg" color="blue" />
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Loading conversations...
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            hasFilters={hasFilters}
            onReset={() => {
              setSearch("");
              setActiveBotFilter("");
            }}
          />
        ) : (
          <div className="space-y-8">
            {groupOrder.map((label) => {
              const group = grouped[label];
              if (!group?.length) return null;
              return (
                <div key={label}>
                  {/* Group label */}
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {label}
                    </h2>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {group.length}
                    </span>
                  </div>

                  {/* Cards grid */}
                  <div className="grid grid-cols-1 gap-4">
                    {group.map((conv) => (
                      <ConversationCard
                        key={conv._id}
                        conversation={conv}
                        onOpen={handleOpen}
                        onDelete={(id) => setDeleteTarget(id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Confirm Modal ──────────────────────────── */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title={
          deleteTarget === "all"
            ? "Clear all conversations?"
            : "Delete this conversation?"
        }
        message={
          deleteTarget === "all"
            ? "All your conversations will be permanently deleted. This cannot be undone."
            : "This conversation and all its messages will be permanently deleted."
        }
        confirmText={deleteTarget === "all" ? "Clear All" : "Delete"}
      />
    </main>
  );
};

export default HistoryPage;
