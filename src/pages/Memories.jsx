import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { MemoryCard } from '../components/MemoryCard';
import { MemoryVideoPlayer } from '../components/MemoryVideoPlayer';
import { Pookalam } from '../components/Pookalam';
import { Flower2, Sparkles, Share2, Download, Trash2, Calendar, Archive, Film, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

export function Memories() {
  const { completedMemories, exportMemoriesVault, clearMemoriesVault } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideoMemory, setActiveVideoMemory] = useState(null);

  const categories = ['All', 'Culture', 'Food', 'People', 'Modern Kerala', 'Nature', 'Music', 'Unexpected'];

  const filteredMemories = selectedCategory === 'All'
    ? completedMemories
    : completedMemories.filter(m => m.categories && m.categories.includes(selectedCategory));

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Archive className="w-3.5 h-3.5 text-gold-400" />
            <span>PERMANENT BACKEND MEMORY VAULT • UNLIMITED STORAGE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-black text-cream-50 gold-glow-text">
            Maveli's Onam Memory Vault
          </h1>

          <p className="text-xs sm:text-sm text-cream-200/90 mt-2 max-w-xl">
            Every experience completed adds a petal to King Maveli's royal Pookalam. Saved permanently across years and visits.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => {
              sound.playPop();
              exportMemoriesVault();
            }}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-black text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT VAULT (JSON)</span>
          </button>

          <button
            onClick={clearMemoriesVault}
            className="px-4 py-2.5 rounded-2xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30 font-bold text-xs transition-all flex items-center gap-1.5"
            title="Reset Vault"
          >
            <Trash2 className="w-4 h-4" />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Interactive Visual Pookalam Canvas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black tracking-widest text-gold-400 uppercase">
              Visual Canvas
            </span>
            <h2 className="text-2xl font-serif font-black text-cream-50">
              Your Living Onam Pookalam ({completedMemories.length} Petals)
            </h2>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-gold-500/20 shadow-xl flex items-center justify-center">
          <Pookalam memories={completedMemories} />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playPop();
              setSelectedCategory(cat);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-extrabold shadow-md'
                : 'bg-emerald-950/60 text-cream-200 border border-gold-500/20 hover:bg-emerald-900/40 hover:text-gold-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Memory Cards Grid */}
      {filteredMemories.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl border border-gold-500/20 space-y-4">
          <div className="text-4xl">🌺</div>
          <h3 className="text-xl font-serif font-bold text-cream-100">No Memories Saved in this Category Yet</h3>
          <p className="text-xs text-cream-200/70 max-w-sm mx-auto">
            Explore experiences or travel detours across the 14 districts of Kerala to unlock memories!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((mem) => (
            <div key={mem.id} className="relative group">
              <MemoryCard memory={mem} />
              
              {/* Play 10-Sec Video Scene Button */}
              <button
                onClick={() => {
                  sound.playChime();
                  setActiveVideoMemory(mem);
                }}
                className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-emerald-950/90 hover:bg-gold-500 text-gold-300 hover:text-emerald-950 border border-gold-400/40 text-[11px] font-black shadow-lg flex items-center gap-1.5 transition-all"
              >
                <Film className="w-3.5 h-3.5" />
                <span>PLAY 10S VIDEO</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 10-Second Interactive Memory Video Player Modal */}
      {activeVideoMemory && (
        <MemoryVideoPlayer
          isOpen={!!activeVideoMemory}
          onClose={() => setActiveVideoMemory(null)}
          memoryTitle={activeVideoMemory.title}
          district={activeVideoMemory.district}
          category={activeVideoMemory.categories ? activeVideoMemory.categories[0] : 'Culture'}
          description={activeVideoMemory.choiceResponse || activeVideoMemory.memoryQuote}
        />
      )}

    </div>
  );
}
