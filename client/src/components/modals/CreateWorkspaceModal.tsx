import React, { useState } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { BrutalModal } from '../ui/BrutalModal';
import { BrutalInput } from '../ui/BrutalInput';
import { BrutalButton } from '../ui/BrutalButton';
import { Briefcase } from 'lucide-react';

const WORKSPACE_ICONS = ['⚡', '🚀', '💎', '🟣', '🔥', '🎯', '🛠️', '☕', '🌐', '👾', '🌈', '💡'];

export const CreateWorkspaceModal: React.FC = () => {
  const { isCreateWorkspaceModalOpen, setCreateWorkspaceModalOpen, createWorkspace } = useChatStore();

  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('⚡');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Workspace name is required');
      return;
    }

    createWorkspace(name.trim(), selectedIcon);
    setName('');
    setSelectedIcon('⚡');
    setError('');
  };

  return (
    <BrutalModal
      isOpen={isCreateWorkspaceModalOpen}
      onClose={() => setCreateWorkspaceModalOpen(false)}
      title="Create New Workspace"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <BrutalInput
          label="Workspace Name"
          placeholder="e.g. Acme Innovations, Superteam HQ"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          error={error}
          icon={<Briefcase size={16} />}
        />

        {/* Emoji Icon Selector */}
        <div className="flex flex-col gap-2">
          <label className="font-heading text-xs uppercase font-bold text-brutal-black dark:text-zinc-300">
            Choose Workspace Icon
          </label>
          <div className="grid grid-cols-6 gap-2">
            {WORKSPACE_ICONS.map((icon) => (
              <button
                key={icon}
                type="button"
                className={`w-11 h-11 rounded-xl border-2 text-xl flex items-center justify-center transition-all ${
                  selectedIcon === icon
                    ? 'bg-brutal-yellow border-brutal-black dark:border-white shadow-brutal-sm scale-110'
                    : 'bg-white dark:bg-card-dark border-zinc-300 dark:border-zinc-700 hover:border-brutal-black'
                }`}
                onClick={() => setSelectedIcon(icon)}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-zinc-100 dark:border-zinc-800">
          <BrutalButton
            type="button"
            variant="ghost"
            onClick={() => setCreateWorkspaceModalOpen(false)}
          >
            Cancel
          </BrutalButton>
          <BrutalButton type="submit" variant="primary">
            Create Workspace ⚡
          </BrutalButton>
        </div>
      </form>
    </BrutalModal>
  );
};
