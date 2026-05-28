const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getBotPersonality } = require("./botPersonalities");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ─── Build chat history ───────────────────────────────────────
const buildHistory = (conversationHistory) => {
  return conversationHistory.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));
};

// ─── Non-streaming version ────────────────────────────────────
const callGeminiAPI = async (botType, conversationHistory, userMessage) => {
  const bot = getBotPersonality(botType);

  if (!bot) {
    throw new Error(`Invalid bot type: ${botType}`);
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: bot.systemPrompt,
  });

  const chat = model.startChat({
    history: buildHistory(conversationHistory),
  });

  const result = await chat.sendMessage(userMessage);

  const response = result.response;

  return {
    content: response.text(),
    inputTokens: 0,
    outputTokens: 0,
  };
};

// ─── Streaming version ───────────────────────────────────────
const callGeminiAPIStream = async (
  botType,
  conversationHistory,
  userMessage,
  onChunk,
  onDone,
  onError,
) => {
  try {
    const bot = getBotPersonality(botType);

    if (!bot) {
      onError(new Error(`Invalid bot type: ${botType}`));
      return;
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: bot.systemPrompt,
    });

    const chat = model.startChat({
      history: buildHistory(conversationHistory),
    });

    const result = await chat.sendMessageStream(userMessage);

    let fullText = "";

    for await (const chunk of result.stream) {
      const text = chunk.text();

      if (text) {
        fullText += text;
        onChunk(text);
      }
    }

    onDone(fullText, 0);
  } catch (err) {
    onError(err);
  }
};

module.exports = {
  callGeminiAPI,
  callGeminiAPIStream,
};

// const { getBotPersonality } = require("./botPersonalities");

// // ─── Standard (non-streaming) call ─────────────────────────────
// const callClaudeAPI = async (botType, conversationHistory, userMessage) => {
//   const bot = getBotPersonality(botType);
//   if (!bot) throw new Error(`Invalid bot type: ${botType}`);

//   const messages = [
//     ...conversationHistory.map((msg) => ({
//       role: msg.role,
//       content: msg.content,
//     })),
//     { role: "user", content: userMessage },
//   ];

//   const response = await fetch("https://api.anthropic.com/v1/messages", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-api-key": process.env.ANTHROPIC_API_KEY,
//       "anthropic-version": "2023-06-01",
//     },
//     body: JSON.stringify({
//       model: "claude-3-5-haiku-20241022",
//       max_tokens: 1024,
//       system: bot.systemPrompt,
//       messages,
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(
//       `Claude API error: ${errorData.error?.message || "Unknown error"}`,
//     );
//   }

//   const data = await response.json();
//   return {
//     content: data.content[0].text,
//     inputTokens: data.usage?.input_tokens || 0,
//     outputTokens: data.usage?.output_tokens || 0,
//   };
// };

// // ─── Streaming call (yields chunks via callback) ────────────────
// const callClaudeAPIStream = async (
//   botType,
//   conversationHistory,
//   userMessage,
//   onChunk, // callback(chunk: string)
//   onDone, // callback(fullText: string, tokens: number)
//   onError, // callback(error: Error)
// ) => {
//   const bot = getBotPersonality(botType);
//   if (!bot) {
//     onError(new Error(`Invalid bot type: ${botType}`));
//     return;
//   }

//   const messages = [
//     ...conversationHistory.map((msg) => ({
//       role: msg.role,
//       content: msg.content,
//     })),
//     { role: "user", content: userMessage },
//   ];

//   try {
//     const response = await fetch("https://api.anthropic.com/v1/messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": process.env.ANTHROPIC_API_KEY,
//         "anthropic-version": "2023-06-01",
//       },
//       body: JSON.stringify({
//         model: "claude-3-5-haiku-20241022",
//         max_tokens: 1024,
//         stream: true, // ← streaming
//         system: bot.systemPrompt,
//         messages,
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(
//         `Claude API error: ${errorData.error?.message || "Unknown error"}`,
//       );
//     }

//     // Read SSE stream
//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();
//     let fullText = "";
//     let outputTokens = 0;

//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;

//       const chunk = decoder.decode(value, { stream: true });
//       const lines = chunk.split("\n");

//       for (const line of lines) {
//         if (!line.startsWith("data: ")) continue;

//         const data = line.slice(6).trim();
//         if (data === "[DONE]") continue;

//         try {
//           const parsed = JSON.parse(data);

//           // Text delta chunk
//           if (
//             parsed.type === "content_block_delta" &&
//             parsed.delta?.type === "text_delta"
//           ) {
//             const text = parsed.delta.text || "";
//             fullText += text;
//             onChunk(text); // stream to client
//           }

//           // Usage info
//           if (parsed.type === "message_delta" && parsed.usage) {
//             outputTokens = parsed.usage.output_tokens || 0;
//           }
//         } catch (_) {
//           // Skip malformed SSE lines
//         }
//       }
//     }

//     onDone(fullText, outputTokens);
//   } catch (err) {
//     onError(err);
//   }
// };

// module.exports = { callClaudeAPI, callClaudeAPIStream };

// const { getBotPersonality } = require("./botPersonalities");

// const callClaudeAPI = async (botType, conversationHistory, userMessage) => {
//   const bot = getBotPersonality(botType);

//   if (!bot) {
//     throw new Error(`Invalid bot type: ${botType}`);
//   }

//   // Build messages array for Claude
//   // conversationHistory = array of { role, content } from DB (last 20 messages)
//   const messages = [
//     ...conversationHistory.map((msg) => ({
//       role: msg.role,
//       content: msg.content,
//     })),
//     {
//       role: "user",
//       content: userMessage,
//     },
//   ];

//   const response = await fetch("https://api.anthropic.com/v1/messages", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-api-key": process.env.ANTHROPIC_API_KEY,
//       "anthropic-version": "2023-06-01",
//     },
//     body: JSON.stringify({
//       model: "claude-3-5-haiku-20241022",
//       max_tokens: 1024,
//       system: bot.systemPrompt,
//       messages: messages,
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     console.error("Claude API Error:", errorData);
//     throw new Error(
//       `Claude API error: ${errorData.error?.message || "Unknown error"}`,
//     );
//   }

//   const data = await response.json();

//   return {
//     content: data.content[0].text,
//     inputTokens: data.usage?.input_tokens || 0,
//     outputTokens: data.usage?.output_tokens || 0,
//   };
// };

// module.exports = { callClaudeAPI };
