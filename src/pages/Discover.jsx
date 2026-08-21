import React, { useState } from 'react';
import { EXPERIENCES } from '../data/experiences';
import { ExperienceCard } from '../components/ExperienceCard';
import { Search, Filter, CheckCircle2, Sparkles, X, MapPin, Clock, Plus } from 'lucide-react';
import { sound } from '../utils/sound';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export function Discover() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedExpModal, setSelectedExpModal] = useState(null);
  const { addExperienceToDay, setActiveJourney } = useApp();
  const navigate = useNavigate();

  const categories = [
    'ALL', 'FOOD', 'PEOPLE', 'CULTURE', 'NATURE', 'MODERN KERALA', 'MUSIC', 'VILLAGE', 'SURPRISE'
  ];

  const filteredExperiences = EXPERIENCES.filter((exp) => {
    // Category match
    const matchesCategory =
      selectedCategory === 'ALL'
        ? true
        : selectedCategory === 'SURPRISE'
        ? true
        : exp.categories.some(cat => cat.toUpperCase() === selectedCategory);

    // Search query match
    const matchesQuery =
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Verified match
    const matchesVerified = verifiedOnly ? exp.verified : true;

    return matchesCategory && matchesQuery && matchesVerified;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-black tracking-widest text-gold-400 uppercase">
          Explore Kerala
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-cream-50 gold-glow-text">
          What should Maveli experience?
        </h1>
        <p className="text-xs sm:text-sm text-cream-200/80 mt-1">
          Browse authentic community celebrations, feasts, music rehearsals, and tech hubs.
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-gold-500/20 shadow-xl space-y-4">
        
        {/* Search Input & Verified Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search experiences, places, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-emerald-950/70 border border-gold-500/30 text-xs text-cream-50 placeholder:text-cream-300/50 focus:outline-none focus:border-gold-400"
            />
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setVerifiedOnly(prev => !prev);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              verifiedOnly
                ? 'bg-emerald-900/60 text-emerald-300 border-emerald-500/50'
                : 'bg-emerald-950/40 text-cream-300 border-gold-500/20 hover:border-gold-400/40'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${verifiedOnly ? 'text-emerald-400' : 'text-cream-400'}`} />
            <span>✓ Verified Events Only</span>
          </button>
        </div>

        {/* Categories Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playPop();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 shadow-md font-bold'
                  : 'bg-emerald-950/60 text-cream-300 hover:text-gold-300 border border-gold-500/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((exp) => (
          <ExperienceCard
            key={exp.id}
            experience={exp}
            onSelectDetails={(item) => {
              sound.playPop();
              setSelectedExpModal(item);
            }}
          />
        ))}
      </div>

      {/* Experience Detail Modal */}
      {selectedExpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/85 backdrop-blur-sm">
          <div className="w-full max-w-xl glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-400 shadow-2xl relative">
            <button
              onClick={() => setSelectedExpModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950/60 text-cream-200 hover:text-white border border-gold-500/20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              {selectedExpModal.categories.map((c, i) => (
                <span key={i} className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-extrabold uppercase">
                  {c}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-serif font-bold text-cream-50 mb-2">
              {selectedExpModal.title}
            </h2>

            <p className="text-xs text-cream-200/90 leading-relaxed mb-4">
              {selectedExpModal.description}
            </p>

            <div className="bg-emerald-950/60 p-3.5 rounded-xl border border-gold-500/20 text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gold-400 font-bold">Location:</span>
                <span>{selectedExpModal.location} ({selectedExpModal.district})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold-400 font-bold">Duration:</span>
                <span>{selectedExpModal.duration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold-400 font-bold">Organizer:</span>
                <span>{selectedExpModal.organizer}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  addExperienceToDay(selectedExpModal);
                  setSelectedExpModal(null);
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 text-cream-100 font-bold text-xs border border-emerald-600/40"
              >
                ADD TO MY DAY 📋
              </button>

              <button
                onClick={() => {
                  sound.playChime();
                  setActiveJourney(selectedExpModal);
                  navigate('/map');
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-black text-xs shadow-lg"
              >
                START JOURNEY ON MAP 🗺️
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
