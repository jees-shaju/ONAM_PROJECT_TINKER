import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import maveliImg from '../assets/maveli.png';

export function Maveli({ message = null, size = 'md', className = '' }) {
  const [showTooltip, setShowTooltip] = useState(true);
  const [floatingIcons, setFloatingIcons] = useState([]);

  const handleMaveliClick = () => {
    sound.playPop();
    const festiveIcons = ['👑', '🌼', '✨', '🌺', '🥥', '🪷'];
    const randomIcon = festiveIcons[Math.floor(Math.random() * festiveIcons.length)];

    // Spawn floating celebration particles
    const newIcon = {
      id: Date.now() + Math.random(),
      emoji: randomIcon,
      x: (Math.random() - 0.5) * 50,
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

  const defaultQuote = "Swagatham! Celebrating Thiruvonam across all 14 districts!";

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      
      {/* Speech Bubble */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-16 z-30 max-w-xs px-4 py-2.5 rounded-2xl bg-gradient-to-r from-gold-100 via-amber-50 to-gold-200 text-emerald-950 text-xs font-bold shadow-2xl border-2 border-gold-400 text-center leading-snug cursor-pointer flex items-center gap-2"
          onClick={() => setShowTooltip(false)}
        >
          <span>👑</span>
          <span>{message || `"${defaultQuote}"`}</span>
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

      {/* 3D Maveli Character Standalone */}
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
          alt="King Maveli"
          className={`${imageHeights} w-auto object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_20px_35px_rgba(245,158,11,0.5)] transition-all duration-300 relative z-10`}
        />
      </motion.div>
    </div>
  );
}
