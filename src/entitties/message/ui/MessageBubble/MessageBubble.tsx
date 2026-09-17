// src/entities/message/ui/MessageBubble.tsx
import React from "react";
import type { Message } from "../../model/types";
import styles from "./MessageBubble.module.scss";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`${styles.bubble} ${isUser ? styles.user : styles.assistant}`}
    >
      <div
        className={`${styles.content} ${isUser ? styles.userContent : styles.assistantContent}`}
      >
        <span className={styles.role}>{isUser ? "🧑‍💻 Вы" : "🤖 CodeBuddy"}</span>
        <p className={styles.text}>{message.content}</p>
        <span className={styles.time}>
          {message.timestamp.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
