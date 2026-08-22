import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ON_THE_WAY_DISCOVERIES } from '../data/discoveries';
import { EXPERIENCES } from '../data/experiences';
import { getTravelScenario } from '../data/travelScenarios';
import { DiscoveryPopup } from './DiscoveryPopup';
import { MemoryVideoPlayer } from './MemoryVideoPlayer';
import { Play, FastForward, CheckCircle2, MapPin, Sparkles, Navigation, Compass, ZoomIn, ZoomOut, Layers, Eye, Film, Route, Clock } from 'lucide-react';
import { sound } from '../utils/sound';
import { useNavigate } from 'react-router-dom';
import maveliImg from '../assets/maveli.png';
import keralaSvg from '../kerala.svg';

// All 14 district pin positions matched to kerala.svg geometry
const DISTRICT_COORDS = {
  'Kasaragod':          { x: 28, y: 10, icon: '🏰', color: '#F59E0B' },
  'Kannur':             { x: 34, y: 19, icon: '🔥', color: '#EF4444' },
  'Wayanad':            { x: 48, y: 25, icon: '⛰️', color: '#059669' },
  'Kozhikode':          { x: 37, y: 31, icon: '🍌', color: '#8B5CF6' },
  'Malappuram':         { x: 46, y: 38, icon: '🎶', color: '#3B82F6' },
  'Palakkad':           { x: 60, y: 44, icon: '🌾', color: '#D97706' },
  'Thrissur':           { x: 49, y: 52, icon: '🐯', color: '#F59E0B' },
  'Ernakulam':          { x: 46, y: 61, icon: '🐘', color: '#10B981' },
  'Idukki':             { x: 64, y: 66, icon: '🍃', color: '#06B6D4' },
  'Kottayam':           { x: 53, y: 71, icon: '🪷', color: '#EC4899' },
  'Alappuzha':          { x: 42, y: 76, icon: '🛶', color: '#3B82F6' },
  'Pathanamthitta':     { x: 59, y: 80, icon: '🍲', color: '#D97706' },
  'Kollam':             { x: 51, y: 87, icon: '⛵', color: '#F43F5E' },
  'Thiruvananthapuram': { x: 55, y: 93, icon: '👑', color: '#EC4899' }
};

export function KeralaMap() {
  const { activeJourney, setActiveJourney, completeDetourDiscovery, currentLocation, selectedDistrict, myDayExperiences } = useApp();
  const [progress, setProgress] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);
  const [activeDetourPopup, setActiveDetourPopup] = useState(null);
  const [hasArrived, setHasArrived] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapMode, setMapMode] = useState('svg'); // 'svg' | 'satellite'
  const [isStreetViewOpen, setIsStreetViewOpen] = useState(false);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [activeTravelTask, setActiveTravelTask] = useState(null);
  const [shownTasksAtProgress, setShownTasksAtProgress] = useState([]);

  const navigate = useNavigate();

  const availableExperiences = selectedDistrict && selectedDistrict !== 'All'
    ? EXPERIENCES.filter(e => e.district === selectedDistrict)
    : EXPERIENCES;

  const destination = activeJourney || availableExperiences[0] || EXPERIENCES[0];

  // Use current location as start, destination district as end
  const startCoords = DISTRICT_COORDS[currentLocation] || { x: 49, y: 52 };
  const destCoords = destination.coordinates
    ? { x: destination.coordinates.x, y: destination.coordinates.y }
    : (DISTRICT_COORDS[destination.district] || { x: 48, y: 62 });

  const currentX = startCoords.x + (destCoords.x - startCoords.x) * (progress / 100);
  const currentY = startCoords.y + (destCoords.y - startCoords.y) * (progress / 100);

  // Get travel scenario for the destination district
  const travelScenario = getTravelScenario(destination.district);

  // Animated travel progress with unique journey tasks
  useEffect(() => {
    let timer;
    if (isTraveling && progress < 100) {
      timer = setInterval(() => {
        setProgress(prev => {
          const next = prev + 3;
          sound.playChendaBeat();

          // Check for unique travel task triggers (20%, 45%, 70%)
          const tasks = travelScenario.travelTasks;
          for (const task of tasks) {
            if (next >= task.progress && prev < task.progress && !shownTasksAtProgress.includes(task.progress)) {
              setShownTasksAtProgress(sp => [...sp, task.progress]);
              setActiveTravelTask(task.task);
              setTimeout(() => setActiveTravelTask(null), 5000);
            }
          }

          // Midway detour discovery at 44-48%
          if (next >= 44 && next < 48 && !activeDetourPopup) {
            setIsTraveling(false);
            sound.playPop();
            // District-specific discovery filtering
            const relevantDiscoveries = ON_THE_WAY_DISCOVERIES.filter(
              d => !d.district || d.district === destination.district || Math.random() < 0.5
            );
            const pool = relevantDiscoveries.length > 0 ? relevantDiscoveries : ON_THE_WAY_DISCOVERIES;
            const randomIndex = Math.floor(Math.random() * pool.length);
            setActiveDetourPopup(pool[randomIndex]);
          }

          if (next >= 100) {
            setIsTraveling(false);
            setHasArrived(true);
            sound.playCelebration();
            setIsVideoPlayerOpen(true);
            setActiveTravelTask(null);
            return 100;
          }
          return next;
        });
      }, 250);
    }
    return () => clearInterval(timer);
  }, [isTraveling, progress, activeDetourPopup, shownTasksAtProgress, travelScenario, destination.district]);

  const handleStartJourney = () => {
    sound.playChime();
    setHasArrived(false);
    setProgress(0);
    setIsTraveling(true);
    setShownTasksAtProgress([]);
    setActiveTravelTask(null);
  };

  const handleFastForward = () => {
    sound.playPop();
    setProgress(100);
    setIsTraveling(false);
    setHasArrived(true);
    sound.playCelebration();
    setIsVideoPlayerOpen(true);
    setActiveTravelTask(null);
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

  const districtList = Object.entries(DISTRICT_COORDS);

  return (
    <div className="w-full glass-panel-gold rounded-3xl p-4 sm:p-6 border border-gold-500/30 shadow-2xl relative overflow-hidden">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-gold-500/20">
        <div>
          <span className="text-[11px] font-black tracking-widest text-gold-400 uppercase flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
            <span>Kerala SVG Map • 14 Districts • From {currentLocation} → {destination.district}</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-cream-50">
            Destination: <span className="text-gold-300">{destination.title}</span>
          </h2>
          <p className="text-xs text-cream-200/80 flex items-center gap-2 mt-0.5">
            <span>📍 {destination.district} ({destination.location})</span>
            <span className="text-gold-400">•</span>
            <span>Distance: {destination.distanceKm} km</span>
            {travelScenario.icon && (
              <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-bold border border-gold-500/30">
                {travelScenario.icon} Unique Journey
              </span>
            )}
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

          {/* Map View Toggle */}
          <button
            onClick={() => {
              sound.playPop();
              setMapMode(prev => prev === 'svg' ? 'satellite' : 'svg');
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-gold-300 border border-gold-500/30 text-xs font-bold flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{mapMode === 'svg' ? 'SATELLITE' : 'SVG MAP'}</span>
          </button>

          {/* Street View Button */}
          <button
            onClick={() => {
              sound.playPop();
              setIsStreetViewOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>360° VIEW</span>
          </button>

          {!hasArrived && (
            <>
              <button
                onClick={handleStartJourney}
                disabled={isTraveling}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-emerald-950 font-black text-xs shadow-md flex items-center justify-center gap-1.5 disabled:opacity-60"
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

      {/* Unique Journey Task Banner */}
      <AnimatePresence>
        {activeTravelTask && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mb-3 p-3 rounded-2xl bg-gradient-to-r from-gold-500/20 via-amber-500/15 to-gold-500/20 border border-gold-400/50 text-xs text-cream-100 font-semibold flex items-center gap-2 shadow-xl backdrop-blur-sm"
          >
            <Route className="w-4 h-4 text-gold-400 shrink-0" />
            <span>{activeTravelTask}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Stage Container using src/kerala.svg */}
      <div className="relative w-full h-[480px] sm:h-[540px] rounded-2xl bg-emerald-950/90 border border-gold-500/30 overflow-hidden shadow-inner flex items-center justify-center p-2">
        <motion.div
          animate={{ scale: zoomLevel }}
          transition={{ duration: 0.3 }}
          className="w-full h-full relative flex items-center justify-center overflow-hidden"
        >
          {/* SVG Map Layer */}
          {mapMode === 'svg' && (
            <div className="absolute inset-0 flex items-center justify-center p-2 opacity-95">
              <img
                src={keralaSvg}
                alt="Kerala SVG Map"
                className="h-full w-auto object-contain filter drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              />
            </div>
          )}

          {/* Satellite Mode: Google Maps Embed of Kerala */}
          {mapMode === 'satellite' && (
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <iframe
                title="Kerala Satellite View"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=Kerala,India&t=k&z=7&output=embed`}
                allowFullScreen
              />
              <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-emerald-950/80 border border-gold-500/30 text-[10px] font-bold text-gold-300">
                🛰️ SATELLITE MODE
              </div>
            </div>
          )}

          {/* Overlay Interactive Dynamic SVG Layer */}
          {mapMode === 'svg' && (
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-auto">
              
              {/* Travel Line (dashed route) */}
              <line
                x1={startCoords.x}
                y1={startCoords.y}
                x2={destCoords.x}
                y2={destCoords.y}
                stroke="#F59E0B"
                strokeWidth="1"
                strokeDasharray="1.5 2"
                opacity="0.5"
              />

              {/* Traveled Glowing Route Line */}
              <line
                x1={startCoords.x}
                y1={startCoords.y}
                x2={currentX}
                y2={currentY}
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* 14 District Markers */}
              {districtList.map(([name, lm]) => {
                const isCurrentLoc = currentLocation === name;
                const isDestination = destination.district === name;
                return (
                  <g key={name} transform={`translate(${lm.x}, ${lm.y})`} className="cursor-pointer">
                    {isCurrentLoc && <circle r="5" fill="#FFD700" opacity="0.3" className="animate-ping" />}
                    {isDestination && <circle r="5" fill="#EF4444" opacity="0.3" className="animate-ping" />}
                    <circle r="2.5" fill={isDestination ? '#EF4444' : lm.color} stroke="#FFF" strokeWidth="0.4" />
                    <text x="3.5" y="1.2" fill="#FFFDF5" fontSize="2.2" fontFamily="sans-serif" fontWeight="bold">
                      {name} {lm.icon}
                    </text>
                  </g>
                );
              })}

              {/* Start Location Marker */}
              <g transform={`translate(${startCoords.x}, ${startCoords.y})`}>
                <circle r="3.5" fill="#10B981" stroke="#FFFDF5" strokeWidth="0.6" opacity="0.9" />
                <text x="-1.2" y="1.2" fontSize="2.5" textAnchor="middle">🏠</text>
              </g>

              {/* Destination Marker */}
              <g transform={`translate(${destCoords.x}, ${destCoords.y})`}>
                <circle r="4.5" fill="#EF4444" opacity="0.4" className="animate-ping" />
                <circle r="3" fill="#EF4444" stroke="#FFD700" strokeWidth="0.6" />
                <text x="-1.5" y="1.2" fontSize="2.8">📍</text>
              </g>

              {/* Bouncing 3D King Maveli Avatar on Map */}
              <g transform={`translate(${currentX}, ${currentY})`} className="transition-all duration-300">
                <circle r="5.5" fill="#FFD700" opacity="0.4" className="animate-pulse" />
                <image href={maveliImg} x="-3.5" y="-7" width="7" height="11" />
              </g>
            </svg>
          )}
        </motion.div>

        {/* Footer Overlay - Journey Status */}
        <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-2xl border border-gold-500/30 flex items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-2">
            <img src={maveliImg} alt="Maveli" className="w-7 h-10 object-contain animate-bounce-gentle" />
            <div>
              <span className="text-xs font-bold text-gold-300 block">
                {isTraveling ? `Traveling through ${destination.district}...` : hasArrived ? `✅ Arrived at ${destination.title}!` : `Ready to journey to ${destination.district}`}
              </span>
              <span className="text-[10px] text-cream-200/80">
                {currentLocation} → {destination.district} • Progress: {progress}%
              </span>
            </div>
          </div>

          <div className="w-32 sm:w-48 bg-emerald-950 rounded-full h-2.5 overflow-hidden border border-gold-500/30">
            <div
              className="bg-gradient-to-r from-gold-500 to-amber-400 h-full transition-all duration-200 rounded-full"
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
              className="relative w-full max-w-4xl glass-panel-gold rounded-3xl border-2 border-gold-400 overflow-hidden flex flex-col"
            >
              <div className="p-4 bg-emerald-950 flex items-center justify-between border-b border-gold-500/30">
                <span className="text-xs font-black text-gold-300 uppercase tracking-widest flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>GOOGLE MAPS STREET VIEW • {destination.district} — {destination.location}</span>
                </span>
                <button onClick={() => setIsStreetViewOpen(false)} className="text-cream-200 hover:text-gold-200 text-xl px-2">✕</button>
              </div>

              <div className="relative w-full h-96 bg-black overflow-hidden">
                <iframe
                  title={`Street View - ${destination.location}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(destination.location + ', ' + destination.district + ', Kerala')}&layer=c&cbll=${destination.coordinates?.lat || 10.1632},${destination.coordinates?.lng || 76.6413}&cbp=12,90,0,0,0&output=svembed`}
                  allowFullScreen
                />
              </div>

              <div className="p-4 bg-emerald-950/90 border-t border-gold-500/20 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-serif font-bold text-cream-50">{destination.title}</h3>
                  <p className="text-xs text-cream-200/70">{destination.description?.slice(0, 80)}...</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(destination.location + ', ' + destination.district + ', Kerala')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-black text-xs hover:scale-105 transition-all"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10-Second Interactive Memory Video Player */}
      <MemoryVideoPlayer
        isOpen={isVideoPlayerOpen}
        onClose={() => setIsVideoPlayerOpen(false)}
        memoryTitle={destination.title}
        district={destination.district}
        category={destination.categories ? destination.categories[0] : 'Culture'}
        description={travelScenario.arrivalScene || destination.description}
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
