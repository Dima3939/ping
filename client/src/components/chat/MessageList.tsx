import React, { useEffect, useRef } from 'react';
import { Message } from '../../types';
import { MessageItem } from './MessageItem';
import { formatDateDivider } from '../../lib/utils';
import { Hash, Sparkles } from 'lucide-react';
import { BrutalButton } from '../ui/BrutalButton';
import { useChatStore } from '../../store/useChatStore';

export interface MessageListProps {
  messages: Message[];
  channelName?: string;
  channelTopic?: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  channelName = 'channel',
  channelTopic,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { triggerSimulatedIncomingMessage } = useChatStore();

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-2 md:px-4 py-4 flex flex-col justify-between">
      {/* Channel Header Welcome Card */}
      <div className="px-5 py-6 mb-5 bg-amber-100/90 dark:bg-amber-950/40 rounded-2xl border-2.5 border-brutal-black dark:border-amber-400/80 shadow-brutal dark:shadow-brutal-dark mx-2">
        <div className="w-12 h-12 rounded-2xl bg-brutal-yellow text-brutal-black border-2 border-brutal-black flex items-center justify-center font-heading font-extrabold text-2xl shadow-brutal-sm mb-3">
          <Hash size={24} />
        </div>
        <h2 className="font-heading font-extrabold text-2xl uppercase tracking-wide text-brutal-black dark:text-white">
          Welcome to #{channelName}!
        </h2>
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mt-1 font-sans">
          {channelTopic || 'This is the start of the #' + channelName + ' channel conversation.'}
        </p>

        {/* Interactive Demo Action */}
        <div className="mt-4 flex items-center gap-3">
          <BrutalButton
            variant="primary"
            size="sm"
            className="gap-2 shadow-brutal-sm"
            onClick={triggerSimulatedIncomingMessage}
          >
            <Sparkles size={14} className="text-white" /> Simulate Teammate Ping
          </BrutalButton>
        </div>
      </div>

      {/* Messages List with Date Dividers */}
      <div className="flex flex-col gap-2.5">
        {messages.map((msg, idx) => {
          const prevMsg = messages[idx - 1];
          const isNewDay = !prevMsg || formatDateDivider(prevMsg.createdAt) !== formatDateDivider(msg.createdAt);

          return (
            <React.Fragment key={msg.id}>
              {isNewDay && (
                <div className="relative my-4 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-brutal-black/30 dark:border-zinc-700" />
                  </div>
                  <span className="relative z-10 px-3.5 py-1 bg-white dark:bg-[#1E1E24] text-[11px] font-heading font-extrabold uppercase tracking-wider text-brutal-black dark:text-zinc-200 rounded-full border-2 border-brutal-black dark:border-zinc-400 shadow-brutal-sm">
                    {formatDateDivider(msg.createdAt)}
                  </span>
                </div>
              )}
              <MessageItem message={msg} />
            </React.Fragment>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
