import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, MapPin, Clock, Sparkles, X, Quote } from 'lucide-react';
import { sound } from '../utils/sound';

export function MemoryCard({ memory }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    sound.playPop();
    setIsOpen(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        onClick={handleOpen}
        className="glass-panel-gold rounded-2xl p-5 border border-gold-500/30 hover:border-gold-400 cursor-pointer shadow-lg transition-all relative overflow-hidden group"
      >
        {/* Decorative Top Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: memory.color || '#F59E0B' }}
        />

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="flex items-center gap-1.5 text-xs font-black text-gold-300 uppercase tracking-wider">
            <Flower2 className="w-3.5 h-3.5" style={{ color: memory.color || '#F59E0B' }} />
            <span>{memory.district || 'Kerala'}</span>
          </span>
          <span className="text-[10px] text-cream-300/70 font-semibold">
            {memory.timestamp}
          </span>
        </div>

        <h3 className="text-lg font-serif font-bold text-cream-50 group-hover:text-gold-300 transition-colors mb-2">
          {memory.title}
        </h3>

        <p className="text-xs text-cream-200/90 italic line-clamp-2 mb-3">
          "{memory.memoryQuote}"
        </p>

        <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
          {memory.categories.map((cat, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-full bg-emerald-950/70 text-cream-200 border border-emerald-700/50"
            >
              {cat}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Memory Detail Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg glass-panel-gold rounded-3xl p-6 border border-gold-400 shadow-2xl relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950/60 text-cream-200 hover:text-white border border-gold-500/20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Flower2 className="w-5 h-5" style={{ color: memory.color || '#F59E0B' }} />
                <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
                  MEMORY UNLOCKED
                </span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-cream-50 mb-4">
                {memory.title}
              </h2>

              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-gold-500/20 mb-4">
                <div className="flex items-start gap-2 text-gold-300 text-xs italic font-medium leading-relaxed">
                  <Quote className="w-4 h-4 shrink-0 text-gold-400" />
                  <span>"{memory.memoryQuote}"</span>
                </div>
              </div>

              {/* Action choice narrative */}
              <div className="mb-4 text-xs text-cream-200/90 space-y-2">
                <p><span className="font-bold text-amber-300">What Maveli did:</span> {memory.choiceMade}</p>
                <p className="bg-gold-500/10 p-3 rounded-xl border border-gold-500/20">{memory.choiceResponse}</p>
              </div>

              {/* What Changed Insight */}
              {memory.whatChanged && (
                <div className="pt-3 border-t border-gold-500/20 text-xs space-y-2">
                  <span className="font-extrabold text-gold-400 block uppercase tracking-wider">
                    364 DAYS AGO vs TODAY
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/40">
                      <span className="text-gold-400 font-bold block mb-1">THEN</span>
                      <span>{memory.whatChanged.then}</span>
                    </div>
                    <div className="bg-gold-500/10 p-2.5 rounded-xl border border-gold-500/30">
                      <span className="text-amber-300 font-bold block mb-1">TODAY</span>
                      <span>{memory.whatChanged.today}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-black text-xs shadow-md"
              >
                CLOSE MEMORY
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
