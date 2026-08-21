import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { MapPin, Clock, CheckCircle2, Plus, Sparkles, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sound } from '../utils/sound';

export function ExperienceCard({ experience, onSelectDetails }) {
  const { addExperienceToDay, myDayExperiences, setActiveJourney } = useApp();
  const navigate = useNavigate();

  const isAdded = myDayExperiences.some(item => item.id === experience.id);

  const handleStartJourney = (e) => {
    e.stopPropagation();
    sound.playChime();
    setActiveJourney(experience);
    navigate('/map');
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    addExperienceToDay(experience);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => onSelectDetails && onSelectDetails(experience)}
      className="glass-card rounded-2xl p-5 border border-gold-500/20 hover:border-gold-400/50 transition-all cursor-pointer flex flex-col justify-between relative group overflow-hidden"
    >
      {/* Top Banner & Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {experience.categories.map((cat, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/30 text-[10px] font-extrabold uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>

          {experience.verified && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg font-serif font-bold text-cream-50 group-hover:text-gold-300 transition-colors mb-1.5">
          {experience.title}
        </h3>
        <p className="text-xs text-cream-200/80 line-clamp-2 mb-4 leading-relaxed">
          {experience.tagline || experience.description}
        </p>
      </div>

      {/* Details Footer */}
      <div>
        <div className="flex items-center justify-between text-xs text-cream-300/80 pt-3 border-t border-gold-500/10 mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            <span>{experience.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{experience.duration} min</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              isAdded
                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 cursor-default'
                : 'bg-emerald-900/40 hover:bg-emerald-800/60 text-cream-100 border border-emerald-600/40'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAdded ? 'ADDED ✓' : 'ADD TO DAY'}</span>
          </button>

          <button
            onClick={handleStartJourney}
            className="py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-emerald-950 text-xs font-extrabold shadow-md hover:shadow-gold-500/20 transition-all flex items-center justify-center gap-1"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>GO ON MAP</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
