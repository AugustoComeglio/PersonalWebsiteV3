import React, { useEffect, useRef, useId } from "react";
import styles from "./ModalDialog.module.css";

const ModalDialog = ({ isOpen, onClose, title, subtitle, children }) => {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleDialogClose = () => {
      onClose?.();
    };

    dialog.addEventListener("close", handleDialogClose);

    // MANDATORY Fallback for browsers without closedby="any" support
    let handleBackdropClick = null;
    if (
      typeof HTMLDialogElement !== "undefined" &&
      !("closedBy" in HTMLDialogElement.prototype)
    ) {
      handleBackdropClick = (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      };
      dialog.addEventListener("click", handleBackdropClick);
    }

    return () => {
      dialog.removeEventListener("close", handleDialogClose);
      if (handleBackdropClick) {
        dialog.removeEventListener("click", handleBackdropClick);
      }
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="premium-dialog"
      closedby="any"
      aria-labelledby={titleId}
    >
      <div className={styles.dialogInner}>
        <header className={styles.dialogHeader}>
          <div>
            <h2 id={titleId} className={styles.dialogTitle}>
              {title}
            </h2>
            {subtitle && <p className={styles.dialogSubtitle}>{subtitle}</p>}
          </div>
          <form method="dialog">
            <button
              type="submit"
              className={styles.closeBtn}
              aria-label="Cerrar ventana"
            >
              ✕
            </button>
          </form>
        </header>
        <div className={styles.dialogBody}>{children}</div>
      </div>
    </dialog>
  );
};

export default ModalDialog;
