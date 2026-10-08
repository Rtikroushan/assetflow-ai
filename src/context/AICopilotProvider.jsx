import { useCallback, useMemo, useState } from "react";
import { AICopilotContext } from "./aiCopilotContext";
import { getAIReply, resetMessage, welcomeMessage } from "../data/aiKnowledge";

export function AICopilotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);

  const openCopilot = useCallback(() => setIsOpen(true), []);
  const closeCopilot = useCallback(() => setIsOpen(false), []);
  const toggleCopilot = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleSend = useCallback((textToSend) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    setMessages((prev) => [...prev, { type: "user", text }]);
    setInput("");
    setIsTyping(true);
    setIsOpen(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "ai", text: getAIReply(text) }]);
      setIsTyping(false);
    }, 700);
  }, [input]);

  const clearChat = useCallback(() => {
    setMessages([resetMessage]);
    setInput("");
    setIsTyping(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      openCopilot,
      closeCopilot,
      toggleCopilot,
      input,
      setInput,
      isTyping,
      messages,
      handleSend,
      clearChat,
    }),
    [
      isOpen,
      openCopilot,
      closeCopilot,
      toggleCopilot,
      input,
      isTyping,
      messages,
      handleSend,
      clearChat,
    ]
  );

  return (
    <AICopilotContext.Provider value={value}>
      {children}
    </AICopilotContext.Provider>
  );
}
