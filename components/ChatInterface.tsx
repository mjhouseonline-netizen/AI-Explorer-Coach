
import React, { useRef, useEffect, useState } from 'react';
import { Message, Mission } from '../types';
import ReactMarkdown from 'react-markdown';
import { Send, User, Bot, CheckCircle, Copy, Check, FileText, Volume2, ChevronLeft, Edit3, Play, Table as TableIcon, Save, RefreshCcw } from 'lucide-react';

interface ChatInterfaceProps {
  mission: Mission;
  history: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onEndSession: () => void;
  onCompleteMission: () => void;
}

const InteractiveCodeBlock = ({ children, className, isCodingTrack, onSendMessage }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(String(children).replace(/\n$/, ''));
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToCoach = () => {
    onSendMessage(`I modified the code to this:\n\n\`\`\`${className?.replace('language-', '') || ''}\n${code}\n\`\`\`\n\nWhat do you think of these changes?`);
    setIsEditing(false);
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
            {className?.replace('language-', '') || 'Text'}
            </span>
            {isCodingTrack && (
                <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase transition-colors ${isEditing ? 'text-amber-400' : 'text-slate-400 hover:text-white'}`}
                >
                    <Edit3 className="w-3 h-3" />
                    {isEditing ? 'Discard Edits' : 'Edit Code'}
                </button>
            )}
        </div>
        <div className="flex items-center gap-3">
            <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span className={copied ? 'text-emerald-400' : ''}>{copied ? 'Copied' : 'Copy'}</span>
            </button>
        </div>
      </div>

      <div className="relative">
        {isEditing ? (
          <div className="p-0">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-48 bg-slate-900 text-cyan-50 font-mono text-sm p-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y"
              spellCheck={false}
            />
            <div className="bg-slate-900/80 p-2 border-t border-slate-800 flex justify-end">
                <button 
                    onClick={handleSendToCoach}
                    className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all"
                >
                    <Send className="w-3 h-3" />
                    Discuss with Coach
                </button>
            </div>
          </div>
        ) : (
          <div className="p-4 overflow-x-auto custom-scrollbar">
            <code className={`font-mono text-sm ${className || ''} text-slate-300 whitespace-pre`}>
              {code}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};

const InteractiveTable = ({ children, isDataTrack, onSendMessage }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    
    // This is a simplified interactive wrapper. 
    // For a production app, we'd parse the table children into a JSON state.
    // Here we wrap it in a beautiful UI container with track-specific tools.
    return (
        <div className="my-6 rounded-xl overflow-hidden border border-slate-700 bg-slate-800/50 shadow-xl">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2 text-indigo-400">
                    <TableIcon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Data Explorer</span>
                </div>
                {isDataTrack && (
                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className={`flex items-center gap-1.5 text-[10px] font-bold uppercase transition-colors ${isEditing ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                    >
                        {isEditing ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
                        {isEditing ? 'Save View' : 'Edit Cells'}
                    </button>
                )}
            </div>
            <div className={`overflow-x-auto p-2 md:p-4 ${isEditing ? 'bg-slate-900/30' : ''}`}>
                <table className={`w-full text-sm text-left border-collapse ${isEditing ? 'cursor-edit' : ''}`}>
                    {children}
                </table>
            </div>
            {isEditing && (
                <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-center">
                    <p className="text-[10px] text-slate-500 italic">Click any cell to modify values (Visualization coming soon!)</p>
                </div>
            )}
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

  const isCodingTrack = mission.track === 'Coding';
  const isDataTrack = mission.track === 'Data';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

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
    <div className="flex flex-col h-full bg-slate-900 absolute inset-0 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between p-2 md:p-3 border-b border-slate-700 bg-slate-800/90 backdrop-blur-lg z-10 shadow-lg">
        <div className="flex items-center gap-2 flex-1 min-w-0">
            <button 
                onClick={onEndSession}
                className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-100 rounded-xl transition-all border border-slate-600/50 group whitespace-nowrap"
                title="Save & Return to Dashboard"
            >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                <span className="font-bold text-xs md:text-sm">Pause & Exit</span>
            </button>
            <div className="hidden sm:block h-8 w-px bg-slate-700/50 mx-1"></div>
            <div className="min-w-0">
                <div className="text-[10px] text-cyan-400 uppercase font-bold tracking-widest leading-none mb-1 opacity-80">Mission In Progress</div>
                <h2 className="text-sm md:text-base font-bold font-fredoka text-white truncate leading-tight">
                    {mission.title}
                </h2>
            </div>
        </div>
        
        <div className="flex items-center gap-1.5 md:gap-2 shrink-0 ml-2">
            <button 
                onClick={handleDownloadTranscript}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors hidden sm:block"
                title="Download Log"
            >
                <FileText className="w-5 h-5" />
            </button>
            <button 
                onClick={onCompleteMission}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shadow-lg shadow-emerald-900/30"
                title="Mark as Complete"
            >
                <CheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Finish</span>
            </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide safe-pb bg-slate-900/50">
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 opacity-50">
            <Bot className="w-16 h-16 mb-4 animate-pulse" />
            <p className="font-fredoka text-lg">Initializing Mission...</p>
          </div>
        )}
        
        {history.map((msg) => {
           if (msg.role === 'system') return null;
           const isUser = msg.role === 'user';
           
           return (
            <div 
              key={msg.id} 
              className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div className={`flex max-w-[95%] md:max-w-[85%] gap-2 md:gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg
                  ${isUser ? 'bg-indigo-600' : 'bg-cyan-600'}
                `}>
                  {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>

                <div className={`
                  p-3 md:p-4 rounded-2xl shadow-xl text-sm md:text-base leading-relaxed overflow-hidden break-words
                  ${isUser 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none'
                  }
                `}>
                  <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-2 prose-li:my-0.5">
                    <ReactMarkdown
                      components={{
                        img: ({node, ...props}) => (
                          <img className="rounded-lg shadow-md max-w-full h-auto my-3 border border-slate-700" alt="AI Generated" {...props} />
                        ),
                        a: ({ node, ...props }) => {
                          if (props.href && props.href.startsWith('data:audio')) {
                            return (
                              <div className="my-3 p-3 bg-slate-950/50 rounded-lg border border-slate-700 flex flex-col gap-2 shadow-inner">
                                  <div className="flex items-center gap-2 text-cyan-400">
                                     <Volume2 className="w-4 h-4" />
                                     <span className="text-[10px] font-bold uppercase tracking-widest">Audio Message</span>
                                  </div>
                                  <audio controls src={props.href} className="w-full h-8" />
                              </div>
                            );
                          }
                          return <a className="text-cyan-400 hover:underline break-all" {...props} target="_blank" rel="noopener noreferrer" />;
                        },
                        code({ node, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          const isInline = !match && !String(children).includes('\n');
                          if (!isInline) {
                             return (
                                <InteractiveCodeBlock 
                                    className={className} 
                                    isCodingTrack={isCodingTrack}
                                    onSendMessage={onSendMessage}
                                    {...props}
                                >
                                    {children}
                                </InteractiveCodeBlock>
                             );
                          }
                          return (
                            <code className="bg-slate-950/50 px-1.5 py-0.5 rounded text-cyan-200 font-mono text-xs break-words" {...props}>
                              {children}
                            </code>
                          );
                        },
                        table: ({children}) => (
                            <InteractiveTable isDataTrack={isDataTrack} onSendMessage={onSendMessage}>
                                {children}
                            </InteractiveTable>
                        ),
                        thead: ({children}) => <thead className="bg-slate-900/50 text-indigo-300 font-bold border-b border-slate-700">{children}</thead>,
                        th: ({children}) => <th className="px-4 py-3 text-xs uppercase tracking-wider">{children}</th>,
                        td: ({children}) => <td className="px-4 py-3 border-b border-slate-700/30 text-slate-300 transition-colors hover:bg-white/5">{children}</td>,
                        tr: ({children}) => <tr className="hover:bg-indigo-500/5 transition-colors">{children}</tr>
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
          <div className="flex justify-start w-full animate-fadeIn">
            <div className="flex gap-3 max-w-[90%]">
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
      <div className="p-3 md:p-4 border-t border-slate-700 bg-slate-900 shadow-2xl safe-pb">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-center gap-2 max-w-4xl mx-auto"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isLoading ? "Coach is thinking..." : "Send a message..."}
            disabled={isLoading}
            className="w-full bg-slate-800 text-white placeholder-slate-500 border border-slate-700 rounded-2xl py-3.5 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 transition-all text-base shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="absolute right-2.5 p-2.5 bg-cyan-600 text-white rounded-xl hover:bg-cyan-500 disabled:opacity-0 disabled:scale-95 transition-all shadow-md active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-[10px] text-slate-600 text-center mt-2 uppercase tracking-tighter">Mission Progress is Auto-Saved</p>
      </div>
    </div>
  );
};
