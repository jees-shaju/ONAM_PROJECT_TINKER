import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Clock, ArrowRight, X } from 'lucide-react';
import { sound } from '../utils/sound';

export function DiscoveryPopup({ discovery, onDiscover, onKeepGoing }) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoice = (choice) => {
    sound.playPop();
    setSelectedChoice(choice);
  };

  const handleComplete = () => {
    sound.playCelebration();
    onDiscover(discovery, selectedChoice);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md glass-panel-gold rounded-3xl p-6 border border-gold-400 shadow-2xl relative overflow-hidden"
      >
        
        {/* Header Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>✨ ON THE WAY DISCOVERY</span>
          </span>
          <span className="text-xs text-amber-300 font-bold bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            ⏱️ {discovery.detourMins} min detour
          </span>
        </div>

        {/* Discovery Title & Icon */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl animate-bounce-gentle">{discovery.icon}</span>
          <div>
            <h3 className="text-xl font-serif font-bold text-cream-50">
              {discovery.title}
            </h3>
            <p className="text-xs text-cream-200/80">
              📍 {discovery.distanceFromRoute} • {discovery.location}
            </p>
          </div>
        </div>

        <p className="text-xs text-cream-100 bg-emerald-950/50 p-3 rounded-xl border border-gold-500/20 mb-4 leading-relaxed">
          "{discovery.description}"
        </p>

        {/* Interactive Choices if discovering */}
        {selectedChoice ? (
          <div className="space-y-3 mb-6 bg-gold-500/10 p-3.5 rounded-xl border border-gold-500/30 text-xs text-cream-100">
            <p className="font-bold text-amber-300">You chose: {selectedChoice.text}</p>
            <p className="italic">{selectedChoice.response}</p>
            <button
              onClick={handleComplete}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-black text-xs shadow-md mt-2"
            >
              SAVE DETOUR MEMORY & CONTINUE JOURNEY 🌼
            </button>
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-300 block mb-2">
              What should Maveli do?
            </span>
            <div className="space-y-2 mb-6">
              {discovery.interactiveChoices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  className="w-full text-left p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-gold-500/20 hover:border-gold-400 text-xs text-cream-100 font-medium transition-all flex items-center justify-between group"
                >
                  <span>{choice.text}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-gold-500/20">
              <button
                onClick={onKeepGoing}
                className="w-full py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 text-cream-300 border border-emerald-700/50 text-xs font-bold transition-all"
              >
                KEEP GOING ON ROUTE
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
