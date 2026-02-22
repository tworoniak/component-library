import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import styles from './ExternalLink.module.scss';
import { useExternalLinkGuard } from './externalLink.context';

export type ExternalLinkVariant = 'link' | 'button';

type ExternalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'onClick'
> & {
  children: ReactNode;
  variant?: ExternalLinkVariant;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function ExternalLink({
  href,
  target,
  rel,
  className,
  children,
  variant = 'link',
  onClick,
  ...rest
}: ExternalLinkProps) {
  const { confirmExternalLink, isExternal } = useExternalLinkGuard();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (!href) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    if (!isExternal(href)) return;

    e.preventDefault();
    confirmExternalLink(href, target, rel);
  }

  return (
    <a
      {...rest}
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      className={cx(
        styles.base,
        variant === 'link' && styles.link,
        variant === 'button' && styles.button,
        className,
      )}
    >
      {children}
    </a>
  );
}
