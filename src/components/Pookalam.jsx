import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Flower2, Lock } from 'lucide-react';
import { sound } from '../utils/sound';

export function Pookalam({ onSelectMemory }) {
  const { completedMemories } = useApp();

  const maxPetals = 8;
  const petals = Array.from({ length: maxPetals }, (_, i) => completedMemories[i] || null);

  return (
    <div className="w-full flex flex-col items-center justify-center py-6">
      
      {/* Pookalam Circle Visualizer */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
        
        {/* Outer Glowing Geometry Rings */}
        <div className="absolute inset-0 rounded-full border-4 border-gold-500/20 animate-spin-slow"></div>
        <div className="absolute inset-4 rounded-full border-2 border-dashed border-amber-500/30"></div>
        <div className="absolute inset-12 rounded-full border border-gold-400/20"></div>

        {/* Center Crown Hub */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-amber-200 border-4 border-gold-300 shadow-2xl flex flex-col items-center justify-center text-center cursor-pointer gold-glow"
        >
          <span className="text-2xl sm:text-3xl animate-bounce-gentle">👑</span>
          <span className="text-[9px] font-black text-emerald-950 uppercase tracking-widest">
            {completedMemories.length} / 8
          </span>
        </motion.div>

        {/* Circular Flower Petals Ring */}
        {petals.map((memory, index) => {
          const angle = (index * 360) / maxPetals;
          const radius = 120; // Radius distance from center (pixels)
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
              onClick={() => {
                if (memory) {
                  sound.playChime();
                  onSelectMemory && onSelectMemory(memory);
                }
              }}
              className={`absolute z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                memory
                  ? 'shadow-xl hover:scale-115 border-2 border-gold-300 gold-glow'
                  : 'bg-emerald-950/60 border border-dashed border-gold-500/30 opacity-40 hover:opacity-60'
              }`}
            >
              {memory ? (
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-emerald-950 font-bold"
                  style={{ backgroundColor: memory.color || '#F59E0B' }}
                  title={memory.title}
                >
                  <Flower2 className="w-6 h-6 text-white drop-shadow" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gold-400/60">
                  <Lock className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-cream-200/70 mt-6 text-center italic">
        Each completed experience adds a vibrant flower petal to Maveli’s Onam Pookalam.
      </p>

    </div>
  );
}
