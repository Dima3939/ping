import React from 'react';
import { useChatStore } from '../../store/useChatStore';
import { BrutalTooltip } from '../ui/BrutalTooltip';
import { Plus, Volume2, VolumeX, MessageSquareCode } from 'lucide-react';

export const WorkspaceSidebar: React.FC = () => {
  const {
    workspaces,
    activeWorkspaceId,
    setActiveWorkspace,
    isMuted,
    toggleMute,
    setCreateWorkspaceModalOpen,
  } = useChatStore();

  return (
    <aside className="w-16 h-full bg-[#F5F2E8] dark:bg-[#151518] border-r-3 border-brutal-black dark:border-zinc-700 flex flex-col items-center py-3 justify-between shrink-0 select-none">
      {/* Top Workspaces */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* App Logo */}
        <BrutalTooltip content="Ping Real-Time Messenger" position="right">
          <div className="w-11 h-11 rounded-2xl bg-brutal-coral text-white border-2.5 border-brutal-black dark:border-white shadow-brutal-sm flex items-center justify-center font-heading font-extrabold text-xl cursor-pointer hover:scale-105 transition-transform mb-2">
            <MessageSquareCode size={22} />
          </div>
        </BrutalTooltip>

        <div className="w-8 border-t-2 border-brutal-black/20 dark:border-zinc-700 mb-1" />

        {/* Workspace List */}
        {workspaces.map((ws) => {
          const isActive = ws.id === activeWorkspaceId;
          return (
            <BrutalTooltip key={ws.id} content={ws.name} position="right">
              <div className="relative">
                {/* Active side indicator */}
                {isActive && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-brutal-black dark:bg-white rounded-r-full" />
                )}
                <button
                  className={`w-11 h-11 rounded-2xl border-2.5 flex items-center justify-center text-lg font-heading font-bold transition-all ${
                    isActive
                      ? 'bg-brutal-yellow text-brutal-black border-brutal-black dark:border-white shadow-brutal-sm scale-105'
                      : 'bg-white dark:bg-card-dark text-zinc-700 dark:text-zinc-300 border-brutal-black/40 dark:border-zinc-600 hover:border-brutal-black hover:scale-105'
                  }`}
                  onClick={() => setActiveWorkspace(ws.id)}
                >
                  {ws.icon}
                </button>

                {/* Badge count */}
                {ws.badgeCount && ws.badgeCount > 0 ? (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brutal-coral text-white border border-brutal-black text-[10px] font-mono font-bold flex items-center justify-center shadow-[1px_1px_0px_#121212]">
                    {ws.badgeCount}
                  </span>
                ) : null}
              </div>
            </BrutalTooltip>
          );
        })}

        {/* Add Workspace Button */}
        <BrutalTooltip content="Add Workspace" position="right">
          <button
            className="w-11 h-11 rounded-2xl border-2 border-dashed border-brutal-black/50 dark:border-zinc-500 text-zinc-600 dark:text-zinc-300 hover:text-brutal-coral hover:border-brutal-coral flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-brutal-sm"
            onClick={() => setCreateWorkspaceModalOpen(true)}
            title="Create Workspace"
          >
            <Plus size={20} />
          </button>
        </BrutalTooltip>
      </div>

      {/* Bottom Mute Audio Settings */}
      <div className="flex flex-col items-center gap-2">
        <BrutalTooltip content={isMuted ? 'Unmute Audio Feedback' : 'Mute Audio Feedback'} position="right">
          <button
            className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center text-xs transition-colors ${
              isMuted
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 border-zinc-400'
                : 'bg-amber-100 dark:bg-amber-950/60 text-brutal-coral border-brutal-black shadow-[1px_1px_0px_#121212]'
            }`}
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </BrutalTooltip>
      </div>
    </aside>
  );
};
