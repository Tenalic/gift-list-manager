import type { Toast } from "../types/toast";
import { ToastItem } from "./ToastItem";

interface ToastViewportProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}

/**
 * Conteneur fixe (haut-droite) qui empile les notifications.
 * `aria-live` permet aux lecteurs d'écran d'annoncer les nouveaux toasts.
 */
export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="toast-gaming-viewport"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
