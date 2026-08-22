import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ON_THE_WAY_DISCOVERIES } from '../data/discoveries';
import { EXPERIENCES } from '../data/experiences';
import { DiscoveryPopup } from './DiscoveryPopup';
import { MemoryVideoPlayer } from './MemoryVideoPlayer';
import { Play, FastForward, CheckCircle2, MapPin, Sparkles, Navigation, Compass, ZoomIn, ZoomOut, Layers, Eye, Film } from 'lucide-react';
import { sound } from '../utils/sound';
import { useNavigate } from 'react-router-dom';
import maveliImg from '../assets/maveli.png';

export function KeralaMap() {
  const { activeJourney, setActiveJourney, completeDetourDiscovery, currentLocation, selectedDistrict, myDayExperiences } = useApp();
  const [progress, setProgress] = useState(0); // 0 to 100 travel progress
  const [isTraveling, setIsTraveling] = useState(false);
  const [activeDetourPopup, setActiveDetourPopup] = useState(null);
  const [hasArrived, setHasArrived] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1x to 2.5x zoom
  const [mapMode, setMapMode] = useState('standard'); // 'standard' | 'satellite'
  const [isStreetViewOpen, setIsStreetViewOpen] = useState(false);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

  const navigate = useNavigate();

  // Target destination (or default based on selected District or first experience)
  const availableExperiences = selectedDistrict && selectedDistrict !== 'All'
    ? EXPERIENCES.filter(e => e.district === selectedDistrict)
    : EXPERIENCES;

  const destination = activeJourney || availableExperiences[0] || EXPERIENCES[0];

  // Precise 14 District Landmarks Coordinates on SVG Grid
  const districtLandmarks = [
    { name: 'Kasaragod', x: 22, y: 8, icon: '🏰', color: '#F59E0B' },
    { name: 'Kannur', x: 28, y: 16, icon: '🔥', color: '#EF4444' },
    { name: 'Wayanad', x: 42, y: 22, icon: '⛰️', color: '#059669' },
    { name: 'Kozhikode', x: 35, y: 28, icon: '🍌', color: '#8B5CF6' },
    { name: 'Malappuram', x: 44, y: 35, icon: '🎶', color: '#3B82F6' },
    { name: 'Palakkad', x: 55, y: 41, icon: '🌾', color: '#D97706' },
    { name: 'Thrissur', x: 45, y: 48, icon: '🐯', color: '#F59E0B' },
    { name: 'Ernakulam', x: 42, y: 58, icon: '🐘', color: '#10B981' },
    { name: 'Idukki', x: 62, y: 64, icon: '🍃', color: '#06B6D4' },
    { name: 'Kottayam', x: 48, y: 68, icon: '🪷', color: '#EC4899' },
    { name: 'Alappuzha', x: 43, y: 74, icon: '🛶', color: '#3B82F6' },
    { name: 'Pathanamthitta', x: 54, y: 78, icon: '🍲', color: '#D97706' },
    { name: 'Kollam', x: 48, y: 84, icon: '⛵', color: '#F43F5E' },
    { name: 'Thiruvananthapuram', x: 52, y: 92, icon: '👑', color: '#EC4899' }
  ];

  // Start point (Thrissur default)
  const startCoords = { x: 45, y: 48 };
  const destCoords = destination.coordinates || { x: 42, y: 58 };

  // Maveli current animated position
  const currentX = startCoords.x + (destCoords.x - startCoords.x) * (progress / 100);
  const currentY = startCoords.y + (destCoords.y - startCoords.y) * (progress / 100);

  // Travel progress interval
  useEffect(() => {
    let timer;
    if (isTraveling && progress < 100) {
      timer = setInterval(() => {
        setProgress(prev => {
          const next = prev + 4;
          sound.playChendaBeat();

          // Detour Trigger at 45% progress with non-repeating scenario
          if (next >= 44 && next < 48 && !activeDetourPopup) {
            setIsTraveling(false);
            sound.playPop();
            const randomIndex = Math.floor(Math.random() * ON_THE_WAY_DISCOVERIES.length);
            setActiveDetourPopup(ON_THE_WAY_DISCOVERIES[randomIndex]);
          }

          if (next >= 100) {
            setIsTraveling(false);
            setHasArrived(true);
            sound.playCelebration();
            setIsVideoPlayerOpen(true); // Launch 10-second video playback on arrival!
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
    setIsVideoPlayerOpen(true);
  };

  const handleDiscoverDetour = (detour, choiceSelected) => {
    completeDetourDiscovery(detour, choiceSelected);
    setActiveDetourPopup(null);
    setIsTraveling(true);
  };

  const handleKeepGoingOnRoute = () => {
    sound.playChime();
    setActiveDetourPopup(null);
    setIsTraveling(true);
  };

  const handleEnterExperience = () => {
    sound.playChime();
    navigate(`/experience/${destination.id}`);
  };

  return (
    <div className="w-full glass-panel-gold rounded-3xl p-4 sm:p-6 border border-gold-500/30 shadow-2xl relative overflow-hidden">
      
      {/* Map Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-gold-500/20">
        <div>
          <span className="text-[11px] font-black tracking-widest text-gold-400 uppercase flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
            <span>Precise Interactive Kerala Map (14 Districts)</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-cream-50">
            Destination: <span className="text-gold-300">{destination.title}</span>
          </h2>
          <p className="text-xs text-cream-200/80">
            📍 {destination.district} ({destination.location}) • Distance: {destination.distanceKm} km
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-emerald-950/80 p-1 rounded-xl border border-gold-500/30">
            <button
              onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.3))}
              className="p-1.5 rounded-lg hover:bg-gold-500/20 text-gold-300"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono font-bold text-gold-400 px-1">{zoomLevel.toFixed(1)}x</span>
            <button
              onClick={() => setZoomLevel(prev => Math.max(1, prev - 0.3))}
              className="p-1.5 rounded-lg hover:bg-gold-500/20 text-gold-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Map Layer Mode Toggle */}
          <button
            onClick={() => {
              sound.playPop();
              setMapMode(prev => prev === 'standard' ? 'satellite' : 'standard');
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-gold-300 border border-gold-500/30 text-xs font-bold flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{mapMode === 'standard' ? 'SATELLITE' : 'MAP VIEW'}</span>
          </button>

          {/* Street View Mode Button */}
          <button
            onClick={() => {
              sound.playPop();
              setIsStreetViewOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>360° STREET VIEW</span>
          </button>

          {!hasArrived && (
            <>
              <button
                onClick={handleStartJourney}
                disabled={isTraveling}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-emerald-950 font-black text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-emerald-950" />
                <span>{isTraveling ? 'TRAVELING...' : 'START JOURNEY'}</span>
              </button>

              <button
                onClick={handleFastForward}
                className="px-3 py-2 rounded-xl bg-emerald-900/50 hover:bg-emerald-800/70 text-cream-200 border border-emerald-600/40 text-xs font-bold flex items-center gap-1"
                title="Fast Forward"
              >
                <FastForward className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {hasArrived && (
            <button
              onClick={handleEnterExperience}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-gold-500 hover:scale-105 text-emerald-950 font-black text-xs shadow-xl flex items-center gap-2 animate-bounce-gentle"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>ENTER EXPERIENCE</span>
            </button>
          )}
        </div>
      </div>

      {/* Zoomable Map Stage */}
      <div className="relative w-full h-[460px] sm:h-[520px] rounded-2xl bg-emerald-950/90 border border-gold-500/30 overflow-hidden shadow-inner flex items-center justify-center p-2">
        <motion.div
          animate={{ scale: zoomLevel }}
          transition={{ duration: 0.3 }}
          className="w-full h-full relative flex items-center justify-center"
        >
          {/* Map Vector Graphic */}
          <svg viewBox="0 0 100 100" className="w-full h-full object-contain">
            <defs>
              <linearGradient id="satLandGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B3C26" />
                <stop offset="50%" stopColor="#062C1E" />
                <stop offset="100%" stopColor="#021A11" />
              </linearGradient>
            </defs>

            {/* Precise Kerala Coastal Geography Outline */}
            <path
              d="M20 5 Q42 2 65 10 Q60 30 52 50 Q54 70 58 95 Q42 98 28 88 Q36 68 32 45 Q26 22 20 5 Z"
              fill={mapMode === 'satellite' ? 'url(#satLandGrad)' : '#062C1E'}
              stroke={mapMode === 'satellite' ? '#10B981' : '#D4AF37'}
              strokeWidth="0.7"
            />

            {/* Western Ghats Mountain Range Ridge on Right */}
            <path
              d="M42 12 Q62 25 54 55 Q56 75 58 92"
              stroke="#059669"
              strokeWidth="1.5"
              strokeDasharray="2 1"
              opacity="0.5"
            />

            {/* Arabian Sea Blue Water Border */}
            <path
              d="M0 0 L20 0 L20 5 Q26 22 32 45 Q36 68 28 88 L0 88 Z"
              fill="rgba(59, 130, 246, 0.15)"
            />

            {/* Animated Travel Trail Line */}
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

            {/* Traveled Glowing Route Line */}
            <line
              x1={startCoords.x}
              y1={startCoords.y}
              x2={currentX}
              y2={currentY}
              stroke="#FFD700"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* 14 District Landmarks */}
            {districtLandmarks.map((lm) => {
              const isCurrentLoc = currentLocation === lm.name;
              return (
                <g key={lm.name} transform={`translate(${lm.x}, ${lm.y})`} className="cursor-pointer">
                  {isCurrentLoc && <circle r="4" fill="#FFD700" opacity="0.4" className="animate-ping" />}
                  <circle r="2.2" fill={lm.color} stroke="#FFF" strokeWidth="0.4" />
                  <text x="3" y="1.2" fill="#FFFDF5" fontSize="2.5" fontFamily="sans-serif" fontWeight="bold">
                    {lm.name} {lm.icon}
                  </text>
                </g>
              );
            })}

            {/* Destination Marker */}
            <g transform={`translate(${destCoords.x}, ${destCoords.y})`}>
              <circle r="4.5" fill="#EF4444" opacity="0.4" className="animate-ping" />
              <circle r="3.2" fill="#EF4444" stroke="#FFD700" strokeWidth="0.6" />
              <text x="-1.5" y="1.2" fontSize="3">📍</text>
            </g>

            {/* Bouncing 3D King Maveli Explorer Indicator */}
            <g transform={`translate(${currentX}, ${currentY})`} className="transition-all duration-300">
              <circle r="6" fill="#FFD700" opacity="0.5" className="animate-pulse" />
              <image href={maveliImg} x="-4" y="-7" width="8" height="12" />
            </g>
          </svg>
        </motion.div>

        {/* Overlay Progress Bar Footer */}
        <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-2xl border border-gold-500/30 flex items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-2">
            <img src={maveliImg} alt="Maveli" className="w-8 h-10 object-contain animate-bounce-gentle" />
            <div>
              <span className="text-xs font-bold text-gold-300 block">
                {isTraveling ? `Traveling through ${destination.district}...` : hasArrived ? `Arrived at ${destination.title}!` : 'Ready to start journey'}
              </span>
              <span className="text-[10px] text-cream-200/80">
                24-Hour Journey Progress: {progress}%
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

      {/* 360° Street View Panorama Modal */}
      <AnimatePresence>
        {isStreetViewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-3xl glass-panel-gold rounded-3xl border-2 border-gold-400 overflow-hidden flex flex-col"
            >
              <div className="p-4 bg-emerald-950 flex items-center justify-between border-b border-gold-500/30">
                <span className="text-xs font-black text-gold-300 uppercase tracking-widest flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>360° STREET VIEW PANORAMA • {destination.district} ({destination.location})</span>
                </span>
                <button onClick={() => setIsStreetViewOpen(false)} className="text-cream-200 hover:text-gold-200">
                  ✕
                </button>
              </div>

              <div className="relative w-full h-80 bg-gradient-to-b from-amber-900 via-emerald-900 to-emerald-950 flex flex-col items-center justify-center p-6 text-center">
                <div className="text-5xl mb-3">📍🌴 HD</div>
                <h3 className="text-xl font-serif font-black text-cream-50 mb-1">{destination.title}</h3>
                <p className="text-xs text-cream-200 max-w-md">{destination.description}</p>
                <div className="mt-4 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-bold">
                  Street View Active • Drag & Rotate Panorama Scene
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10-Second Interactive Memory Video Player on Arrival */}
      <MemoryVideoPlayer
        isOpen={isVideoPlayerOpen}
        onClose={() => setIsVideoPlayerOpen(false)}
        memoryTitle={destination.title}
        district={destination.district}
        category={destination.categories ? destination.categories[0] : 'Culture'}
        description={destination.description}
      />

      {/* Detour Discovery Popup */}
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
