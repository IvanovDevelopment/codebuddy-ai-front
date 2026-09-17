// src/pages/chat/ui/ChatPage.tsx
import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useChatViewModel } from "../../model/useChatViewModel";
import { MessageBubble } from "@/entitties/message/ui/MessageBubble";
import { SendMessageForm } from "@/features/send-message/ui/SendMessageForm";
import styles from "./ChatPage.module.scss";

export const ChatPage: React.FC = observer(() => {
  const viewModel = useChatViewModel();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [viewModel.messages]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>💬 CodeBuddy AI</h1>
        <p>Твой AI-ассистент по коду</p>
      </header>

      <div className={styles.messagesContainer}>
        {viewModel.messages.length === 0 ? (
          <div className={styles.emptyState}>
            <p>
              👋 Задай вопрос по JavaScript или другому языку программирования
            </p>
          </div>
        ) : (
          viewModel.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}
        {viewModel.isLoading && (
          <div className={`${styles.message} ${styles.messageAssistant}`}>
            <div className={styles.messageContent}>
              <span className={styles.messageRole}>🤖 CodeBuddy</span>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        {viewModel.error && (
          <div className={`${styles.message} ${styles.messageAssistant}`}>
            <div className={`${styles.messageContent} ${styles.error}`}>
              <span className={styles.messageRole}>⚠️ Ошибка</span>
              <p className={styles.messageText}>{viewModel.error}</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <SendMessageForm
        onSend={viewModel.sendMessage}
        isLoading={viewModel.isLoading}
      />
    </div>
  );
});
