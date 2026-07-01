// Types du système de notifications (toasts) et de confirmation.

/** Nature d'une notification, pilote la couleur/l'icône via le design system. */
export type ToastType = "success" | "error" | "info" | "warning";

/** Options complémentaires lors du déclenchement d'un toast. */
export interface ToastOptions {
  /** Durée d'affichage en ms avant disparition auto. 0 = pas de fermeture auto. */
  duration?: number;
}

/** Un toast actif tel que stocké dans le state du provider. */
export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

/** Options de la boîte de dialogue de confirmation. */
export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Style le bouton de confirmation en « danger » (rouge) pour les actions destructives. */
  danger?: boolean;
}

/** API exposée par le contexte de notification. */
export interface ToastContextValue {
  /** Déclenche un toast générique. */
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  /** Ouvre une confirmation modale ; résout `true` si l'utilisateur confirme. */
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}
