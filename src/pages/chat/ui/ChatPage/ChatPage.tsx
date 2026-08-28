// pages/chat/ui/ChatPage.tsx
import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useChatViewModel } from "../../model/useChatViewModel";
import { MessageBubble } from "@/entitties/message/ui/MessageBubble";
import { SendMessageForm } from "@/features/send-message/ui/SendMessageForm";

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
    <div className="chat-container">
      <header className="chat-header">
        <h1>💬 CodeBuddy AI</h1>
        <p>Твой AI-ассистент по коду</p>
      </header>

      <div className="messages-container">
        {viewModel.messages.length === 0 ? (
          <div className="empty-state">
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
          <div className="message message-assistant">
            <div className="message-content">
              <span className="message-role">🤖 CodeBuddy</span>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        {viewModel.error && (
          <div className="message message-assistant">
            <div className="message-content error">
              <span className="message-role">⚠️ Ошибка</span>
              <p className="message-text">{viewModel.error}</p>
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
