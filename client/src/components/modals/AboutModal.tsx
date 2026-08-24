import React from 'react';
import { useChatStore } from '../../store/useChatStore';
import { BrutalModal } from '../ui/BrutalModal';
import { BrutalButton } from '../ui/BrutalButton';
import { BrutalBadge } from '../ui/BrutalBadge';
import { MessageSquareCode, Zap, Radio, Mic, Layers, ExternalLink, Code2 } from 'lucide-react';

export const AboutModal: React.FC = () => {
  const { isAboutModalOpen, setAboutModalOpen } = useChatStore();

  return (
    <BrutalModal
      isOpen={isAboutModalOpen}
      onClose={() => setAboutModalOpen(false)}
      title="About Ping Messenger"
      maxWidth="md"
    >
      <div className="flex flex-col gap-5">
        {/* Header Hero Banner */}
        <div className="flex items-center gap-4 p-4 bg-amber-100/80 dark:bg-amber-950/40 rounded-2xl border-2.5 border-brutal-black dark:border-amber-400 shadow-brutal">
          <div className="w-14 h-14 rounded-2xl bg-brutal-coral text-white border-2 border-brutal-black flex items-center justify-center font-heading font-extrabold text-2xl shadow-brutal-sm shrink-0">
            <MessageSquareCode size={28} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-xl uppercase tracking-wide text-brutal-black dark:text-white">
                Ping
              </h3>
              <BrutalBadge variant="coral" className="text-[10px]">
                v1.0.0
              </BrutalBadge>
            </div>
            <p className="text-xs font-heading font-bold text-zinc-600 dark:text-zinc-300 mt-0.5">
              Real-Time Team Messenger & Collaboration OS
            </p>
          </div>
        </div>

        {/* Short Summary Description */}
        <div className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans">
          A high-velocity, zero-latency team collaboration platform built with{' '}
          <span className="font-bold text-brutal-black dark:text-white">React 19, TypeScript, and Laravel 11 Reverb WebSockets</span>.
          Featuring a high-contrast <span className="font-bold text-brutal-coral">Neobrutalism</span> design system, instant optimistic mutations, voice notes with canvas waveforms, and live audio/video huddle rooms.
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="p-3 bg-white dark:bg-card-dark rounded-xl border-2 border-brutal-black/40 dark:border-zinc-600 flex items-start gap-2.5 shadow-brutal-sm">
            <Zap size={18} className="text-brutal-yellow shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-heading font-extrabold uppercase text-brutal-black dark:text-white">
                Optimistic UI
              </span>
              <span className="text-[11px] text-zinc-500">Sub-10ms instant cache updates & temporary UUIDv4</span>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-card-dark rounded-xl border-2 border-brutal-black/40 dark:border-zinc-600 flex items-start gap-2.5 shadow-brutal-sm">
            <Radio size={18} className="text-brutal-coral shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-heading font-extrabold uppercase text-brutal-black dark:text-white">
                Laravel Reverb
              </span>
              <span className="text-[11px] text-zinc-500">Real-time WebSocket multi-channel broadcasting</span>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-card-dark rounded-xl border-2 border-brutal-black/40 dark:border-zinc-600 flex items-start gap-2.5 shadow-brutal-sm">
            <Mic size={18} className="text-brutal-mint shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-heading font-extrabold uppercase text-brutal-black dark:text-white">
                Voice Notes & Waveforms
              </span>
              <span className="text-[11px] text-zinc-500">Interactive HTML5 Canvas waveform scrubbers</span>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-card-dark rounded-xl border-2 border-brutal-black/40 dark:border-zinc-600 flex items-start gap-2.5 shadow-brutal-sm">
            <Layers size={18} className="text-brutal-purple shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-heading font-extrabold uppercase text-brutal-black dark:text-white">
                Neobrutalism UI
              </span>
              <span className="text-[11px] text-zinc-500">Bold 2.5px borders, 4px hard offset shadows</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {['React 19', 'TypeScript', 'Laravel 11 Reverb', 'Tailwind CSS', 'Zustand', 'Web Audio API'].map((tag) => (
            <BrutalBadge key={tag} variant="yellow" className="text-[11px]">
              {tag}
            </BrutalBadge>
          ))}
        </div>

        {/* Footer info & Links */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Dima3939/ping"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl font-heading text-xs font-extrabold uppercase shadow-brutal-sm hover:scale-105 transition-transform"
            >
              <Code2 size={14} /> GitHub Repo <ExternalLink size={12} />
            </a>
          </div>

          <BrutalButton
            variant="ghost"
            size="sm"
            onClick={() => setAboutModalOpen(false)}
          >
            Close
          </BrutalButton>
        </div>
      </div>
    </BrutalModal>
  );
};
