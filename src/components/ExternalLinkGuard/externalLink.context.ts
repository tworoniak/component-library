import { createContext, useContext } from 'react';
import type { ExternalLinkGuardContextValue } from './externalLink.types';

export const ExternalLinkGuardContext =
  createContext<ExternalLinkGuardContextValue | null>(null);

export function useExternalLinkGuard() {
  const ctx = useContext(ExternalLinkGuardContext);
  if (!ctx) {
    throw new Error(
      'useExternalLinkGuard must be used within <ExternalLinkGuard />',
    );
  }
  return ctx;
}
