import React from 'react';
import { cn } from '../../lib/utils';

export interface BrutalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const BrutalInput: React.FC<BrutalInputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label className="font-heading text-xs uppercase font-bold text-brutal-black dark:text-zinc-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-zinc-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full bg-white dark:bg-card-dark text-brutal-black dark:text-white font-sans text-sm px-3.5 py-2.5 rounded-xl border-3 border-brutal-black dark:border-zinc-500 shadow-brutal-sm focus:shadow-brutal focus:border-brutal-coral dark:focus:border-brutal-coral focus:outline-none transition-all placeholder:text-zinc-400',
            icon && 'pl-10',
            error && 'border-rose-500 focus:border-rose-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs font-bold text-rose-500 mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
};
