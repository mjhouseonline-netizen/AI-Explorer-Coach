
import React, { useRef, useEffect, useState } from 'react';
import { Message, Mission } from '../types';
import ReactMarkdown from 'react-markdown';
import { Send, User, Bot, RotateCcw, CheckCircle, Copy, Check, FileText, Download, Volume2 } from 'lucide-react';

interface ChatInterfaceProps {
  mission: Mission;
  history: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onEndSession: () => void;
  onCompleteMission: () => void;
}

// Component to render code blocks with a copy button
const CodeBlock = ({ children, className, ...rest }: any) => {
  const [copied, setCopied] = useState(false);
  const codeText = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-slate-700 bg-slate-950" {...rest}>
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
        <span className="text-xs text-slate-400 font-mono">
          {className?.replace('language-', '') || 'Code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <code className={`font-mono text-sm ${className || ''} text-slate-300`}>
          {children}
        </code>
      </div>
    </div>
  );
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  mission, 
  history, 
  isLoading, 
  onSendMessage,
  onEndSession,
  onCompleteMission
}) => {
  const [inputText, setInputText] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  // Focus input on mount
  useEffect(() => {
    if (!isLoading) {
        inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleDownloadTranscript = () => {
    const header = `AI EXPLORER COACH TRANSCRIPT\nMission: ${mission.title}\nDate: ${new Date().toLocaleDateString()}\n\n`;
    const body = history
      .filter(m => m.role !== 'system')
      .map(m => `[${m.role.toUpperCase()}] (${new Date(m.timestamp).toLocaleTimeString()}):\n${m.content}\n`)
      .join('\n-------------------\n\n');
    
    const blob = new Blob([header + body], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mission-${mission.id}-Transcript.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div>
          <div className="text-xs text-cyan-400 uppercase font-bold tracking-wider mb-1">Current Mission</div>
          <h2 className="text-xl font-bold font-fredoka text-white flex items-center gap-2">
            {mission.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={handleDownloadTranscript}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                title="Download Chat Transcript"
            >
                <FileText className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <button 
                onClick={onCompleteMission}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                title="Mark as Complete"
            >
                <CheckCircle className="w-4 h-4" />
                <span className="hidden md:inline">Complete Mission</span>
            </button>
            <button 
                onClick={onEndSession}
                className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded-full transition-colors"
                title="Exit without saving"
            >
                <RotateCcw className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-50">
            <Bot className="w-16 h-16 mb-4" />
            <p>Connecting to AI Coach...</p>
          </div>
        )}
        
        {history.map((msg) => {
           // Skip system messages in the UI
           if (msg.role === 'system') return null;
           
           const isUser = msg.role === 'user';
           
           return (
            <div 
              key={msg.id} 
              className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[90%] md:max-w-[80%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                  ${isUser ? 'bg-indigo-600' : 'bg-cyan-600'}
                `}>
                  {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>

                {/* Bubble */}
                <div className={`
                  p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed overflow-hidden
                  ${isUser 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none'
                  }
                `}>
                  {/* Markdown Renderer */}
                  <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-2 prose-li:my-0.5">
                    <ReactMarkdown
                      components={{
                        // Custom Image Renderer
                        img: ({node, ...props}) => (
                          <img className="rounded-lg shadow-md max-w-full h-auto my-3 border border-slate-700" {...props} />
                        ),
                        // Custom Audio Renderer for data:audio links
                        a: ({ node, ...props }) => {
                          if (props.href && props.href.startsWith('data:audio')) {
                            return (
                              <div className="my-3 p-3 bg-slate-950/50 rounded-lg border border-slate-700 flex flex-col gap-2 shadow-sm">
                                  <div className="flex items-center gap-2 text-cyan-400">
                                     <div className="p-1.5 bg-cyan-500/10 rounded-full">
                                        <Volume2 className="w-4 h-4" />
                                     </div>
                                     <span className="text-xs font-bold uppercase tracking-wider">Audio Generated</span>
                                  </div>
                                  <audio controls src={props.href} className="w-full h-8" />
                              </div>
                            );
                          }
                          return <a className="text-cyan-400 hover:underline" {...props} target="_blank" rel="noopener noreferrer" />;
                        },
                        // Override code blocks
                        code({ node, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          const isInline = !match && !String(children).includes('\n');
                          
                          if (!isInline) {
                             return <CodeBlock className={className} {...props}>{children}</CodeBlock>;
                          }
                          
                          return (
                            <code className="bg-slate-950/50 px-1.5 py-0.5 rounded text-cyan-200 font-mono text-xs" {...props}>
                              {children}
                            </code>
                          );
                        },
                        // Fix generic styling issues if prose isn't perfect
                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 space-y-1" {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
           );
        })}
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="flex gap-3 max-w-[75%]">
               <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0 mt-1">
                 <Bot className="w-5 h-5 text-white" />
               </div>
               <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700">
                 <div className="flex gap-1 h-5 items-center">
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                 </div>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-700 bg-slate-900">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-center gap-2 max-w-4xl mx-auto"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isLoading ? "AI is thinking..." : "Type your answer..."}
            disabled={isLoading}
            className="w-full bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            title="Send Message (Enter)"
            className="absolute right-2 p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 disabled:opacity-0 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="text-center mt-2">
            <p className="text-[10px] text-slate-500">
                AI can make mistakes. Check important info. Do not share personal info.
            </p>
        </div>
      </div>
    </div>
  );
};
