import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

type WarnButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick'
> & {
  shouldWarn: boolean;
  requestLeave: (action: () => void) => void;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

export function WarnButton({
  shouldWarn,
  requestLeave,
  onClick,
  children,
  ...rest
}: WarnButtonProps) {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (!shouldWarn) {
      onClick(e);
      return;
    }

    // we generally want to stop the original action until confirmed
    e.preventDefault();

    requestLeave(() => onClick(e));
  }

  return (
    <button {...rest} onClick={handleClick}>
      {children}
    </button>
  );
}
