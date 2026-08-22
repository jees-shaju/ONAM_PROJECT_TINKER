import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Sparkles, MapPin, Clock, ArrowRight, RefreshCw, Navigation, CheckCircle2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sound } from '../utils/sound';

export function RecommendationCard({ onSelectInterests }) {
  const { getNextRecommendation, formattedTimeRemaining, currentLocation, userInterests, completedMemories, setActiveJourney } = useApp();
  const [excludedIds, setExcludedIds] = useState([]);
  const [recommendation, setRecommendation] = useState(() => getNextRecommendation([]));
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState('');

  const handleFindNextMemory = () => {
    sound.playChime();
    setIsScanning(true);

    const currentId = recommendation?.id;
    const nextExcluded = currentId ? [...excludedIds, currentId] : excludedIds;
    setExcludedIds(nextExcluded);

    const steps = [
      '🔍 Scanning nearby celebrations in Thrissur & Kochi...',
      '⏱️ Checking travel distance & remaining day time...',
      '🧠 Balancing category variety for King Maveli...'
    ];

    steps.forEach((text, index) => {
      setTimeout(() => {
        sound.playChendaBeat();
        setScanStepText(text);
      }, (index + 1) * 350);
    });

    setTimeout(() => {
      const rec = getNextRecommendation(nextExcluded);
      setRecommendation(rec);
      setIsScanning(false);
      sound.playCelebration();
    }, 1400);
  };

  const handleTakeMeThere = () => {
    sound.playChime();
    if (recommendation) {
      setActiveJourney(recommendation);
      navigate('/map');
    }
  };

  return (
    <div className="w-full glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-2xl relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gold-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-gold-400 animate-bounce-gentle" />
            <span className="text-xs font-black tracking-widest text-gold-300 uppercase">
              Signature Feature
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-cream-50 gold-glow-text">
            FIND MY NEXT MEMORY
          </h2>
          <p className="text-xs text-cream-200/80 mt-1">
            Personalized engine balancing distance, time, and cultural variety.
          </p>
        </div>

        {/* Live Context Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-700/50 text-cream-100 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            <span>📍 {currentLocation}</span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>⏳ {formattedTimeRemaining()}</span>
          </div>
          <button
            onClick={onSelectInterests}
            className="px-3 py-1.5 rounded-full bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/40 text-gold-300 font-bold transition-all flex items-center gap-1"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>{userInterests.length} Interests</span>
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="mt-6">
        {isScanning ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center flex flex-col items-center justify-center space-y-4"
          >
            <div className="relative w-16 h-16 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center animate-spin-slow">
              <Sparkles className="w-8 h-8 text-gold-300 animate-pulse" />
            </div>
            <p className="text-sm font-bold text-gold-300 tracking-wide">
              {scanStepText || 'Analyzing Kerala’s Onam energy...'}
            </p>
          </motion.div>
        ) : recommendation ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-emerald-950/60 rounded-2xl p-6 border border-gold-500/30 shadow-xl"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <span>👑</span> I FOUND SOMETHING FOR YOU
                </span>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-900/50 px-2.5 py-1 rounded-full border border-emerald-600/40">
                  {recommendation.distanceKm} km away • {recommendation.duration} mins
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-cream-50 mb-2">
                {recommendation.title}
              </h3>

              <p className="text-sm text-cream-200/90 leading-relaxed mb-4">
                "{recommendation.description}"
              </p>

              {/* Recommendation Rationale */}
              <div className="bg-gold-500/10 p-3.5 rounded-xl border border-gold-500/30 text-xs text-gold-200 mb-6 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gold-300 block mb-0.5">Why Maveli should experience this:</span>
                  <span>{recommendation.recommendationReason}</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handleFindNextMemory}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/60 text-cream-200 border border-emerald-700/50 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>SHOW ME SOMETHING ELSE</span>
                </button>

                <button
                  onClick={handleTakeMeThere}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-terracotta-500 hover:from-gold-400 hover:to-amber-500 text-emerald-950 text-sm font-black shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>TAKE ME THERE (OPEN ANIMATED MAP)</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : null}
      </div>

    </div>
  );
}
