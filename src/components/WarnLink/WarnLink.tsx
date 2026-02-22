import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import styles from './WarnLink.module.scss';

export type LinkVariant = 'link' | 'button';

type WarnLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'onClick'
> & {
  shouldWarn: boolean;
  requestLeave: (action: () => void) => void;
  children: ReactNode;
  variant?: LinkVariant;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function openLink(href: string, target?: string, rel?: string) {
  const a = document.createElement('a');
  a.href = href;
  if (target) a.target = target;

  // Security: ensure noopener/noreferrer when opening a new tab/window
  a.rel = rel ?? (target === '_blank' ? 'noopener noreferrer' : '');

  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function WarnLink({
  shouldWarn,
  requestLeave,
  href,
  target,
  rel,
  className,
  children,
  variant = 'link',
  onClick,
  ...rest
}: WarnLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (!href) return;
    if (e.button !== 0) return; // left click only
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    if (!shouldWarn) return; // normal navigation

    e.preventDefault();
    requestLeave(() => openLink(href, target, rel));
  }

  return (
    <a
      {...rest}
      href={href}
      target={target}
      rel={rel}
      className={cx(
        styles.base,
        variant === 'link' && styles.link,
        variant === 'button' && styles.button,
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
