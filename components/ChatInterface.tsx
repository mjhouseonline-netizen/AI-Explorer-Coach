
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Message, Mission } from '../types';
import ReactMarkdown from 'react-markdown';
import { Send, User, Bot, CheckCircle, Copy, Check, FileText, Volume2, ChevronLeft, Edit3, Play, Table as TableIcon, Save, RefreshCcw, Database } from 'lucide-react';

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
    onSendMessage(`Coach, I changed the code to this. Can you check it?\n\n\`\`\`${className?.replace('language-', '') || 'code'}\n${code}\n\`\`\``);
    setIsEditing(false);
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-xl transition-all hover:border-slate-600">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
            {className?.replace('language-', '') || 'text'}
            </span>
            {isCodingTrack && (
                <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase transition-all ${isEditing ? 'text-amber-400' : 'text-slate-400 hover:text-white'}`}
                >
                    <Edit3 className="w-3 h-3" />
                    {isEditing ? 'Discard' : 'Edit Code'}
                </button>
            )}
        </div>
        <div className="flex items-center gap-3">
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span className={copied ? 'text-emerald-400' : 'hidden sm:inline'}>{copied ? 'Copied' : 'Copy'}</span>
            </button>
        </div>
      </div>
      <div className="relative">
        {isEditing ? (
          <div className="flex flex-col">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-48 bg-slate-900 text-cyan-50 font-mono text-sm p-4 focus:outline-none resize-none"
              spellCheck={false}
              autoFocus
            />
            <div className="p-2 bg-slate-800 border-t border-slate-700 flex justify-end">
                <button onClick={handleSendToCoach} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-md">
                    <Send className="w-3 h-3" />
                    Review with Coach
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
    return (
        <div className="my-6 rounded-xl overflow-hidden border border-slate-700 bg-slate-800/40 shadow-xl group/table transition-all hover:border-indigo-500/30">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2 text-indigo-400">
                    <Database className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Dataset View</span>
                </div>
                {isDataTrack && (
                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className={`flex items-center gap-1.5 text-[10px] font-bold uppercase transition-all ${isEditing ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                    >
                        {isEditing ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
                        {isEditing ? 'Done' : 'Manipulate'}
                    </button>
                )}
            </div>
            <div className={`overflow-x-auto p-2 md:p-4 transition-colors ${isEditing ? 'bg-indigo-950/10' : ''}`}>
                <table className="w-full text-xs md:text-sm text-left border-collapse">
                    {children}
                </table>
            </div>
            {isEditing && (
                <div className="p-3 bg-indigo-900/10 border-t border-slate-800 text-center animate-pulse">
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Interactive Sandbox Active</p>
                </div>
            )}
        </div>
    );
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  mission, history, isLoading, onSendMessage, onEndSession, onCompleteMission
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isCodingTrack = mission.track === 'Coding';
  const isDataTrack = mission.track === 'Data';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
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
    a.download = `${mission.title.replace(/\s+/g, '-')}-Transcript.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 absolute inset-0 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 md:p-3 border-b border-slate-700 bg-slate-800/95 backdrop-blur-xl z-10 shadow-lg">
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <button onClick={onEndSession} className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 md:py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-100 rounded-xl transition-all border border-slate-600/50 group shrink-0 shadow-sm active:scale-95">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                <span className="font-bold text-xs">Exit</span>
            </button>
            <div className="min-w-0">
                <div className="text-[9px] md:text-[10px] text-cyan-400 uppercase font-black tracking-widest leading-none mb-1 opacity-80">Mission</div>
                <h2 className="text-xs md:text-base font-bold font-fredoka text-white truncate leading-tight">{mission.title}</h2>
            </div>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 ml-2">
            <button onClick={handleDownloadTranscript} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg hidden sm:block transition-all">
                <FileText className="w-5 h-5" />
            </button>
            <button onClick={onCompleteMission} className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 md:px-3.5 py-1.5 md:py-2.5 rounded-xl text-xs md:text-sm font-black transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
                <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Finish</span>
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-6 scrollbar-hide safe-pb bg-slate-900/50">
        {history.map((msg) => {
           if (msg.role === 'system') return null;
           const isUser = msg.role === 'user';
           return (
            <div key={msg.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
              <div className={`flex max-w-[95%] sm:max-w-[85%] md:max-w-[80%] gap-2.5 md:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xl ${isUser ? 'bg-indigo-600' : 'bg-cyan-600'}`}>
                  {isUser ? <User className="w-5 h-5 md:w-6 md:h-6 text-white" /> : <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />}
                </div>
                <div className={`p-3.5 md:p-5 rounded-2xl md:rounded-3xl shadow-2xl text-sm md:text-base leading-relaxed ${isUser ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none'}`}>
                  <div className="prose prose-invert prose-sm md:prose-base max-w-none">
                    <ReactMarkdown
                      components={{
                        img: ({node, ...props}) => <img className="rounded-xl shadow-lg max-w-full h-auto my-4 border border-slate-700" {...props} />,
                        a: ({ node, ...props }) => {
                          if (props.href?.startsWith('data:audio')) {
                            return (
                              <div className="my-4 p-4 bg-slate-950/60 rounded-2xl border border-slate-700 flex flex-col gap-3 shadow-inner">
                                  <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-black uppercase tracking-widest"><Volume2 className="w-4 h-4" /> Audio Message</div>
                                  <audio controls src={props.href} className="w-full h-9" />
                              </div>
                            );
                          }
                          return <a className="text-cyan-400 hover:underline font-bold" {...props} target="_blank" />;
                        },
                        code({ node, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          const isInline = !match && !String(children).includes('\n');
                          return isInline ? (
                            <code className="bg-slate-950/50 px-1.5 py-0.5 rounded text-cyan-300 font-mono text-xs" {...props}>{children}</code>
                          ) : (
                            <InteractiveCodeBlock className={className} isCodingTrack={isCodingTrack} onSendMessage={onSendMessage} {...props}>{children}</InteractiveCodeBlock>
                          );
                        },
                        table: ({children}) => <InteractiveTable isDataTrack={isDataTrack} onSendMessage={onSendMessage}>{children}</InteractiveTable>,
                        th: ({children}) => <th className="px-4 py-3 text-[10px] md:text-xs uppercase tracking-widest bg-slate-900/70 text-indigo-300 font-black border-b border-slate-700">{children}</th>,
                        td: ({children}) => <td className="px-4 py-3 border-b border-slate-700/30 text-slate-300 text-xs md:text-sm">{children}</td>,
                        tr: ({children}) => <tr className="hover:bg-indigo-500/5 transition-colors">{children}</tr>,
                        p: ({children}) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>
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
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg"><Bot className="w-5 h-5 md:w-6 md:h-6 text-white" /></div>
               <div className="bg-slate-800 p-4 rounded-2xl md:rounded-3xl rounded-tl-none border border-slate-700 shadow-xl">
                 <div className="flex gap-1.5 h-6 items-center px-1">
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

      {/* Input */}
      <div className="px-3 py-3 md:p-6 border-t border-slate-700 bg-slate-900 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] safe-pb">
        <form onSubmit={handleSubmit} className="relative flex items-center gap-2 max-w-4xl mx-auto group">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isLoading ? "AI is processing..." : "Message your Coach..."}
            disabled={isLoading}
            className="w-full bg-slate-800 text-white placeholder-slate-500 border border-slate-700 rounded-2xl md:rounded-[1.25rem] py-3 md:py-4 pl-4 md:pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm md:text-base shadow-inner outline-none disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={!inputText.trim() || isLoading} 
            className="absolute right-2 md:right-2.5 p-2.5 md:p-3 bg-cyan-600 text-white rounded-xl md:rounded-2xl hover:bg-cyan-500 disabled:opacity-0 disabled:scale-90 transition-all shadow-xl shadow-cyan-900/20 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="hidden sm:block text-[9px] text-slate-600 text-center mt-3 uppercase font-black tracking-[0.2em] opacity-50">Local Secure Session Auto-Save</p>
      </div>
    </div>
  );
};
