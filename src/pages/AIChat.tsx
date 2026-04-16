import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

const SYSTEM_PROMPT = `You are ArchiNova AI, an expert Architecture Mentor for Class 12 students in India.
Guide them on B.Arch, NATA, JEE Paper 2, colleges, and skills. Keep answers concise, structured, and friendly.

Here are some examples of how you should respond:

User: What subjects do I need in 12th for architecture?
ArchiNova AI: To pursue B.Arch in India, you **must** have Physics, Chemistry, and Mathematics (PCM) in your 12th grade. Most top colleges require at least a 50% aggregate score.

User: Which is better, NATA or JEE Paper 2?
ArchiNova AI: It depends on your target colleges! 
• **NATA** is accepted by almost all state and private architecture colleges (like CEPT, JJ College).
• **JEE Main Paper 2** is specifically required for NITs, SPAs, and centrally funded institutes.
I recommend appearing for **both** to maximize your options.

User: Do I need to be great at drawing?
ArchiNova AI: You don't need to be Picasso, but you do need good **spatial understanding** and basic sketching skills (perspective, proportions, 2D/3D composition). You can definitely learn this with practice!`;

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: "Hi there! I'm ArchiNova AI, your Architecture Mentor. Whether you have questions about NATA, JEE Paper 2, drawing skills, or top colleges, I'm here to help. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [provider, setProvider] = useState<string>('AI');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    setIsLoading(true);
    setIsWakingUp(false);

    // Show a message if it takes more than 3 seconds (likely HF waking up).
    const wakeUpTimer = setTimeout(() => {
      setIsWakingUp(true);
    }, 3000);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          userMsg,
          systemPrompt: SYSTEM_PROMPT
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server Error (${response.status})`);
      }
      
      const result = await response.json();
      
      if (result.provider) {
        setProvider(result.provider);
      }

      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        content: result.reply 
      }]);
    } catch (error: any) {
      console.error("Error calling AI API:", error);
      
      let errorMessage = "Oops! I encountered an error. Please check your API keys or try asking again.";
      if (error.name === 'AbortError') {
        errorMessage = "The request timed out. The Hugging Face model might be taking too long to wake up. Please try again.";
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }

      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        content: errorMessage 
      }]);
    } finally {
      clearTimeout(wakeUpTimer);
      setIsLoading(false);
      setIsWakingUp(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto h-full flex flex-col gap-4 pb-4"
    >
      <div className="bg-slate-900/80 rounded-[20px] border border-white/10 p-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-2">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">AI ADVISOR ONBOARD</div>
          <div className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-400 border border-white/10">
            Powered by {provider}
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">ArchiNova AI Assistant</h1>
        <p className="text-sm text-slate-400">Ask anything about exams, colleges, or preparation strategies.</p>
      </div>

      <div className="flex-1 bg-slate-900/80 border border-white/10 rounded-[20px] overflow-hidden flex flex-col min-h-[400px]">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              key={msg.id} 
              className={cn(
                "flex flex-col max-w-[85%]",
                msg.role === 'user' ? "ml-auto items-end" : "items-start"
              )}
            >
              <div className={cn(
                "px-4 py-3 text-sm shadow-lg",
                msg.role === 'user' 
                  ? "bg-sky-400 text-[#030712] rounded-[12px_12px_0_12px] font-medium" 
                  : "bg-white/[0.03] text-white border border-white/10 rounded-[12px_12px_12px_0]"
              )}>
                {/* Simple markdown-like rendering for bold text and line breaks */}
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? "mt-2" : ""}>
                    {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="font-bold text-cyan-300">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col max-w-[85%] items-start gap-2"
            >
              <div className="px-4 py-3 text-sm bg-white/[0.03] text-white border border-white/10 rounded-[12px_12px_12px_0] flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span className="text-slate-400">Thinking...</span>
              </div>
              {isWakingUp && (
                <div className="flex items-center gap-2 text-xs text-amber-400/80 bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/20">
                  <AlertCircle className="w-3 h-3" />
                  <span>The free Llama model is waking up. This may take up to 30 seconds...</span>
                </div>
              )}
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ArchiNova AI..."
              className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400/50 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-sky-400 hover:bg-sky-300 text-[#030712] px-4 py-2.5 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
