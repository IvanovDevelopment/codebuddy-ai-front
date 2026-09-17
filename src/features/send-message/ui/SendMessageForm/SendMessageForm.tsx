import React, { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Textarea } from "@/shared/ui/Textarea";
import styles from "./SendMessageForm.module.scss";

interface SendMessageFormProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export const SendMessageForm: React.FC<SendMessageFormProps> = ({
  onSend,
  isLoading,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <Textarea
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Введи вопрос по коду..."
        disabled={isLoading}
        rows={3}
      />
      <Button
        className={styles.button}
        onClick={handleSubmit}
        disabled={isLoading || !input.trim()}
        isLoading={isLoading}
      >
        Отправить
      </Button>
    </div>
  );
};
