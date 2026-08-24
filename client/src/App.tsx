import React, { useEffect } from 'react';
import { useChatStore } from './store/useChatStore';
import { WorkspaceSidebar } from './components/layout/WorkspaceSidebar';
import { ChannelSidebar } from './components/layout/ChannelSidebar';
import { ChatHeader } from './components/layout/ChatHeader';
import { ThreadDrawer } from './components/layout/ThreadDrawer';
import { MessageList } from './components/chat/MessageList';
import { MessageInput } from './components/chat/MessageInput';
import { TypingIndicator } from './components/chat/TypingIndicator';
import { SearchModal } from './components/modals/SearchModal';
import { CreateChannelModal } from './components/modals/CreateChannelModal';
import { CreateWorkspaceModal } from './components/modals/CreateWorkspaceModal';
import { UserProfileModal } from './components/modals/UserProfileModal';
import { ActiveCallModal } from './components/modals/ActiveCallModal';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export const App: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    workspaces,
    activeWorkspaceId,
    activeChannelId,
    messages,
    typingUsers,
    isMobileSidebarOpen,
    setMobileSidebarOpen,
    setSearchModalOpen,
    closeThread,
  } = useChatStore();

  // Bind global keyboard shortcuts (Cmd+K, Escape, Cmd+Shift+L)
  useKeyboardShortcuts({
    onSearch: () => setSearchModalOpen(true),
    onEscape: () => {
      closeThread();
      setMobileSidebarOpen(false);
    },
    onToggleTheme: toggleDarkMode,
  });

  // Sync dark class on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];
  const activeChannel = currentWorkspace.channels.find((c) => c.id === activeChannelId) || currentWorkspace.channels[0];
  const channelMessages = messages[activeChannelId] || [];
  const currentTyping = typingUsers[activeChannelId] || [];

  return (
    <div className="flex h-screen w-screen bg-canvas-light dark:bg-canvas-dark text-brutal-black dark:text-white font-sans overflow-hidden select-none">
      {/* 1. Desktop Workspace Switcher (Hidden on mobile) */}
      <div className="hidden md:flex shrink-0 h-full">
        <WorkspaceSidebar />
      </div>

      {/* 2. Desktop Channel Sidebar (Hidden on mobile) */}
      <div className="hidden md:flex shrink-0 h-full">
        <ChannelSidebar />
      </div>

      {/* 3. Unified Mobile Slide-over Drawer (< md screens) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex h-full transform transition-transform duration-300 ease-in-out md:hidden bg-[#F5F2E8] dark:bg-[#151518] shadow-2xl border-r-3 border-brutal-black dark:border-zinc-700 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <WorkspaceSidebar />
        <ChannelSidebar />
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* 4. Main Chat Area (100% full screen width on mobile!) */}
      <main className="flex-1 flex flex-col min-w-0 w-full bg-[#FFFDF5] dark:bg-[#121214] overflow-hidden relative">
        {/* Top Header */}
        <ChatHeader />

        {/* Message Feed */}
        <div className="flex-1 flex flex-col min-h-0 bg-dots">
          <MessageList
            messages={channelMessages}
            channelName={activeChannel.name}
            channelTopic={activeChannel.topic}
          />
        </div>

        {/* Live Typing Whisper Indicator */}
        <TypingIndicator users={currentTyping} />

        {/* Bottom Rich Message Input */}
        <MessageInput channelId={activeChannelId} />
      </main>

      {/* 5. Right Thread Drawer (Slide-out panel) */}
      <ThreadDrawer />

      {/* Modals */}
      <SearchModal />
      <CreateChannelModal />
      <CreateWorkspaceModal />
      <UserProfileModal />
      <ActiveCallModal />
    </div>
  );
};

export default App;
