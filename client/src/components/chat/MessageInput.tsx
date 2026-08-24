import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Smile, Code, Square } from 'lucide-react';
import { BrutalButton } from '../ui/BrutalButton';
import { useChatStore } from '../../store/useChatStore';
import { soundFX } from '../../hooks/useSoundEffects';
import { Attachment } from '../../types';

export interface MessageInputProps {
  channelId: string;
  isThread?: boolean;
  parentMessageId?: string;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  channelId,
  isThread = false,
  parentMessageId,
  placeholder = 'Write a message...',
}) => {
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [pendingAttachments, setPendingAttachments] = useState<Attachment[]>([]);
  const { sendMessage, sendThreadReply, setTyping, currentUser } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<number | null>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(140, textareaRef.current.scrollHeight)}px`;
    }
  }, [content]);

  // Voice recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingSeconds(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const handleSend = () => {
    if (!content.trim() && pendingAttachments.length === 0) return;

    if (isThread && parentMessageId) {
      sendThreadReply(parentMessageId, content.trim());
    } else {
      sendMessage(channelId, content.trim(), pendingAttachments);
    }

    setContent('');
    setPendingAttachments([]);
    setTyping(channelId, currentUser.name, false);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (!isThread) {
      setTyping(channelId, currentUser.name, e.target.value.length > 0);
    }
  };

  const toggleVoiceRecording = () => {
    soundFX.playClick();
    if (isRecording) {
      // Finish recording and add as audio attachment
      setIsRecording(false);
      const newAudioAtt: Attachment = {
        id: `att_voice_${Date.now()}`,
        type: 'audio',
        url: 'recorded_voice.mp3',
        name: `Voice Note (${recordingSeconds}s)`,
        duration: `0:${recordingSeconds.toString().padStart(2, '0')}`,
        waveform: Array.from({ length: 24 }, () => Math.random() * 0.7 + 0.3),
      };
      setPendingAttachments([...pendingAttachments, newAudioAtt]);
    } else {
      setIsRecording(true);
    }
  };

  const addCodeSnippet = () => {
    soundFX.playClick();
    const sampleCode = `// Quick React 19 Action Hook
const [isPending, startTransition] = useTransition();

startTransition(async () => {
  await dispatchOptimisticUpdate(payload);
});`;
    const newCodeAtt: Attachment = {
      id: `att_code_${Date.now()}`,
      type: 'code',
      url: 'snippet.ts',
      name: 'OptimisticAction.ts',
      language: 'typescript',
      codeContent: sampleCode,
    };
    setPendingAttachments([...pendingAttachments, newCodeAtt]);
  };

  return (
    <div className="p-2.5 sm:p-4 bg-surface-light dark:bg-card-dark border-t-3 border-brutal-black dark:border-zinc-500">
      {/* Pending Attachments List */}
      {pendingAttachments.length > 0 && (
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {pendingAttachments.map((att) => (
            <div
              key={att.id}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 dark:bg-amber-950/60 rounded-lg border-2 border-brutal-black dark:border-amber-400 text-xs font-heading font-bold shadow-brutal-sm animate-pop"
            >
              <span>📎 {att.name}</span>
              <button
                className="text-rose-500 hover:text-rose-700 ml-1 font-extrabold"
                onClick={() => setPendingAttachments(pendingAttachments.filter((a) => a.id !== att.id))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Input Box Container */}
      <div className="relative rounded-2xl border-3 border-brutal-black dark:border-zinc-500 bg-white dark:bg-surface-dark shadow-brutal dark:shadow-brutal-dark focus-within:border-brutal-coral transition-all">
        {/* If Recording Voice Note */}
        {isRecording ? (
          <div className="flex items-center justify-between p-3.5 bg-rose-50 dark:bg-rose-950/30 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-500 animate-ping" />
              <span className="font-heading font-bold text-sm text-rose-600 dark:text-rose-400">
                Recording Audio... 0:{recordingSeconds.toString().padStart(2, '0')}
              </span>
              <div className="flex items-center gap-1 h-5">
                <span className="w-1 bg-rose-500 rounded-full animate-wave-1 h-3" />
                <span className="w-1 bg-rose-500 rounded-full animate-wave-2 h-5" />
                <span className="w-1 bg-rose-500 rounded-full animate-wave-3 h-2" />
                <span className="w-1 bg-rose-500 rounded-full animate-wave-4 h-4" />
              </div>
            </div>

            <BrutalButton
              variant="danger"
              size="sm"
              className="gap-1.5"
              onClick={toggleVoiceRecording}
            >
              <Square size={13} fill="currentColor" /> Stop & Attach
            </BrutalButton>
          </div>
        ) : (
          <>
            <textarea
              ref={textareaRef}
              rows={1}
              value={content}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full bg-transparent text-brutal-black dark:text-white px-4 pt-3 pb-1 text-sm resize-none focus:outline-none placeholder:text-zinc-400 max-h-36 font-sans"
            />

            {/* Bottom Toolbar with action buttons */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-zinc-100 dark:border-zinc-800">
              {/* Left Action Buttons */}
              <div className="flex items-center gap-1 text-zinc-500">
                <BrutalButton
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-lg text-zinc-500 hover:text-brutal-coral p-0"
                  title="Attach file"
                  onClick={() => soundFX.playClick()}
                >
                  <Paperclip size={16} />
                </BrutalButton>

                <BrutalButton
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-lg text-zinc-500 hover:text-brutal-coral p-0"
                  title="Insert code snippet"
                  onClick={addCodeSnippet}
                >
                  <Code size={16} />
                </BrutalButton>

                <BrutalButton
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-lg text-zinc-500 hover:text-brutal-coral p-0"
                  title="Record Voice Note"
                  onClick={toggleVoiceRecording}
                >
                  <Mic size={16} />
                </BrutalButton>

                <BrutalButton
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-lg text-zinc-500 hover:text-brutal-coral p-0"
                  title="Insert emoji"
                  onClick={() => setContent((prev) => prev + ' 🚀 ')}
                >
                  <Smile size={16} />
                </BrutalButton>
              </div>

              {/* Right Send Button */}
              <BrutalButton
                variant="primary"
                size="sm"
                className="px-4 py-1.5 gap-1.5 shadow-brutal-sm"
                disabled={!content.trim() && pendingAttachments.length === 0}
                onClick={handleSend}
              >
                <span>SEND</span>
                <Send size={13} className="rotate-45" />
              </BrutalButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
