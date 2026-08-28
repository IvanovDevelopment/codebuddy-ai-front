// pages/chat/model/useChatViewModel.ts
import { useMemo } from "react";
import { ChatViewModel } from "./ChatViewModel";

export const useChatViewModel = () => {
  // useMemo гарантирует, что ViewModel создастся один раз и не будет пересоздаваться при ререндерах
  return useMemo(() => new ChatViewModel(), []);
};
