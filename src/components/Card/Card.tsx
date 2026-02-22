import type { HTMLAttributes } from 'react';
import styles from './Card.module.scss';
import { cx } from '../../utils/cx';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  padded?: boolean;
};

export function Card({ padded = true, className, ...props }: CardProps) {
  return (
    <div
      className={cx(styles.card, padded && styles.padding, className)}
      {...props}
    />
  );
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
};

export function CardHeader({
  title,
  description,
  className,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div className={cx(styles.header, className)} {...props}>
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      {description ? <p className={styles.description}>{description}</p> : null}
      {children}
    </div>
  );
}

export type CardBodyProps = HTMLAttributes<HTMLDivElement>;

export function CardBody({ className, ...props }: CardBodyProps) {
  return <div className={cx(styles.body, className)} {...props} />;
}
