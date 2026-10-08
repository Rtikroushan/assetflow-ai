import { useEffect, useRef } from "react";
import {
  Bot,
  Minimize2,
  RefreshCw,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAICopilot } from "../../context/aiCopilotContext";
import { quickPrompts } from "../../data/aiKnowledge";

function renderRichText(text) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function AICopilot() {
  const {
    isOpen,
    openCopilot,
    closeCopilot,
    input,
    setInput,
    isTyping,
    messages,
    handleSend,
    clearChat,
  } = useAICopilot();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeCopilot();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCopilot]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-label="AssetFlow AI Copilot"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto flex h-[min(600px,calc(100vh-7.5rem))] w-[380px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/15 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40"
          >
            <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 p-4 text-white">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
                  <Bot size={18} aria-hidden="true" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-bold">
                    AssetFlow AI Copilot
                  </h2>
                  <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live Neural RAG Engine
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={clearChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <RefreshCw size={15} />
                </button>
                <button
                  type="button"
                  onClick={closeCopilot}
                  title="Minimize copilot"
                  aria-label="Minimize copilot"
                  className="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <Minimize2 size={15} />
                </button>
                <button
                  type="button"
                  onClick={closeCopilot}
                  title="Close copilot"
                  aria-label="Close copilot"
                  className="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={15} />
                </button>
              </div>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto overflow-x-hidden bg-slate-50/60 p-4 dark:bg-slate-950/50">
              {messages.map((msg, index) => (
                <motion.div
                  key={`${msg.type}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.type === "ai" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                      <Sparkles size={12} aria-hidden="true" />
                    </div>
                  )}

                  <div
                    className={`max-w-[78%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                      msg.type === "user"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "border border-slate-200/80 bg-white text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {renderRichText(msg.text)}
                    </div>
                  </div>

                  {msg.type === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      <User size={13} aria-hidden="true" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2" aria-live="polite" aria-label="AI is typing">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Sparkles size={12} aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-blue-600"
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: dot * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-slate-100 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Try asking:
              </p>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/60 dark:hover:text-blue-300"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="border-t border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
              onSubmit={(event) => {
                event.preventDefault();
                handleSend();
              }}
            >
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 dark:border-slate-700 dark:bg-slate-800/80">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about inventory, warranties, allocations..."
                  aria-label="Message AssetFlow AI Copilot"
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder-slate-400 dark:text-white dark:placeholder-slate-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send message"
                  title="Send message"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/25 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={15} />
                </button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            onClick={openCopilot}
            title="AssetFlow AI Copilot"
            aria-label="Open AssetFlow AI Copilot"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            transition={{
              y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="pointer-events-auto group relative flex h-16 w-16 flex-col items-center justify-center rounded-[18px] bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/30 ring-1 ring-white/20 backdrop-blur-md hover:shadow-2xl hover:shadow-indigo-600/40"
          >
            <Sparkles size={18} className="mb-0.5" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-wide">AI</span>
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
            <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
              AssetFlow AI Copilot
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
