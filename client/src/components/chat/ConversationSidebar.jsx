import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Plus,
  Trash2,
  MessageSquare,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { useChatStore } from "../../store/chatStore";
import { getBotConfig } from "../../utils/botConfig";
import { formatDate, truncate } from "../../utils/helpers";
import toast from "react-hot-toast";

// ── Delete confirm modal ─────────────────────────────────────────
const DeleteModal = ({ onConfirm, onCancel, isAll }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-100 dark:border-gray-700">
      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <AlertTriangle size={22} className="text-red-500" />
      </div>
      <h3 className="text-base font-bold text-gray-900 dark:text-white text-center mb-1">
        {isAll ? "Clear all conversations?" : "Delete this conversation?"}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
        This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
        >
          {isAll ? "Clear All" : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

// ── Main sidebar ─────────────────────────────────────────────────
const ConversationSidebar = ({ botType }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); // id or "all"

  const {
    conversations,
    currentConversationId,
    isSidebarOpen,
    toggleSidebar,
    startNewChat,
    loadConversations,
    loadConversation,
    deleteConversation,
    clearAllConversations,
  } = useChatStore();

  useEffect(() => {
    loadConversations({ botType });
  }, [botType]);

  // Filter conversations by botType + search
  const filtered = conversations.filter((c) => {
    const matchBot = botType ? c.botType === botType : true;
    const matchSearch = search
      ? c.title.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchBot && matchSearch;
  });

  const handleSelectConversation = async (conv) => {
    try {
      await loadConversation(conv._id);
      navigate(`/chat/${conv.botType}?conv=${conv._id}`);
    } catch {
      toast.error("Failed to load conversation");
    }
  };

  const handleNewChat = () => {
    startNewChat();
    navigate(`/chat/${botType}`);
  };

  const handleDelete = async () => {
    try {
      if (deleteTarget === "all") {
        await clearAllConversations();
        toast.success("All conversations cleared");
        navigate(`/chat/${botType}`);
      } else {
        await deleteConversation(deleteTarget);
        toast.success("Conversation deleted");
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleteTarget(null);
    }
  };

  const bot = getBotConfig(botType);

  return (
    <>
      {/* ── Delete Modal ──────────────────────────────── */}
      {deleteTarget && (
        <DeleteModal
          isAll={deleteTarget === "all"}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ── Sidebar ───────────────────────────────────── */}
      <aside
        className={`
          flex flex-col h-full
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-700
          transition-all duration-300 flex-shrink-0
          ${isSidebarOpen ? "w-64" : "w-0 overflow-hidden"}
        `}
      >
        {/* Header */}
        <div className="p-3 border-b border-gray-100 dark:border-gray-800">
          {/* New chat button */}
          <button
            onClick={handleNewChat}
            className={`
              w-full flex items-center gap-2 px-3 py-2.5
              bg-gradient-to-r ${bot?.gradient || "from-blue-500 to-purple-600"}
              text-white text-sm font-semibold rounded-xl
              hover:shadow-md active:scale-[0.98] transition-all
            `}
          >
            <Plus size={16} />
            New Chat
          </button>

          {/* Search */}
          <div className="relative mt-2">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="
                w-full pl-8 pr-3 py-2 text-xs
                bg-gray-50 dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-xl outline-none
                text-gray-700 dark:text-gray-300
                placeholder-gray-400 dark:placeholder-gray-500
                focus:border-blue-400 dark:focus:border-blue-600
                transition-colors
              "
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto py-2 scrollbar-none">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4 text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-3">
                <MessageSquare size={20} className="text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {search ? "No results found" : "No conversations yet"}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {search ? "Try a different search" : "Start a new chat above"}
              </p>
            </div>
          ) : (
            <div className="px-2 space-y-0.5">
              {filtered.map((conv) => {
                const convBot = getBotConfig(conv.botType);
                const isActive = conv._id === currentConversationId;

                return (
                  <div
                    key={conv._id}
                    className={`
                      group relative flex items-start gap-2.5 px-3 py-2.5
                      rounded-xl cursor-pointer transition-all duration-150
                      ${
                        isActive
                          ? `${convBot?.bgLight || "bg-blue-50"} ${convBot?.bgDark || "dark:bg-blue-900/20"} ${convBot?.border || "border-blue-200"} border`
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent"
                      }
                    `}
                    onClick={() => handleSelectConversation(conv)}
                  >
                    {/* Bot emoji */}
                    <span className="text-base flex-shrink-0 mt-0.5">
                      {convBot?.emoji}
                    </span>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-semibold truncate ${
                          isActive
                            ? convBot?.text || "text-blue-600"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {truncate(conv.title, 40)}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        {formatDate(conv.updatedAt)}
                      </p>
                    </div>

                    {/* Delete btn */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget(conv._id);
                      }}
                      className="
                        opacity-0 group-hover:opacity-100
                        p-1 rounded-lg
                        hover:bg-red-100 dark:hover:bg-red-900/30
                        text-gray-400 hover:text-red-500
                        transition-all flex-shrink-0
                      "
                      title="Delete conversation"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="p-3 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setDeleteTarget("all")}
              className="
                w-full flex items-center justify-center gap-2
                py-2 px-3 text-xs font-medium
                text-red-500 dark:text-red-400
                hover:bg-red-50 dark:hover:bg-red-900/20
                rounded-xl transition-colors
              "
            >
              <Trash2 size={13} />
              Clear all conversations
            </button>
          </div>
        )}
      </aside>

      {/* ── Sidebar toggle button ─────────────────────── */}

      <button
        onClick={toggleSidebar}
        className={`
    absolute top-1/2 -translate-y-1/2 z-20
    w-5 h-10 flex items-center justify-center
    bg-white dark:bg-gray-800
    border border-gray-200 dark:border-gray-700
    rounded-r-lg shadow-sm
    text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
    hover:bg-gray-50 dark:hover:bg-gray-700
    transition-all duration-300
  `}
        style={{
          left: isSidebarOpen ? "256px" : "0px",
          transition: "left 0.3s ease",
        }}
        title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </>
  );
};

export default ConversationSidebar;

// <button
//         onClick={toggleSidebar}
//         className="
//           absolute top-1/2 -translate-y-1/2 z-20
//           w-5 h-10 flex items-center justify-center
//           bg-white dark:bg-gray-800
//           border border-gray-200 dark:border-gray-700
//           rounded-r-lg shadow-sm
//           text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
//           hover:bg-gray-50 dark:hover:bg-gray-700
//           transition-all duration-200
//         "
//         style={{ left: isSidebarOpen ? "256px" : "0px" }}
//         title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
//       >
//         {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
//       </button>
