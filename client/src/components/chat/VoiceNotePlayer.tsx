import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { BrutalButton } from '../ui/BrutalButton';
import { soundFX } from '../../hooks/useSoundEffects';

export interface VoiceNotePlayerProps {
  duration?: string;
  waveform?: number[];
  name?: string;
}

export const VoiceNotePlayer: React.FC<VoiceNotePlayerProps> = ({
  duration = '0:42',
  waveform = [0.2, 0.4, 0.7, 0.9, 0.6, 0.4, 0.8, 0.95, 0.7, 0.5, 0.3, 0.6, 0.85, 0.6, 0.4, 0.3, 0.7, 0.9, 0.6, 0.4, 0.8, 0.9, 0.5, 0.3],
  name = 'Voice Note',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const togglePlay = () => {
    soundFX.playClick();
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      intervalRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev + 2.5;
        });
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border-2 border-brutal-black dark:border-amber-400/60 shadow-brutal-sm max-w-sm">
      <div className="flex items-center justify-between text-xs font-heading font-bold text-zinc-600 dark:text-zinc-300">
        <span className="flex items-center gap-1">
          <Volume2 size={14} className="text-brutal-coral" />
          {name}
        </span>
        <span className="font-mono">{duration}</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <BrutalButton
          variant={isPlaying ? 'danger' : 'primary'}
          size="icon"
          className="w-9 h-9 rounded-full shrink-0"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
        </BrutalButton>

        {/* Audio Waveform Bars */}
        <div
          className="flex-1 flex items-center gap-1 h-8 cursor-pointer py-1"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setProgress(Math.min(100, Math.max(0, clickPos * 100)));
          }}
        >
          {waveform.map((amplitude, i) => {
            const barProgress = (i / waveform.length) * 100;
            const isFilled = progress >= barProgress;
            const heightPct = Math.max(20, Math.min(100, amplitude * 100));

            return (
              <div
                key={i}
                className="flex-1 rounded-full transition-all duration-100"
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: isFilled ? '#FF5A36' : isPlaying ? '#D4D0C5' : '#E5E1D8',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
