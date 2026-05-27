import { getBotConfig } from "../../utils/botConfig";

const TypingIndicator = ({ botType }) => {
  const bot = getBotConfig(botType);

  return (
    <div className="flex items-end gap-2.5 message-appear">
      {/* Bot avatar */}
      <div
        className={`
          w-8 h-8 rounded-full flex-shrink-0
          bg-gradient-to-br ${bot?.gradient || "from-gray-400 to-gray-600"}
          flex items-center justify-center text-sm shadow-sm
        `}
      >
        {bot?.emoji || "🤖"}
      </div>

      {/* Bubble */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
          <span className="typing-dot w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
          <span className="typing-dot w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
        </div>
      </div>

      {/* Bot name */}
      <span className="text-xs text-gray-400 dark:text-gray-500 mb-1">
        {bot?.name} is typing...
      </span>
    </div>
  );
};

export default TypingIndicator;
