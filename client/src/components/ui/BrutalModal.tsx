import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { BrutalButton } from './BrutalButton';

export interface BrutalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrutalModal: React.FC<BrutalModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Window */}
      <div
        className={cn(
          'relative w-full bg-surface-light dark:bg-card-dark rounded-2xl border-3 border-brutal-black dark:border-white shadow-brutal-xl dark:shadow-brutal-dark-lg p-6 z-10 animate-pop overflow-hidden',
          maxWidths[maxWidth]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-zinc-200 dark:border-zinc-700">
          {title && (
            <h3 className="font-heading text-lg font-extrabold uppercase tracking-wide text-brutal-black dark:text-white">
              {title}
            </h3>
          )}
          <BrutalButton
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-lg ml-auto"
            onClick={onClose}
          >
            <X size={18} />
          </BrutalButton>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};
