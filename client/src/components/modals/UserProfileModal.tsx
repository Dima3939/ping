import React, { useState } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { BrutalModal } from '../ui/BrutalModal';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalBadge } from '../ui/BrutalBadge';
import { Mail, Clock, MessageSquare, Phone, Check } from 'lucide-react';
import { UserStatus } from '../../types';

export const UserProfileModal: React.FC = () => {
  const {
    selectedUserProfile,
    setSelectedUserProfile,
    currentUser,
    setUserStatus,
    startCall,
    startDirectMessage,
  } = useChatStore();
  const [customStatus, setCustomStatus] = useState(currentUser.statusText || '');

  if (!selectedUserProfile) return null;

  const isCurrentUser = selectedUserProfile.id === currentUser.id;

  const handleStatusChange = (status: UserStatus) => {
    setUserStatus(status, customStatus);
  };

  return (
    <BrutalModal
      isOpen={!!selectedUserProfile}
      onClose={() => setSelectedUserProfile(null)}
      title={isCurrentUser ? 'Your Profile & Status' : 'Teammate Profile'}
      maxWidth="sm"
    >
      <div className="flex flex-col gap-4">
        {/* Header Avatar & Info */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={selectedUserProfile.avatar}
              alt={selectedUserProfile.name}
              className="w-16 h-16 rounded-2xl border-3 border-brutal-black dark:border-white shadow-brutal object-cover"
            />
            <span
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900 ${
                selectedUserProfile.status === 'online'
                  ? 'bg-brutal-mint'
                  : selectedUserProfile.status === 'away'
                  ? 'bg-brutal-yellow'
                  : 'bg-zinc-400'
              }`}
            />
          </div>

          <div className="flex flex-col">
            <h4 className="font-heading font-extrabold text-base uppercase text-brutal-black dark:text-white">
              {selectedUserProfile.name}
            </h4>
            <span className="text-xs font-mono text-zinc-500">@{selectedUserProfile.username}</span>
            <div className="mt-1">
              <BrutalBadge
                variant="gray"
                className="text-[10px]"
                style={{
                  borderColor: selectedUserProfile.roleColor,
                  color: selectedUserProfile.roleColor,
                }}
              >
                {selectedUserProfile.role}
              </BrutalBadge>
            </div>
          </div>
        </div>

        {/* Status Bubble */}
        <div className="p-3 bg-surface-secondary dark:bg-zinc-800/60 rounded-xl border-2 border-brutal-black/30 dark:border-zinc-600 flex flex-col gap-1">
          <span className="text-[10px] font-heading font-bold uppercase text-zinc-400">Current Status</span>
          <span className="text-xs font-semibold text-brutal-black dark:text-zinc-200">
            {selectedUserProfile.statusText || 'Available for collaboration 🚀'}
          </span>
        </div>

        {/* Metadata items */}
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
            <Mail size={14} className="text-brutal-coral shrink-0" />
            <span className="font-mono">{selectedUserProfile.email}</span>
          </div>
          {selectedUserProfile.localTime && (
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
              <Clock size={14} className="text-brutal-mint shrink-0" />
              <span>Local Time: {selectedUserProfile.localTime}</span>
            </div>
          )}
        </div>

        {/* Current User: Status Switcher */}
        {isCurrentUser && (
          <div className="flex flex-col gap-2 pt-2 border-t-2 border-zinc-200 dark:border-zinc-700">
            <label className="text-xs font-heading font-bold uppercase text-zinc-500">
              Set Your Presence
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['online', 'away', 'offline'] as UserStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`px-2 py-1.5 rounded-lg border-2 font-heading text-xs font-bold uppercase transition-all ${
                    currentUser.status === st
                      ? 'bg-amber-100 dark:bg-amber-950/60 border-brutal-black dark:border-amber-400 shadow-brutal-sm'
                      : 'border-zinc-300 dark:border-zinc-700 text-zinc-500'
                  }`}
                  onClick={() => handleStatusChange(st)}
                >
                  {st === 'online' ? '🟢 Online' : st === 'away' ? '🟡 Away' : '⚪ Offline'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Teammate: Call & Message buttons */}
        {!isCurrentUser && (
          <div className="grid grid-cols-2 gap-3 mt-2">
            <BrutalButton
              variant="secondary"
              size="sm"
              className="gap-1.5"
              onClick={() => startCall(selectedUserProfile)}
            >
              <Phone size={14} /> Call
            </BrutalButton>
            <BrutalButton
              variant="primary"
              size="sm"
              className="gap-1.5"
              onClick={() => startDirectMessage(selectedUserProfile.id)}
            >
              <MessageSquare size={14} /> Message
            </BrutalButton>
          </div>
        )}
      </div>
    </BrutalModal>
  );
};
