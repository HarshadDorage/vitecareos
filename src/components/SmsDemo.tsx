import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RefreshCw, CheckCheck, Signal, Wifi, Battery } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- CONFIGURATION ---
// ⚠️ SAFETY FIRST: In a real app, use a backend proxy. 
// For this demo, we use a "Mock Mode" by default to protect your wallet and ensure speed.
const USE_MOCK_MODE = true; // Set to false ONLY if you have a secure way to call API
const API_KEY = ""; // Your Gemini Key (Only if USE_MOCK_MODE is false)

const SYSTEM_INSTRUCTION = `Role: You are "Sarah," the Front Desk Assistant for "VitaCare Dental".
Goal: Book an appointment. Be short, friendly, and human.
Context: You missed their call.
Rules:
1. Keep texts under 20 words.
2. Offer two times: "Tomorrow at 10 AM or 2 PM?"
3. No medical advice.`;

// --- MOCK RESPONSES (Instant & Safe) ---
const MOCK_RESPONSES = [
  { trigger: ["price", "cost", "much"], response: "It depends on the treatment, but exams start at $99. Would you like to book a consultation to get an exact quote?" },
  { trigger: ["yes", "sure", "ok", "yeah"], response: "Great! We have openings tomorrow at 10:00 AM or 2:00 PM. Which one works best for you?" },
  { trigger: ["10", "2", "pm", "am", "morning"], response: "Perfect. I've locked that time in for you. We'll see you then! 🦷" },
  { trigger: ["insurance"], response: "We accept most major PPO insurance plans. We can verify your coverage when you come in. Shall we book a time?" },
  { default: "I can help with that. Since we missed your call earlier, would you like to schedule a quick check-up? We have time tomorrow." }
];

interface Message {
  role: 'user' | 'model';
  text: string;
  time: string;
}

export const SmsDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi, this is VitaCare. We missed your call. How can we help?", time: "2:00 PM" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getResponse = async (userText: string) => {
    setIsTyping(true);

    // 1. MOCK MODE (Fast & Predictable)
    if (USE_MOCK_MODE || !API_KEY) {
      setTimeout(() => {
        const lowerText = userText.toLowerCase();
        const match = MOCK_RESPONSES.find(r => r.trigger && r.trigger.some(t => lowerText.includes(t)));
        const reply = match ? match.response : MOCK_RESPONSES[MOCK_RESPONSES.length - 1].default;
        
        addMessage('model', reply);
        setIsTyping(false);
      }, 1500); // Fake typing delay
      return;
    }

    // 2. LIVE AI MODE (Only if configured)
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      // Note: In older SDK versions, syntax might differ. Ensure you use the correct method for your version.
      // Providing a generic fetch implementation here for safety if SDK fails.
      const chat = await ai.getGenerativeModel({ model: "gemini-pro" }).generateContent({
        contents: [{ role: 'user', parts: [{ text: SYSTEM_INSTRUCTION + "\n\nUser said: " + userText }] }]
      });
      
      const responseText = chat.response.text();
      addMessage('model', responseText);
    } catch (error) {
      console.error("AI Error:", error);
      // Fallback if AI fails
      addMessage('model', "I'm having trouble checking the schedule right now. Can you try again in a moment?");
    } finally {
      setIsTyping(false);
    }
  };

  const addMessage = (role: 'user' | 'model', text: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role, text, time: now }]);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userText = input.trim();
    addMessage('user', userText);
    setInput('');
    getResponse(userText);
  };

  const handleReset = () => {
    setMessages([{ role: 'model', text: "Hi, this is VitaCare. We missed your call. How can we help?", time: "2:00 PM" }]);
    setInput('');
    setIsTyping(false);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden" id="demo">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Copy */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-blue-200 dark:border-blue-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              LIVE INTERACTIVE DEMO
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Meet Sarah: Your 24/7 <span className="text-primary">Front Desk AI.</span>
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Experience how VitaCareOS automatically handles missed calls. Try chatting with "Sarah" right now to book an appointment.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                { title: "Instant Response", desc: "Responds in < 2 seconds", icon: <Signal className="w-5 h-5 text-green-500" /> },
                { title: "Smart Booking", desc: "Knows your calendar", icon: <CheckCheck className="w-5 h-5 text-blue-500" /> }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{feature.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/50 italic text-slate-700 dark:text-slate-300">
              "VitaCareOS filled our schedule in just 30 days. Sarah handles the heavy lifting so our staff can focus on the patients in the room."
            </div>
          </div>

          {/* Right Side: Phone Simulator */}
          <div className="lg:w-1/2 flex justify-center perspective-1000">
            <div className="relative w-full max-w-[360px] h-[720px] bg-slate-900 rounded-[3.5rem] p-3 shadow-2xl border-[6px] border-slate-800 ring-4 ring-slate-900/20 transform transition-transform hover:scale-[1.01] duration-500">
              
              {/* Phone Buttons */}
              <div className="absolute top-24 -left-2 w-1 h-10 bg-slate-700 rounded-l-md" />
              <div className="absolute top-40 -left-2 w-1 h-16 bg-slate-700 rounded-l-md" />
              <div className="absolute top-32 -right-2 w-1 h-20 bg-slate-700 rounded-r-md" />

              {/* Screen */}
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[2.8rem] overflow-hidden flex flex-col relative z-10">
                
                {/* Status Bar */}
                <div className="h-12 bg-white dark:bg-slate-950 flex items-center justify-between px-6 pt-2 shrink-0 select-none">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">9:41</span>
                  {/* Dynamic Island / Notch Area */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-7 bg-black rounded-full z-20" />
                  <div className="flex gap-1.5 text-slate-900 dark:text-white">
                    <Signal className="w-3.5 h-3.5" />
                    <Wifi className="w-3.5 h-3.5" />
                    <Battery className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* App Header */}
                <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-tr from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20">
                      V
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">VitaCare</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Sarah • SMS Assistant</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    title="Reset Demo"
                  >
                    <RefreshCw className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                {/* Messages Area */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950 scroll-smooth"
                >
                  <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                          msg.role === 'user' 
                            ? 'bg-primary text-white rounded-br-none' 
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-800'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1 px-1 opacity-70">{msg.time}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 pb-6">
                  <div className="relative flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Text Message"
                      className="flex-1 pl-4 pr-10 py-2.5 bg-slate-100 dark:bg-slate-900 border border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-primary/20 rounded-full text-sm outline-none transition-all dark:text-white"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isTyping}
                      className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:scale-95 transition-all hover:scale-105 hover:shadow-lg active:scale-95 shrink-0"
                    >
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};