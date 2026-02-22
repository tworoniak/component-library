import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
import { cx } from '../../utils/cx';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const describedBy =
      [hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={styles.field}>
        {label ? (
          <div className={styles.labelRow}>
            <label className={styles.label} htmlFor={inputId}>
              {label}
            </label>
            {hint ? (
              <span className={styles.hint} id={hintId}>
                {hint}
              </span>
            ) : null}
          </div>
        ) : null}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cx(styles.input, error && styles.error, className)}
          {...props}
        />

        {error ? (
          <div className={styles.errorText} id={errorId} role='alert'>
            {error}
          </div>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
