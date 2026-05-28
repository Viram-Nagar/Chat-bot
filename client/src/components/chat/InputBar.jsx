import { useState, useRef, useEffect } from "react";
import { Send, Square, Paperclip } from "lucide-react";
import { getBotConfig } from "../../utils/botConfig";

const InputBar = ({ onSend, isStreaming, isTyping, botType, disabled }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const bot = getBotConfig(botType);
  const MAX_CHARS = 2000;

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [message]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || isTyping || disabled) return;
    onSend(trimmed);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    // Send on Enter (not Shift+Enter)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const remaining = MAX_CHARS - message.length;
  const isNearLimit = remaining < 200;
  const canSend =
    message.trim().length > 0 && !isTyping && !isStreaming && !disabled;

  console.log({
    disabled,
    isTyping,
    isStreaming,
    message,
  });

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3">
      {/* ── Char counter (only near limit) ───────────── */}
      {isNearLimit && (
        <div className="flex justify-end mb-1">
          <span
            className={`text-xs ${
              remaining < 50
                ? "text-red-500"
                : "text-orange-400 dark:text-orange-500"
            }`}
          >
            {remaining} characters remaining
          </span>
        </div>
      )}

      {/* ── Input container ───────────────────────────── */}
      <div
        className={`
          flex items-end gap-3 px-4 py-3
          bg-gray-50 dark:bg-gray-800
          rounded-2xl border
          transition-all duration-200
          ${
            disabled
              ? "border-gray-200 dark:border-gray-700 opacity-60"
              : `border-gray-200 dark:border-gray-700
                 focus-within:border-${bot?.id === "fitness" ? "green" : bot?.id === "finance" ? "blue" : bot?.id === "science" ? "purple" : bot?.id === "wellness" ? "teal" : "orange"}-400
                 dark:focus-within:border-${bot?.id === "fitness" ? "green" : bot?.id === "finance" ? "blue" : bot?.id === "science" ? "purple" : bot?.id === "wellness" ? "teal" : "orange"}-600
                 focus-within:ring-2
                 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/30`
          }
        `}
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              setMessage(e.target.value);
            }
          }}
          onPaste={(e) => {
            const pastedText = e.clipboardData.getData("text");

            setMessage((prev) => {
              const newValue = prev + pastedText;
              return newValue.slice(0, MAX_CHARS);
            });
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            disabled
              ? "Select a bot to start chatting..."
              : `Message ${bot?.name || "AI"}... (Enter to send, Shift+Enter for new line)`
          }
          disabled={disabled}
          rows={1}
          className="
            flex-1 resize-none bg-transparent outline-none
            text-sm text-gray-800 dark:text-gray-200
            placeholder-gray-400 dark:placeholder-gray-500
            leading-relaxed max-h-40 overflow-y-auto
            scrollbar-none
          "
        />

        {/* Send button */}
        <button
          onClick={isTyping ? undefined : handleSend}
          disabled={!canSend && !isTyping}
          className={`
            flex-shrink-0 w-9 h-9 rounded-xl
            flex items-center justify-center
            transition-all duration-200
            ${
              canSend || isTyping
                ? `bg-gradient-to-br ${bot?.gradient || "from-blue-500 to-purple-600"}
                   text-white shadow-sm hover:shadow-md active:scale-95`
                : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }
          `}
          title={isTyping ? "AI is responding..." : "Send message (Enter)"}
        >
          {isTyping ? (
            <Square size={13} className="fill-current" />
          ) : (
            <Send size={14} />
          )}
        </button>
      </div>

      {/* ── Hint ─────────────────────────────────────── */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-2">
        AI can make mistakes. Verify important information.
      </p>
    </div>
  );
};

export default InputBar;
