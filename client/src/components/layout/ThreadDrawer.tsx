import React from 'react';
import { useChatStore } from '../../store/useChatStore';
import { X, MessageSquare } from 'lucide-react';
import { BrutalButton } from '../ui/BrutalButton';
import { MessageItem } from '../chat/MessageItem';
import { MessageInput } from '../chat/MessageInput';

export const ThreadDrawer: React.FC = () => {
  const {
    activeThreadParentMessage,
    closeThread,
    threads,
    activeChannelId,
  } = useChatStore();

  if (!activeThreadParentMessage) return null;

  const replies = threads[activeThreadParentMessage.id] || [];

  return (
    <aside className="w-80 md:w-96 bg-surface-light dark:bg-card-dark border-l-3 border-brutal-black dark:border-zinc-700 flex flex-col justify-between shrink-0 select-none shadow-brutal-xl z-20 animate-pop">
      {/* Thread Header */}
      <div className="h-14 px-4 border-b-3 border-brutal-black dark:border-zinc-700 flex items-center justify-between bg-surface-secondary dark:bg-surface-dark">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-brutal-coral" />
          <span className="font-heading font-extrabold text-sm uppercase tracking-wide text-brutal-black dark:text-white">
            Thread Discussion
          </span>
        </div>

        <BrutalButton
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-lg p-0"
          onClick={closeThread}
        >
          <X size={17} />
        </BrutalButton>
      </div>

      {/* Thread Message & Replies Stream */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-4">
        {/* Original Parent Message Card */}
        <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border-2 border-brutal-black dark:border-amber-400 p-2 shadow-brutal-sm">
          <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-1">
            Original Message
          </div>
          <MessageItem message={activeThreadParentMessage} isThreadReply={true} />
        </div>

        {/* Replies Divider */}
        <div className="flex items-center gap-2 px-2">
          <div className="flex-1 border-t-2 border-zinc-200 dark:border-zinc-700" />
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-zinc-400">
            {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
          </span>
          <div className="flex-1 border-t-2 border-zinc-200 dark:border-zinc-700" />
        </div>

        {/* Replies Feed */}
        <div className="flex flex-col gap-2">
          {replies.map((reply) => (
            <MessageItem
              key={reply.id}
              message={reply}
              isThreadReply={true}
              parentId={activeThreadParentMessage.id}
            />
          ))}
        </div>
      </div>

      {/* Thread Input */}
      <div className="border-t-3 border-brutal-black dark:border-zinc-700">
        <MessageInput
          channelId={activeChannelId}
          isThread={true}
          parentMessageId={activeThreadParentMessage.id}
          placeholder="Reply in thread..."
        />
      </div>
    </aside>
  );
};
