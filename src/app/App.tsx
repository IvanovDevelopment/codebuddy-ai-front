import React from "react";
import { ChatPage } from "@/pages/chat/ui/ChatPage";
import styles from "./App.module.scss";

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <ChatPage />
    </div>
  );
};
