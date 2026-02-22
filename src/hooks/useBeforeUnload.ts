import { useEffect } from 'react';

export function useBeforeUnload(when: boolean) {
  useEffect(() => {
    if (!when) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Most browsers ignore custom messages, but this triggers the prompt.
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [when]);
}
