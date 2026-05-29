import { useState } from "react";
import { Copy, Check, Star } from "lucide-react";
import { getBotConfig } from "../../utils/botConfig";
import { formatTime, copyToClipboard } from "../../utils/helpers";
import { useAuthStore } from "../../store/authStore";
import Avatar from "../shared/Avatar";
import FeedbackModal from "./FeedbackModal";
import { useBotSettingsStore } from "../../store/botSettingsStore";

// ── Code block ───────────────────────────────────────────────────
const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative my-2 rounded-xl overflow-hidden border border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900">
        <span className="text-xs text-gray-400 font-mono">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check size={12} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="px-4 py-3 bg-gray-900 text-gray-100 text-xs font-mono overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// ── Parse code blocks ─────────────────────────────────────────────
const parseContent = (content) => {
  const parts = [];
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex)
      parts.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      });
    parts.push({
      type: "code",
      language: match[1] || "",
      content: match[2].trim(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length)
    parts.push({ type: "text", content: content.slice(lastIndex) });

  return parts.length > 0 ? parts : [{ type: "text", content }];
};

// ── Format text ───────────────────────────────────────────────────
const FormattedText = ({ text }) => {
  const lines = text.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, li) => {
        if (!line.trim()) return <br key={li} />;

        const isBullet = /^[-•*]\s/.test(line);
        const isNumbered = /^\d+\.\s/.test(line);

        const formatLine = (str) =>
          str.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**"))
              return (
                <strong key={i} className="font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            if (part.startsWith("`") && part.endsWith("`"))
              return (
                <code
                  key={i}
                  className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono"
                >
                  {part.slice(1, -1)}
                </code>
              );
            return part;
          });

        if (line.startsWith("### "))
          return (
            <p key={li} className="font-bold text-base mt-2">
              {formatLine(line.slice(4))}
            </p>
          );

        if (line.startsWith("## "))
          return (
            <p key={li} className="font-bold text-lg mt-2">
              {formatLine(line.slice(3))}
            </p>
          );

        if (isBullet)
          return (
            <div key={li} className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-60" />
              <span>{formatLine(line.replace(/^[-•*]\s/, ""))}</span>
            </div>
          );

        if (isNumbered) {
          const [num, ...rest] = line.split(/\.\s/);
          return (
            <div key={li} className="flex items-start gap-2">
              <span className="font-semibold opacity-70 flex-shrink-0 text-xs mt-0.5">
                {num}.
              </span>
              <span>{formatLine(rest.join(". "))}</span>
            </div>
          );
        }

        return <p key={li}>{formatLine(line)}</p>;
      })}
    </div>
  );
};

// ── Streaming cursor ──────────────────────────────────────────────
const StreamingCursor = () => (
  <span className="inline-block w-0.5 h-4 bg-gray-500 dark:bg-gray-400 ml-0.5 align-middle animate-pulse" />
);

// ── Main MessageBubble ────────────────────────────────────────────
const MessageBubble = ({ message, botType, isStreaming = false }) => {
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const bot = getBotConfig(botType);
  const isUser = message.role === "user";
  const parts = parseContent(message.content || "");
  const { getMergedBotConfig } = useBotSettingsStore();
  const mergedBot = getMergedBotConfig(bot);

  const handleCopyMessage = async () => {
    const ok = await copyToClipboard(message.content);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── User bubble ───────────────────────────────────────────────
  if (isUser) {
    return (
      <div className="flex items-end justify-end gap-2.5 message-appear group">
        <button
          onClick={handleCopyMessage}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {copied ? (
            <Check size={13} className="text-green-500" />
          ) : (
            <Copy size={13} className="text-gray-400" />
          )}
        </button>

        <div className="flex flex-col items-end gap-1 max-w-[75%]">
          <div
            className={`
              px-4 py-3 rounded-2xl rounded-br-md
              ${bot?.userBubble || "bg-blue-500 text-white"}
              shadow-sm text-sm leading-relaxed
            `}
          >
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 pr-1">
            {formatTime(message.createdAt)}
          </span>
        </div>

        <Avatar user={user} size="sm" className="flex-shrink-0 mb-5" />
      </div>
    );
  }

  // ── AI bubble ─────────────────────────────────────────────────
  return (
    <div className="flex items-end gap-2.5 message-appear group">
      {/* Bot avatar */}
      <div
        className={`
          w-8 h-8 rounded-full flex-shrink-0 mb-5
          bg-gradient-to-br ${bot?.gradient || "from-gray-400 to-gray-600"}
          flex items-center justify-center text-sm shadow-sm
          ${isStreaming ? "animate-pulse" : ""}
        `}
      >
        {bot?.emoji || "🤖"}
      </div>

      {/* ✅ Everything below is INSIDE this one div */}
      <div className="flex flex-col gap-1 max-w-[75%]">
        {/* Bot name + streaming badge */}
        <div className="flex items-center gap-2 pl-1">
          <span
            className={`text-xs font-semibold ${bot?.text || "text-gray-500"}`}
          >
            {mergedBot?.name}
          </span>
          {isStreaming && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Live
            </span>
          )}
        </div>

        {/* Message bubble */}
        <div
          className={`
            px-4 py-3 rounded-2xl rounded-bl-md
            bg-white dark:bg-gray-800
            border border-gray-100 dark:border-gray-700
            shadow-sm text-sm leading-relaxed
            text-gray-800 dark:text-gray-200
            ${
              message.isError
                ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
                : ""
            }
          `}
        >
          {/* Empty streaming dots */}
          {isStreaming && !message.content && (
            <div className="flex items-center gap-1.5">
              <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
              <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
              <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
            </div>
          )}

          {/* Rendered content */}
          {message.content && (
            <>
              {parts.map((part, i) =>
                part.type === "code" ? (
                  <CodeBlock
                    key={i}
                    code={part.content}
                    language={part.language}
                  />
                ) : (
                  <FormattedText key={i} text={part.content} />
                ),
              )}
              {isStreaming && <StreamingCursor />}
            </>
          )}
        </div>

        {/* ✅ Timestamp + Copy + Rate — all INSIDE flex flex-col div */}
        {!isStreaming && (
          <div className="flex items-center gap-3 pl-1">
            {/* Timestamp */}
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {formatTime(message.createdAt)}
            </span>

            {/* Copy button */}
            <button
              onClick={handleCopyMessage}
              className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              title="Copy message"
            >
              {copied ? (
                <Check size={11} className="text-green-500" />
              ) : (
                <Copy size={11} />
              )}
            </button>

            {/* ✅ Rate button — INSIDE the same row as timestamp + copy */}
            <button
              onClick={() => setFeedbackOpen(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"
              title="Rate this response"
            >
              <Star size={11} />
              Rate
            </button>
          </div>
        )}

        {/* ✅ FeedbackModal — INSIDE flex flex-col div, outside the button row */}
        <FeedbackModal
          isOpen={feedbackOpen}
          onClose={() => setFeedbackOpen(false)}
          botType={botType}
          messageId={message._id}
          conversationId={message.conversationId}
        />
      </div>
      {/* ✅ flex flex-col div closes here */}
    </div>
    // ✅ outer flex div closes here
  );
};

export default MessageBubble;

// import { useState } from "react";
// import { Copy, Check, Star } from "lucide-react";
// import { getBotConfig } from "../../utils/botConfig";
// import { formatTime, copyToClipboard } from "../../utils/helpers";
// import { useAuthStore } from "../../store/authStore";
// import Avatar from "../shared/Avatar";
// import FeedbackModal from "./FeedbackModal";

// // ── Code block ───────────────────────────────────────────────────
// const CodeBlock = ({ code, language }) => {
//   const [copied, setCopied] = useState(false);
//   const handleCopy = async () => {
//     const ok = await copyToClipboard(code);
//     if (ok) {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };
//   return (
//     <div className="relative my-2 rounded-xl overflow-hidden border border-gray-700">
//       <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900">
//         <span className="text-xs text-gray-400 font-mono">
//           {language || "code"}
//         </span>
//         <button
//           onClick={handleCopy}
//           className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
//         >
//           {copied ? (
//             <>
//               <Check size={12} className="text-green-400" />
//               <span className="text-green-400">Copied!</span>
//             </>
//           ) : (
//             <>
//               <Copy size={12} />
//               Copy
//             </>
//           )}
//         </button>
//       </div>
//       <pre className="px-4 py-3 bg-gray-900 text-gray-100 text-xs font-mono overflow-x-auto leading-relaxed">
//         <code>{code}</code>
//       </pre>
//     </div>
//   );
// };

// // ── Parse code blocks ─────────────────────────────────────────────
// const parseContent = (content) => {
//   const parts = [];
//   const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
//   let lastIndex = 0;
//   let match;
//   while ((match = codeBlockRegex.exec(content)) !== null) {
//     if (match.index > lastIndex)
//       parts.push({
//         type: "text",
//         content: content.slice(lastIndex, match.index),
//       });
//     parts.push({
//       type: "code",
//       language: match[1] || "",
//       content: match[2].trim(),
//     });
//     lastIndex = match.index + match[0].length;
//   }
//   if (lastIndex < content.length)
//     parts.push({ type: "text", content: content.slice(lastIndex) });
//   return parts.length > 0 ? parts : [{ type: "text", content }];
// };

// // ── Format text ───────────────────────────────────────────────────
// const FormattedText = ({ text }) => {
//   const lines = text.split("\n");
//   return (
//     <div className="space-y-1">
//       {lines.map((line, li) => {
//         if (!line.trim()) return <br key={li} />;
//         const isBullet = /^[-•*]\s/.test(line);
//         const isNumbered = /^\d+\.\s/.test(line);
//         const formatLine = (str) =>
//           str.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
//             if (part.startsWith("**") && part.endsWith("**"))
//               return (
//                 <strong key={i} className="font-semibold">
//                   {part.slice(2, -2)}
//                 </strong>
//               );
//             if (part.startsWith("`") && part.endsWith("`"))
//               return (
//                 <code
//                   key={i}
//                   className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono"
//                 >
//                   {part.slice(1, -1)}
//                 </code>
//               );
//             return part;
//           });
//         if (line.startsWith("### "))
//           return (
//             <p key={li} className="font-bold text-base mt-2">
//               {formatLine(line.slice(4))}
//             </p>
//           );
//         if (line.startsWith("## "))
//           return (
//             <p key={li} className="font-bold text-lg mt-2">
//               {formatLine(line.slice(3))}
//             </p>
//           );
//         if (isBullet)
//           return (
//             <div key={li} className="flex items-start gap-2">
//               <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-60" />
//               <span>{formatLine(line.replace(/^[-•*]\s/, ""))}</span>
//             </div>
//           );
//         if (isNumbered) {
//           const [num, ...rest] = line.split(/\.\s/);
//           return (
//             <div key={li} className="flex items-start gap-2">
//               <span className="font-semibold opacity-70 flex-shrink-0 text-xs mt-0.5">
//                 {num}.
//               </span>
//               <span>{formatLine(rest.join(". "))}</span>
//             </div>
//           );
//         }
//         return <p key={li}>{formatLine(line)}</p>;
//       })}
//     </div>
//   );
// };

// // ── Streaming cursor ──────────────────────────────────────────────
// const StreamingCursor = () => (
//   <span className="inline-block w-0.5 h-4 bg-gray-500 dark:bg-gray-400 ml-0.5 align-middle animate-pulse" />
// );

// // ── Main MessageBubble ────────────────────────────────────────────
// const MessageBubble = ({ message, botType, isStreaming = false }) => {
//   const { user } = useAuthStore();
//   const [copied, setCopied] = useState(false);
//   const [feedbackOpen, setFeedbackOpen] = useState(false);
//   const bot = getBotConfig(botType);
//   const isUser = message.role === "user";
//   const parts = parseContent(message.content || "");

//   const handleCopyMessage = async () => {
//     const ok = await copyToClipboard(message.content);
//     if (ok) {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   // ── User bubble ───────────────────────────────────────────────
//   if (isUser) {
//     return (
//       <div className="flex items-end justify-end gap-2.5 message-appear group">
//         <button
//           onClick={handleCopyMessage}
//           className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//         >
//           {copied ? (
//             <Check size={13} className="text-green-500" />
//           ) : (
//             <Copy size={13} className="text-gray-400" />
//           )}
//         </button>
//         <div className="flex flex-col items-end gap-1 max-w-[75%]">
//           <div
//             className={`px-4 py-3 rounded-2xl rounded-br-md ${bot?.userBubble || "bg-blue-500 text-white"} shadow-sm text-sm leading-relaxed`}
//           >
//             <p className="whitespace-pre-wrap break-words">{message.content}</p>
//           </div>
//           <span className="text-xs text-gray-400 dark:text-gray-500 pr-1">
//             {formatTime(message.createdAt)}
//           </span>
//         </div>
//         <Avatar user={user} size="sm" className="flex-shrink-0 mb-5" />
//       </div>
//     );
//   }

//   // ── AI bubble ─────────────────────────────────────────────────
//   return (
//     <div className="flex items-end gap-2.5 message-appear group">
//       {/* Bot avatar */}
//       <div
//         className={`
//           w-8 h-8 rounded-full flex-shrink-0 mb-5
//           bg-gradient-to-br ${bot?.gradient || "from-gray-400 to-gray-600"}
//           flex items-center justify-center text-sm shadow-sm
//           ${isStreaming ? "animate-pulse" : ""}
//         `}
//       >
//         {bot?.emoji || "🤖"}
//       </div>

//       <div className="flex flex-col gap-1 max-w-[75%]">
//         {/* Bot name + streaming badge */}
//         <div className="flex items-center gap-2 pl-1">
//           <span
//             className={`text-xs font-semibold ${bot?.text || "text-gray-500"}`}
//           >
//             {bot?.name}
//           </span>
//           {isStreaming && (
//             <span className="flex items-center gap-1 px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
//               <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
//               Live
//             </span>
//           )}
//         </div>

//         {/* Bubble */}
//         <div
//           className={`
//             px-4 py-3 rounded-2xl rounded-bl-md
//             bg-white dark:bg-gray-800
//             border border-gray-100 dark:border-gray-700
//             shadow-sm text-sm leading-relaxed
//             text-gray-800 dark:text-gray-200
//             ${message.isError ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20" : ""}
//           `}
//         >
//           {/* Empty streaming state */}
//           {isStreaming && !message.content && (
//             <div className="flex items-center gap-1.5">
//               <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
//               <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
//               <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
//             </div>
//           )}

//           {/* Content */}
//           {message.content && (
//             <>
//               {parts.map((part, i) =>
//                 part.type === "code" ? (
//                   <CodeBlock
//                     key={i}
//                     code={part.content}
//                     language={part.language}
//                   />
//                 ) : (
//                   <FormattedText key={i} text={part.content} />
//                 ),
//               )}
//               {/* Blinking cursor while streaming */}
//               {isStreaming && <StreamingCursor />}
//             </>
//           )}
//         </div>

//         {/* Timestamp + copy (only when done) */}
//         {!isStreaming && (
//           <div className="flex items-center gap-2 pl-1">
//             <span className="text-xs text-gray-400 dark:text-gray-500">
//               {formatTime(message.createdAt)}
//             </span>
//             <button
//               onClick={handleCopyMessage}
//               className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//             >
//               {copied ? (
//                 <Check size={11} className="text-green-500" />
//               ) : (
//                 <Copy size={11} />
//               )}
//             </button>
//           </div>
//         )}

//         {!isStreaming && !isUser && (
//           <>
//             <button
//               onClick={() => setFeedbackOpen(true)}
//               className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"
//               title="Rate this response"
//             >
//               <Star size={11} />
//               Rate
//             </button>

//             <FeedbackModal
//               isOpen={feedbackOpen}
//               onClose={() => setFeedbackOpen(false)}
//               botType={botType}
//               messageId={message._id}
//               conversationId={message.conversationId}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageBubble;

// import { useState } from "react";
// import { Copy, Check, User } from "lucide-react";
// import { getBotConfig } from "../../utils/botConfig";
// import { formatTime, copyToClipboard } from "../../utils/helpers";
// import { useAuthStore } from "../../store/authStore";
// import Avatar from "../shared/Avatar";

// // ── Code block with copy ─────────────────────────────────────────
// const CodeBlock = ({ code, language }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     const ok = await copyToClipboard(code);
//     if (ok) {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   return (
//     <div className="relative my-2 rounded-xl overflow-hidden border border-gray-700 dark:border-gray-600">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900">
//         <span className="text-xs text-gray-400 font-mono">
//           {language || "code"}
//         </span>
//         <button
//           onClick={handleCopy}
//           className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
//         >
//           {copied ? (
//             <>
//               <Check size={12} className="text-green-400" />
//               <span className="text-green-400">Copied!</span>
//             </>
//           ) : (
//             <>
//               <Copy size={12} />
//               Copy
//             </>
//           )}
//         </button>
//       </div>
//       {/* Code */}
//       <pre className="px-4 py-3 bg-gray-900 text-gray-100 text-xs font-mono overflow-x-auto leading-relaxed">
//         <code>{code}</code>
//       </pre>
//     </div>
//   );
// };

// // ── Parse message content (code blocks + text) ───────────────────
// const parseContent = (content) => {
//   const parts = [];
//   const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
//   let lastIndex = 0;
//   let match;

//   while ((match = codeBlockRegex.exec(content)) !== null) {
//     // Text before code block
//     if (match.index > lastIndex) {
//       parts.push({
//         type: "text",
//         content: content.slice(lastIndex, match.index),
//       });
//     }
//     // Code block
//     parts.push({
//       type: "code",
//       language: match[1] || "",
//       content: match[2].trim(),
//     });
//     lastIndex = match.index + match[0].length;
//   }

//   // Remaining text
//   if (lastIndex < content.length) {
//     parts.push({ type: "text", content: content.slice(lastIndex) });
//   }

//   return parts.length > 0 ? parts : [{ type: "text", content }];
// };

// // ── Format text (bold, inline code, newlines) ────────────────────
// const FormattedText = ({ text }) => {
//   const lines = text.split("\n");

//   return (
//     <div className="space-y-1">
//       {lines.map((line, li) => {
//         if (!line.trim()) return <br key={li} />;

//         // Bullet points
//         const isBullet = /^[-•*]\s/.test(line);
//         const isNumbered = /^\d+\.\s/.test(line);

//         const formatLine = (str) => {
//           const parts = str.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
//           return parts.map((part, i) => {
//             if (part.startsWith("**") && part.endsWith("**")) {
//               return (
//                 <strong key={i} className="font-semibold">
//                   {part.slice(2, -2)}
//                 </strong>
//               );
//             }
//             if (part.startsWith("`") && part.endsWith("`")) {
//               return (
//                 <code
//                   key={i}
//                   className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono"
//                 >
//                   {part.slice(1, -1)}
//                 </code>
//               );
//             }
//             return part;
//           });
//         };

//         if (isBullet) {
//           return (
//             <div key={li} className="flex items-start gap-2">
//               <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-60" />
//               <span>{formatLine(line.replace(/^[-•*]\s/, ""))}</span>
//             </div>
//           );
//         }

//         if (isNumbered) {
//           const [num, ...rest] = line.split(/\.\s/);
//           return (
//             <div key={li} className="flex items-start gap-2">
//               <span className="font-semibold opacity-70 flex-shrink-0 text-xs mt-0.5">
//                 {num}.
//               </span>
//               <span>{formatLine(rest.join(". "))}</span>
//             </div>
//           );
//         }

//         // Heading lines
//         if (line.startsWith("### ")) {
//           return (
//             <p key={li} className="font-bold text-base mt-2">
//               {formatLine(line.slice(4))}
//             </p>
//           );
//         }
//         if (line.startsWith("## ")) {
//           return (
//             <p key={li} className="font-bold text-lg mt-2">
//               {formatLine(line.slice(3))}
//             </p>
//           );
//         }

//         return <p key={li}>{formatLine(line)}</p>;
//       })}
//     </div>
//   );
// };

// // ── Main MessageBubble ────────────────────────────────────────────
// const MessageBubble = ({ message, botType }) => {
//   const { user } = useAuthStore();
//   const [copied, setCopied] = useState(false);
//   const bot = getBotConfig(botType);
//   const isUser = message.role === "user";
//   const parts = parseContent(message.content);

//   const handleCopyMessage = async () => {
//     const ok = await copyToClipboard(message.content);
//     if (ok) {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   if (isUser) {
//     return (
//       <div className="flex items-end justify-end gap-2.5 message-appear group">
//         {/* Copy button */}
//         <button
//           onClick={handleCopyMessage}
//           className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//           title="Copy message"
//         >
//           {copied ? (
//             <Check size={13} className="text-green-500" />
//           ) : (
//             <Copy size={13} className="text-gray-400" />
//           )}
//         </button>

//         <div className="flex flex-col items-end gap-1 max-w-[75%]">
//           {/* Bubble */}
//           <div
//             className={`
//               px-4 py-3 rounded-2xl rounded-br-md
//               ${bot?.userBubble || "bg-blue-500 text-white"}
//               shadow-sm text-sm leading-relaxed
//             `}
//           >
//             <p className="whitespace-pre-wrap break-words">{message.content}</p>
//           </div>
//           {/* Timestamp */}
//           <span className="text-xs text-gray-400 dark:text-gray-500 pr-1">
//             {formatTime(message.createdAt)}
//           </span>
//         </div>

//         {/* User avatar */}
//         <Avatar user={user} size="sm" className="flex-shrink-0 mb-5" />
//       </div>
//     );
//   }

//   // ── AI message ────────────────────────────────────────────────
//   return (
//     <div className="flex items-end gap-2.5 message-appear group">
//       {/* Bot avatar */}
//       <div
//         className={`
//           w-8 h-8 rounded-full flex-shrink-0 mb-5
//           bg-gradient-to-br ${bot?.gradient || "from-gray-400 to-gray-600"}
//           flex items-center justify-center text-sm shadow-sm flex-shrink-0
//         `}
//       >
//         {bot?.emoji || "🤖"}
//       </div>

//       <div className="flex flex-col gap-1 max-w-[75%]">
//         {/* Bot name */}
//         <span
//           className={`text-xs font-semibold ${bot?.text || "text-gray-500"} pl-1`}
//         >
//           {bot?.name}
//         </span>

//         {/* Bubble */}
//         <div
//           className={`
//             px-4 py-3 rounded-2xl rounded-bl-md
//             bg-white dark:bg-gray-800
//             border border-gray-100 dark:border-gray-700
//             shadow-sm text-sm leading-relaxed
//             text-gray-800 dark:text-gray-200
//             ${message.isError ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20" : ""}
//           `}
//         >
//           {parts.map((part, i) =>
//             part.type === "code" ? (
//               <CodeBlock key={i} code={part.content} language={part.language} />
//             ) : (
//               <FormattedText key={i} text={part.content} />
//             ),
//           )}
//         </div>

//         {/* Timestamp + copy */}
//         <div className="flex items-center gap-2 pl-1">
//           <span className="text-xs text-gray-400 dark:text-gray-500">
//             {formatTime(message.createdAt)}
//           </span>
//           <button
//             onClick={handleCopyMessage}
//             className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//           >
//             {copied ? (
//               <Check size={11} className="text-green-500" />
//             ) : (
//               <Copy size={11} />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageBubble;
