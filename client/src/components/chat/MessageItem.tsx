import React from 'react';
import { Message } from '../../types';
import { useChatStore } from '../../store/useChatStore';
import { formatTimestamp } from '../../lib/utils';
import { BrutalButton } from '../ui/BrutalButton';
import { EmojiReactionPicker } from './EmojiReactionPicker';
import { VoiceNotePlayer } from './VoiceNotePlayer';
import { CodeSnippetBlock } from './CodeSnippetBlock';
import { MessageSquare, CheckCheck, Clock } from 'lucide-react';

export interface MessageItemProps {
  message: Message;
  isThreadReply?: boolean;
  parentId?: string;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isThreadReply = false,
  parentId,
}) => {
  const { users, currentUser, openThread, toggleReaction, setSelectedUserProfile } = useChatStore();

  const author = users.find((u) => u.id === message.userId) || {
    id: message.userId,
    name: 'Teammate',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    role: 'Developer',
    roleColor: '#FFD13B',
  };

  const isCurrentUser = message.userId === currentUser.id;

  // Distinct badge colors per author for Neobrutalist character
  const getBadgeStyle = (userId: string) => {
    switch (userId) {
      case 'usr_donald':
        return 'bg-[#00D2B4] text-black border-brutal-black';
      case 'usr_sarah':
        return 'bg-[#FF5A36] text-white border-brutal-black';
      case 'usr_ben':
        return 'bg-[#FFD13B] text-black border-brutal-black';
      case 'usr_maya':
        return 'bg-[#C4B5FD] text-black border-brutal-black';
      case 'usr_current':
        return 'bg-[#FF5A36] text-white border-brutal-black';
      default:
        return 'bg-amber-200 text-black border-brutal-black';
    }
  };

  return (
    <div className="group relative flex gap-3.5 px-3 md:px-5 py-2.5 hover:bg-black/[0.015] dark:hover:bg-white/[0.015] transition-colors rounded-2xl">
      {/* User Avatar */}
      <div
        className="relative shrink-0 cursor-pointer self-start mt-0.5"
        onClick={() => setSelectedUserProfile(author as any)}
      >
        <img
          src={author.avatar}
          alt={author.name}
          className="w-11 h-11 rounded-2xl border-2 border-brutal-black dark:border-white shadow-brutal-sm object-cover hover:scale-105 transition-transform"
        />
        {/* Presence Dot */}
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-brutal-mint border-2 border-white dark:border-zinc-900" />
      </div>

      {/* Message Content Area */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        {/* Header: Name Tag, Role Pill, Timestamp */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Neobrutalist Name Pill Tag */}
          <span
            className={`font-heading font-extrabold text-xs uppercase px-2.5 py-0.5 rounded-lg border-2 shadow-[1.5px_1.5px_0px_#121212] cursor-pointer hover:scale-105 transition-transform ${getBadgeStyle(
              author.id
            )}`}
            onClick={() => setSelectedUserProfile(author as any)}
          >
            {author.name}
          </span>

          {author.role && (
            <span className="text-[11px] font-heading font-bold uppercase text-zinc-500 dark:text-zinc-400 hidden sm:inline">
              {author.role}
            </span>
          )}

          <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 ml-auto sm:ml-0">
            {formatTimestamp(message.createdAt)}
          </span>

          {/* Delivery Status indicator for current user */}
          {isCurrentUser && (
            <span className="inline-flex items-center text-zinc-500 dark:text-zinc-400 ml-0.5">
              {message.status === 'sending' ? (
                <Clock size={12} className="text-zinc-500 animate-spin" />
              ) : (
                <CheckCheck size={14} className="text-brutal-mint" />
              )}
            </span>
          )}
        </div>

        {/* Neobrutalism Message Bubble Body */}
        <div className="bg-white dark:bg-[#1E1E24] rounded-2xl border-2 border-brutal-black dark:border-zinc-400 shadow-brutal dark:shadow-brutal-dark p-4 text-sm text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed max-w-2xl break-words">
          <div className="whitespace-pre-wrap">{message.content}</div>

          {/* Attachments rendering */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 flex flex-col gap-2.5">
              {message.attachments.map((att) => {
                if (att.type === 'audio') {
                  return (
                    <VoiceNotePlayer
                      key={att.id}
                      name={att.name}
                      duration={att.duration}
                      waveform={att.waveform}
                    />
                  );
                }
                if (att.type === 'code') {
                  return (
                    <CodeSnippetBlock
                      key={att.id}
                      fileName={att.name}
                      language={att.language}
                      code={att.codeContent || ''}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>

        {/* Reactions Bar & Thread Trigger */}
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          {/* Reaction badges */}
          {message.reactions.map((r) => {
            const hasUserReacted = r.users.includes(currentUser.id);
            return (
              <button
                key={r.emoji}
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-heading font-extrabold rounded-xl border-2 transition-all ${
                  hasUserReacted
                    ? 'bg-amber-200 dark:bg-amber-950 border-brutal-black dark:border-amber-400 text-brutal-black dark:text-amber-300 shadow-brutal-sm scale-105'
                    : 'bg-white dark:bg-zinc-800 border-brutal-black dark:border-zinc-500 text-zinc-800 dark:text-zinc-200 shadow-[2px_2px_0px_#121212] dark:shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5'
                }`}
                onClick={() => toggleReaction(message.id, r.emoji, isThreadReply, parentId)}
              >
                <span className="text-sm">{r.emoji}</span>
                <span className="font-mono text-xs">{r.count}</span>
              </button>
            );
          })}

          {/* Add reaction picker */}
          <EmojiReactionPicker
            onSelectEmoji={(emoji) => toggleReaction(message.id, emoji, isThreadReply, parentId)}
          />

          {/* Thread reply trigger (only on main messages) */}
          {!isThreadReply && (
            <BrutalButton
              variant="ghost"
              size="sm"
              className="h-7 px-2.5 text-xs text-zinc-600 dark:text-zinc-300 hover:text-brutal-coral gap-1.5 ml-1 font-heading font-bold"
              onClick={() => openThread(message)}
            >
              <MessageSquare size={13} />
              {message.replyCount && message.replyCount > 0 ? (
                <span className="font-extrabold text-brutal-coral">
                  {message.replyCount} {message.replyCount === 1 ? 'reply' : 'replies'}
                </span>
              ) : (
                <span>Reply</span>
              )}
            </BrutalButton>
          )}
        </div>
      </div>
    </div>
  );
};
