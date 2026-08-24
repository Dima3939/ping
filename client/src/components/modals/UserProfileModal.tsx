import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { BrutalModal } from '../ui/BrutalModal';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalInput } from '../ui/BrutalInput';
import { BrutalBadge } from '../ui/BrutalBadge';
import { Mail, Clock, MessageSquare, Phone, Camera, Upload, Edit3, Check, User as UserIcon, Sparkles } from 'lucide-react';
import { UserStatus } from '../../types';

const AVATAR_PRESETS = [
  { id: '1', name: 'Dmitry (Classic)', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  { id: '2', name: 'Alex', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: '3', name: 'Donald', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
  { id: '4', name: 'Ben', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80' },
  { id: '5', name: 'Sarah', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
  { id: '6', name: 'Maya', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' },
];

export const UserProfileModal: React.FC = () => {
  const {
    selectedUserProfile,
    setSelectedUserProfile,
    currentUser,
    updateCurrentUser,
    setUserStatus,
    startCall,
    startDirectMessage,
  } = useChatStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [statusText, setStatusText] = useState('');
  const [avatar, setAvatar] = useState('');
  const [status, setStatus] = useState<UserStatus>('online');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync form with currentUser whenever modal opens or currentUser updates
  useEffect(() => {
    if (selectedUserProfile?.id === currentUser.id) {
      setName(currentUser.name);
      setUsername(currentUser.username);
      setRole(currentUser.role || 'Full-Stack Engineer');
      setStatusText(currentUser.statusText || '');
      setAvatar(currentUser.avatar);
      setStatus(currentUser.status);
      setIsEditing(false);
      setSavedSuccess(false);
    }
  }, [selectedUserProfile, currentUser]);

  if (!selectedUserProfile) return null;

  const isCurrentUser = selectedUserProfile.id === currentUser.id;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert uploaded image to Base64 Data URL
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      if (base64Url) {
        setAvatar(base64Url);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name: name.trim() || currentUser.name,
      username: username.trim() || currentUser.username,
      role: role.trim() || currentUser.role,
      statusText: statusText.trim(),
      avatar: avatar || currentUser.avatar,
      status,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setIsEditing(false);
      setSavedSuccess(false);
    }, 600);
  };

  return (
    <BrutalModal
      isOpen={!!selectedUserProfile}
      onClose={() => setSelectedUserProfile(null)}
      title={isCurrentUser ? (isEditing ? 'Edit Your Profile' : 'Your Profile & Status') : 'Teammate Profile'}
      maxWidth="md"
    >
      {isCurrentUser && isEditing ? (
        /* EDIT PROFILE MODE */
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
          {/* Avatar Upload & Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-heading font-bold uppercase text-zinc-500">
              Profile Photo / Avatar
            </label>

            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <img
                  src={avatar}
                  alt={name}
                  className="w-16 h-16 rounded-2xl border-3 border-brutal-black object-cover shadow-brutal-sm group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity text-white">
                  <Camera size={20} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <BrutalButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="gap-1.5 text-xs py-1"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={13} /> Upload from Device
                </BrutalButton>
                <span className="text-[11px] text-zinc-500 font-sans">
                  Supports JPG, PNG, GIF, WebP
                </span>
              </div>
            </div>

            {/* Quick Avatar Presets */}
            <div className="mt-2 flex flex-col gap-1.5">
              <span className="text-[11px] font-heading font-semibold text-zinc-400 uppercase">
                Or Choose Preset Avatar:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {AVATAR_PRESETS.map((preset) => (
                  <img
                    key={preset.id}
                    src={preset.url}
                    alt={preset.name}
                    title={preset.name}
                    className={`w-10 h-10 rounded-xl border-2 cursor-pointer object-cover transition-all shrink-0 ${
                      avatar === preset.url
                        ? 'border-brutal-coral scale-110 shadow-brutal-sm'
                        : 'border-zinc-300 dark:border-zinc-700 hover:scale-105'
                    }`}
                    onClick={() => setAvatar(preset.url)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Full Name & Username */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BrutalInput
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dmitry"
              icon={<UserIcon size={15} />}
            />
            <BrutalInput
              label="Username (@handle)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. dmitry"
            />
          </div>

          {/* Role & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BrutalInput
              label="Role / Title"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Lead Full-Stack Engineer"
            />
            <BrutalInput
              label="Custom Status Message"
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
              placeholder="e.g. ⚡ Shipping Ping v1.0"
            />
          </div>

          {/* Presence Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-heading font-bold uppercase text-zinc-500">
              Presence Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['online', 'away', 'offline'] as UserStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl border-2 font-heading text-xs font-bold uppercase transition-all ${
                    status === st
                      ? 'bg-amber-100 dark:bg-amber-950 border-brutal-black dark:border-amber-400 text-brutal-black dark:text-white shadow-brutal-sm scale-105'
                      : 'border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:border-brutal-black'
                  }`}
                  onClick={() => setStatus(st)}
                >
                  {st === 'online' ? '🟢 Online' : st === 'away' ? '🟡 Away' : '⚪ Offline'}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-zinc-200 dark:border-zinc-700">
            <BrutalButton
              type="button"
              variant="ghost"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </BrutalButton>
            <BrutalButton type="submit" variant="primary" className="gap-1.5">
              {savedSuccess ? <Check size={16} /> : <Sparkles size={16} />}
              <span>{savedSuccess ? 'Saved!' : 'Save Changes'}</span>
            </BrutalButton>
          </div>
        </form>
      ) : (
        /* VIEW PROFILE MODE */
        <div className="flex flex-col gap-4">
          {/* Header Avatar & Info */}
          <div className="flex items-center justify-between">
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

            {/* If Current User: Edit Button */}
            {isCurrentUser && (
              <BrutalButton
                variant="secondary"
                size="sm"
                className="gap-1.5"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 size={14} /> Edit Profile
              </BrutalButton>
            )}
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

          {/* Current User Quick Presence Switcher in View Mode */}
          {isCurrentUser && (
            <div className="flex flex-col gap-2 pt-2 border-t-2 border-zinc-200 dark:border-zinc-700">
              <label className="text-xs font-heading font-bold uppercase text-zinc-500">
                Quick Presence Switcher
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
                    onClick={() => setUserStatus(st)}
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
      )}
    </BrutalModal>
  );
};
