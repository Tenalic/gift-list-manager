import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import type { ToastContextValue } from "../types/toast";

/**
 * Accès centralisé au système de notifications.
 * Doit être utilisé à l'intérieur d'un `<ToastProvider>`.
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast doit être utilisé dans un ToastProvider");
  }
  return context;
}
