import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Flower2, Lock } from 'lucide-react';
import { sound } from '../utils/sound';

export function Pookalam({ onSelectMemory }) {
  const { completedMemories } = useApp();

  const maxPetals = 50;
  const petals = Array.from({ length: maxPetals }, (_, i) => completedMemories[i] || null);

  // Helper to compute concentric ring positions for 50 petals (10 inner, 16 mid, 24 outer)
  const getPetalPosition = (index) => {
    if (index < 10) {
      // Ring 1 (Inner): 10 petals
      const angle = (index * 360) / 10;
      const rad = (angle * Math.PI) / 180;
      const radius = 80;
      return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius, size: 'w-7 h-7 sm:w-8 sm:h-8', z: 'z-30' };
    } else if (index < 26) {
      // Ring 2 (Middle): 16 petals
      const angle = ((index - 10) * 360) / 16;
      const rad = (angle * Math.PI) / 180;
      const radius = 125;
      return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius, size: 'w-6 h-6 sm:w-7 sm:h-7', z: 'z-20' };
    } else {
      // Ring 3 (Outer): 24 petals
      const angle = ((index - 26) * 360) / 24;
      const rad = (angle * Math.PI) / 180;
      const radius = 168;
      return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius, size: 'w-5 h-5 sm:w-6 sm:h-6', z: 'z-10' };
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6">
      
      {/* Pookalam Circle Visualizer */}
      <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] flex items-center justify-center">
        
        {/* Concentric Decorative Geometry Rings */}
        <div className="absolute inset-0 rounded-full border-4 border-gold-500/20 animate-spin-slow"></div>
        <div className="absolute inset-8 rounded-full border-2 border-dashed border-amber-500/30"></div>
        <div className="absolute inset-20 rounded-full border border-gold-400/20"></div>

        {/* Center Crown Hub */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="z-40 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-amber-200 border-4 border-gold-300 shadow-2xl flex flex-col items-center justify-center text-center cursor-pointer gold-glow"
        >
          <span className="text-xl sm:text-2xl animate-bounce-gentle">👑</span>
          <span className="text-[8px] sm:text-[9px] font-black text-emerald-950 uppercase tracking-widest">
            {completedMemories.length} / 50
          </span>
        </motion.div>

        {/* Multi-Ring Floral Petals */}
        {petals.map((memory, index) => {
          const pos = getPetalPosition(index);

          return (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: Math.min(1.5, index * 0.03), type: 'spring' }}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`
              }}
              onClick={() => {
                if (memory) {
                  sound.playChime();
                  onSelectMemory && onSelectMemory(memory);
                }
              }}
              className={`absolute ${pos.z} ${pos.size} rounded-full flex items-center justify-center transition-all cursor-pointer ${
                memory
                  ? 'shadow-lg hover:scale-125 border border-gold-300 gold-glow'
                  : 'bg-emerald-950/60 border border-dashed border-gold-500/30 opacity-30 hover:opacity-60'
              }`}
            >
              {memory ? (
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-emerald-950 font-bold"
                  style={{ backgroundColor: memory.color || '#F59E0B' }}
                  title={`${memory.title} (${memory.district})`}
                >
                  <Flower2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gold-400/50">
                  <Lock className="w-2.5 h-2.5" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-cream-200/70 mt-6 text-center italic">
        Each completed experience adds a vibrant flower petal to Maveli’s 50-Petal Grand Pookalam.
      </p>
    </div>
  );
}
