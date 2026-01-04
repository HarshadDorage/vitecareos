
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Smartphone, Activity, Check, CheckCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `Role: You are "Sarah," the friendly and efficient Front Desk Assistant for "VitaCare Dental & Medical". You are communicating via SMS text messages.

Objective: Your primary goal is to help patients book an appointment after they have received a "Missed Call Text Back" from us. You must be empathetic but focused on getting them scheduled.

Tone & Style:
- Professional, warm, and empathetic.
- Concise: Keep responses under 160 characters whenever possible (SMS style).
- Human-like: Use simple language. Do not sound robotic. Do not use hashtags or excessive emojis.

Rules & Guardrails:
- NO Medical Advice: Never diagnose a patient or offer medical advice. If they ask specific medical questions, say: "It's best if the Doctor sees you in person to answer that accurately."
- Pricing: If asked about price, give a range or say: "It depends on the treatment needed. We can give you an exact quote after the consultation."
- Booking: Always steer the conversation toward booking a time. Offer 2 specific slots if asked for availability (e.g., "We have openings tomorrow at 10 AM or 2 PM. Do either work?").
- Emergency: If a patient mentions severe pain or bleeding, advise them to visit the ER or call 911 immediately.

Context: The patient called us, but we missed the call. Our system automatically sent them a text saying: "Hi, this is VitaCare. We missed your call. How can we help?" The patient has just replied to that text. You are now continuing the conversation.`;

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { role: 'user', text: userMessage, time: now }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const chat = ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          maxOutputTokens: 200,
          temperature: 0.7,
        }
      });

      const response = await chat;
      const modelText = response.text || "I'm sorry, I'm having a bit of trouble connecting. Could you try that again?";
      
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: modelText, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    } catch (error) {
      console.error("Sarah connection error:", error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I'm sorry, I'm having a bit of trouble connecting. Could you try that again?", 
        time: now 
      }]);
    }
  };

  return (
    <section className="py-24 bg-softGray overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Activity className="w-4 h-4" />
              LIVE INTERACTIVE DEMO
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Meet Sarah: Your 24/7 <span className="text-primary">Assistant.</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              When you miss a call, VitaCareOS doesn't just send a generic text. Our AI assistant, Sarah, engages patients in a real-time conversation to get them scheduled immediately.
            </p>
            <div className="space-y-6 mb-10">
              <div className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCheck className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Concise & Professional</h4>
                  <p className="text-sm text-slate-500">Optimized for SMS to ensure high response rates.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCheck className="text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Goal-Oriented</h4>
                  <p className="text-sm text-slate-500">Sarah is trained specifically to fill your empty calendar slots.</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 italic text-slate-700">
              "VitaCareOS filled our schedule in just 30 days. Sarah handles the heavy lifting so our staff can focus on the patients in the room."
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            {/* Phone Frame */}
            <div className="relative w-full max-w-[340px] h-[680px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-slate-800 ring-4 ring-slate-900/50">
              {/* Screen Content */}
              <div className="w-full h-full bg-slate-50 rounded-[2.2rem] overflow-hidden flex flex-col">
                {/* iOS Header */}
                <div className="bg-white px-6 pt-8 pb-4 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    V
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">VitaCare Dental</h4>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] text-slate-400 font-medium">Sarah is online</span>
                    </div>
                  </div>
                </div>

                {/* Chat Area */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      key={i}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1 font-medium">{msg.time}</span>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex flex-col items-start">
                      <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type a message..."
                      className="w-full pl-4 pr-12 py-3 bg-slate-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isTyping}
                      className="absolute right-1.5 top-1.5 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-opacity hover:scale-105 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-center text-[9px] text-slate-400 mt-3 font-bold uppercase tracking-widest">
                    Live SMS Simulation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
