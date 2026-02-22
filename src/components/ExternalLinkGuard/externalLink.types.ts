export type PendingLink = {
  href: string;
  target?: string;
  rel?: string;
} | null;

export type ExternalLinkGuardContextValue = {
  confirmExternalLink: (href: string, target?: string, rel?: string) => void;
  isExternal: (href: string) => boolean;
};
