import React from 'react';
import { KeralaMap } from '../components/KeralaMap';
import { useApp } from '../context/AppContext';
import { Compass, MapPin, Sparkles, CheckCircle2, Flower2 } from 'lucide-react';

export function Map() {
  const { activeJourney, myDayExperiences, completedMemories } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black tracking-widest text-gold-400 uppercase flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span>Interactive Map</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-cream-50 gold-glow-text">
            Kerala Journey Map
          </h1>
          <p className="text-xs sm:text-sm text-cream-200/80 mt-1">
            Follow Maveli moving along glowing routes with unexpected "On-The-Way" discoveries.
          </p>
        </div>

        {/* Legend Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-700/50 text-cream-200 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>📍 Destination</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-700/50 text-cream-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>✓ Completed</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-700/50 text-cream-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>✨ On The Way</span>
          </span>
        </div>
      </div>

      {/* Main Animated Kerala Map Component */}
      <KeralaMap />

    </div>
  );
}
