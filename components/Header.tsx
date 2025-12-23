import React from 'react';
import { Clapperboard, ChevronDown, Zap, Brain, Sparkles } from 'lucide-react';
import { ModelId } from '../types';

interface HeaderProps {
  currentModel: ModelId;
  onModelChange: (model: ModelId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentModel, onModelChange }) => {
  return (
    <header className="border-b border-white/10 bg-cinema-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cinema-accent to-orange-600 p-2 rounded-lg">
            <Clapperboard className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              CineScript <span className="text-cinema-accent">AI</span>
            </h1>
            <p className="text-xs text-gray-400 font-mono tracking-wider">VISUAL PROTOCOL V2.0</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Model Selector */}
          <div className="relative group">
            <button className="flex items-center gap-2 bg-cinema-800 border border-white/10 px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:text-white hover:border-cinema-secondary/50 transition-all">
              {currentModel === 'gemini-3-pro-preview' && <Brain className="w-3 h-3 text-purple-400" />}
              {currentModel === 'gemini-2.5-pro-preview-09-2025' && <Sparkles className="w-3 h-3 text-blue-400" />}
              {currentModel === 'gemini-3-flash-preview' && <Zap className="w-3 h-3 text-yellow-400" />}
              
              <span className="font-mono">
                {currentModel === 'gemini-3-pro-preview' && 'Gemini 3 Pro'}
                {currentModel === 'gemini-2.5-pro-preview-09-2025' && 'Gemini 2.5 Pro'}
                {currentModel === 'gemini-3-flash-preview' && 'Gemini 3 Flash'}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-cinema-800 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
              <div className="p-1">
                <button 
                  onClick={() => onModelChange('gemini-3-pro-preview')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-colors ${currentModel === 'gemini-3-pro-preview' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <Brain className="w-3 h-3" />
                  Gemini 3 Pro (强力推理)
                </button>
                <button 
                  onClick={() => onModelChange('gemini-2.5-pro-preview-09-2025')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-colors ${currentModel === 'gemini-2.5-pro-preview-09-2025' ? 'bg-blue-500/20 text-blue-300' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <Sparkles className="w-3 h-3" />
                  Gemini 2.5 Pro (均衡)
                </button>
                <button 
                  onClick={() => onModelChange('gemini-3-flash-preview')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-colors ${currentModel === 'gemini-3-flash-preview' ? 'bg-yellow-500/20 text-yellow-300' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <Zap className="w-3 h-3" />
                  Gemini 3 Flash (极速)
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-cinema-secondary bg-cinema-secondary/10 px-3 py-1 rounded-full border border-cinema-secondary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            系统运行中
          </div>
        </div>
      </div>
    </header>
  );
};