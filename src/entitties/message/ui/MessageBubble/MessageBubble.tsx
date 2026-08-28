// entities/message/ui/MessageBubble.tsx
import React from "react";
import type { Message } from "../../model/types";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div
      className={`message ${message.role === "user" ? "message-user" : "message-assistant"}`}
    >
      <div className="message-content">
        <span className="message-role">
          {message.role === "user" ? "🧑‍💻 Вы" : "🤖 CodeBuddy"}
        </span>
        <p className="message-text">{message.content}</p>
        <span className="message-time">
          {message.timestamp.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
