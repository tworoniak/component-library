import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.scss';
import { cx } from '../../utils/cx';
import { useKeyDown } from '../../hooks/useKeyDown';

export type ToastVariant = 'info' | 'success' | 'error';

export type ToastAction = {
  label: string;
  onClick: () => void;
};

export type ToastInput = {
  title?: string;
  message: string;
  variant?: ToastVariant;
  durationMs?: number; // default 3500
  action?: ToastAction;
};

type ToastItem = ToastInput & { id: string };

type ToastContextValue = {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider />');
  return ctx;
}

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export type ToastProviderProps = {
  children: React.ReactNode;
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
  // Optional: press Escape to clear all toasts
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
