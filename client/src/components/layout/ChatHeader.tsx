import React from 'react';
import { useChatStore } from '../../store/useChatStore';
import { Hash, Lock, Search, Sun, Moon, Phone, Menu, Sparkles, Info } from 'lucide-react';
import { BrutalButton } from '../ui/BrutalButton';

export const ChatHeader: React.FC = () => {
  const {
    workspaces,
    activeWorkspaceId,
    activeChannelId,
    isDarkMode,
    toggleDarkMode,
    setSearchModalOpen,
    setMobileSidebarOpen,
    setAboutModalOpen,
    triggerSimulatedIncomingMessage,
  } = useChatStore();

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];
  const activeChannel = currentWorkspace.channels.find((c) => c.id === activeChannelId) || currentWorkspace.channels[0];

  return (
    <header className="h-14 px-3 sm:px-4 bg-surface-light dark:bg-card-dark border-b-3 border-brutal-black dark:border-zinc-700 flex items-center justify-between shrink-0 select-none">
      {/* Left: Hamburger (mobile) + Channel Name & Topic */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-xl border-2 border-brutal-black bg-white dark:bg-zinc-800 text-brutal-black dark:text-white shadow-brutal-sm hover:scale-105 active:scale-95 transition-transform"
          onClick={() => setMobileSidebarOpen(true)}
          title="Open Channels Menu"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          {activeChannel.type === 'private' ? (
            <Lock size={16} className="text-zinc-500" />
          ) : (
            <Hash size={18} className="text-brutal-coral" />
          )}
          <h1 className="font-heading font-extrabold text-sm sm:text-base uppercase tracking-wide text-brutal-black dark:text-white truncate max-w-[140px] sm:max-w-xs">
            {activeChannel.name}
          </h1>
        </div>

        {/* Channel Topic */}
        {activeChannel.topic && (
          <div className="hidden lg:flex items-center pl-3 border-l-2 border-zinc-300 dark:border-zinc-700 max-w-md truncate">
            <span className="text-xs font-sans text-zinc-500 dark:text-zinc-400 truncate">
              {activeChannel.topic}
            </span>
          </div>
        )}
      </div>

      {/* Right: Actions & Tools */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Live Presence Badge */}
        <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 rounded-full border-2 border-brutal-black dark:border-emerald-400 text-xs font-heading font-bold text-emerald-900 dark:text-emerald-300 shadow-brutal-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{activeChannel.membersCount} ONLINE</span>
        </div>

        {/* Quick Incoming Simulator */}
        <BrutalButton
          variant="secondary"
          size="sm"
          className="hidden xl:inline-flex gap-1.5 py-1 text-xs"
          onClick={triggerSimulatedIncomingMessage}
        >
          <Sparkles size={13} className="text-brutal-coral" /> Simulate Ping
        </BrutalButton>

        {/* Spotlight Search Trigger */}
        <button
          className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-xl border-2 border-brutal-black dark:border-zinc-500 text-xs font-heading font-bold transition-all shadow-brutal-sm"
          onClick={() => setSearchModalOpen(true)}
          title="Search (Cmd+K)"
        >
          <Search size={15} />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 bg-white dark:bg-zinc-900 rounded border border-zinc-400 text-[10px] font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Audio/Video Call Button */}
        <BrutalButton
          variant="ghost"
          size="icon"
          className="w-9 h-9 rounded-xl border-2 border-transparent hover:border-brutal-black text-zinc-700 dark:text-zinc-300 hover:text-brutal-coral p-0"
          title="Start Huddle Call"
          onClick={() => useChatStore.getState().startCall()}
        >
          <Phone size={16} />
        </BrutalButton>

        {/* About App Info */}
        <BrutalButton
          variant="ghost"
          size="icon"
          className="w-9 h-9 rounded-xl border-2 border-transparent hover:border-brutal-black text-zinc-700 dark:text-zinc-300 hover:text-brutal-coral p-0"
          title="About Ping Messenger"
          onClick={() => setAboutModalOpen(true)}
        >
          <Info size={17} />
        </BrutalButton>

        {/* Dark / Light Mode Toggle */}
        <BrutalButton
          variant="ghost"
          size="icon"
          className="w-9 h-9 rounded-xl border-2 border-transparent hover:border-brutal-black text-zinc-700 dark:text-zinc-300 hover:text-brutal-coral p-0"
          title={isDarkMode ? 'Switch to Light Paper' : 'Switch to Dark Cyberpunk'}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
        </BrutalButton>
      </div>
    </header>
  );
};
