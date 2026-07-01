import { useEffect, useRef, useState } from "react";
import type { Toast, ToastType } from "../types/toast";

const ICONS: Record<ToastType, string> = {
  success: "✔",
  error: "⚠️",
  info: "ℹ️",
  warning: "⚡",
};

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: number) => void;
}

/** Durée de l'animation de sortie (doit rester alignée avec le CSS). */
const EXIT_ANIMATION_MS = 250;

export function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [leaving, setLeaving] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lance l'animation de sortie puis retire réellement le toast du state.
  const dismiss = () => {
    if (leaving) return;
    setLeaving(true);
    exitTimer.current = setTimeout(() => onDismiss(toast.id), EXIT_ANIMATION_MS);
  };

  // Fermeture automatique après `duration` (0 = désactivée).
  useEffect(() => {
    if (toast.duration <= 0) return;
    const autoTimer = setTimeout(dismiss, toast.duration);
    return () => clearTimeout(autoTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast.duration]);

  // Nettoyage du timer d'animation au démontage.
  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  return (
    <div
      className={`toast-gaming toast-gaming-${toast.type} ${leaving ? "toast-gaming-leaving" : ""}`}
      role={toast.type === "error" ? "alert" : "status"}
    >
      <span className="toast-gaming-icon" aria-hidden="true">
        {ICONS[toast.type]}
      </span>
      <span className="toast-gaming-message">{toast.message}</span>
      <button
        type="button"
        className="toast-gaming-close"
        onClick={dismiss}
        aria-label="Fermer la notification"
      >
        &times;
      </button>
    </div>
  );
}
