import { createContext, useContext } from "react";

export const AICopilotContext = createContext(null);

export function useAICopilot() {
  const context = useContext(AICopilotContext);
  if (!context) {
    throw new Error("useAICopilot must be used within AICopilotProvider");
  }
  return context;
}
