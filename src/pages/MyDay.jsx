import React from 'react';
import { Timeline } from '../components/Timeline';
import { useApp } from '../context/AppContext';
import { Clock, MapPin, Flower2, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function MyDay() {
  const { myDayExperiences, completedMemories, formattedTimeRemaining } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div>
        <span className="text-xs font-black tracking-widest text-gold-400 uppercase">
          Journey Planner
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-cream-50 gold-glow-text">
          Organise My Day
        </h1>
        <p className="text-xs sm:text-sm text-cream-200/80 mt-1">
          Optimize your sequence to maximize memories and minimize travel time across Kerala.
        </p>
      </div>

      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-gold-500/20 text-center">
          <span className="text-2xl font-black text-gold-400 block">{myDayExperiences.length}</span>
          <span className="text-xs text-cream-200/80 uppercase font-bold">Planned</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-gold-500/20 text-center">
          <span className="text-2xl font-black text-emerald-400 block">
            {myDayExperiences.filter(e => e.completed).length}
          </span>
          <span className="text-xs text-cream-200/80 uppercase font-bold">Completed</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-gold-500/20 text-center">
          <span className="text-2xl font-black text-amber-400 block">
            {completedMemories.length}
          </span>
          <span className="text-xs text-cream-200/80 uppercase font-bold">Memories Saved</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-gold-500/20 text-center">
          <span className="text-2xl font-black text-amber-300 block">
            ⏳ {formattedTimeRemaining()}
          </span>
          <span className="text-xs text-cream-200/80 uppercase font-bold">Time Left</span>
        </div>
      </div>

      {/* Main Interactive Timeline */}
      <Timeline />

      {/* Empty State Banner if no items */}
      {myDayExperiences.length === 0 && (
        <div className="text-center py-12 glass-panel rounded-3xl border border-dashed border-gold-500/30">
          <p className="text-base text-cream-100 font-bold mb-3">Your day plan is currently empty.</p>
          <button
            onClick={() => navigate('/discover')}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-black text-xs shadow-lg"
          >
            DISCOVER EXPERIENCES TO ADD 🌼
          </button>
        </div>
      )}

    </div>
  );
}
