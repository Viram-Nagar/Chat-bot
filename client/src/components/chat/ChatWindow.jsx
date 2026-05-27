import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { useChatStore } from "../../store/chatStore";
import { getBotConfig } from "../../utils/botConfig";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import Loader from "../shared/Loader";

// ── Streaming cursor ─────────────────────────────────────────────
const StreamingCursor = () => (
  <span className="inline-block w-0.5 h-4 bg-current ml-0.5 align-middle animate-pulse" />
);

// ── Welcome screen ───────────────────────────────────────────────
const WelcomeScreen = ({ bot, onStarterClick }) => (
  <div className="flex flex-col items-center justify-center h-full px-6 text-center">
    <div
      className={`
        w-20 h-20 rounded-3xl bg-gradient-to-br ${bot.gradient}
        flex items-center justify-center text-4xl
        shadow-xl mb-5
      `}
    >
      {bot.emoji}
    </div>
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
      {bot.name}
    </h2>
    <p className={`text-sm font-semibold ${bot.text} mb-2`}>{bot.tagline}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-8 leading-relaxed">
      {bot.description}
    </p>
    <div className="w-full max-w-md space-y-2.5">
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
        Try one of these to get started
      </p>
      {bot.starters.map((starter) => (
        <button
          key={starter}
          onClick={() => onStarterClick(starter)}
          className={`
            w-full text-left px-4 py-3 rounded-xl text-sm
            ${bot.bgLight} ${bot.bgDark} border ${bot.border}
            text-gray-700 dark:text-gray-300
            hover:shadow-sm active:scale-[0.99]
            transition-all duration-150 flex items-start gap-2
          `}
        >
          <MessageSquare
            size={13}
            className={`mt-0.5 flex-shrink-0 ${bot.text}`}
          />
          {starter}
        </button>
      ))}
    </div>
  </div>
);

// ── Main ChatWindow ───────────────────────────────────────────────
const ChatWindow = ({ botType, onSendMessage }) => {
  const { messages, isTyping, isStreaming, isLoading } = useChatStore();
  const bottomRef = useRef(null);
  const bot = getBotConfig(botType);

  // Auto-scroll on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isStreaming]);

  if (!bot) return null;

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader size="lg" color="blue" />
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Loading conversation...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.length === 0 ? (
        <WelcomeScreen bot={bot} onStarterClick={onSendMessage} />
      ) : (
        <>
          {messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              botType={botType}
              isStreaming={msg.isStreaming} // pass streaming flag
              StreamingCursor={StreamingCursor}
            />
          ))}

          {/* Typing indicator (before stream starts) */}
          {isTyping && !isStreaming && <TypingIndicator botType={botType} />}

          <div ref={bottomRef} className="h-1" />
        </>
      )}
    </div>
  );
};

export default ChatWindow;

// import { useEffect, useRef } from "react";
// import { MessageSquare } from "lucide-react";
// import { useChatStore } from "../../store/chatStore";
// import { getBotConfig } from "../../utils/botConfig";
// import MessageBubble from "./MessageBubble";
// import TypingIndicator from "./TypingIndicator";
// import Loader from "../shared/Loader";

// // ── Empty / Welcome state ────────────────────────────────────────
// const WelcomeScreen = ({ bot, onStarterClick }) => (
//   <div className="flex flex-col items-center justify-center h-full px-6 text-center">
//     {/* Bot avatar */}
//     <div
//       className={`
//         w-20 h-20 rounded-3xl bg-gradient-to-br ${bot.gradient}
//         flex items-center justify-center text-4xl
//         shadow-xl mb-5
//       `}
//     >
//       {bot.emoji}
//     </div>

//     <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
//       {bot.name}
//     </h2>
//     <p className={`text-sm font-semibold ${bot.text} mb-2`}>{bot.tagline}</p>
//     <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-8 leading-relaxed">
//       {bot.description}
//     </p>

//     {/* Starter questions */}
//     <div className="w-full max-w-md space-y-2.5">
//       <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
//         Try one of these to get started
//       </p>
//       {bot.starters.map((starter) => (
//         <button
//           key={starter}
//           onClick={() => onStarterClick(starter)}
//           className={`
//             w-full text-left px-4 py-3 rounded-xl text-sm
//             ${bot.bgLight} ${bot.bgDark}
//             border ${bot.border}
//             text-gray-700 dark:text-gray-300
//             hover:shadow-sm active:scale-[0.99]
//             transition-all duration-150
//             flex items-start gap-2
//           `}
//         >
//           <MessageSquare
//             size={13}
//             className={`mt-0.5 flex-shrink-0 ${bot.text}`}
//           />
//           {starter}
//         </button>
//       ))}
//     </div>
//   </div>
// );

// // ── Main ChatWindow ───────────────────────────────────────────────
// const ChatWindow = ({ botType, onSendMessage }) => {
//   const { messages, isTyping, isLoading } = useChatStore();
//   const bottomRef = useRef(null);
//   const containerRef = useRef(null);
//   const bot = getBotConfig(botType);

//   // Auto-scroll to bottom on new messages
//   useEffect(() => {
//     if (bottomRef.current) {
//       bottomRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, isTyping]);

//   if (!bot) return null;

//   // Loading saved conversation
//   if (isLoading) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <Loader size="lg" color="blue" />
//           <p className="text-sm text-gray-400 dark:text-gray-500">
//             Loading conversation...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       ref={containerRef}
//       className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
//     >
//       {messages.length === 0 ? (
//         /* Welcome screen */
//         <WelcomeScreen bot={bot} onStarterClick={onSendMessage} />
//       ) : (
//         <>
//           {/* Messages */}
//           {messages.map((msg) => (
//             <MessageBubble key={msg._id} message={msg} botType={botType} />
//           ))}

//           {/* Typing indicator */}
//           {isTyping && <TypingIndicator botType={botType} />}

//           {/* Scroll anchor */}
//           <div ref={bottomRef} className="h-1" />
//         </>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;
