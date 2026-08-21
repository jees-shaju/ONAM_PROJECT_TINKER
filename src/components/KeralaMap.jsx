import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ON_THE_WAY_DISCOVERIES } from '../data/discoveries';
import { EXPERIENCES } from '../data/experiences';
import { DiscoveryPopup } from './DiscoveryPopup';
import { Play, FastForward, CheckCircle2, MapPin, Sparkles, Navigation, Compass } from 'lucide-react';
import { sound } from '../utils/sound';
import { useNavigate } from 'react-router-dom';

export function KeralaMap() {
  const { activeJourney, setActiveJourney, completeDetourDiscovery, completeExperience, currentLocation, myDayExperiences } = useApp();
  const [progress, setProgress] = useState(0); // 0 to 100 travel progress percentage
  const [isTraveling, setIsTraveling] = useState(false);
  const [activeDetourPopup, setActiveDetourPopup] = useState(null);
  const [hasArrived, setHasArrived] = useState(false);
  const navigate = useNavigate();

  // Target destination (or default to Thrissur Pookalam)
  const destination = activeJourney || EXPERIENCES[0];

  // Map Grid Landmarks
  const landmarks = [
    { name: 'Kozhikode', x: 35, y: 28, icon: '🌴' },
    { name: 'Thrissur', x: 45, y: 48, icon: '🛕' },
    { name: 'Kochi', x: 42, y: 62, icon: '🚀' },
    { name: 'Alappuzha', x: 43, y: 74, icon: '🛶' },
    { name: 'Trivandrum', x: 52, y: 88, icon: '👑' }
  ];

  // Start point (Thrissur center default)
  const startCoords = { x: 45, y: 48 };
  const destCoords = destination.coordinates || { x: 42, y: 62 };

  // Current Maveli position along journey path
  const currentX = startCoords.x + (destCoords.x - startCoords.x) * (progress / 100);
  const currentY = startCoords.y + (destCoords.y - startCoords.y) * (progress / 100);

  // Animated journey interval
  useEffect(() => {
    let timer;
    if (isTraveling && progress < 100) {
      timer = setInterval(() => {
        setProgress(prev => {
          const next = prev + 4;
          sound.playChendaBeat();

          // Detour Trigger at 40% progress if not yet discovered
          if (next >= 40 && next < 44 && !activeDetourPopup) {
            setIsTraveling(false);
            sound.playPop();
            setActiveDetourPopup(ON_THE_WAY_DISCOVERIES[0]);
          }

          if (next >= 100) {
            setIsTraveling(false);
            setHasArrived(true);
            sound.playCelebration();
            return 100;
          }
          return next;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isTraveling, progress, activeDetourPopup]);

  const handleStartJourney = () => {
    sound.playChime();
    setHasArrived(false);
    setProgress(0);
    setIsTraveling(true);
  };

  const handleFastForward = () => {
    sound.playPop();
    setProgress(100);
    setIsTraveling(false);
    setHasArrived(true);
    sound.playCelebration();
  };

  const handleDiscoverDetour = (detour, choiceSelected) => {
    completeDetourDiscovery(detour, choiceSelected);
    setActiveDetourPopup(null);
    setIsTraveling(true); // Resume journey after detour
  };

  const handleKeepGoingOnRoute = () => {
    sound.playChime();
    setActiveDetourPopup(null);
    setIsTraveling(true); // Resume journey
  };

  const handleEnterExperience = () => {
    sound.playChime();
    navigate(`/experience/${destination.id}`);
  };

  return (
    <div className="w-full glass-panel-gold rounded-3xl p-4 sm:p-6 border border-gold-500/30 shadow-2xl relative overflow-hidden">
      
      {/* Top Banner Control Panel */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-gold-500/20">
        <div>
          <span className="text-[11px] font-black tracking-widest text-gold-400 uppercase flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
            <span>Interactive Animated Kerala Explorer Map</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-cream-50">
            Destination: <span className="text-gold-300">{destination.title}</span>
          </h2>
          <p className="text-xs text-cream-200/80">
            📍 {destination.location} • Distance: {destination.distanceKm} km
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!hasArrived && (
            <>
              <button
                onClick={handleStartJourney}
                disabled={isTraveling}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-emerald-950 font-black text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-emerald-950" />
                <span>{isTraveling ? 'TRAVELING...' : 'START JOURNEY'}</span>
              </button>

              <button
                onClick={handleFastForward}
                className="px-3 py-2 rounded-xl bg-emerald-900/50 hover:bg-emerald-800/70 text-cream-200 border border-emerald-600/40 text-xs font-bold transition-all flex items-center gap-1"
                title="Fast Forward to destination"
              >
                <FastForward className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {hasArrived && (
            <button
              onClick={handleEnterExperience}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-gold-500 hover:scale-105 text-emerald-950 font-black text-xs shadow-xl flex items-center justify-center gap-2 animate-bounce-gentle"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>YOU'VE ARRIVED! ENTER EXPERIENCE</span>
            </button>
          )}
        </div>
      </div>

      {/* SVG Kerala Map Canvas Area */}
      <div className="relative w-full h-[420px] sm:h-[480px] rounded-2xl bg-emerald-950/80 border border-gold-500/20 overflow-hidden shadow-inner flex items-center justify-center pookalam-pattern">
        
        {/* Animated Map Grid SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full object-contain">
          
          {/* Stylized Kerala Coastline Shape */}
          <path
            d="M25 10 Q40 5 60 12 Q55 35 48 55 Q50 75 55 92 Q42 95 30 85 Q38 65 35 45 Q30 25 25 10 Z"
            fill="#062C1E"
            stroke="#D4AF37"
            strokeWidth="0.8"
            opacity="0.85"
          />

          {/* Arabian Sea Blue Water Gradient Left */}
          <path
            d="M0 0 L25 0 L25 10 Q30 25 35 45 Q38 65 30 85 L0 85 Z"
            fill="rgba(59, 130, 246, 0.12)"
          />

          {/* District Boundary Lines */}
          <path d="M25 20 Q45 22 58 20" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.4" />
          <path d="M28 40 Q45 42 52 40" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.4" />
          <path d="M32 60 Q45 62 50 60" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.4" />

          {/* Glowing Animated Travel Path (Dora Explorer Trail) */}
          <line
            x1={startCoords.x}
            y1={startCoords.y}
            x2={destCoords.x}
            y2={destCoords.y}
            stroke="#F59E0B"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity="0.5"
          />

          {/* Traveled Glowing Path */}
          <line
            x1={startCoords.x}
            y1={startCoords.y}
            x2={currentX}
            y2={currentY}
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
            className="drop-shadow-md"
          />

          {/* Landmark Pins */}
          {landmarks.map((lm, idx) => (
            <g key={idx} transform={`translate(${lm.x}, ${lm.y})`}>
              <circle r="2.5" fill="#F59E0B" opacity="0.8" />
              <text x="3.5" y="1.5" fill="#FFFDF5" fontSize="2.8" fontFamily="sans-serif" fontWeight="bold">
                {lm.name}
              </text>
            </g>
          ))}

          {/* "ON THE WAY" Unexpected Discovery Marker along route */}
          {ON_THE_WAY_DISCOVERIES.map((disc, idx) => {
            const discX = startCoords.x + (destCoords.x - startCoords.x) * 0.45 + (idx * 3);
            const discY = startCoords.y + (destCoords.y - startCoords.y) * 0.45 - (idx * 2);
            return (
              <g
                key={disc.id}
                transform={`translate(${discX}, ${discY})`}
                onClick={() => {
                  sound.playPop();
                  setActiveDetourPopup(disc);
                }}
                className="cursor-pointer"
              >
                <circle r="4" fill="#EC4899" opacity="0.3" className="animate-ping" />
                <circle r="3" fill="#EC4899" stroke="#FFF" strokeWidth="0.5" />
                <text x="-2" y="1.2" fontSize="3">{disc.icon}</text>
              </g>
            );
          })}

          {/* Start Point Marker */}
          <circle cx={startCoords.x} cy={startCoords.y} r="2.5" fill="#10B981" />

          {/* Destination Marker Pin */}
          <g transform={`translate(${destCoords.x}, ${destCoords.y})`}>
            <circle r="4" fill="#EF4444" opacity="0.4" className="animate-ping" />
            <circle r="3" fill="#EF4444" stroke="#FFD700" strokeWidth="0.6" />
            <text x="-1.5" y="1.2" fontSize="3">📍</text>
          </g>

          {/* Bouncing Maveli Explorer Indicator Icon */}
          <g transform={`translate(${currentX}, ${currentY})`} className="transition-all duration-300">
            <circle r="5" fill="#FFD700" opacity="0.4" className="animate-pulse" />
            <text x="-3" y="2" fontSize="5">👑</text>
          </g>
        </svg>

        {/* Overlay Progress Bar Footer */}
        <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-2xl border border-gold-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl animate-bounce-gentle">👑</span>
            <div>
              <span className="text-xs font-bold text-gold-300 block">
                {isTraveling ? 'Traveling through Kerala roads...' : hasArrived ? 'Arrived at Destination!' : 'Ready to start journey'}
              </span>
              <span className="text-[10px] text-cream-200/80">
                Progress: {progress}%
              </span>
            </div>
          </div>

          <div className="w-36 sm:w-48 bg-emerald-950 rounded-full h-2.5 overflow-hidden border border-gold-500/30">
            <div
              className="bg-gradient-to-r from-gold-500 to-amber-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Detour Discovery Popup Modal */}
      <AnimatePresence>
        {activeDetourPopup && (
          <DiscoveryPopup
            discovery={activeDetourPopup}
            onDiscover={handleDiscoverDetour}
            onKeepGoing={handleKeepGoingOnRoute}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
