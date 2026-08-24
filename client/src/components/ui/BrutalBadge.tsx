import React from 'react';
import { cn } from '../../lib/utils';

export interface BrutalBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'coral' | 'mint' | 'yellow' | 'lavender' | 'black' | 'gray';
  size?: 'sm' | 'md';
}

export const BrutalBadge: React.FC<BrutalBadgeProps> = ({
  children,
  className,
  variant = 'coral',
  size = 'sm',
  ...props
}) => {
  const variants = {
    coral: 'bg-brutal-coral text-white border-2 border-brutal-black dark:border-white',
    mint: 'bg-brutal-mint text-brutal-black border-2 border-brutal-black dark:border-white',
    yellow: 'bg-brutal-yellow text-brutal-black border-2 border-brutal-black dark:border-white',
    lavender: 'bg-brutal-lavender text-brutal-black border-2 border-brutal-black dark:border-white',
    black: 'bg-brutal-black text-white border-2 border-brutal-black dark:border-zinc-400',
    gray: 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-2 border-brutal-black/40 dark:border-zinc-600',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px] font-bold',
    md: 'px-2.5 py-1 text-xs font-bold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-heading uppercase tracking-wide rounded-lg shadow-[1.5px_1.5px_0px_#121212] dark:shadow-[1.5px_1.5px_0px_#000000] select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
