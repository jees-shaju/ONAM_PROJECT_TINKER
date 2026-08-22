import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Check, Sparkles, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/sound';

export const KERALA_14_DISTRICTS = [
  { name: 'All', icon: '🌴', desc: 'All 14 Districts of Kerala' },
  { name: 'Thiruvananthapuram', icon: '👑', desc: 'Capital & Heritage Illuminations' },
  { name: 'Kollam', icon: '⛵', desc: 'Ashtamudi Lake & Coir Craft' },
  { name: 'Pathanamthitta', icon: '🍲', desc: 'Aranmula 64-Dish Valla Sadya' },
  { name: 'Alappuzha', icon: '🛶', desc: 'Nehru Trophy Snake Boat Race' },
  { name: 'Kottayam', icon: '🪷', desc: 'Kumarakom Floating Pookalam' },
  { name: 'Idukki', icon: '🍃', desc: 'Munnar High Range Tea & Flower Harvest' },
  { name: 'Ernakulam', icon: '🐘', desc: 'Thripunithura Royal Athachamayam' },
  { name: 'Thrissur', icon: '🐯', desc: 'Swaraj Round Pulikali Tiger Dance' },
  { name: 'Palakkad', icon: '🌾', desc: 'Kalpathi Heritage & Folk Dances' },
  { name: 'Malappuram', icon: '🎶', desc: 'Teak Heritage & Oppana Songs' },
  { name: 'Kozhikode', icon: '🍌', desc: 'SM Street Halwa & Culinary Fest' },
  { name: 'Wayanad', icon: '⛰️', desc: 'Chembra Peak & Tribal Onam' },
  { name: 'Kannur', icon: '🔥', desc: 'Theyyam Rituals & Kasavu Handloom' },
  { name: 'Kasaragod', icon: '🏰', desc: 'Bekal Fort Sunset & North Malabar' }
];

export function DistrictSelectorModal({ isOpen, onClose }) {
  const { selectedDistrict, setSelectedDistrict, setCurrentLocation, notify } = useApp();

  if (!isOpen) return null;

  const handleSelect = (districtName) => {
    sound.playChime();
    setSelectedDistrict(districtName);
    if (districtName !== 'All') {
      setCurrentLocation(districtName);
    }
    notify(`Selected District: ${districtName} 📍`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl glass-panel-gold rounded-3xl border-2 border-gold-400/60 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-5 bg-emerald-950/90 border-b border-gold-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gold-500/20 border border-gold-400/30 text-gold-300">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-black text-cream-50">
                  Select Kerala District (14 Districts)
                </h2>
                <p className="text-xs text-cream-200/80">
                  Explore authentic Onam festival events & destinations across Kerala.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gold-500/20 text-cream-200 hover:text-gold-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* District Grid */}
          <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {KERALA_14_DISTRICTS.map((dist) => {
              const isSelected = selectedDistrict === dist.name;
              return (
                <button
                  key={dist.name}
                  onClick={() => handleSelect(dist.name)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 group relative ${
                    isSelected
                      ? 'bg-gradient-to-r from-gold-500/30 to-amber-600/30 border-gold-400 text-gold-200 shadow-lg'
                      : 'bg-emerald-950/60 border-gold-500/20 hover:border-gold-400/60 text-cream-100 hover:bg-emerald-900/50'
                  }`}
                >
                  <span className="text-2xl p-2 rounded-xl bg-emerald-900/50 border border-gold-500/20 shrink-0">
                    {dist.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-cream-50 truncate group-hover:text-gold-300 transition-colors">
                        {dist.name}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-gold-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-cream-300/70 truncate mt-0.5">{dist.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 bg-emerald-950/90 border-t border-gold-500/20 flex items-center justify-between text-xs">
            <span className="text-cream-300/80">Currently Selected: <strong className="text-gold-300">{selectedDistrict}</strong></span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-black text-xs shadow-md"
            >
              DONE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
