import { forwardRef } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'ghost';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cx(
          styles.button,
          variant === 'primary' && styles.primary,
          variant === 'ghost' && styles.ghost,
          disabled && styles.disabled,
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
