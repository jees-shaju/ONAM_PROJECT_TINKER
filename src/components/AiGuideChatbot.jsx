import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Volume2, VolumeX, Bot, Compass, Feather, Move } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/sound';

export function AiGuideChatbot() {
  const { currentLocation, formattedTimeRemaining, myDayExperiences, getNextRecommendation } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'kili',
      text: `Namaskaram Thamburane! I am Kili 🦜, your adorable Kerala AI guide! Where shall we take King Maveli next in his 24-hour journey?`
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  // Handle quick prompt clicks
  const handleQuickPrompt = (promptText) => {
    sound.playPop();
    setInputVal('');
    
    // User message
    const userMsg = { id: Date.now(), sender: 'user', text: promptText };
    setMessages((prev) => [...prev, userMsg]);

    // Bot response logic
    setTimeout(() => {
      let replyText = '';
      if (promptText.includes('Suggest next event')) {
        const nextRec = getNextRecommendation();
        if (nextRec) {
          replyText = `🦜 Based on your current spot in ${currentLocation}, I highly recommend "${nextRec.title}" in ${nextRec.district}! It takes about ${nextRec.duration} mins.`;
        } else {
          replyText = `🦜 You're exploring amazingly! Let's check out the Thripunithura Athachamayam or Aranmula Valla Sadya in Pathanamthitta!`;
        }
      } else if (promptText.includes('Tell Onam History')) {
        replyText = `🦜 Onam marks the annual homecoming of King Maveli! During his golden reign in ancient Kerala, equality, peace, and prosperity prevailed. Today we honor his spirit with Pookalams, Sadya, and boat races!`;
      } else if (promptText.includes('Show 24-hr schedule')) {
        replyText = `🦜 You currently have ⏳ ${formattedTimeRemaining()} remaining in your 24-hour Onam journey with ${myDayExperiences.length} experiences scheduled!`;
      } else if (promptText.includes('Kerala news update')) {
        replyText = `🦜 K-NEWS FLASH: K-FON gigabit broadband has reached 20,000 rural schools, and Kochi Water Metro launched 5 new electric ferries for Onam visitors!`;
      } else {
        replyText = `🦜 That sounds wonderful! Let's make sure King Maveli experiences every vibrant corner of Kerala today!`;
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'kili', text: replyText }]);
      sound.playChime();
    }, 600);
  };

  // Custom text submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleQuickPrompt(inputVal);
  };

  return (
    <>
      {/* Draggable Cute Floating Kili Avatar */}
      <motion.div
        drag
        dragConstraints={{ left: -800, right: 800, top: -800, bottom: 800 }}
        whileDrag={{ scale: 1.1 }}
        initial={{ x: 0, y: 0 }}
        className="fixed bottom-20 right-6 z-50 select-none flex flex-col items-end"
      >
        {/* Floating Bubble Teaser */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gold-100 to-amber-50 text-emerald-950 text-xs font-black shadow-xl border border-gold-400 flex items-center gap-1.5 cursor-pointer"
            onClick={() => {
              sound.playPop();
              setIsOpen(true);
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
            <span>Ask Kili AI 🦜 (Drag me anywhere!)</span>
          </motion.div>
        )}

        {/* Cute Avatar Button */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            sound.playPop();
            setIsOpen(!isOpen);
          }}
          className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-400 to-gold-300 p-1 shadow-2xl border-2 border-gold-300 cursor-grab active:cursor-grabbing flex items-center justify-center group"
        >
          {/* Glowing Aura */}
          <div className="absolute -inset-2 rounded-full bg-gold-400/30 blur-md group-hover:bg-gold-400/50 transition-all animate-pulse" />

          {/* Cute Kerala Green Parrot Avatar Face */}
          <div className="relative w-full h-full rounded-full bg-emerald-950 flex items-center justify-center overflow-hidden">
            <span className="text-3xl filter drop-shadow-md">🦜</span>
            <span className="absolute top-0 right-1 text-xs">👑</span>
          </div>

          {/* Drag Handle Indicator */}
          <div className="absolute -top-1 -left-1 bg-gold-500 text-emerald-950 p-0.5 rounded-full border border-gold-300 shadow">
            <Move className="w-3 h-3" />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-36 right-6 z-50 w-80 sm:w-96 glass-panel-gold rounded-3xl border-2 border-gold-400/60 shadow-2xl overflow-hidden flex flex-col h-[460px]"
          >
            {/* Chatbot Header */}
            <div className="p-3.5 bg-emerald-950/90 border-b border-gold-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-400 to-emerald-500 flex items-center justify-center text-xl shadow-md border border-gold-300">
                  🦜
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-serif font-black text-sm text-gold-300">KILI AI</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-gold-500/20 text-gold-300 font-bold">
                      KERALA GUIDE
                    </span>
                  </div>
                  <p className="text-[10px] text-cream-200/80">Draggable • Powered by Kerala Knowledge</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className="p-1.5 rounded-full hover:bg-gold-500/20 text-cream-200"
                  title={isAudioEnabled ? 'Mute Chimes' : 'Enable Chimes'}
                >
                  {isAudioEnabled ? <Volume2 className="w-4 h-4 text-gold-400" /> : <VolumeX className="w-4 h-4 text-red-400" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gold-500/20 text-cream-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Action Chips */}
            <div className="p-2 bg-emerald-950/60 border-b border-gold-500/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
              <button
                onClick={() => handleQuickPrompt('Suggest next event')}
                className="px-2.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 hover:bg-gold-500/30 text-gold-300 whitespace-nowrap font-bold flex items-center gap-1"
              >
                <Compass className="w-3 h-3 text-gold-400" />
                <span>Next Event</span>
              </button>
              <button
                onClick={() => handleQuickPrompt('Tell Onam History')}
                className="px-2.5 py-1 rounded-full bg-emerald-900/40 border border-emerald-700/40 hover:bg-emerald-800 text-cream-100 whitespace-nowrap font-bold flex items-center gap-1"
              >
                <Feather className="w-3 h-3 text-emerald-400" />
                <span>Onam History</span>
              </button>
              <button
                onClick={() => handleQuickPrompt('Show 24-hr schedule')}
                className="px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 hover:bg-amber-900 text-amber-300 whitespace-nowrap font-bold"
              >
                24-Hr Clock
              </button>
              <button
                onClick={() => handleQuickPrompt('Kerala news update')}
                className="px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900 text-cyan-300 whitespace-nowrap font-bold"
              >
                K-News
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-bold shadow-md rounded-tr-none'
                        : 'bg-emerald-950/90 text-cream-100 border border-gold-500/30 shadow-md rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-2.5 bg-emerald-950/90 border-t border-gold-500/20 flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask Kili about Onam or Kerala..."
                className="flex-1 px-3.5 py-2 rounded-full bg-emerald-900/60 border border-gold-500/30 text-cream-100 placeholder-cream-300/50 text-xs focus:outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 hover:scale-105 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
