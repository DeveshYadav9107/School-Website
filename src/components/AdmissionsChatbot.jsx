'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AGA_DATA } from '@/data/academyData';
import { MessageSquare, X, Send } from 'lucide-react';

export function AdmissionsChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaste! Welcome to RMS World School (Sulkha, Haryana). I am your Admissions & Recruitment Assistant. Select a quick question below or type your query.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    { label: 'Faculty Walk-In', q: 'What are the faculty walk-in interview details?' },
    { label: 'Timings', q: 'What are the school timings?' },
    { label: 'Nursery Age', q: 'What is the age criteria for Nursery?' },
    { label: 'Bus Transport', q: 'Is GPS bus transport available?' },
    { label: 'Campus Tour', q: 'How do I book a campus tour?' },
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text, time: userTime };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    const lower = text.toLowerCase();
    const matched = AGA_DATA.botKnowledge.find((item) =>
      item.keywords.some((keyword) => lower.includes(keyword))
    );

    const replyText = matched ? matched.answer : `
      Thank you for contacting RMS World School regarding "<em>${text}</em>". 
      For admissions or recruitment enquiries, please call our helpdesk at <strong>${AGA_DATA.school.phone}</strong> or <strong>${AGA_DATA.school.phoneAlt}</strong>, 
      or email <strong>${AGA_DATA.school.email}</strong>.
    `;

    setTimeout(() => {
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { sender: 'bot', text: replyText, time: botTime }]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Admissions Help Assistant"
        className="p-3.5 bg-gradient-to-r from-navy-800 to-navy-900 hover:from-navy-700 hover:to-navy-800 text-white rounded-full shadow-2xl border-2 border-gold-400 flex items-center gap-2.5 transition-all duration-300 transform hover:scale-105"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 text-gold-400" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-navy-900" />
        </div>
        <span className="text-xs font-bold tracking-tight pr-1 hidden sm:inline">RMS Help Desk</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[92vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[520px] transition-all animate-fade-in">
          <div className="bg-navy-900 text-white p-4 flex items-center justify-between border-b border-navy-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-navy-800 border border-gold-400 flex items-center justify-center text-gold-400 font-bold text-xs">
                RMS
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-heading">RMS World School Help</h3>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live • Admissions &amp; Careers Desk
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat Window"
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-slate-50 p-2 border-b border-slate-200 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            {quickQuestions.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip.q)}
                className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-medium text-slate-700 hover:border-gold-400 hover:text-navy-800 flex-shrink-0 transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-slate-100/60 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} mb-3`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-navy-800 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about admissions, fees, or careers..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800"
            />
            <button
              type="submit"
              aria-label="Send Message"
              className="p-2 bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-white rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
