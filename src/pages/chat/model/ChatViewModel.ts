// pages/chat/model/ChatViewModel.ts
import { makeAutoObservable, runInAction } from "mobx";
import type { Message } from "@/entitties/message/model/types";
import { sendMessage as sendMessageApi } from "@/shared/api/chatApi";

export class ChatViewModel {
  // 🔴 ОБЪЯВЛЯЕМ СОСТОЯНИЕ
  messages: Message[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    // 🔴 makeAutoObservable — делает все свойства и методы реактивными
    makeAutoObservable(this);
  }

  // 🔴 ДЕЙСТВИЕ (action) — метод, который меняет состояние
  sendMessage = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText || this.isLoading) return;

    // 1. Создаем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmedText,
      timestamp: new Date(),
    };
    this.addMessage(userMessage);

    // 2. Включаем индикатор загрузки
    this.isLoading = true;
    this.error = null;

    try {
      // 3. Отправляем запрос к API
      const response = await sendMessageApi(trimmedText);

      // 4. Создаем сообщение от AI
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.reply,
        timestamp: new Date(),
      };
      this.addMessage(assistantMessage);
    } catch (error) {
      // 5. Обрабатываем ошибку
      console.error("Ошибка отправки:", error);
      runInAction(() => {
        this.error = "Не удалось получить ответ от AI";
      });
    } finally {
      // 6. Выключаем индикатор загрузки
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  // 🔴 ПРИВАТНЫЙ МЕТОД (для внутреннего использования)
  private addMessage = (message: Message) => {
    this.messages.push(message);
  };
}
