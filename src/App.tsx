import React from "react";
import "./App.css";
import { ChatPage } from "@/pages/chat/ui/ChatPage";

export const App: React.FC = () => {
  return (
    <div className="app">
      <ChatPage />
    </div>
  );
};
