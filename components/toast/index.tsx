"use client";

import { useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import styles from "./index.module.css";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.toast}>
      {type === "success" ? (
        <CheckCircle2 color="var(--green-500)" size={20} />
      ) : (
        <XCircle color="var(--red-500)" size={20} />
      )}
      <span>{message}</span>
    </div>
  );
}
