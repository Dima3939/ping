import React from 'react';
import { cn } from '../../lib/utils';

export interface BrutalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'muted' | 'interactive' | 'accent';
}

export const BrutalCard: React.FC<BrutalCardProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'bg-surface-light dark:bg-card-dark border-3 border-brutal-black dark:border-zinc-500 shadow-brutal dark:shadow-brutal-dark',
    muted: 'bg-surface-secondary dark:bg-surface-dark border-2 border-brutal-black/40 dark:border-zinc-700 shadow-brutal-sm',
    interactive: 'bg-surface-light dark:bg-card-dark border-3 border-brutal-black dark:border-zinc-500 shadow-brutal dark:shadow-brutal-dark hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all cursor-pointer',
    accent: 'bg-amber-50 dark:bg-amber-950/40 border-3 border-brutal-black dark:border-amber-400 shadow-brutal dark:shadow-brutal-dark',
  };

  return (
    <div
      className={cn('rounded-xl p-4', variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};
