// src/shared/ui/Button.tsx
import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  className,
  ...props
}) => {
  const combinedClassName = [styles.button, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={combinedClassName}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "⏳ Отправка..." : children}
    </button>
  );
};
