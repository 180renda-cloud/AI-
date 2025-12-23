import React, { useState } from 'react';
import { Copy, Check, Terminal, Camera, Clock } from 'lucide-react';
import { StoryboardSegment } from '../types';

interface OutputAreaProps {
  result: string | null;
  isLoading: boolean;
}

export const OutputArea: React.FC<OutputAreaProps> = ({ result, isLoading }) => {
  const [copied, setCopied] = useState(false);

  // Updated parser to handle blocks separated by empty lines (double newline)
  // and lines within blocks separated by single newline
  const parseSegments = (text: string): StoryboardSegment[] => {
    // Split by double newlines to find separate scenes/blocks
    const blocks = text.split(/\n\s*\n/);
    
    return blocks
      .filter(block => block.trim().length > 0)
      .map((block, index) => {
        return {
          id: `seg-${index}`,
          header: `SCENE ${String(index + 1).padStart(2, '0')}`, // Auto-generate Scene Header
          content: block.trim()
        };
      });
  };

  const segments = result ? parseSegments(result) : [];

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-500 bg-cinema-800/50 rounded-xl border border-white/5 border-dashed animate-pulse">
        <div className="w-16 h-16 rounded-full bg-cinema-accent/10 flex items-center justify-center mb-4">
          <Terminal className="w-8 h-8 text-cinema-accent" />
        </div>
        <p className="font-mono text-sm">分析文本结构...</p>
        <div className="mt-2 text-xs opacity-50">应用视觉转化协议</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-600 bg-cinema-800/30 rounded-xl border border-white/5">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Camera className="w-8 h-8 opacity-50" />
        </div>
        <p className="font-mono text-sm">等待输入流</p>
      </div>
    );
  }

  return (
    <div className="bg-cinema-800 rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-full max-h-[800px]">
      <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold text-cinema-secondary flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            生成结果
          </h2>
        </div>

        <button
          onClick={handleCopy}
          className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors text-gray-300"
        >
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          {copied ? '已复制' : '复制全部'}
        </button>
      </div>

      <div className="overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {segments.map((segment) => (
          <div key={segment.id} className="group relative">
            <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-cinema-accent/0 via-cinema-accent/50 to-cinema-accent/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
               <span className="text-xs font-mono text-cinema-accent bg-cinema-accent/10 px-2 py-0.5 rounded border border-cinema-accent/20">
                 {segment.header}
               </span>
               <div className="h-px bg-white/10 flex-grow"></div>
            </div>

            {/* Content Card */}
            <div className="bg-black/40 rounded-lg p-5 border border-white/5 hover:border-cinema-secondary/30 transition-colors">
              <div className="font-mono text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
                {segment.content.split('\n').map((line, idx) => {
                  if (!line.trim()) return null;
                  
                  // Extract timecode if present at the start of the line
                  // Matches 0:00-0:05 or 00:00-00:05 format
                  const timeMatch = line.match(/^(\d+:\d+-\d+:\d+)(.*)/s);
                  const time = timeMatch ? timeMatch[1] : '';
                  const body = timeMatch ? timeMatch[2] : line;

                  // Clean up '▲' if it still exists in the output
                  const cleanBody = body.replace(/^[\s▲]+/, '').trim();

                  return (
                    <div key={idx} className="mb-4 last:mb-0 pl-4 border-l-2 border-white/10 hover:border-cinema-secondary transition-colors">
                      {time && (
                         <div className="flex items-center gap-2 mb-1">
                           <Clock className="w-3 h-3 text-gray-500" />
                           <span className="text-xs font-bold text-cinema-secondary">{time}</span>
                         </div>
                      )}
                      <p className="text-gray-300">
                        {cleanBody}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
        
        {segments.length === 0 && (
           <pre className="font-mono text-xs text-gray-400 whitespace-pre-wrap">
             {result}
           </pre>
        )}
      </div>
    </div>
  );
};