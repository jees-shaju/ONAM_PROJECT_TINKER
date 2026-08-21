import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

export function Maveli({ expression = 'happy', message = null, size = 'md', className = '' }) {
  const [currentExp, setCurrentExp] = useState(expression);
  const [showTooltip, setShowTooltip] = useState(true);

  // Cycle expression on click for playful interactive feedback
  const expressions = ['happy', 'curious', 'surprised', 'thoughtful', 'amused', 'nostalgic'];
  const handleMaveliClick = () => {
    sound.playPop();
    const nextIdx = (expressions.indexOf(currentExp) + 1) % expressions.length;
    setCurrentExp(expressions[nextIdx]);
  };

  const getMaveliEyes = () => {
    switch (currentExp) {
      case 'curious':
        return (
          <>
            <circle cx="36" cy="40" r="4" fill="#1E293B" />
            <circle cx="64" cy="38" r="4.5" fill="#1E293B" />
            <circle cx="37" cy="39" r="1.5" fill="#FFFFFF" />
            <circle cx="65" cy="37" r="1.5" fill="#FFFFFF" />
          </>
        );
      case 'surprised':
        return (
          <>
            <circle cx="36" cy="38" r="5" fill="#1E293B" />
            <circle cx="64" cy="38" r="5" fill="#1E293B" />
            <circle cx="38" cy="36" r="2" fill="#FFFFFF" />
            <circle cx="66" cy="36" r="2" fill="#FFFFFF" />
          </>
        );
      case 'thoughtful':
        return (
          <>
            <ellipse cx="36" cy="40" rx="4" ry="2" fill="#1E293B" />
            <ellipse cx="64" cy="40" rx="4" ry="2" fill="#1E293B" />
          </>
        );
      case 'amused':
        return (
          <>
            <path d="M32 40 Q36 34 40 40" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M60 40 Q64 34 68 40" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case 'nostalgic':
        return (
          <>
            <path d="M32 38 Q36 42 40 38" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M60 38 Q64 42 68 38" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case 'happy':
      default:
        return (
          <>
            <circle cx="36" cy="40" r="4" fill="#1E293B" />
            <circle cx="64" cy="40" r="4" fill="#1E293B" />
            <circle cx="37" cy="38" r="1.5" fill="#FFFFFF" />
            <circle cx="65" cy="38" r="1.5" fill="#FFFFFF" />
          </>
        );
    }
  };

  const getMaveliMouth = () => {
    switch (currentExp) {
      case 'surprised':
        return <ellipse cx="50" cy="56" rx="6" ry="8" fill="#991B1B" />;
      case 'amused':
        return <path d="M40 54 Q50 64 60 54 Z" fill="#991B1B" />;
      case 'thoughtful':
        return <line x1="42" y1="56" x2="58" y2="56" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />;
      case 'curious':
        return <path d="M42 56 Q50 60 56 54" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" />;
      case 'nostalgic':
      case 'happy':
      default:
        return <path d="M40 54 Q50 62 60 54" stroke="#78350F" strokeWidth="3.5" fill="none" strokeLinecap="round" />;
    }
  };

  // Dimensions based on size prop
  const dimensions = {
    sm: 'w-20 h-28',
    md: 'w-32 h-44',
    lg: 'w-48 h-64',
    xl: 'w-64 h-80'
  }[size] || 'w-32 h-44';

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      
      {/* Speech Bubble */}
      {message && showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-16 z-30 max-w-xs px-3.5 py-2 rounded-2xl bg-gradient-to-r from-gold-100 to-amber-50 text-emerald-950 text-xs font-semibold shadow-xl border border-gold-400 text-center leading-snug cursor-pointer"
          onClick={() => setShowTooltip(false)}
        >
          <span>{message}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-50 rotate-45 border-r border-b border-gold-400"></div>
        </motion.div>
      )}

      {/* Maveli Vector Character */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleMaveliClick}
        className={`${dimensions} cursor-pointer drop-shadow-2xl relative`}
      >
        <svg viewBox="0 0 100 140" className="w-full h-full">
          
          {/* Aura Gold Glow */}
          <circle cx="50" cy="50" r="45" fill="url(#goldAura)" opacity="0.4" className="animate-pulse-slow" />
          
          <defs>
            <radialGradient id="goldAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>
            <linearGradient id="dhotiGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFDF5" />
              <stop offset="50%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#FFFDF5" />
            </linearGradient>
          </defs>

          {/* Royal Umbrella (Ola Kuda Motif) behind Maveli */}
          <path d="M15 25 Q50 5 85 25 Z" fill="#B84A28" opacity="0.9" />
          <line x1="50" y1="25" x2="50" y2="90" stroke="#78350F" strokeWidth="2.5" opacity="0.6" />

          {/* Royal Body Base */}
          <path d="M30 75 Q50 65 70 75 L75 130 Q50 135 25 130 Z" fill="url(#dhotiGrad)" stroke="#D4AF37" strokeWidth="2" />
          {/* Kasavu Gold Border */}
          <path d="M25 125 Q50 130 75 125" stroke="#D4AF37" strokeWidth="4" fill="none" />

          {/* Red Royal Angavastram (Sash) */}
          <path d="M28 75 C 20 90, 30 115, 25 130" stroke="#C85A32" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M72 75 C 80 90, 70 115, 75 130" stroke="#C85A32" strokeWidth="6" fill="none" strokeLinecap="round" />

          {/* Royal Neck & Gold Ornaments */}
          <rect x="42" y="60" width="16" height="15" fill="#E2A76F" rx="3" />
          <path d="M35 68 Q50 82 65 68" stroke="#FFD700" strokeWidth="4" fill="none" />
          <circle cx="50" cy="77" r="4" fill="#C85A32" stroke="#FFD700" strokeWidth="1.5" />

          {/* Head & Skin Tone */}
          <ellipse cx="50" cy="42" rx="22" ry="24" fill="#E2A76F" />

          {/* Ears */}
          <circle cx="27" cy="42" r="4.5" fill="#E2A76F" />
          <circle cx="73" cy="42" r="4.5" fill="#E2A76F" />
          {/* Kundalam (Gold Earrings) */}
          <circle cx="26" cy="46" r="3.5" fill="#FFD700" />
          <circle cx="74" cy="46" r="3.5" fill="#FFD700" />

          {/* Facial Features */}
          {getMaveliEyes()}

          {/* Eyebrows */}
          <path d="M30 33 Q36 29 42 34" stroke="#451A03" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M58 34 Q64 29 70 33" stroke="#451A03" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Chandan Tilak / Sandal Paste Mark */}
          <path d="M46 26 L54 26 L50 34 Z" fill="#FFFDF5" />
          <circle cx="50" cy="30" r="1.5" fill="#C85A32" />

          {/* Iconic Traditional Royal Moustache */}
          <path d="M30 50 Q50 42 70 50 Q50 56 30 50 Z" fill="#292524" />
          <path d="M28 50 C24 46, 22 42, 26 40 C30 42, 34 46, 36 49" fill="#292524" />
          <path d="M72 50 C76 46, 78 42, 74 40 C70 42, 66 46, 64 49" fill="#292524" />

          {/* Mouth Expression */}
          {getMaveliMouth()}

          {/* Royal Crown (Kireedom) */}
          <path d="M26 24 L34 8 L50 2 L66 8 L74 24 Z" fill="url(#crownGrad)" stroke="#B45309" strokeWidth="1" />
          <path d="M24 24 L76 24 L72 28 L28 28 Z" fill="#D4AF37" />
          <circle cx="50" cy="12" r="3.5" fill="#EF4444" stroke="#FFD700" strokeWidth="1" />
          <circle cx="38" cy="18" r="2.5" fill="#3B82F6" />
          <circle cx="62" cy="18" r="2.5" fill="#3B82F6" />
        </svg>

        {/* Dynamic Expression Tag below */}
        <div className="mt-1 text-center">
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-gold-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-gold-500/30">
            {currentExp}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
