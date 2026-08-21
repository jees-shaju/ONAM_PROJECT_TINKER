import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Heart, Check, X, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export function InterestSelectorModal({ isOpen, onClose }) {
  const { userInterests, setUserInterests } = useApp();

  if (!isOpen) return null;

  const allInterests = [
    { id: 'People', label: '❤️ People & Connections', icon: '❤️' },
    { id: 'Food', label: '🍛 Food & Sadya', icon: '🍛' },
    { id: 'Culture', label: '🌼 Culture & Traditions', icon: '🌼' },
    { id: 'Nature', label: '🌴 Nature & Backwaters', icon: '🌴' },
    { id: 'Modern Kerala', label: '🚀 Modern Kerala & Tech', icon: '🚀' },
    { id: 'Music', label: '🎵 Music & Chenda Melam', icon: '🎵' },
    { id: 'Village', label: '🏡 Village Life & Stories', icon: '🏡' },
    { id: 'Unexpected', label: '✨ Unexpected Discoveries', icon: '✨' }
  ];

  const toggleInterest = (interestId) => {
    sound.playPop();
    setUserInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(i => i !== interestId)
        : [...prev, interestId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/85 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-lg glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-400 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950/60 text-cream-200 hover:text-white border border-gold-500/20"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span className="text-xs font-black tracking-widest text-gold-300 uppercase">
            Personalisation
          </span>
        </div>

        <h2 className="text-2xl font-serif font-bold text-cream-50 mb-1">
          What are you curious about?
        </h2>
        <p className="text-xs text-cream-200/80 mb-6">
          Select interests to personalize Maveli’s recommendation engine.
        </p>

        {/* Interests Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {allInterests.map((item) => {
            const isSelected = userInterests.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleInterest(item.id)}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500/20 to-amber-500/20 border-gold-400 text-gold-200 shadow-md'
                    : 'bg-emerald-950/50 border-gold-500/10 text-cream-300 hover:border-gold-500/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.id}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-gold-400" />}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            sound.playChime();
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-black text-sm shadow-xl hover:scale-102 transition-all"
        >
          SAVE INTERESTS & RECOMMEND
        </button>

      </motion.div>
    </div>
  );
}
