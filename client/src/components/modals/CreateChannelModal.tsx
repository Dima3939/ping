import React, { useState } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { BrutalModal } from '../ui/BrutalModal';
import { BrutalInput } from '../ui/BrutalInput';
import { BrutalButton } from '../ui/BrutalButton';
import { Hash, Lock, Globe } from 'lucide-react';

export const CreateChannelModal: React.FC = () => {
  const { isCreateChannelModalOpen, setCreateChannelModalOpen, createChannel } = useChatStore();

  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Channel name is required');
      return;
    }

    createChannel({
      name: name.trim(),
      topic: topic.trim() || 'General discussion',
      type: isPrivate ? 'private' : 'public',
    });

    setName('');
    setTopic('');
    setIsPrivate(false);
    setError('');
  };

  return (
    <BrutalModal
      isOpen={isCreateChannelModalOpen}
      onClose={() => setCreateChannelModalOpen(false)}
      title="Create New Channel"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <BrutalInput
          label="Channel Name"
          placeholder="e.g. mobile-release-v2"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          error={error}
          icon={<Hash size={16} />}
        />

        <BrutalInput
          label="Channel Topic / Description"
          placeholder="e.g. Real-time sync discussion for mobile client"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        {/* Privacy Selector Toggle */}
        <div className="flex flex-col gap-1.5">
          <label className="font-heading text-xs uppercase font-bold text-brutal-black dark:text-zinc-300">
            Channel Privacy
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className={`p-3 rounded-xl border-2 text-left flex flex-col gap-1 transition-all ${
                !isPrivate
                  ? 'bg-amber-100 dark:bg-amber-950/60 border-brutal-black dark:border-amber-400 shadow-brutal-sm'
                  : 'border-zinc-300 dark:border-zinc-700'
              }`}
              onClick={() => setIsPrivate(false)}
            >
              <div className="flex items-center gap-1.5 font-heading font-bold text-xs uppercase">
                <Globe size={14} className="text-brutal-mint" /> Public
              </div>
              <span className="text-[11px] text-zinc-500">Anyone in workspace can join</span>
            </button>

            <button
              type="button"
              className={`p-3 rounded-xl border-2 text-left flex flex-col gap-1 transition-all ${
                isPrivate
                  ? 'bg-amber-100 dark:bg-amber-950/60 border-brutal-black dark:border-amber-400 shadow-brutal-sm'
                  : 'border-zinc-300 dark:border-zinc-700'
              }`}
              onClick={() => setIsPrivate(true)}
            >
              <div className="flex items-center gap-1.5 font-heading font-bold text-xs uppercase">
                <Lock size={14} className="text-brutal-coral" /> Private
              </div>
              <span className="text-[11px] text-zinc-500">Invite-only channel</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t-2 border-zinc-100 dark:border-zinc-800">
          <BrutalButton
            type="button"
            variant="ghost"
            onClick={() => setCreateChannelModalOpen(false)}
          >
            Cancel
          </BrutalButton>
          <BrutalButton type="submit" variant="primary">
            Create Channel ⚡
          </BrutalButton>
        </div>
      </form>
    </BrutalModal>
  );
};
