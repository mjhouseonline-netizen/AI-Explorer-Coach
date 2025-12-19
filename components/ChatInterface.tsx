
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Message, Mission, Audience } from '../types';
import { SAFETY_TIPS_KIDS, SAFETY_TIPS_ADULTS } from '../constants';
import ReactMarkdown from 'react-markdown';
import { Send, User, Bot, CheckCircle, Copy, Check, FileText, Volume2, ChevronLeft, Edit3, Play, Table as TableIcon, Save, RefreshCcw, Database, AlertCircle, ShieldCheck, LogOut, Lightbulb, Info, X, Shield } from 'lucide-react';
import Prism from 'prismjs';

export interface ChatInterfaceProps {
  mission: Mission;
  audience: Audience;
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
  
  const highlighted = useMemo(() => {
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

  const lines = useMemo(() => code.split('\n'), [code]);

  // Enhanced Linting
  const lintStatus = useMemo(() => {
    const errors: { line: number; msg: string }[] = [];
    const stack: { char: string; line: number }[] = [];
    const pairs: Record<string, string> = { '{': '}', '[': ']', '(': ')' };
    
    lines.forEach((lineText, index) => {
      const lineNum = index + 1;
      const trimmed = lineText.trim();
      
      // Python specific: no semicolons
      if (lang === 'python' && trimmed.endsWith(';') && !trimmed.includes('#')) {
        errors.push({ line: lineNum, msg: 'Python usually doesn\'t need semicolons (;)' });
      }

      // Suspicious assignment in common languages
      if ((trimmed.startsWith('if ') || trimmed.startsWith('while ')) && 
          trimmed.includes('=') && 
          !trimmed.includes('==') && 
          !trimmed.includes('!=') && 
          !trimmed.includes('<=') && 
          !trimmed.includes('>=')) {
        errors.push({ line: lineNum, msg: 'Use "==" for comparison, not "="' });
      }

      // Bracket matching
      for (const char of lineText) {
        if (pairs[char]) {
          stack.push({ char, line: lineNum });
        } else if (Object.values(pairs).includes(char)) {
          const last = stack.pop();
          if (!last) {
            errors.push({ line: lineNum, msg: `Extra closing bracket: "${char}"` });
          } else if (pairs[last.char] !== char) {
            errors.push({ line: lineNum, msg: `Mismatched bracket: expected "${pairs[last.char]}" but found "${char}"` });
          }
        }
      }
    });

    if (stack.length > 0) {
      errors.push({ 
        line: stack[stack.length - 1].line, 
        msg: `Unclosed bracket: "${stack[stack.length - 1].char}"` 
      });
    }

    return { 
      ok: errors.length === 0, 
      errors, 
      primaryMsg: errors.length > 0 ? errors[0].msg : 'Syntax looks clean' 
    };
  }, [code, lang, lines]);

  return (
    <div className={`relative group my-4 rounded-2xl overflow-hidden border ${!lintStatus.ok ? 'border-rose-500/50 ring-1 ring-rose-500/20' : 'border-slate-700 ring-1 ring-slate-800'} bg-slate-950 shadow-2xl transition-all hover:border-slate-600 font-mono`}>
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${lintStatus.ok ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">{lang}</span>
            </div>
            {!lintStatus.ok && (
              <span className="text-[9px] text-rose-400 font-bold hidden sm:inline italic">
                {lintStatus.primaryMsg}
              </span>
            )}
            {isCodingTrack && (
                <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-1.5 text-[10px] font-black uppercase transition-all ${isEditing ? 'text-rose-400' : 'text-indigo-400 hover:text-indigo-300'}`}
                >
                    <Edit3 className="w-3 h-3" />
                    {isEditing ? 'Discard' : 'Edit Script'}
                </button>
            )}
        </div>
        <div className="flex items-center gap-3">
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors" title="Copy to clipboard">
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span className={copied ? 'text-emerald-400' : 'hidden sm:inline'}>{copied ? 'Copied' : 'Copy'}</span>
            </button>
        </div>
      </div>

      <div className="flex relative min-h-[100px] max-h-[500px] overflow-hidden group/code">
        {/* Floating Copy Button for easy access on hover */}
        {!isEditing && (
          <button 
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-all opacity-0 group-hover/code:opacity-100 z-20 backdrop-blur-md border border-slate-700 shadow-xl"
            title="Copy code"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
          </button>
        )}

        {/* Gutter with Line-Specific Error Markers */}
        <div className={`bg-slate-900/50 border-r ${!lintStatus.ok ? 'border-rose-500/30' : 'border-slate-800'} px-3 py-4 text-right select-none font-mono text-xs text-slate-600 leading-relaxed min-w-[3.5rem]`}>
          {lines.map((_, i) => {
            const lineNum = i + 1;
            const hasError = lintStatus.errors.some(e => e.line === lineNum);
            return (
              <div key={i} className="relative group/line">
                {hasError && (
                  <div 
                    className="absolute -left-3 top-0 bottom-0 w-1 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.5)] z-10" 
                    title={lintStatus.errors.find(e => e.line === lineNum)?.msg}
                  />
                )}
                <span className={`${hasError ? 'text-rose-400 font-bold' : ''}`}>
                  {lineNum}
                </span>
              </div>
            );
          })}
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
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
            <div className="text-[10px] text-slate-500 italic">
              {lintStatus.ok ? 'Code looks valid!' : `Warning: ${lintStatus.primaryMsg}`}
            </div>
            <div className="flex items-center gap-2">
                <button 
                    onClick={handleCopy}
                    className="text-slate-500 hover:text-white p-2 transition-colors"
                    title="Copy current edit"
                >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button 
                    onClick={handleSendToCoach}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-lg active:scale-95"
                >
                    <Save className="w-3.5 h-3.5" /> Save & Send to Coach
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  mission, 
  audience,
  history, 
  isLoading, 
  onSendMessage, 
  onEndSession, 
  onCompleteMission 
}) => {
  const [input, setInput] = useState('');
  const [showSafetyHub, setShowSafetyHub] = useState(false);
  const [activeSafetyTip, setActiveSafetyTip] = useState<string | null>(null);
  const [hasShownTip, setHasShownTip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isCodingTrack = mission.track === 'Coding';

  // Occasional safety pop-up: Trigger once per mission after a 15-second delay
  useEffect(() => {
    // Reset tip status when a new mission starts
    setHasShownTip(false);
    setActiveSafetyTip(null);

    const timer = setTimeout(() => {
      const tips = audience === 'kids' ? SAFETY_TIPS_KIDS : SAFETY_TIPS_ADULTS;
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setActiveSafetyTip(randomTip);
      setHasShownTip(true);
    }, 15000); // 15-second delay to feel like an occasional pop-up

    return () => clearTimeout(timer);
  }, [mission.id, audience]);

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

  const currentSafetyTips = audience === 'kids' ? SAFETY_TIPS_KIDS : SAFETY_TIPS_ADULTS;

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 absolute inset-0">
      {/* Header */}
      <div className="bg-slate-800/90 border-b border-slate-700 p-3 md:p-4 flex items-center justify-between backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          <button 
            onClick={onEndSession}
            className="p-2 hover:bg-slate-700 rounded-xl transition-colors text-slate-400 hover:text-white shrink-0"
            title="Return to Dashboard"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="min-w-0">
            <h2 className="font-fredoka font-bold text-sm md:text-lg leading-none truncate">{mission.title}</h2>
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-cyan-400 mt-1">{mission.track} Mission</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-2">
          <button 
            onClick={() => setShowSafetyHub(!showSafetyHub)}
            className={`p-2 rounded-xl transition-all border flex items-center gap-2 ${showSafetyHub ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-700/50 border-slate-600/50 text-slate-400 hover:text-amber-400'}`}
            title="AI Safety Hub"
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest">Safety Hub</span>
          </button>
          <button 
            onClick={onEndSession}
            className="bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all border border-slate-600/50 active:scale-95 whitespace-nowrap"
          >
            <Save className="w-4 h-4" /> <span className="hidden sm:inline">Save & Exit</span><span className="sm:hidden">Exit</span>
          </button>
          <button 
            onClick={onCompleteMission}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-95 whitespace-nowrap"
          >
            <CheckCircle className="w-4 h-4" /> <span className="hidden sm:inline">Finish Mission</span><span className="sm:hidden">Finish</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Floating Safety Pop-up */}
        {activeSafetyTip && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg px-4 animate-slideDown">
            <div className="bg-slate-900/90 border-2 border-amber-500/30 rounded-[2rem] p-6 flex gap-4 items-center shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl group relative ring-1 ring-white/10">
              <div className="absolute top-4 right-4">
                 <button 
                  onClick={() => setActiveSafetyTip(null)} 
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-all"
                  title="Dismiss Tip"
                 >
                   <X className="w-4 h-4" />
                 </button>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-inner">
                 <Shield className="w-7 h-7 text-amber-500 animate-pulse" />
              </div>
              <div className="pr-6">
                <h4 className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Explorer Safety Tip</h4>
                <div className="text-slate-100 text-sm font-bold leading-relaxed prose prose-invert prose-sm">
                  <ReactMarkdown>{activeSafetyTip}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-hide safe-pb">
          <div className="max-w-4xl mx-auto space-y-8">
            {history.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fadeIn`}
              >
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                  msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800 border border-slate-700'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 md:w-6 md:h-6" /> : <Bot className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />}
                </div>
                
                <div className={`flex flex-col max-w-[90%] sm:max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                  <div className={`px-4 py-3 md:px-5 md:py-3.5 rounded-2xl text-sm md:text-base leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-slate-800/50 border border-slate-700/50 text-slate-200 rounded-tl-none backdrop-blur-sm'
                  }`}>
                    <ReactMarkdown
                      components={{
                        blockquote: ({ children }) => (
                          <div className="my-4 p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl text-slate-300 text-xs md:text-sm flex gap-3 items-start animate-slideIn">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
                            <div className="italic font-medium">{children}</div>
                          </div>
                        ),
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
                          <div className="my-4 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 min-h-[100px] flex items-center justify-center">
                            <img src={src} alt={alt} className="w-full h-auto object-cover max-h-[500px]" loading="lazy" />
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
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-slate-800 border border-slate-700" />
                <div className="space-y-2 mt-2">
                  <div className="h-4 w-48 sm:w-64 bg-slate-800 rounded-full" />
                  <div className="h-4 w-32 sm:w-48 bg-slate-800 rounded-full opacity-50" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Safety Hub Sidebar - Only visible when toggled */}
        <div className={`
          fixed md:relative z-40 inset-y-0 right-0 w-80 md:w-96 bg-slate-800/95 md:bg-slate-800/40 border-l border-slate-700 backdrop-blur-xl transition-all duration-500 ease-in-out transform
          ${showSafetyHub ? 'translate-x-0' : 'translate-x-full md:hidden'}
        `}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-fredoka font-bold text-xl text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-amber-500" /> AI Safety Hub
              </h3>
              <button onClick={() => setShowSafetyHub(false)} className="p-2 hover:bg-slate-700 rounded-full md:hidden">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-6">Responsible Usage Guide</p>
            
            <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide pr-1">
              {currentSafetyTips.map((tip, i) => (
                <div key={i} className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl group hover:border-amber-500/30 transition-all">
                  <div className="text-sm font-bold text-slate-300 leading-relaxed group-hover:text-white">
                    <ReactMarkdown>{tip}</ReactMarkdown>
                  </div>
                </div>
              ))}
              
              <div className="mt-8 p-6 bg-indigo-600/10 border border-indigo-500/30 rounded-3xl">
                <div className="flex items-center gap-3 mb-3">
                  <Bot className="w-6 h-6 text-indigo-400" />
                  <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400">Coach Commitment</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  "I'm here to help you explore AI safely. If you're ever unsure about an answer I give or a prompt you write, just ask me about AI ethics!"
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowSafetyHub(false)}
              className="mt-6 w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
            >
              Back to Exploration
            </button>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-3 md:p-6 bg-slate-900/80 border-t border-slate-700 backdrop-blur-md shadow-[0_-8px_30px_rgba(0,0,0,0.3)] safe-pb">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoading ? "AI Coach is thinking..." : "Ask your Coach anything..."}
            className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-5 py-3.5 pr-14 md:px-6 md:py-4 md:pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600 text-sm md:text-base shadow-inner group-hover:border-slate-600 disabled:opacity-50"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 md:p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all disabled:opacity-0 disabled:scale-90 shadow-lg active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-center text-[9px] md:text-[10px] text-slate-600 mt-3 font-bold uppercase tracking-[0.2em] opacity-50">
          Be curious, fail fast, and explore with AI Explorer Coach
        </p>
      </div>
    </div>
  );
};
