import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Pookalam } from './Pookalam';
import { Flower2, MapPin, Heart, Sparkles, RefreshCw, Trophy } from 'lucide-react';
import { sound } from '../utils/sound';
import { useNavigate } from 'react-router-dom';

export function FinalDaySummary({ onClose }) {
  const { completedMemories, myDayExperiences, setIsDayFinished } = useApp();
  const navigate = useNavigate();

  const handleViewMemories = () => {
    sound.playChime();
    setIsDayFinished(false);
    navigate('/memories');
  };

  const handleReplay = () => {
    sound.playChime();
    setIsDayFinished(false);
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/90 backdrop-blur-md pookalam-pattern overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl glass-panel-gold rounded-3xl p-6 sm:p-10 border border-gold-400 shadow-2xl relative my-8 text-center"
      >
        {/* Top Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-black tracking-widest uppercase mb-4">
          <Trophy className="w-4 h-4 text-gold-400" />
          <span>JOURNEY RECAP</span>
        </span>

        <h1 className="text-3xl sm:text-5xl font-serif font-black text-cream-50 gold-glow-text mb-2">
          YOUR DAY IS COMPLETE.
        </h1>

        <p className="text-sm text-cream-200/90 max-w-md mx-auto mb-6">
          "You didn't just travel through Kerala. You discovered it."
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-emerald-950/60 p-4 rounded-2xl border border-gold-500/20">
            <span className="text-2xl font-black text-gold-400 block">{completedMemories.length}</span>
            <span className="text-xs text-cream-200/80 uppercase font-bold">Memories</span>
          </div>
          <div className="bg-emerald-950/60 p-4 rounded-2xl border border-gold-500/20">
            <span className="text-2xl font-black text-rose-400 block">50+</span>
            <span className="text-xs text-cream-200/80 uppercase font-bold">People Met</span>
          </div>
          <div className="bg-emerald-950/60 p-4 rounded-2xl border border-gold-500/20">
            <span className="text-2xl font-black text-amber-400 block">{myDayExperiences.length}</span>
            <span className="text-xs text-cream-200/80 uppercase font-bold">Experiences</span>
          </div>
          <div className="bg-emerald-950/60 p-4 rounded-2xl border border-gold-500/20">
            <span className="text-2xl font-black text-emerald-400 block">3</span>
            <span className="text-xs text-cream-200/80 uppercase font-bold">Detours</span>
          </div>
        </div>

        {/* Center Blooming Pookalam */}
        <div className="my-6">
          <Pookalam />
        </div>

        {/* Final Quote */}
        <div className="my-6 space-y-1">
          <h3 className="text-2xl font-serif font-extrabold text-gold-300">
            ONE DAY. A THOUSAND MEMORIES.
          </h3>
          <p className="text-xs text-cream-300/80 italic">
            See you next Onam, Maveli.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-gold-500/20">
          <button
            onClick={handleViewMemories}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-black text-sm shadow-xl hover:scale-105 transition-all"
          >
            VIEW MY MEMORIES
          </button>
          <button
            onClick={handleReplay}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-900/50 hover:bg-emerald-800/70 text-cream-200 border border-emerald-600/40 font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>REPLAY MY JOURNEY</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
