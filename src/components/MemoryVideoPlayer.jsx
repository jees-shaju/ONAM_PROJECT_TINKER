import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, X, Volume2, VolumeX, Sparkles, Film, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';
import maveliImg from '../assets/maveli.png';

export function MemoryVideoPlayer({ isOpen, onClose, memoryTitle, district, category, description }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 10 seconds
  const [isMuted, setIsMuted] = useState(false);
  const canvasRef = useRef(null);

  // 10-second video playback loop
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

  // Audio beats during playback
  useEffect(() => {
    if (isOpen && isPlaying && !isMuted && Math.floor(progress) % 2 === 0 && Math.floor(progress) !== 10) {
      sound.playChendaBeat();
    }
  }, [progress, isPlaying, isOpen, isMuted]);

  // Canvas visualizer animation
  useEffect(() => {
    if (!canvasRef.current || !isOpen) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background starry gold gradient
      const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 20, canvas.width / 2, canvas.height / 2, canvas.width / 1.2);
      grad.addColorStop(0, '#064E3B');
      grad.addColorStop(0.5, '#022C22');
      grad.addColorStop(1, '#011710');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated golden fireworks / floating marigold particles
      for (let i = 0; i < 25; i++) {
        const x = (Math.sin(i * 99 + frame * 0.02) * 0.5 + 0.5) * canvas.width;
        const y = ((frame * (1 + i % 3) + i * 50) % canvas.height);
        const radius = (Math.sin(frame * 0.05 + i) + 1.5) * 3;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(245, 158, 11, 0.8)' : 'rgba(251, 191, 36, 0.6)';
        ctx.fill();
      }

      // Dynamic waveform bar at bottom
      for (let i = 0; i < 30; i++) {
        const barHeight = isPlaying ? Math.abs(Math.sin(frame * 0.1 + i * 0.5)) * 40 + 5 : 5;
        const x = (canvas.width / 30) * i;
        ctx.fillStyle = 'rgba(217, 119, 6, 0.7)';
        ctx.fillRect(x, canvas.height - barHeight - 10, canvas.width / 35, barHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const handleReplay = () => {
    sound.playPop();
    setProgress(0);
    setIsPlaying(true);
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
                10-SEC MEMORY VISUAL SCENE • {district || 'KERALA'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gold-500/20 text-cream-200 hover:text-gold-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main 10-Sec Video Stage Canvas */}
          <div className="relative w-full h-80 sm:h-96 bg-black flex items-center justify-center overflow-hidden">
            {/* Background Animated Canvas */}
            <canvas ref={canvasRef} width={600} height={400} className="w-full h-full object-cover opacity-90" />

            {/* Floating 3D King Maveli Hero Character */}
            <motion.div
              animate={isPlaying ? { y: [0, -15, 0], rotate: [-1, 1, -1] } : { y: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute z-20 flex flex-col items-center justify-center"
            >
              <img
                src={maveliImg}
                alt="3D King Maveli"
                className="h-44 sm:h-56 w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(245,158,11,0.6)]"
              />
              <div className="mt-2 px-3 py-1 rounded-full bg-gold-500/90 text-emerald-950 text-xs font-black shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{memoryTitle || 'Onam Celebration Scene'}</span>
              </div>
            </motion.div>

            {/* Video Watermark Badge */}
            <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold-500/40 text-[10px] font-bold text-gold-300">
              HD • MAVELI ONAM ARCHIVE 2026
            </div>

            {/* Floating Quote Box */}
            <div className="absolute bottom-16 left-6 right-6 z-30 p-3 rounded-2xl bg-emerald-950/80 backdrop-blur-md border border-gold-500/30 text-center text-xs font-serif italic text-cream-100 shadow-xl">
              "{description || 'A timeless moment captured in the heart of Kerala.'}"
            </div>
          </div>

          {/* Timeline Scrubbing Bar */}
          <div className="w-full bg-emerald-950 px-4 py-2 border-t border-gold-500/20">
            <div className="relative w-full h-2 bg-emerald-900 rounded-full overflow-hidden border border-gold-500/30">
              <div
                className="bg-gradient-to-r from-gold-500 via-amber-400 to-terracotta-500 h-full transition-all duration-100 rounded-full"
                style={{ width: `${(progress / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Bottom Player Controls */}
          <div className="p-4 bg-emerald-950/90 flex items-center justify-between border-t border-gold-500/20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-bold hover:scale-105 transition-all shadow-md"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-emerald-950" /> : <Play className="w-4 h-4 fill-emerald-950" />}
              </button>

              <button
                onClick={handleReplay}
                className="p-2.5 rounded-full bg-emerald-900/60 text-cream-200 hover:text-gold-300 border border-emerald-700/40 hover:bg-emerald-800 transition-all"
                title="Replay Video"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono font-bold text-amber-300">
                00:0{Math.floor(progress)} / 00:10
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 rounded-full bg-emerald-900/60 text-cream-200 hover:text-gold-300 border border-emerald-700/40 transition-all"
                title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-emerald-950 text-xs font-extrabold shadow-md hover:scale-105 transition-all"
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
