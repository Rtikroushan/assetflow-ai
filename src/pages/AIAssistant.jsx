import { Bot, Send, Sparkles, User } from "lucide-react";
import { useState } from "react";

export default function AIAssistant() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello! I'm AssetFlow AI. Ask me anything about your assets, policies or operations.",
    },
  ]);

  const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "user",
        text: text,
      },
      {
        type: "ai",
        text: "I'm processing your request. This interface can later be connected to your RAG/LLM backend.",
      },
    ]);

    setMessage("");
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-4 border-b bg-slate-950 p-5 text-white">

        <div className="rounded-xl bg-blue-600 p-3">
          <Bot size={24} />
        </div>

        <div>
          <h1 className="font-bold">
            AssetFlow AI
          </h1>

          <p className="text-xs text-slate-400">
            Intelligent Asset Assistant
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs text-emerald-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Online
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50 p-6">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              msg.type === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            {/* AI Icon */}
            {msg.type === "ai" && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <Sparkles size={16} />
              </div>
            )}

            {/* Message */}
            <div
              className={`max-w-xl rounded-2xl px-4 py-3 text-sm ${
                msg.type === "user"
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              {msg.text}
            </div>

            {/* User Icon */}
            {msg.type === "user" && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200">
                <User size={16} />
              </div>
            )}

          </div>
        ))}

      </div>

      {/* Input */}
      <div className="border-t bg-white p-4">

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask AssetFlow AI..."
            className="flex-1 bg-transparent px-3 text-sm outline-none"
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={!message.trim()}
            className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={17} />
          </button>

        </div>

        <p className="mt-2 text-center text-xs text-slate-400">
          AssetFlow AI can answer asset, policy and operational questions.
        </p>

      </div>
    </div>
  );
}