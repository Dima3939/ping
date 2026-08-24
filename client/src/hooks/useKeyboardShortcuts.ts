import { useEffect } from 'react';

interface ShortcutOptions {
  onSearch?: () => void;
  onEscape?: () => void;
  onToggleTheme?: () => void;
}

export function useKeyboardShortcuts({ onSearch, onEscape, onToggleTheme }: ShortcutOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K => Search Modal
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onSearch?.();
      }

      // Escape => Close modal / Drawer
      if (e.key === 'Escape') {
        onEscape?.();
      }

      // Cmd/Ctrl + Shift + L => Toggle Theme
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        onToggleTheme?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearch, onEscape, onToggleTheme]);
}
