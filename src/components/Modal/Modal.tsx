import { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import { useKeyDown } from '../../hooks/useKeyDown';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

export type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
};

export function Modal({
  open,
  title,
  onClose,
  children,
  closeOnBackdrop = true,
  closeOnEscape = true,
}: ModalProps) {
  const elRef = useRef<HTMLDivElement | null>(null);

  const portalEl = useMemo(() => {
    const el = document.createElement('div');
    el.dataset.acmeModalRoot = 'true';
    return el;
  }, []);

  useEffect(() => {
    elRef.current = portalEl;
    document.body.appendChild(portalEl);
    return () => {
      document.body.removeChild(portalEl);
    };
  }, [portalEl]);

  useLockBodyScroll(open);

  useKeyDown(
    'Escape',
    (e) => {
      e.preventDefault();
      onClose();
    },
    open && closeOnEscape,
  );

  if (!open) return null;

  const modal = (
    <div
      className={styles.backdrop}
      role='dialog'
      aria-modal='true'
      aria-label={title}
      onMouseDown={(e) => {
        if (!closeOnBackdrop) return;
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.dialog}>
        <div className={styles.header}>
          <div>{title ? <h2 className={styles.title}>{title}</h2> : null}</div>
          <button className={styles.close} onClick={onClose} aria-label='Close'>
            ✕
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modal, portalEl);
}
