import React, { useState, useMemo } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { BrutalModal } from '../ui/BrutalModal';
import { Search, Hash, MessageSquare, User as UserIcon, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setSearchModalOpen,
    workspaces,
    activeWorkspaceId,
    messages,
    users,
    setActiveChannel,
    setSelectedUserProfile,
  } = useChatStore();

  const [query, setQuery] = useState('');

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  // Search Results
  const results = useMemo(() => {
    if (!query.trim()) return { channels: [], messages: [], users: [] };
    const q = query.toLowerCase();

    const matchedChannels = currentWorkspace.channels.filter((c) =>
      c.name.toLowerCase().includes(q) || (c.topic && c.topic.toLowerCase().includes(q))
    );

    const matchedUsers = users.filter((u) =>
      u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)
    );

    const matchedMessages: { channelId: string; content: string; authorName: string }[] = [];
    Object.entries(messages).forEach(([channelId, msgs]) => {
      msgs.forEach((m) => {
        if (m.content.toLowerCase().includes(q)) {
          const author = users.find((u) => u.id === m.userId);
          matchedMessages.push({
            channelId,
            content: m.content,
            authorName: author?.name || 'User',
          });
        }
      });
    });

    return {
      channels: matchedChannels.slice(0, 4),
      messages: matchedMessages.slice(0, 6),
      users: matchedUsers.slice(0, 4),
    };
  }, [query, currentWorkspace, messages, users]);

  const handleSelectChannel = (channelId: string) => {
    setActiveChannel(channelId);
    setSearchModalOpen(false);
    setQuery('');
  };

  const handleSelectUser = (user: any) => {
    setSelectedUserProfile(user);
    setSearchModalOpen(false);
    setQuery('');
  };

  return (
    <BrutalModal
      isOpen={isSearchModalOpen}
      onClose={() => setSearchModalOpen(false)}
      title="Spotlight Search"
      maxWidth="lg"
    >
      <div className="flex flex-col gap-4">
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search size={18} className="absolute left-3.5 text-zinc-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search channels, messages, or teammates..."
            className="w-full pl-11 pr-4 py-3 bg-zinc-100 dark:bg-surface-dark text-brutal-black dark:text-white rounded-xl border-2 border-brutal-black dark:border-zinc-500 font-sans text-sm focus:outline-none focus:border-brutal-coral shadow-brutal-sm"
          />
        </div>

        {/* Results Body */}
        <div className="max-h-80 overflow-y-auto flex flex-col gap-4 pr-1">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-zinc-400 font-heading text-xs uppercase font-bold tracking-wider">
              Type keywords or channel names to search...
            </div>
          ) : (
            <>
              {/* CHANNELS MATCHED */}
              {results.channels.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-heading font-extrabold uppercase text-zinc-400 tracking-wider">
                    Channels
                  </span>
                  {results.channels.map((ch) => (
                    <button
                      key={ch.id}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-100 dark:hover:bg-zinc-800 text-left border border-transparent hover:border-brutal-black transition-all group"
                      onClick={() => handleSelectChannel(ch.id)}
                    >
                      <div className="flex items-center gap-2">
                        <Hash size={16} className="text-brutal-coral" />
                        <span className="font-heading font-bold text-xs uppercase">{ch.name}</span>
                        {ch.topic && (
                          <span className="text-xs text-zinc-400 truncate max-w-xs">{ch.topic}</span>
                        )}
                      </div>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}

              {/* MESSAGES MATCHED */}
              {results.messages.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-heading font-extrabold uppercase text-zinc-400 tracking-wider">
                    Messages ({results.messages.length})
                  </span>
                  {results.messages.map((m, idx) => (
                    <button
                      key={idx}
                      className="flex items-start justify-between p-2.5 rounded-xl hover:bg-amber-100 dark:hover:bg-zinc-800 text-left border border-transparent hover:border-brutal-black transition-all group gap-2"
                      onClick={() => handleSelectChannel(m.channelId)}
                    >
                      <div className="flex items-start gap-2 min-w-0">
                        <MessageSquare size={15} className="text-brutal-mint mt-0.5 shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-heading font-bold text-xs">{m.authorName}</span>
                          <span className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-1 break-words">
                            {m.content}
                          </span>
                        </div>
                      </div>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 shrink-0 self-center" />
                    </button>
                  ))}
                </div>
              )}

              {/* TEAMMATES MATCHED */}
              {results.users.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-heading font-extrabold uppercase text-zinc-400 tracking-wider">
                    Teammates
                  </span>
                  {results.users.map((u) => (
                    <button
                      key={u.id}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-100 dark:hover:bg-zinc-800 text-left border border-transparent hover:border-brutal-black transition-all"
                      onClick={() => handleSelectUser(u)}
                    >
                      <div className="flex items-center gap-2">
                        <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-md object-cover" />
                        <span className="font-heading font-bold text-xs">{u.name}</span>
                        <span className="text-[11px] text-zinc-400">({u.role})</span>
                      </div>
                      <span className="text-xs">{u.status === 'online' ? '🟢' : '⚪'}</span>
                    </button>
                  ))}
                </div>
              )}

              {results.channels.length === 0 &&
                results.messages.length === 0 &&
                results.users.length === 0 && (
                  <div className="py-6 text-center text-zinc-400 font-sans text-sm">
                    No results found for "{query}".
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </BrutalModal>
  );
};
