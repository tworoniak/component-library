import { useCallback, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { WarnOnLeaveModal } from '../WarnOnLeaveModal/WarnOnLeaveModal';
import { ExternalLinkGuardContext } from './externalLink.context';
import type {
  PendingLink,
  ExternalLinkGuardContextValue,
} from './externalLink.types';
import { isExternalUrl, openLink } from './externalLink.utils';

export type ExternalLinkGuardProps = {
  children: ReactNode;

  /** If provided, only these domains are considered external (everyone else is internal). */
  allowlistDomains?: string[];

  /** If provided, these domains will NEVER show the disclaimer. */
  bypassDomains?: string[];

  title?: string;
  message?: ReactNode;
  confirmText?: string;
  cancelText?: string;
};

export function ExternalLinkGuard({
  children,
  allowlistDomains,
  bypassDomains,
  title = 'You are now leaving this website',
  message = (
    <>
      The site you are about to visit is a third-party website. We are not
      responsible for its content or privacy practices.
    </>
  ),
  confirmText = 'Continue',
  cancelText = 'Cancel',
}: ExternalLinkGuardProps) {
  const [open, setOpen] = useState(false);
  const pendingRef = useRef<PendingLink>(null);

  const isExternal = useCallback(
    (href: string) => {
      let external = isExternalUrl(href);

      // Optional: allowlist means “only these are treated as external”
      if (allowlistDomains && allowlistDomains.length) {
        try {
          const url = new URL(href, window.location.href);
          external = allowlistDomains.includes(url.hostname);
        } catch {
          external = false;
        }
      }

      // Optional: bypass domains never show disclaimer
      if (bypassDomains && bypassDomains.length) {
        try {
          const url = new URL(href, window.location.href);
          if (bypassDomains.includes(url.hostname)) external = false;
        } catch {
          // ignore
        }
      }

      return external;
    },
    [allowlistDomains, bypassDomains],
  );

  const confirmExternalLink = useCallback(
    (href: string, target?: string, rel?: string) => {
      pendingRef.current = { href, target, rel };
      setOpen(true);
    },
    [],
  );

  const onConfirm = useCallback(() => {
    const pending = pendingRef.current;
    pendingRef.current = null;
    setOpen(false);
    if (!pending) return;
    openLink(pending.href, pending.target, pending.rel);
  }, []);

  const onCancel = useCallback(() => {
    pendingRef.current = null;
    setOpen(false);
  }, []);

  const value = useMemo<ExternalLinkGuardContextValue>(
    () => ({ confirmExternalLink, isExternal }),
    [confirmExternalLink, isExternal],
  );

  return (
    <ExternalLinkGuardContext.Provider value={value}>
      {children}
      <WarnOnLeaveModal
        open={open}
        title={title}
        message={message}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </ExternalLinkGuardContext.Provider>
  );
}
