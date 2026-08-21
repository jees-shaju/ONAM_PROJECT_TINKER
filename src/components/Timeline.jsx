import React from 'react';
import { motion, Reorder } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Clock, MapPin, Trash2, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { useNavigate } from 'react-router-dom';

export function Timeline() {
  const { myDayExperiences, removeExperienceFromDay, optimizeDay, setActiveJourney } = useApp();
  const navigate = useNavigate();

  const handleStart = (exp) => {
    sound.playChime();
    setActiveJourney(exp);
    navigate('/map');
  };

  return (
    <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/20 shadow-2xl">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gold-500/20">
        <div>
          <span className="text-xs font-black tracking-widest text-gold-400 uppercase">
            Itinerary Planner
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-cream-50">
            Let's organise your one day.
          </h2>
          <p className="text-xs text-cream-200/80 mt-1">
            {myDayExperiences.length} experiences planned • ~{myDayExperiences.reduce((acc, curr) => acc + curr.duration, 0)} mins total experience time
          </p>
        </div>

        <button
          onClick={optimizeDay}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-gold-500 hover:from-gold-400 hover:to-amber-400 text-emerald-950 font-black text-xs shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4 fill-emerald-950 text-emerald-950" />
          <span>OPTIMISE MY DAY</span>
        </button>
      </div>

      {/* Timeline List */}
      <div className="mt-6 space-y-4">
        {myDayExperiences.length === 0 ? (
          <div className="text-center py-12 text-cream-300/60 bg-emerald-950/40 rounded-2xl border border-dashed border-gold-500/20">
            <p className="text-sm font-semibold mb-2">No experiences added to your day yet!</p>
            <p className="text-xs">Browse Discover or Invitations to build your Onam journey.</p>
          </div>
        ) : (
          myDayExperiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                exp.completed
                  ? 'bg-emerald-950/70 border-emerald-500/40 opacity-80'
                  : 'glass-card border-gold-500/20 hover:border-gold-400/50'
              }`}
            >
              {/* Left Time Node */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-16 text-center">
                  <span className="text-xs font-black text-gold-400 block">
                    {exp.assignedTime || `${9 + idx * 2}:00 AM`}
                  </span>
                  <span className="text-[10px] text-cream-300/70 block">
                    {exp.duration} mins
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-xs font-extrabold text-gold-300">
                  {exp.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : idx + 1}
                </div>
              </div>

              {/* Middle Title & Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-serif font-bold text-cream-50 truncate">
                    {exp.title}
                  </h4>
                  {exp.completed && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold uppercase border border-emerald-500/30">
                      Completed ✓
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-cream-200/80">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold-400" />
                    {exp.location}
                  </span>
                  <span>•</span>
                  <span>{exp.categories.join(' + ')}</span>
                </div>
              </div>

              {/* Right Action */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {!exp.completed && (
                  <button
                    onClick={() => handleStart(exp)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-emerald-950 text-xs font-extrabold shadow-md flex items-center gap-1.5"
                  >
                    <span>TRAVEL HERE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => removeExperienceFromDay(exp.id)}
                  className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-all"
                  title="Remove from itinerary"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

    </div>
  );
}
