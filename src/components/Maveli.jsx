import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import maveliImg from '../assets/maveli.png';

export function Maveli({ expression = 'happy', message = null, size = 'md', className = '' }) {
  const [currentExp, setCurrentExp] = useState(expression);
  const [showTooltip, setShowTooltip] = useState(true);
  const [floatingIcons, setFloatingIcons] = useState([]);

  // Cycle expression on click for playful interactive feedback
  const expressions = [
    { id: 'happy', label: 'Happy', emoji: '👑', quote: 'Swagatham!' },
    { id: 'curious', label: 'Curious', emoji: '🧐', quote: 'What changed here?' },
    { id: 'surprised', label: 'Surprised', emoji: '😮', quote: 'Woah, so modern!' },
    { id: 'thoughtful', label: 'Thoughtful', emoji: '💡', quote: 'So many invitations...' },
    { id: 'amused', label: 'Amused', emoji: '😄', quote: 'Kerala never changes!' },
    { id: 'nostalgic', label: 'Nostalgic', emoji: '🌺', quote: 'Ah, sweet memories.' }
  ];

  const activeExpObj = expressions.find(e => e.id === currentExp) || expressions[0];

  const handleMaveliClick = () => {
    sound.playPop();
    const currentIdx = expressions.findIndex(e => e.id === currentExp);
    const nextIdx = (currentIdx + 1) % expressions.length;
    setCurrentExp(expressions[nextIdx].id);

    // Spawn floating particle effect
    const newIcon = {
      id: Date.now(),
      emoji: expressions[nextIdx].emoji,
      x: (Math.random() - 0.5) * 40,
    };
    setFloatingIcons(prev => [...prev.slice(-4), newIcon]);
  };

  // Size configurations
  const imageHeights = {
    sm: 'h-32 sm:h-36',
    md: 'h-48 sm:h-56',
    lg: 'h-64 sm:h-80',
    xl: 'h-80 sm:h-96'
  }[size] || 'h-48 sm:h-56';

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      
      {/* Speech Bubble */}
      {(message || activeExpObj.quote) && showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-16 z-30 max-w-xs px-4 py-2 rounded-2xl bg-gradient-to-r from-gold-100 via-amber-50 to-gold-200 text-emerald-950 text-xs font-bold shadow-2xl border-2 border-gold-400 text-center leading-snug cursor-pointer flex items-center gap-2"
          onClick={() => setShowTooltip(false)}
        >
          <span>{activeExpObj.emoji}</span>
          <span>{message || `"${activeExpObj.quote}"`}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-50 rotate-45 border-r-2 border-b-2 border-gold-400"></div>
        </motion.div>
      )}

      {/* Floating Particles on Click */}
      <div className="absolute inset-0 pointer-events-none z-20 flex justify-center items-center">
        <AnimatePresence>
          {floatingIcons.map(icon => (
            <motion.span
              key={icon.id}
              initial={{ opacity: 1, y: 0, x: icon.x, scale: 0.5 }}
              animate={{ opacity: 0, y: -80, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute text-2xl font-bold"
            >
              {icon.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* 3D Maveli Character Standalone (No Box/Background) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.08, rotate: 1 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleMaveliClick}
        className="cursor-pointer relative group flex flex-col items-center justify-center"
      >
        {/* Soft Radial Gold Aura behind character */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-gold-400/30 via-amber-400/20 to-terracotta-500/20 blur-2xl group-hover:blur-3xl group-hover:scale-125 transition-all duration-500 pointer-events-none" />

        {/* Transparent 3D Character Image */}
        <img
          src={maveliImg}
          alt="King Maveli 3D"
          className={`${imageHeights} w-auto object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_20px_35px_rgba(245,158,11,0.5)] transition-all duration-300 relative z-10`}
        />

        {/* Dynamic Expression Tag below */}
        <div className="mt-2 text-center z-20">
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-black text-gold-200 bg-emerald-950/90 px-3.5 py-1 rounded-full border border-gold-500/40 shadow-xl group-hover:border-gold-300 group-hover:text-gold-100 transition-all">
            <span>{activeExpObj.emoji}</span>
            <span>{activeExpObj.label}</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}


