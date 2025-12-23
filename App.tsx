import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { OutputArea } from './components/OutputArea';
import { generateStoryboard } from './services/geminiService';
import { GenerationState, ModelId } from './types';

const App: React.FC = () => {
  const [currentModel, setCurrentModel] = useState<ModelId>('gemini-3-flash-preview');
  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    error: null,
    result: null,
  });

  const handleGenerate = async (text: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await generateStoryboard(text, currentModel);
      setState({ isLoading: false, error: null, result });
    } catch (error: any) {
      setState({ 
        isLoading: false, 
        error: error.message || "发生意外错误", 
        result: null 
      });
    }
  };

  return (
    <div className="min-h-screen bg-cinema-900 text-gray-100 flex flex-col font-sans">
      <Header currentModel={currentModel} onModelChange={setCurrentModel} />
      
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)] min-h-[600px]">
          
          {/* Left Column: Input */}
          <div className="h-full">
            <InputArea onGenerate={handleGenerate} isLoading={state.isLoading} />
          </div>

          {/* Right Column: Output */}
          <div className="h-full relative">
             {state.error && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl">
                <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-lg max-w-md text-center">
                  <h3 className="text-red-400 font-bold mb-2">系统错误</h3>
                  <p className="text-sm text-red-200">{state.error}</p>
                  <button 
                    onClick={() => setState(prev => ({ ...prev, error: null }))}
                    className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded text-xs font-mono uppercase transition-colors"
                  >
                    关闭
                  </button>
                </div>
              </div>
            )}
            <OutputArea result={state.result} isLoading={state.isLoading} />
          </div>

        </div>
      </main>
      
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
         <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cinema-accent/5 to-transparent opacity-20"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cinema-secondary/5 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
};

export default App;