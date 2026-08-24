import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export interface BrutalTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const BrutalTooltip: React.FC<BrutalTooltipProps> = ({
  content,
  children,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-2.5 py-1 text-xs font-heading font-bold uppercase tracking-wider text-white bg-brutal-black rounded-lg border-2 border-brutal-black shadow-brutal-sm pointer-events-none whitespace-nowrap animate-pop',
            positions[position]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
