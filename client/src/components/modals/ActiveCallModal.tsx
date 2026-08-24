import React, { useState, useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { BrutalButton } from '../ui/BrutalButton';
import { Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, Users, Volume2 } from 'lucide-react';

export const ActiveCallModal: React.FC = () => {
  const { activeCall, endCall, toggleCallMic, toggleCallVideo, toggleCallScreenShare, currentUser, users } =
    useChatStore();

  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (activeCall?.isActive) {
      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      return () => {
        clearInterval(interval);
        setCallDuration(0);
      };
    }
  }, [activeCall?.isActive]);

  if (!activeCall || !activeCall.isActive) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={endCall} />

      {/* Main Call Window */}
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-[#1A1A22] rounded-3xl border-3 border-brutal-black dark:border-white shadow-brutal-xl dark:shadow-brutal-dark-lg p-6 z-10 animate-pop flex flex-col gap-6 overflow-hidden">
        {/* Call Top Header */}
        <div className="flex items-center justify-between border-b-2 border-zinc-200 dark:border-zinc-700 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="flex flex-col">
              <h3 className="font-heading font-extrabold text-base uppercase tracking-wide text-brutal-black dark:text-white">
                {activeCall.participantName}
              </h3>
              <span className="text-xs text-zinc-500 font-sans">{activeCall.participantRole}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 rounded-full border-2 border-brutal-black text-xs font-mono font-bold shadow-brutal-sm">
              ⏱️ {formatDuration(callDuration)}
            </span>
          </div>
        </div>

        {/* Video / Avatars Stage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          {/* User Tile */}
          <div className="relative aspect-video bg-amber-50 dark:bg-zinc-800/80 rounded-2xl border-2.5 border-brutal-black dark:border-zinc-500 shadow-brutal flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl border-2 border-brutal-black object-cover"
              />
              {!activeCall.isMicMuted && (
                <div className="absolute -inset-1.5 rounded-2xl border-2 border-brutal-coral animate-ping pointer-events-none opacity-40" />
              )}
            </div>
            <span className="mt-2 font-heading font-extrabold text-xs uppercase text-brutal-black dark:text-white">
              {currentUser.name} (You)
            </span>
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <span className="px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono">
                {activeCall.isMicMuted ? '🔇 Muted' : '🎙️ Live Audio'}
              </span>
            </div>
          </div>

          {/* Peer / Huddle Tile */}
          <div className="relative aspect-video bg-emerald-50 dark:bg-zinc-800/80 rounded-2xl border-2.5 border-brutal-black dark:border-zinc-500 shadow-brutal flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="relative">
              <img
                src={activeCall.participantAvatar}
                alt={activeCall.participantName}
                className="w-16 h-16 rounded-2xl border-2 border-brutal-black object-cover"
              />
              <div className="absolute -inset-2 rounded-2xl border-2 border-brutal-mint animate-pulse pointer-events-none opacity-50" />
            </div>
            <span className="mt-2 font-heading font-extrabold text-xs uppercase text-brutal-black dark:text-white">
              {activeCall.participantName}
            </span>

            {/* Simulated Live Speech Waveform */}
            <div className="flex items-center gap-1 h-4 mt-1">
              <span className="w-1 bg-brutal-mint rounded-full animate-wave-1 h-3" />
              <span className="w-1 bg-brutal-mint rounded-full animate-wave-2 h-4" />
              <span className="w-1 bg-brutal-mint rounded-full animate-wave-3 h-2" />
              <span className="w-1 bg-brutal-mint rounded-full animate-wave-4 h-3.5" />
            </div>

            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-mono flex items-center gap-1">
                <Volume2 size={11} /> Speaking...
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Call Controls Toolbar */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t-2 border-zinc-200 dark:border-zinc-700">
          {/* Mute Mic */}
          <BrutalButton
            variant={activeCall.isMicMuted ? 'danger' : 'secondary'}
            size="md"
            className="rounded-2xl gap-2"
            onClick={toggleCallMic}
          >
            {activeCall.isMicMuted ? <MicOff size={16} /> : <Mic size={16} />}
            <span>{activeCall.isMicMuted ? 'Unmute' : 'Mute'}</span>
          </BrutalButton>

          {/* Toggle Video */}
          <BrutalButton
            variant={!activeCall.isVideoEnabled ? 'danger' : 'secondary'}
            size="md"
            className="rounded-2xl gap-2"
            onClick={toggleCallVideo}
          >
            {!activeCall.isVideoEnabled ? <VideoOff size={16} /> : <Video size={16} />}
            <span>{activeCall.isVideoEnabled ? 'Video On' : 'Video Off'}</span>
          </BrutalButton>

          {/* Screen Share */}
          <BrutalButton
            variant={activeCall.isScreenSharing ? 'mint' : 'secondary'}
            size="md"
            className="rounded-2xl gap-2"
            onClick={toggleCallScreenShare}
          >
            <Monitor size={16} />
            <span>{activeCall.isScreenSharing ? 'Stop Share' : 'Share Screen'}</span>
          </BrutalButton>

          {/* End Call (Big Red) */}
          <BrutalButton
            variant="danger"
            size="md"
            className="rounded-2xl gap-2 px-5"
            onClick={endCall}
          >
            <PhoneOff size={16} />
            <span>End Call</span>
          </BrutalButton>
        </div>
      </div>
    </div>
  );
};
