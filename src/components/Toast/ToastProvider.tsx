import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import styles from './Toast.module.scss';
import { cx } from '../../utils/cx';
import { useKeyDown } from '../../hooks/useKeyDown';

import { ToastContext } from './toast-context';
import { uid } from './toast.utils';
import type { ToastInput, ToastItem, ToastContextValue } from './toast.types';

export type ToastProviderProps = {
  children: ReactNode;
  maxToasts?: number;
  portal?: boolean; // default true
};

export function ToastProvider({
  children,
  maxToasts = 4,
  portal = true,
}: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => setItems([]), []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id = uid();
      const durationMs = input.durationMs ?? 3500;

      setItems((prev) => {
        const next: ToastItem[] = [{ id, ...input }, ...prev];
        return next.slice(0, maxToasts);
      });

      if (durationMs > 0) {
        window.setTimeout(() => dismiss(id), durationMs);
      }

      return id;
    },
    [dismiss, maxToasts],
  );

  const value = useMemo<ToastContextValue>(
    () => ({ toast, dismiss, dismissAll }),
    [toast, dismiss, dismissAll],
  );

  const viewport = (
    <ToastViewport
      items={items}
      onDismiss={dismiss}
      onDismissAll={dismissAll}
    />
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {portal ? createPortal(viewport, document.body) : viewport}
    </ToastContext.Provider>
  );
}

function ToastViewport({
  items,
  onDismiss,
  onDismissAll,
}: {
  items: ToastItem[];
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
}) {
  useKeyDown(
    'Escape',
    () => {
      if (items.length) onDismissAll();
    },
    items.length > 0,
  );

  return (
    <div
      className={styles.viewport}
      aria-live='polite'
      aria-relevant='additions removals'
    >
      {items.map((t) => (
        <div
          key={t.id}
          className={cx(
            styles.toast,
            t.variant === 'success' && styles.success,
            t.variant === 'error' && styles.error,
            t.variant === 'info' && styles.info,
          )}
          role='status'
        >
          <div className={styles.row}>
            <div>
              {t.title ? <p className={styles.title}>{t.title}</p> : null}
              <p className={styles.message}>{t.message}</p>
            </div>

            <div className={styles.actions}>
              {t.action ? (
                <button
                  className={styles.actionBtn}
                  type='button'
                  onClick={() => {
                    t.action?.onClick();
                    onDismiss(t.id);
                  }}
                >
                  {t.action.label}
                </button>
              ) : null}

              <button
                className={styles.closeBtn}
                type='button'
                aria-label='Dismiss'
                onClick={() => onDismiss(t.id)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
