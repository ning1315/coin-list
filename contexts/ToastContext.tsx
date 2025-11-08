"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Toast from "@/components/toast";

type ToastType = {
  message: string;
  type: "success" | "error";
};

type ToastContextType = {
  showToast: (toast: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastType | null>(null);

  const showToast = ({ message, type = "success" }: ToastType) => {
    setToast({ message, type });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error();
  }
  return context;
}
