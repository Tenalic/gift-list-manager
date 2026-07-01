import { useEffect, useRef } from "react";
import type { ConfirmOptions } from "../types/toast";

interface ConfirmDialogProps {
  options: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Boîte de dialogue de confirmation (remplace `window.confirm`).
 * Réutilise les styles `modal-gaming` du design system.
 */
export function ConfirmDialog({ options, onConfirm, onCancel }: ConfirmDialogProps) {
  const {
    title = "Confirmation",
    message,
    confirmLabel = "Confirmer",
    cancelLabel = "Annuler",
    danger = false,
  } = options;

  const confirmBtnRef = useRef<HTMLButtonElement>(null);

  // Focus initial sur le bouton de confirmation + fermeture au clavier (Échap).
  useEffect(() => {
    confirmBtnRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <>
      <div className="modal-gaming-backdrop" onClick={onCancel} />
      <div className="modal-gaming-dialog-wrapper">
        <div
          className="modal-gaming-content"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-message"
          style={{ maxWidth: "440px" }}
        >
          <div className="modal-gaming-header">
            <h5 className="modal-gaming-title" id="confirm-dialog-title">{title}</h5>
            <button
              type="button"
              className="modal-gaming-close"
              onClick={onCancel}
              aria-label="Fermer"
            >
              &times;
            </button>
          </div>
          <div className="modal-gaming-body">
            <p id="confirm-dialog-message" style={{ margin: 0, color: "var(--text-secondary)" }}>
              {message}
            </p>
          </div>
          <div className="modal-gaming-footer">
            <button type="button" className="btn-gaming btn-gaming-secondary" onClick={onCancel}>
              {cancelLabel}
            </button>
            <button
              type="button"
              ref={confirmBtnRef}
              className={`btn-gaming ${danger ? "btn-gaming-danger" : "btn-gaming-primary"}`}
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
