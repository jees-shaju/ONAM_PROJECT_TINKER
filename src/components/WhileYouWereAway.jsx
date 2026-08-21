import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KERALA_CHANGES } from '../data/whatChanged';
import { Maveli } from './Maveli';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

export function WhileYouWereAway({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);

  const handleNext = () => {
    sound.playChime();
    if (stepIndex < KERALA_CHANGES.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      sound.playCelebration();
      onComplete();
    }
  };

  const currentItem = KERALA_CHANGES[stepIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/90 backdrop-blur-md pookalam-pattern">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl glass-panel-gold rounded-3xl p-6 sm:p-10 border border-gold-500/40 shadow-2xl relative overflow-hidden text-center"
      >
        
        {/* Glowing Background Particles */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-terracotta-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Title */}
        <div className="mb-6 space-y-2">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" /> 364 Days Ago vs Today
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-cream-50 gold-glow-text">
            Welcome back, Maveli.
          </h1>
          <p className="text-sm text-cream-200/80 font-medium">
            You've been away for <span className="text-gold-400 font-bold">364 days</span>. Here is what transformed in your kingdom:
          </p>
        </div>

        {/* Center Maveli Character */}
        <div className="my-4 flex justify-center">
          <Maveli
            expression={stepIndex === 0 ? 'nostalgic' : stepIndex === 1 ? 'curious' : stepIndex === 2 ? 'surprised' : stepIndex === 3 ? 'thoughtful' : 'happy'}
            message={currentItem.maveliQuote}
            size="md"
          />
        </div>

        {/* Changing Animated Card */}
        <div className="min-h-[160px] flex items-center justify-center my-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`w-full p-5 rounded-2xl bg-gradient-to-r ${currentItem.color} border ${currentItem.borderColor} text-left shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{currentItem.icon}</span>
                <div>
                  <span className="text-xs font-extrabold tracking-wider text-gold-400 uppercase">
                    {currentItem.category}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-cream-50">
                    {currentItem.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-cream-100 font-semibold mb-3">
                "{currentItem.summary}"
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-cream-200/90 pt-2 border-t border-gold-500/20">
                <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/40">
                  <span className="text-gold-400 font-bold block mb-0.5">364 DAYS AGO</span>
                  <span>{currentItem.then}</span>
                </div>
                <div className="bg-gold-500/10 p-2.5 rounded-xl border border-gold-500/30">
                  <span className="text-amber-300 font-bold block mb-0.5">TODAY IN KERALA</span>
                  <span>{currentItem.today}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar & Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {KERALA_CHANGES.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === stepIndex ? 'w-8 bg-gold-400' : 'w-2 bg-emerald-800'
                }`}
              />
            ))}
          </div>

          <div className="text-xs text-cream-300 font-medium">
            Tomorrow you leave again. <span className="text-gold-400 font-bold">You have ONE DAY.</span>
          </div>

          {/* Action Button */}
          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 via-amber-500 to-terracotta-500 hover:from-gold-400 hover:to-amber-500 text-emerald-950 font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>{stepIndex === KERALA_CHANGES.length - 1 ? 'SHOW ME WHAT I CAN EXPERIENCE' : 'NEXT INSIGHT'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </motion.div>
    </div>
  );
}
