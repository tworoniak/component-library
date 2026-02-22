import React, {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
} from 'react';
import styles from './Tabs.module.scss';
import { cx } from '../../utils/cx';

type TabsContextValue = {
  baseId: string;
  value: string;
  setValue: (v: string) => void;
  orientation: 'horizontal' | 'vertical';
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsCtx() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs components must be used within <Tabs />');
  return ctx;
}

export type TabsProps = {
  value?: string; // controlled
  defaultValue: string; // uncontrolled initial
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children: React.ReactNode;
};

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  className,
  children,
}: TabsProps) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultValue);

  const current = value ?? internal;

  const setValue = (v: string) => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  };

  const ctx: TabsContextValue = {
    baseId,
    value: current,
    setValue,
    orientation,
  };

  return (
    <TabsContext.Provider value={ctx}>
      <div className={cx(styles.root, className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = React.HTMLAttributes<HTMLDivElement>;

export function TabsList({ className, ...props }: TabsListProps) {
  const { orientation } = useTabsCtx();

  return (
    <div
      role='tablist'
      aria-orientation={orientation}
      className={cx(styles.list, className)}
      {...props}
    />
  );
}

export type TabsTriggerProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'onClick'
> & {
  value: string;
};

export function TabsTrigger({ value, className, ...props }: TabsTriggerProps) {
  const ctx = useTabsCtx();
  const ref = useRef<HTMLButtonElement | null>(null);

  const isActive = ctx.value === value;
  const tabId = `${ctx.baseId}-tab-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;

  const moveFocus = (dir: 1 | -1) => {
    const list = ref.current?.closest('[role="tablist"]');
    if (!list) return;
    const tabs = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
    ).filter((el) => !el.disabled);

    const idx = tabs.indexOf(ref.current!);
    if (idx < 0) return;

    const next = tabs[(idx + dir + tabs.length) % tabs.length];
    next?.focus();
  };

  return (
    <button
      ref={ref}
      role='tab'
      id={tabId}
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      type='button'
      className={cx(styles.trigger, isActive && styles.active, className)}
      onClick={() => ctx.setValue(value)}
      onKeyDown={(e) => {
        const horizontal = ctx.orientation === 'horizontal';
        if (horizontal && e.key === 'ArrowRight') {
          e.preventDefault();
          moveFocus(1);
        }
        if (horizontal && e.key === 'ArrowLeft') {
          e.preventDefault();
          moveFocus(-1);
        }
        if (!horizontal && e.key === 'ArrowDown') {
          e.preventDefault();
          moveFocus(1);
        }
        if (!horizontal && e.key === 'ArrowUp') {
          e.preventDefault();
          moveFocus(-1);
        }
        if (e.key === 'Home') {
          e.preventDefault();
          const list = ref.current?.closest('[role="tablist"]');
          const first = list?.querySelector<HTMLButtonElement>('[role="tab"]');
          first?.focus();
        }
        if (e.key === 'End') {
          e.preventDefault();
          const list = ref.current?.closest('[role="tablist"]');
          const tabs =
            list?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
          const last = tabs?.[tabs.length - 1];
          last?.focus();
        }
      }}
      {...props}
    />
  );
}

export type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  forceMount?: boolean;
};

export function TabsContent({
  value,
  forceMount = false,
  className,
  children,
  ...props
}: TabsContentProps) {
  const ctx = useTabsCtx();
  const isActive = ctx.value === value;

  const tabId = `${ctx.baseId}-tab-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;

  if (!forceMount && !isActive) return null;

  return (
    <div
      role='tabpanel'
      id={panelId}
      aria-labelledby={tabId}
      hidden={!isActive}
      className={cx(styles.panel, className)}
      {...props}
    >
      {children}
    </div>
  );
}
