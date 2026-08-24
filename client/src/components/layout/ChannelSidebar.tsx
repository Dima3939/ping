import React from 'react';
import { useChatStore } from '../../store/useChatStore';
import { Hash, Lock, Plus, Users, X } from 'lucide-react';

export const ChannelSidebar: React.FC = () => {
  const {
    workspaces,
    activeWorkspaceId,
    activeChannelId,
    setActiveChannel,
    setCreateChannelModalOpen,
    users,
    currentUser,
    startDirectMessage,
    setMobileSidebarOpen,
  } = useChatStore();

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];
  const directMessageUsers = users.filter((u) => u.id !== currentUser.id);

  return (
    <aside className="w-64 h-full bg-[#FAF8F0] dark:bg-[#18181D] border-r-3 border-brutal-black dark:border-zinc-700 flex flex-col justify-between shrink-0 select-none overflow-hidden">
      {/* Workspace Header */}
      <div className="p-3 border-b-3 border-brutal-black dark:border-zinc-700 flex items-center justify-between bg-white dark:bg-card-dark">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl">{currentWorkspace.icon}</span>
          <span className="font-heading font-extrabold text-sm uppercase tracking-wide text-brutal-black dark:text-white truncate">
            {currentWorkspace.name}
          </span>
        </div>

        {/* Mobile Close Drawer Button */}
        <button
          className="md:hidden p-1.5 rounded-lg border-2 border-brutal-black bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-rose-500 hover:border-rose-500"
          onClick={() => setMobileSidebarOpen(false)}
          title="Close Menu"
        >
          <X size={15} />
        </button>
      </div>

      {/* Channels & DMs Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-5">
        {/* CHANNELS SECTION */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Channels ({currentWorkspace.channels.length})
            </span>
            <button
              className="p-1 rounded-md text-zinc-600 dark:text-zinc-300 hover:text-brutal-coral hover:bg-amber-100 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-brutal-black"
              title="Create Channel"
              onClick={() => setCreateChannelModalOpen(true)}
            >
              <Plus size={15} />
            </button>
          </div>

          <div className="flex flex-col gap-0.5">
            {currentWorkspace.channels.map((channel) => {
              const isActive = channel.id === activeChannelId;
              return (
                <button
                  key={channel.id}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wide transition-all ${
                    isActive
                      ? 'bg-amber-100 dark:bg-amber-950/70 text-brutal-black dark:text-white border-2 border-brutal-black dark:border-amber-400 shadow-brutal-sm translate-x-0.5'
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                  onClick={() => {
                    setActiveChannel(channel.id);
                    setMobileSidebarOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2 truncate">
                    {channel.type === 'private' ? (
                      <Lock size={13} className="text-zinc-400" />
                    ) : (
                      <Hash size={14} className={isActive ? 'text-brutal-coral' : 'text-zinc-400'} />
                    )}
                    <span className="truncate">{channel.name}</span>
                  </div>

                  {channel.unreadCount && channel.unreadCount > 0 ? (
                    <span className="px-1.5 py-0.2 rounded-full bg-brutal-coral text-white border border-brutal-black text-[10px] font-mono font-bold shadow-[1px_1px_0px_#121212]">
                      {channel.unreadCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* DIRECT MESSAGES SECTION */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Users size={12} /> Direct Messages
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {directMessageUsers.map((user) => {
              const dmId = `dm_${user.id}`;
              const isDmActive = activeChannelId === dmId;
              return (
                <button
                  key={user.id}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-all ${
                    isDmActive
                      ? 'bg-amber-100 dark:bg-amber-950/70 text-brutal-black dark:text-white border-2 border-brutal-black dark:border-amber-400 shadow-brutal-sm translate-x-0.5 font-bold'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-200'
                  }`}
                  onClick={() => {
                    startDirectMessage(user.id);
                    setMobileSidebarOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2 truncate">
                    {/* User avatar & status dot */}
                    <div className="relative shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-5 h-5 rounded-md border border-brutal-black object-cover"
                      />
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white dark:border-zinc-900 ${
                          user.status === 'online'
                            ? 'bg-brutal-mint'
                            : user.status === 'away'
                            ? 'bg-brutal-yellow'
                            : 'bg-zinc-400'
                        }`}
                      />
                    </div>
                    <span className="font-sans text-xs font-semibold truncate">{user.name}</span>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-400">
                    {user.status === 'online' ? '🟢' : '⚪'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current User Bottom Bar */}
      <div className="p-3 bg-white dark:bg-card-dark border-t-3 border-brutal-black dark:border-zinc-700 flex items-center justify-between">
        <div
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 min-w-0"
          onClick={() => useChatStore.getState().setSelectedUserProfile(currentUser)}
        >
          <div className="relative shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-xl border-2 border-brutal-black dark:border-white shadow-brutal-sm object-cover"
            />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-brutal-mint border border-white" />
          </div>

          <div className="flex flex-col truncate">
            <span className="font-heading font-extrabold text-xs uppercase text-brutal-black dark:text-white truncate">
              {currentUser.name}
            </span>
            <span className="text-[11px] font-sans text-zinc-500 dark:text-zinc-400 truncate">
              {currentUser.statusText}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
