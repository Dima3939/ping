import React, { useState } from 'react';
import { SmilePlus } from 'lucide-react';
import { BrutalButton } from '../ui/BrutalButton';

const QUICK_EMOJIS = ['🔥', '🚀', '❤️', '👏', '⚡', '💡', '🎉', '👀'];

export interface EmojiReactionPickerProps {
  onSelectEmoji: (emoji: string) => void;
}

export const EmojiReactionPicker: React.FC<EmojiReactionPickerProps> = ({ onSelectEmoji }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emoji: string) => {
    onSelectEmoji(emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-flex items-center">
      <BrutalButton
        variant="ghost"
        size="icon"
        className="w-7 h-7 rounded-lg text-zinc-500 hover:text-brutal-coral p-0"
        title="Add reaction"
        onClick={() => setIsOpen(!isOpen)}
      >
        <SmilePlus size={15} />
      </BrutalButton>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full left-0 mb-1 z-50 flex items-center gap-1 p-1.5 bg-surface-light dark:bg-card-dark rounded-xl border-2 border-brutal-black dark:border-white shadow-brutal dark:shadow-brutal-dark animate-pop">
            {QUICK_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                className="w-8 h-8 flex items-center justify-center text-lg hover:scale-125 active:scale-95 rounded-lg hover:bg-amber-100 dark:hover:bg-zinc-700 transition-transform"
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
