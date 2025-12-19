
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Message, Mission } from '../types';
import ReactMarkdown from 'react-markdown';
import { Send, User, Bot, CheckCircle, Copy, Check, FileText, Volume2, ChevronLeft, Edit3, Play, Table as TableIcon, Save, RefreshCcw, Database, AlertCircle, ShieldCheck } from 'lucide-react';
import Prism from 'prismjs';

export interface ChatInterfaceProps {
  mission: Mission;
  history: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onEndSession: () => void;
  onCompleteMission: () => void;
}

// Custom code block component with syntax highlighting and editing capabilities
const InteractiveCodeBlock = ({ children, className, isCodingTrack, onSendMessage }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(String(children).replace(/\n$/, ''));
  const [copied, setCopied] = useState(false);
  const lang = className?.replace('language-', '') || 'javascript';
  
  // Use Prism for highlighting
  const highlighted = useMemo(() => {
    // Prism.languages might not have the language loaded in a simple ESM import,
    // so we provide a safe fallback or use javascript which is usually built-in
    const grammar = Prism.languages[lang] || Prism.languages.javascript || Prism.languages.clike;
    if (!grammar) return code;
    return Prism.highlight(code, grammar, lang);
  }, [code, lang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToCoach = () => {
    onSendMessage(`Coach, I updated the code. What do you think?\n\n\`\`\`${lang}\n${code}\n\`\`\``);
    setIsEditing(false);
  };

  // Basic Linting: Check for balanced brackets
  const lintStatus = useMemo(() => {
    const stack: string[] = [];
    const pairs: Record<string, string> = { '{': '}', '[': ']', '(': ')' };
    for (const char of code) {
      if (pairs[char]) stack.push(char);
      else if (Object.values(pairs).includes(char)) {
        const last = stack.pop();
        if (!last || pairs[last] !== char) return { ok: false, msg: 'Unbalanced brackets detected' };
      }
    }
    return stack.length === 0 ? { ok: true, msg: 'Syntax looks clean' } : { ok: false, msg: 'Open brackets remaining' };
  }, [code]);

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');

  return (
    <div className="relative group my-4 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl transition-all hover:border-slate-600 ring-1 ring-slate-800">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${lintStatus.ok ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 animate-pulse'}`} />
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{lang}</span>
            </div>
            {isCodingTrack && (
                <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-1.5 text-[10px] font-black uppercase transition-all ${isEditing ? 'text-rose-400' : 'text-indigo-400 hover:text-indigo-300'}`}
                >
                    <Edit3 className="w-3 h-3" />
                    {isEditing ? 'Discard' : 'Edit Script'}
                </button>
            )}
            {!lintStatus.ok && <span className="text-[9px] text-rose-400/80 font-bold hidden sm:inline italic">({lintStatus.msg})</span>}
        </div>
        <div className="flex items-center gap-3">
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span className={copied ? 'text-emerald-400' : 'hidden sm:inline'}>{copied ? 'Copied' : 'Copy'}</span>
            </button>
        </div>
      </div>

      <div className="flex relative min-h-[100px] max-h-[500px] overflow-hidden">
        {/* Gutter */}
        <div className="bg-slate-900/50 border-r border-slate-800 px-3 py-4 text-right select-none font-mono text-xs text-slate-600 leading-relaxed min-w-[3.5rem]">
          <pre className="m-0 p-0 overflow-hidden">{lineNumbers}</pre>
        </div>

        {/* Editor Area */}
        <div className="flex-1 relative overflow-auto custom-scrollbar bg-slate-950/40">
          {isEditing ? (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-slate-100 font-mono text-sm p-4 focus:outline-none resize-none leading-relaxed min-h-[200px]"
              spellCheck={false}
              autoFocus
            />
          ) : (
            <pre className="p-4 m-0 font-mono text-sm leading-relaxed whitespace-pre overflow-visible">
              <code 
                dangerouslySetInnerHTML={{ __html: highlighted }}
                className={`language-${lang} block outline-none`}
              />
            </pre>
          )}
        </div>
      </div>
      {isEditing && (
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex justify-end">
            <button 
                onClick={handleSendToCoach}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-lg active:scale-95"
            >
                <Save className="w-3.5 h-3.5" /> Save & Send to Coach
            </button>
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
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isCodingTrack = mission.track === 'Coding';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 p-4 flex items-center justify-between backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onEndSession}
            className="p-2 hover:bg-slate-700 rounded-xl transition-colors text-slate-400 hover:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="font-fredoka font-bold text-lg leading-none">{mission.title}</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mt-1">{mission.track} Mission</p>
          </div>
        </div>
        <button 
          onClick={onCompleteMission}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
        >
          <CheckCircle className="w-4 h-4" /> Finish Mission
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-8">
          {history.map((msg, i) => (
            <div 
              key={msg.id} 
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fadeIn`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800 border border-slate-700'
              }`}>
                {msg.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6 text-cyan-400" />}
              </div>
              
              <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                <div className={`px-5 py-3 rounded-2xl text-sm md:text-base leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-slate-800/50 border border-slate-700/50 text-slate-200 rounded-tl-none backdrop-blur-sm'
                }`}>
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        return !inline ? (
                          <InteractiveCodeBlock 
                            className={className} 
                            isCodingTrack={isCodingTrack}
                            onSendMessage={onSendMessage}
                            {...props}
                          >
                            {children}
                          </InteractiveCodeBlock>
                        ) : (
                          <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-cyan-400 text-sm" {...props}>
                            {children}
                          </code>
                        );
                      },
                      p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc ml-4 mb-4 space-y-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal ml-4 mb-4 space-y-2">{children}</ol>,
                      li: ({ children }) => <li className="pl-1">{children}</li>,
                      img: ({ src, alt }) => (
                        <div className="my-4 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                          <img src={src} alt={alt} className="w-full h-auto object-cover max-h-[500px]" />
                        </div>
                      ),
                      a: ({ href, children }) => (
                        <a 
                          href={href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-cyan-400 hover:text-cyan-300 underline font-bold transition-colors"
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-2 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700" />
              <div className="space-y-2 mt-2">
                <div className="h-4 w-64 bg-slate-800 rounded-full" />
                <div className="h-4 w-48 bg-slate-800 rounded-full opacity-50" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-800/30 border-t border-slate-700 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question or response..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600 text-sm md:text-base shadow-inner group-hover:border-slate-600"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-600 mt-3 font-bold uppercase tracking-widest">
          AI Explorer Coach • Be curious, ask anything
        </p>
      </div>
    </div>
  );
};
