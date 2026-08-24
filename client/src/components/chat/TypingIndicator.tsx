import React from 'react';

export interface TypingIndicatorProps {
  users: string[];
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ users }) => {
  if (!users || users.length === 0) return null;

  const text =
    users.length === 1
      ? `${users[0]} is typing`
      : users.length === 2
      ? `${users[0]} and ${users[1]} are typing`
      : `${users[0]} and ${users.length - 1} others are typing`;

  return (
    <div className="flex items-center gap-2 px-4 py-1.5 text-xs font-heading font-bold text-zinc-500 dark:text-zinc-400 select-none animate-fadeIn">
      <div className="flex items-center gap-1 px-2 py-1 bg-surface-secondary dark:bg-card-dark rounded-full border border-brutal-black/30 dark:border-zinc-600 shadow-[1px_1px_0px_#121212]">
        <span className="w-1.5 h-1.5 rounded-full bg-brutal-coral animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-brutal-mint animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-brutal-yellow animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span>{text}...</span>
    </div>
  );
};
