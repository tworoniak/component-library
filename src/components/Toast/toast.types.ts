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

export type ToastItem = ToastInput & { id: string };

export type ToastContextValue = {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
};
