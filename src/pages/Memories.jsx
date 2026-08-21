import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Pookalam } from '../components/Pookalam';
import { MemoryCard } from '../components/MemoryCard';
import { Flower2, Sparkles, Trophy } from 'lucide-react';
import { sound } from '../utils/sound';

export function Memories() {
  const { completedMemories, setIsDayFinished } = useApp();
  const [selectedMemory, setSelectedMemory] = useState(null);

  const handleFinishDay = () => {
    sound.playCelebration();
    setIsDayFinished(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black tracking-widest text-gold-400 uppercase flex items-center gap-1.5">
            <Flower2 className="w-4 h-4 text-gold-400" />
            <span>Floral Memory Collection</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-cream-50 gold-glow-text">
            MAVELI'S MEMORIES
          </h1>
          <p className="text-xs sm:text-sm text-cream-200/80 mt-1">
            Every completed experience blooms into a petal on King Maveli’s royal Onam Pookalam.
          </p>
        </div>

        {/* Finish Day Recap Trigger */}
        {completedMemories.length >= 1 && (
          <button
            onClick={handleFinishDay}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-500 via-amber-500 to-terracotta-500 text-emerald-950 font-black text-xs shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            <span>FINISH DAY & SEE SUMMARY</span>
          </button>
        )}
      </div>

      {/* Center Interactive Pookalam */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-2xl flex flex-col items-center">
        <Pookalam onSelectMemory={(mem) => setSelectedMemory(mem)} />
      </div>

      {/* Memories Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-cream-50 flex items-center gap-2">
          <span>Collected Memories</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
            {completedMemories.length} Saved
          </span>
        </h2>

        {completedMemories.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl border border-dashed border-gold-500/20">
            <Flower2 className="w-8 h-8 text-gold-400/40 mx-auto mb-2" />
            <p className="text-sm font-bold text-cream-100">No memories collected yet!</p>
            <p className="text-xs text-cream-300/70 mt-1">
              Start a journey from Discover or Find My Next Memory to collect your first Onam flower.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedMemories.map((mem) => (
              <MemoryCard key={mem.id} memory={mem} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
