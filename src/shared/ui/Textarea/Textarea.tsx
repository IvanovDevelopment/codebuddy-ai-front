import React from "react";
import styles from "./Textarea.module.scss";

export const Textarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ...props }) => {
  const combinedClassName = [styles.textarea, className]
    .filter(Boolean)
    .join(" ");

  return <textarea className={combinedClassName} {...props} />;
};
