import React, { useState } from 'react';
import { Sparkles, Eraser } from 'lucide-react';

interface InputAreaProps {
  onGenerate: (text: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onGenerate, isLoading }) => {
  const [text, setText] = useState('');

  const handleClear = () => setText('');
  
  const handleSubmit = () => {
    if (text.trim() && !isLoading) {
      onGenerate(text);
    }
  };

  return (
    <div className="bg-cinema-800 rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 flex flex-col h-full">
      <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-cinema-accent"></span>
          原著素材
        </h2>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleClear}
            className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1"
            disabled={isLoading}
          >
            <Eraser className="w-3 h-3" /> 清空
          </button>
        </div>
      </div>
      
      <div className="relative flex-grow">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此粘贴小说文本... (AI 将自动生成 6-8 个电影级分镜片段，并进行流体叙事检查)"
          className="w-full h-full min-h-[300px] bg-transparent text-gray-300 p-6 resize-none focus:outline-none focus:bg-white/[0.02] transition-colors font-sans leading-relaxed scrollbar-hide"
          disabled={isLoading}
        />
      </div>

      <div className="p-4 border-t border-white/10 bg-black/20">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className={`w-full py-4 rounded-lg font-bold tracking-wide uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
            isLoading || !text.trim()
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-cinema-accent hover:bg-yellow-400 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              协议处理中...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              生成分镜脚本
            </>
          )}
        </button>
      </div>
    </div>
  );
};