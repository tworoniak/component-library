import type { ReactNode } from 'react';
import styles from './WarnOnLeaveModal.module.scss';

export type WarnOnLeaveModalProps = {
  open: boolean;
  title?: string;
  message?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function WarnOnLeaveModal({
  open,
  title = 'Leave without saving?',
  message = 'You have unsaved changes. If you leave now, your changes will be lost.',
  confirmText = 'Leave',
  cancelText = 'Stay',
  onConfirm,
  onCancel,
}: WarnOnLeaveModalProps) {
  if (!open) return null;

  return (
    <div className={styles.backdrop} role='presentation' onClick={onCancel}>
      <div
        className={styles.modal}
        role='dialog'
        aria-modal='true'
        aria-labelledby='wol-title'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id='wol-title' className={styles.title}>
          {title}
        </h2>

        <div className={styles.body}>{message}</div>

        <div className={styles.actions}>
          <button type='button' className={styles.cancel} onClick={onCancel}>
            {cancelText}
          </button>

          <button type='button' className={styles.confirm} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
