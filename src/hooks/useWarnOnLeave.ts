import { useCallback, useEffect, useRef, useState } from 'react';

type PendingAction = null | (() => void);

export function useWarnOnLeave(shouldWarn: boolean) {
  const [open, setOpen] = useState(false);
  const pendingRef = useRef<PendingAction>(null);

  // Browser-level warning (close tab, refresh, type new URL)
  useEffect(() => {
    if (!shouldWarn) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [shouldWarn]);

  const request = useCallback(
    (action: () => void) => {
      if (!shouldWarn) {
        action();
        return;
      }
      pendingRef.current = action;
      setOpen(true);
    },
    [shouldWarn],
  );

  const confirm = useCallback(() => {
    const action = pendingRef.current;
    pendingRef.current = null;
    setOpen(false);
    action?.();
  }, []);

  const cancel = useCallback(() => {
    pendingRef.current = null;
    setOpen(false);
  }, []);

  return { open, request, confirm, cancel };
}
