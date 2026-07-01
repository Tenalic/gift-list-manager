import { createContext, useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";
import type {
  ConfirmOptions,
  Toast,
  ToastContextValue,
  ToastOptions,
  ToastType,
} from "../types/toast";
import { ToastViewport } from "../components/ToastViewport";
import { ConfirmDialog } from "../components/ConfirmDialog";

const DEFAULT_DURATION = 4000;

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/** État interne d'une confirmation en attente de réponse utilisateur. */
interface PendingConfirm extends ConfirmOptions {
  resolve: (value: boolean) => void;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmState, setConfirmState] = useState<PendingConfirm | null>(null);

  // Compteur d'identifiants stable (évite Math.random / collisions).
  const idRef = useRef(0);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", options?: ToastOptions) => {
      const id = ++idRef.current;
      const duration = options?.duration ?? DEFAULT_DURATION;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    [],
  );

  const success = useCallback(
    (message: string, options?: ToastOptions) => showToast(message, "success", options),
    [showToast],
  );
  const error = useCallback(
    (message: string, options?: ToastOptions) => showToast(message, "error", options),
    [showToast],
  );
  const info = useCallback(
    (message: string, options?: ToastOptions) => showToast(message, "info", options),
    [showToast],
  );
  const warning = useCallback(
    (message: string, options?: ToastOptions) => showToast(message, "warning", options),
    [showToast],
  );

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({ ...options, resolve });
    });
  }, []);

  const handleConfirmResponse = useCallback(
    (value: boolean) => {
      confirmState?.resolve(value);
      setConfirmState(null);
    },
    [confirmState],
  );

  const value: ToastContextValue = {
    showToast,
    success,
    error,
    info,
    warning,
    confirm,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={removeToast} />
      {confirmState && (
        <ConfirmDialog
          options={confirmState}
          onConfirm={() => handleConfirmResponse(true)}
          onCancel={() => handleConfirmResponse(false)}
        />
      )}
    </ToastContext.Provider>
  );
}
