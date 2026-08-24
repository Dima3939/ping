import React from 'react';
import { cn } from '../../lib/utils';
import { soundFX } from '../../hooks/useSoundEffects';

export interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'mint' | 'yellow' | 'lavender' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  playAudio?: boolean;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  playAudio = true,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (playAudio && !props.disabled) {
      soundFX.playClick();
    }
    onClick?.(e);
  };

  const baseStyles = 'inline-flex items-center justify-center font-heading font-bold uppercase tracking-wider rounded-xl transition-all duration-75 select-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brutal-coral hover:bg-brutal-coral-hover text-white border-3 border-brutal-black dark:border-white shadow-brutal dark:shadow-brutal-dark hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
    secondary: 'bg-surface-light dark:bg-surface-dark text-brutal-black dark:text-white border-3 border-brutal-black dark:border-zinc-500 shadow-brutal dark:shadow-brutal-dark hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
    mint: 'bg-brutal-mint hover:bg-brutal-mint-hover text-brutal-black border-3 border-brutal-black dark:border-white shadow-brutal dark:shadow-brutal-dark hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
    yellow: 'bg-brutal-yellow hover:bg-brutal-yellow-hover text-brutal-black border-3 border-brutal-black dark:border-white shadow-brutal dark:shadow-brutal-dark hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
    lavender: 'bg-brutal-lavender text-brutal-black border-3 border-brutal-black dark:border-white shadow-brutal dark:shadow-brutal-dark hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
    ghost: 'bg-transparent text-brutal-black dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 border-2 border-transparent hover:border-brutal-black/40 dark:hover:border-zinc-600',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white border-3 border-brutal-black dark:border-white shadow-brutal dark:shadow-brutal-dark hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-3 text-base gap-2.5',
    icon: 'p-2 w-10 h-10 text-sm',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
