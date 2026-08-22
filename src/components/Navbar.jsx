import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sparkles, MapPin, Clock, Flower2, Compass, Layers } from 'lucide-react';
import { DistrictSelectorModal } from './DistrictSelectorModal';
import { sound } from '../utils/sound';

export function Navbar() {
  const { completedMemories, formattedTimeRemaining, currentLocation, selectedDistrict, getNextRecommendation, setActiveJourney } = useApp();
  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/discover', label: 'Discover' },
    { path: '/my-day', label: 'My Day (24h)' },
    { path: '/map', label: 'Map' },
    { path: '/memories', label: 'Memories Vault' }
  ];

  const handleSurpriseMe = () => {
    sound.playChime();
    const nextExp = getNextRecommendation();
    if (nextExp) {
      setActiveJourney(nextExp);
      navigate('/map');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-gold-500/20 px-4 lg:px-8 py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-amber-200 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-gold-300">
              <span className="text-2xl animate-bounce-gentle">👑</span>
              <div className="absolute -inset-1 rounded-full bg-gold-400/30 blur-sm group-hover:bg-gold-400/50 transition-all"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl font-bold tracking-wider bg-gradient-to-r from-gold-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                  MAVELI 24H
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30 font-sans font-semibold">
                  ONAM 2026
                </span>
              </div>
              <p className="text-[10px] text-cream-200/80 tracking-widest font-medium uppercase">
                14 Districts • 24-Hour Memory Vault
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-emerald-950/60 p-1.5 rounded-full border border-gold-500/20 shadow-inner">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => sound.playPop()}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 shadow-md font-bold'
                      : 'text-cream-200 hover:text-gold-300 hover:bg-emerald-900/40'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Status Indicators & District Selector */}
          <div className="flex items-center gap-2.5">
            
            {/* District Selector Button */}
            <button
              onClick={() => {
                sound.playPop();
                setIsDistrictModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800 border border-gold-500/30 text-xs text-gold-300 font-bold transition-all shadow-sm"
              title="Select Kerala District"
            >
              <Compass className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
              <span>{selectedDistrict === 'All' ? '14 Districts' : selectedDistrict}</span>
            </button>

            {/* Memories Vault Pill */}
            <Link
              to="/memories"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 hover:bg-gold-500/20 transition-all text-xs font-semibold text-gold-300"
            >
              <Flower2 className="w-3.5 h-3.5 text-gold-400" />
              <span>{completedMemories.length} Memories</span>
            </Link>

            {/* 24-Hour Time Remaining Ticker */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-xs font-bold text-amber-300">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>⏳ {formattedTimeRemaining()} (24H)</span>
            </div>

            {/* Surprise Me Button */}
            <button
              onClick={handleSurpriseMe}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-terracotta-500 hover:from-gold-400 hover:to-amber-500 text-emerald-950 text-xs font-extrabold shadow-lg hover:scale-105 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
              <span className="hidden sm:inline">SURPRISE ME</span>
            </button>
          </div>

        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-gold-500/20 px-2 py-2 flex items-center justify-around">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => sound.playPop()}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[10px] font-semibold transition-all ${
                  isActive
                    ? 'text-gold-400 font-bold bg-gold-500/10'
                    : 'text-cream-300/70 hover:text-cream-100'
                }`}
              >
                <span>{link.label.includes('Home') ? '👑' : link.label.includes('Discover') ? '🌼' : link.label.includes('My Day') ? '📋' : link.label.includes('Map') ? '🗺️' : '🌺'}</span>
                <span>{link.label.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* District Selector Modal */}
      <DistrictSelectorModal
        isOpen={isDistrictModalOpen}
        onClose={() => setIsDistrictModalOpen(false)}
      />
    </>
  );
}
