import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, X, Volume2, VolumeX, Sparkles, Film, CheckCircle2, MapPin } from 'lucide-react';
import { sound } from '../utils/sound';
import maveliImg from '../assets/maveli.png';

// District-specific visual scenes for the 10-second memory video
const DISTRICT_SCENES = {
  'Thrissur': {
    bgColors: ['#1a0a00', '#3d1a00', '#7c3a00'],
    emojis: ['🐯', '🥁', '🌼', '🐘', '🎭'],
    title: 'Pulikali Tiger Dance',
    accent: '#F59E0B'
  },
  'Thiruvananthapuram': {
    bgColors: ['#0a001a', '#1a003d', '#3a007c'],
    emojis: ['👑', '🏯', '🌟', '💎', '🎪'],
    title: 'Royal Palace Illumination',
    accent: '#EC4899'
  },
  'Alappuzha': {
    bgColors: ['#001a3a', '#003a7c', '#0066cc'],
    emojis: ['🛶', '🚣', '🌊', '🏆', '🐟'],
    title: 'Nehru Trophy Snake Boat Race',
    accent: '#3B82F6'
  },
  'Ernakulam': {
    bgColors: ['#001a0a', '#003d1a', '#007c3a'],
    emojis: ['🐘', '🚤', '🎭', '⚓', '🌉'],
    title: 'Kochi Athachamayam Carnival',
    accent: '#10B981'
  },
  'Pathanamthitta': {
    bgColors: ['#1a1000', '#3d2800', '#7c5200'],
    emojis: ['🍲', '🛥️', '🙏', '🔮', '🪔'],
    title: 'Aranmula Valla Sadya',
    accent: '#D97706'
  },
  'Kottayam': {
    bgColors: ['#1a003a', '#3a007c', '#7a00cc'],
    emojis: ['🪷', '🌿', '📰', '🦋', '💧'],
    title: 'Kumarakom Floating Pookalam',
    accent: '#EC4899'
  },
  'Kollam': {
    bgColors: ['#1a0010', '#3a0025', '#7a0055'],
    emojis: ['⛵', '🥜', '🎣', '🌅', '🧵'],
    title: 'Ashtamudi Craft Heritage',
    accent: '#F43F5E'
  },
  'Idukki': {
    bgColors: ['#001a10', '#003d25', '#006640'],
    emojis: ['🍃', '☁️', '🌿', '🐐', '⛰️'],
    title: 'Munnar High Range Harvest',
    accent: '#06B6D4'
  },
  'Palakkad': {
    bgColors: ['#1a1400', '#3d3100', '#7c6300'],
    emojis: ['🌾', '🏛️', '🌱', '🎭', '🍚'],
    title: 'Kalpathi Heritage Walk',
    accent: '#D97706'
  },
  'Malappuram': {
    bgColors: ['#001020', '#002040', '#004080'],
    emojis: ['🎶', '🌳', '🪄', '🎵', '🌿'],
    title: 'Nilambur Teak Heritage Fest',
    accent: '#8B5CF6'
  },
  'Kozhikode': {
    bgColors: ['#1a0020', '#3a0050', '#7a00a0'],
    emojis: ['🍌', '🍯', '🏮', '⚓', '🎵'],
    title: 'Mananchira Halwa Festival',
    accent: '#8B5CF6'
  },
  'Wayanad': {
    bgColors: ['#001505', '#002a10', '#005520'],
    emojis: ['⛰️', '🐚', '🍯', '🌿', '💚'],
    title: 'Tribal Harvest Onam',
    accent: '#059669'
  },
  'Kannur': {
    bgColors: ['#1a0000', '#3d0000', '#7c0000'],
    emojis: ['🔥', '🎭', '🏖️', '🧵', '👁️'],
    title: 'Theyyam Sacred Rituals',
    accent: '#EF4444'
  },
  'Kasaragod': {
    bgColors: ['#1a1000', '#3d2500', '#7c4a00'],
    emojis: ['🏰', '🌊', '🎪', '🌅', '⛵'],
    title: 'Bekal Fort Sunset Fest',
    accent: '#F59E0B'
  }
};

export function MemoryVideoPlayer({ isOpen, onClose, memoryTitle, district, category, description }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 10 seconds
  const [isMuted, setIsMuted] = useState(false);
  const canvasRef = useRef(null);

  const scene = DISTRICT_SCENES[district] || {
    bgColors: ['#064E3B', '#022C22', '#011710'],
    emojis: ['🌼', '👑', '🎭', '🥁', '🌟'],
    title: 'Onam Celebration',
    accent: '#F59E0B'
  };

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setIsPlaying(true);
    }
  }, [isOpen]);

  // 10-second video playback
  useEffect(() => {
    let interval;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 10) {
            setIsPlaying(false);
            return 10;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  // Audio beats
  useEffect(() => {
    if (isOpen && isPlaying && !isMuted && Math.floor(progress) % 2 === 0 && Math.floor(progress) !== 10) {
      sound.playChendaBeat();
    }
  }, [progress, isPlaying, isOpen, isMuted]);

  // Canvas visualizer with district-specific colors
  useEffect(() => {
    if (!canvasRef.current || !isOpen) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // District-specific background gradient
      const [c1, c2, c3] = scene.bgColors;
      const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 20, canvas.width / 2, canvas.height / 2, canvas.width / 1.2);
      grad.addColorStop(0, c1);
      grad.addColorStop(0.5, c2);
      grad.addColorStop(1, c3);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floating district emoji particles
      const emojis = scene.emojis;
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(i * 99 + frame * 0.015) * 0.5 + 0.5) * canvas.width;
        const y = ((frame * (1 + i % 4) * 0.5 + i * 45) % canvas.height);
        ctx.save();
        ctx.font = `${(Math.sin(frame * 0.05 + i) + 2.2) * 14}px serif`;
        ctx.globalAlpha = 0.6 + Math.sin(frame * 0.03 + i) * 0.3;
        ctx.fillText(emojis[i % emojis.length], x, y);
        ctx.restore();
      }

      // Pulsing rings
      for (let r = 1; r <= 3; r++) {
        const radius = (80 + r * 30 + Math.sin(frame * 0.02 + r) * 15);
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${scene.accent}33`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Dynamic waveform bar
      for (let i = 0; i < 32; i++) {
        const barHeight = isPlaying ? Math.abs(Math.sin(frame * 0.1 + i * 0.4)) * 45 + 5 : 5;
        const x = (canvas.width / 32) * i;
        ctx.fillStyle = `${scene.accent}99`;
        ctx.fillRect(x, canvas.height - barHeight - 8, canvas.width / 36, barHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOpen, isPlaying, scene]);

  if (!isOpen) return null;

  const handleReplay = () => {
    sound.playPop();
    setProgress(0);
    setIsPlaying(true);
  };

  const timeDisplay = () => {
    const secs = Math.floor(progress);
    return `00:0${secs} / 00:10`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl glass-panel-gold rounded-3xl border-2 border-gold-400/50 shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-gold-500/30 flex items-center justify-between bg-emerald-950/80">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-gold-400 animate-pulse" />
              <span className="text-xs font-black tracking-widest text-gold-300 uppercase">
                10-SEC SCENE • {scene.title} • {district || 'KERALA'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] text-cream-300/70 font-bold">
                <MapPin className="w-3 h-3 text-rose-400" />
                {district}
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gold-500/20 text-cream-200 hover:text-gold-200 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Video Stage */}
          <div className="relative w-full h-80 sm:h-96 bg-black flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} width={600} height={400} className="w-full h-full object-cover" />

            {/* Floating Maveli */}
            <motion.div
              animate={isPlaying ? { y: [0, -15, 0], rotate: [-2, 2, -2], scale: [1, 1.05, 1] } : { y: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute z-20 flex flex-col items-center justify-center"
            >
              <img
                src={maveliImg}
                alt="3D King Maveli"
                className="h-44 sm:h-56 w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(245,158,11,0.7)]"
              />
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-2 px-3 py-1 rounded-full text-emerald-950 text-xs font-black shadow-lg flex items-center gap-1.5"
                style={{ backgroundColor: scene.accent }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{memoryTitle || scene.title}</span>
              </motion.div>
            </motion.div>

            {/* Watermark */}
            <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold-500/40 text-[10px] font-bold text-gold-300">
              HD • MAVELI ONAM ARCHIVE 2026
            </div>

            {/* Arrival Scene Quote */}
            <div className="absolute bottom-16 left-6 right-6 z-30 p-3 rounded-2xl bg-emerald-950/85 backdrop-blur-md border border-gold-500/30 text-center text-xs font-serif italic text-cream-100 shadow-xl">
              "{description || 'A timeless moment captured in the heart of Kerala.'}"
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-emerald-950 px-4 py-2 border-t border-gold-500/20">
            <div className="relative w-full h-2 bg-emerald-900 rounded-full overflow-hidden border border-gold-500/30">
              <div
                className="h-full transition-all duration-100 rounded-full"
                style={{
                  width: `${(progress / 10) * 100}%`,
                  background: `linear-gradient(to right, ${scene.accent}, #FBBF24)`
                }}
              />
            </div>
          </div>

          {/* Player Controls */}
          <div className="p-4 bg-emerald-950/90 flex items-center justify-between border-t border-gold-500/20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-full text-emerald-950 font-bold hover:scale-105 transition-all shadow-md"
                style={{ background: `linear-gradient(135deg, ${scene.accent}, #FBBF24)` }}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-emerald-950" /> : <Play className="w-4 h-4 fill-emerald-950" />}
              </button>

              <button
                onClick={handleReplay}
                className="p-2.5 rounded-full bg-emerald-900/60 text-cream-200 hover:text-gold-300 border border-emerald-700/40 hover:bg-emerald-800 transition-all"
                title="Replay"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono font-bold text-amber-300">
                {timeDisplay()}
              </span>

              {progress >= 10 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-emerald-400 text-xs font-bold"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Scene Complete!</span>
                </motion.div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 rounded-full bg-emerald-900/60 text-cream-200 hover:text-gold-300 border border-emerald-700/40 transition-all"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-emerald-950 text-xs font-extrabold shadow-md hover:scale-105 transition-all"
                style={{ background: `linear-gradient(135deg, ${scene.accent}, #FBBF24)` }}
              >
                CLOSE PLAYER
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
