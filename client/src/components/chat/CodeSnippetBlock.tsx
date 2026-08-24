import React, { useState } from 'react';
import { Check, Copy, Code2 } from 'lucide-react';
import { BrutalButton } from '../ui/BrutalButton';
import { soundFX } from '../../hooks/useSoundEffects';

export interface CodeSnippetBlockProps {
  language?: string;
  code: string;
  fileName?: string;
}

export const CodeSnippetBlock: React.FC<CodeSnippetBlockProps> = ({
  language = 'typescript',
  code,
  fileName,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    soundFX.playReaction();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-xl border-2 border-brutal-black dark:border-zinc-500 overflow-hidden shadow-brutal-sm my-2 bg-zinc-900 text-zinc-100 text-xs font-mono max-w-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-800 border-b-2 border-zinc-700 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-black/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-black/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black/50" />
          </div>
          <span className="font-heading font-bold text-zinc-300 ml-1 flex items-center gap-1">
            <Code2 size={13} className="text-brutal-coral" />
            {fileName || language.toUpperCase()}
          </span>
        </div>

        <BrutalButton
          variant="secondary"
          size="sm"
          className="h-6 px-2 text-[11px] bg-zinc-700 text-zinc-200 border-zinc-500"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" /> Copied!
            </>
          ) : (
            <>
              <Copy size={12} /> Copy
            </>
          )}
        </BrutalButton>
      </div>

      {/* Code Body */}
      <div className="p-3 overflow-x-auto leading-relaxed max-h-72">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-zinc-800/60 transition-colors">
                <td className="text-zinc-500 select-none pr-3 text-right w-8 text-[11px] align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-zinc-200">{line}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
