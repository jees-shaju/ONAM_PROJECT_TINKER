import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ON_THE_WAY_DISCOVERIES } from '../data/discoveries';
import { EXPERIENCES } from '../data/experiences';
import { getTravelScenario } from '../data/travelScenarios';
import { getScenarioImages } from '../data/scenarioImages';
import { DiscoveryPopup } from './DiscoveryPopup';
import {
  BookOpen, CheckCircle2, Sparkles, Navigation, Compass,
  ZoomIn, ZoomOut, Layers, Eye, ScrollText, ChevronRight, Crown, Star,
  Zap, RotateCcw, MapPin
} from 'lucide-react';
import { sound } from '../utils/sound';
import { useNavigate } from 'react-router-dom';
import maveliImg from '../assets/maveli.png';
import keralaSvg from '../kerala.svg';

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
  'Thiruvananthapuram': { x: 55, y: 93, icon: '👑', color: '#EC4899' },
};

function useTypewriter(text, speed = 22, active = true) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    if (!active || !text) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, active]);
  return displayed;
}

function NarrationText({ text }) {
  const displayed = useTypewriter(text, 22, true);
  return (
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="text-sm sm:text-base font-serif italic text-cream-50 leading-relaxed">
      "{displayed}"
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-4 bg-gold-400 ml-0.5 align-middle" />
    </motion.p>
  );
}

export function KeralaMap() {
  const {
    activeJourney,
    setActiveJourney,
    completeDetourDiscovery,
    currentLocation,
    setCurrentLocation,
    selectedDistrict,
    setSelectedDistrict
  } = useApp();

  const [progress, setProgress] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);
  const [activeDetourPopup, setActiveDetourPopup] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapMode, setMapMode] = useState('svg');
  const [isStreetViewOpen, setIsStreetViewOpen] = useState(false);
  const [isArrivalMusicPlaying, setIsArrivalMusicPlaying] = useState(false);

  // travelPhase: 'idle' | 'moving' | 'choice' | 'response' | 'arrived'
  const [travelPhase, setTravelPhase] = useState('idle');
  const [activeStoryMoment, setActiveStoryMoment] = useState(null);
  const [selectedScenarioImage, setSelectedScenarioImage] = useState(null);
  const [storyMomentsShown, setStoryMomentsShown] = useState([]);
  const [choiceResponse, setChoiceResponse] = useState(null);
  const [journeyLog, setJourneyLog] = useState([]);
  const responseTimerRef = useRef(null);

  const navigate = useNavigate();

  const availableExperiences = selectedDistrict && selectedDistrict !== 'All'
    ? EXPERIENCES.filter(e => e.district === selectedDistrict)
    : EXPERIENCES;

  const destination = activeJourney || availableExperiences[0] || EXPERIENCES[0];

  const startCoords = DISTRICT_COORDS[currentLocation] || { x: 49, y: 52 };
  const destCoords = destination
    ? (destination.coordinates
        ? { x: destination.coordinates.x, y: destination.coordinates.y }
        : (DISTRICT_COORDS[destination.district] || { x: 48, y: 62 }))
    : { x: 48, y: 62 };

  const currentX = startCoords.x + (destCoords.x - startCoords.x) * (progress / 100);
  const currentY = startCoords.y + (destCoords.y - startCoords.y) * (progress / 100);

  const travelScenario = getTravelScenario(destination?.district);
  const detourShownRef = useRef(false);

  // Timer: smoothly increments progress when traveling
  useEffect(() => {
    if (!isTraveling || travelPhase !== 'moving') return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [isTraveling, travelPhase]);

  // Story & checkpoint trigger effect based on progress
  useEffect(() => {
    if (!isTraveling || travelPhase !== 'moving') return;

    const tasks = travelScenario?.travelTasks || [];
    for (let i = 0; i < tasks.length; i++) {
      if (progress >= tasks[i].progress && !storyMomentsShown.includes(i)) {
        setStoryMomentsShown(s => [...s, i]);
        setIsTraveling(false);
        setTravelPhase('choice');
        setActiveStoryMoment({ ...tasks[i], momentIndex: i });
        sound.playChime();
        return;
      }
    }

    // Detour trigger at ~58% (once per trip)
    if (progress >= 58 && progress < 66 && !detourShownRef.current && !activeDetourPopup) {
      detourShownRef.current = true;
      setIsTraveling(false);
      sound.playPop();
      const pool = ON_THE_WAY_DISCOVERIES.filter(
        d => !d.district || d.district === destination?.district || Math.random() < 0.5
      );
      const arr = pool.length > 0 ? pool : ON_THE_WAY_DISCOVERIES;
      setActiveDetourPopup(arr[Math.floor(Math.random() * arr.length)]);
      return;
    }

    // Arrival trigger at 100%
    if (progress >= 100) {
      setIsTraveling(false);
      setTravelPhase('arrived');
      if (destination?.district) {
        setCurrentLocation(destination.district);
      }
    }
  }, [progress, isTraveling, travelPhase, storyMomentsShown, travelScenario, activeDetourPopup, destination, setCurrentLocation]);

  const handleStartJourney = () => {
    sound.playChime();
    setProgress(0);
    setIsArrivalMusicPlaying(false);
    detourShownRef.current = false;
    setTravelPhase('moving');
    setIsTraveling(true);
    setStoryMomentsShown([]);
    setActiveStoryMoment(null);
    setChoiceResponse(null);
    setJourneyLog([]);
  };

  const handleFastTravel = () => {
    sound.playCelebration();
    if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    setProgress(100);
    setIsArrivalMusicPlaying(false);
    setIsTraveling(false);
    setActiveStoryMoment(null);
    setActiveDetourPopup(null);
    setTravelPhase('arrived');
    if (destination?.district) {
      setCurrentLocation(destination.district);
    }
  };

  const handleResetJourney = () => {
    sound.playPop();
    if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    setProgress(0);
    setIsArrivalMusicPlaying(false);
    setIsTraveling(false);
    setTravelPhase('idle');
    setActiveStoryMoment(null);
    setActiveDetourPopup(null);
    setChoiceResponse(null);
    setStoryMomentsShown([]);
  };

  const handleSelectDistrictPin = (districtName) => {
    sound.playChime();
    const expInDistrict = EXPERIENCES.find(e => e.district === districtName) || {
      id: `exp-${districtName.toLowerCase()}`,
      title: `${districtName} Onam Celebration`,
      district: districtName,
      location: districtName,
      categories: ['Culture', 'People'],
      duration: 45,
      description: `Join King Maveli in exploring the unique festive traditions of ${districtName}.`,
      distanceKm: 25
    };
    setActiveJourney(expInDistrict);
    setSelectedDistrict(districtName);
    setProgress(0);
    setIsArrivalMusicPlaying(false);
    setIsTraveling(false);
    setTravelPhase('idle');
    setActiveStoryMoment(null);
    setActiveDetourPopup(null);
    setChoiceResponse(null);
    setStoryMomentsShown([]);
  };

  const handleStoryChoice = (choice) => {
    sound.playChime();
    setJourneyLog(prev => [...prev, { choice: choice.label, response: choice.response }]);
    setChoiceResponse(choice.response);
    setTravelPhase('response');
    setActiveStoryMoment(null);
    if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    responseTimerRef.current = setTimeout(() => {
      setChoiceResponse(null);
      setTravelPhase('moving');
      setIsTraveling(true);
    }, 2800);
  };

  const handleDiscoverDetour = (detour, choiceSelected) => {
    completeDetourDiscovery(detour, choiceSelected);
    setActiveDetourPopup(null);
    setTravelPhase('moving');
    setIsTraveling(true);
  };

  const handleKeepGoingOnRoute = () => {
    sound.playChime();
    setActiveDetourPopup(null);
    setTravelPhase('moving');
    setIsTraveling(true);
  };

  const handleEnterExperience = () => {
    sound.playChime();
    if (destination?.district) {
      setCurrentLocation(destination.district);
    }
    navigate(`/experience/${destination.id}`);
  };

  const getChoicesForMoment = (moment) => {
    if (!moment) return [];
    return [
      {
        id: 'join', icon: '✨', label: 'Join the moment!',
        subtext: moment.task.replace(/^Maveli /, ''),
        response: `You dive right in! ${moment.task.replace(/^Maveli /, 'You ')} The people erupt with joy at the king's participation!`,
        grad: 'from-gold-500/25 to-amber-500/20', border: 'border-gold-400/50', textColor: 'text-gold-300',
      },
      {
        id: 'bless', icon: '🙏', label: 'Offer your royal blessing',
        subtext: 'Pause, acknowledge, and continue the journey with grace.',
        response: 'Maveli pauses. He raises both hands with a warm royal smile — the crowd bows deeply as blessings fill the air. The journey continues.',
        grad: 'from-emerald-500/20 to-teal-500/15', border: 'border-emerald-400/40', textColor: 'text-emerald-300',
      },
    ];
  };

  const districtList = Object.entries(DISTRICT_COORDS);
  const storyBeats = travelScenario?.travelTasks || [];
  const scenarioImages = getScenarioImages(destination?.district);
  const movingTexts = [
    `The road to ${destination?.district} stretches before you. Maveli's royal entourage sets off under a golden morning sky...`,
    `Fields of green blur past. The air smells of jasmine and festival spices. You are getting closer...`,
    `${destination?.district} is almost within sight — the sounds of celebration drift on the wind.`,
  ];
  const movingTextIdx = Math.min(storyMomentsShown.length, movingTexts.length - 1);

  return (
    <div className="w-full glass-panel-gold rounded-3xl p-4 sm:p-6 border border-gold-500/30 shadow-2xl relative overflow-hidden">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-gold-500/20">
        <div>
          <span className="text-[11px] font-black tracking-widest text-gold-400 uppercase flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
            <span>Kerala Map • 14 Districts • From {currentLocation} → {destination?.district}</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-cream-50">
            Destination: <span className="text-gold-300">{destination?.title}</span>
          </h2>
          <p className="text-xs text-cream-200/80 flex items-center gap-2 mt-0.5">
            <span>📍 {destination?.district} ({destination?.location})</span>
            <span className="text-gold-400">•</span>
            <span>{destination?.distanceKm} km</span>
            {travelScenario.icon && (
              <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-bold border border-gold-500/30">
                {travelScenario.icon} Story Journey
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Quick Fast Travel & Reset Controls */}
          {travelPhase !== 'idle' && travelPhase !== 'arrived' && (
            <button
              onClick={handleFastTravel}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-gold-500 text-emerald-950 text-xs font-black shadow-md hover:scale-105 transition-all flex items-center gap-1"
              title="Instant Arrival at Destination"
            >
              <Zap className="w-3.5 h-3.5 fill-emerald-950" />
              <span>FAST TRAVEL</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-emerald-950/80 p-1 rounded-xl border border-gold-500/30">
            <button onClick={() => setZoomLevel(p => Math.min(2.5, p + 0.3))} className="p-1.5 rounded-lg hover:bg-gold-500/20 text-gold-300" title="Zoom in">
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono font-bold text-gold-400 px-1">{zoomLevel.toFixed(1)}x</span>
            <button onClick={() => setZoomLevel(p => Math.max(1, p - 0.3))} className="p-1.5 rounded-lg hover:bg-gold-500/20 text-gold-300" title="Zoom out">
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
          <button onClick={() => { sound.playPop(); setMapMode(p => p === 'svg' ? 'satellite' : 'svg'); }}
            className="px-3 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-gold-300 border border-gold-500/30 text-xs font-bold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>{mapMode === 'svg' ? 'SATELLITE' : 'SVG MAP'}</span>
          </button>
          <button onClick={() => { sound.playPop(); setIsStreetViewOpen(true); }}
            className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>360° VIEW</span>
          </button>
        </div>
      </div>

      {/* 14 District Clickable Navigator Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 no-scrollbar">
        <span className="text-[10px] font-black uppercase text-gold-400 shrink-0 mr-1 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-gold-400" />
          <span>Move To:</span>
        </span>
        {districtList.map(([name, lm]) => {
          const isSelected = destination?.district === name;
          const isHere = currentLocation === name;
          return (
            <button
              key={name}
              onClick={() => handleSelectDistrictPin(name)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1 border ${
                isSelected
                  ? 'bg-gold-500 text-emerald-950 border-gold-300 font-black shadow-md scale-105'
                  : isHere
                    ? 'bg-emerald-900/80 text-emerald-300 border-emerald-500/40'
                    : 'bg-emerald-950/60 text-cream-200/80 hover:bg-emerald-900/70 border-gold-500/20'
              }`}
              title={`Move to ${name}`}
            >
              <span>{lm.icon}</span>
              <span>{name}</span>
              {isHere && <span className="text-[9px] text-emerald-400 font-normal">(Here)</span>}
            </button>
          );
        })}
      </div>

      {/* Map */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-emerald-950/90 border border-gold-500/30 overflow-hidden shadow-inner flex items-center justify-center p-2">
        <motion.div animate={{ scale: zoomLevel }} transition={{ duration: 0.3 }} className="w-full h-full relative flex items-center justify-center overflow-hidden">
          {mapMode === 'svg' && (
            <div className="absolute inset-0 flex items-center justify-center p-2 opacity-95">
              <img src={keralaSvg} alt="Kerala SVG Map" className="h-full w-auto object-contain filter drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
            </div>
          )}
          {mapMode === 'satellite' && (
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <iframe title="Kerala Satellite View" width="100%" height="100%" frameBorder="0" style={{ border: 0 }}
                src="https://maps.google.com/maps?q=Kerala,India&t=k&z=7&output=embed" allowFullScreen />
              <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-emerald-950/80 border border-gold-500/30 text-[10px] font-bold text-gold-300">🛰️ SATELLITE MODE</div>
            </div>
          )}
          {mapMode === 'svg' && (
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-auto">
              <line x1={startCoords.x} y1={startCoords.y} x2={destCoords.x} y2={destCoords.y} stroke="#F59E0B" strokeWidth="1" strokeDasharray="1.5 2" opacity="0.4" />
              <line x1={startCoords.x} y1={startCoords.y} x2={currentX} y2={currentY} stroke="#FFD700" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
              {districtList.map(([name, lm]) => {
                const isStart = currentLocation === name;
                const isDest = destination?.district === name;
                return (
                  <g
                    key={name}
                    transform={`translate(${lm.x}, ${lm.y})`}
                    onClick={() => handleSelectDistrictPin(name)}
                    className="cursor-pointer group"
                  >
                    {isStart && <circle r="5" fill="#FFD700" opacity="0.25" className="animate-ping" />}
                    {isDest && <circle r="5" fill="#EF4444" opacity="0.25" className="animate-ping" />}
                    <circle r="2.8" fill={isDest ? '#EF4444' : lm.color} stroke="#FFF" strokeWidth="0.5" className="group-hover:scale-125 transition-transform" />
                    <text x="3.5" y="1.2" fill="#FFFDF5" fontSize="2.3" fontFamily="sans-serif" fontWeight="bold" className="group-hover:fill-gold-300">
                      {name} {lm.icon}
                    </text>
                  </g>
                );
              })}
              <g transform={`translate(${startCoords.x}, ${startCoords.y})`}>
                <circle r="3.5" fill="#10B981" stroke="#FFFDF5" strokeWidth="0.6" opacity="0.9" />
                <text x="-1.2" y="1.2" fontSize="2.5" textAnchor="middle">🏠</text>
              </g>
              <g transform={`translate(${destCoords.x}, ${destCoords.y})`}>
                <circle r="4.5" fill="#EF4444" opacity="0.3" className="animate-ping" />
                <circle r="3" fill="#EF4444" stroke="#FFD700" strokeWidth="0.6" />
                <text x="-1.5" y="1.2" fontSize="2.8">📍</text>
              </g>
              <g transform={`translate(${currentX}, ${currentY})`}>
                <circle r="5.5" fill="#FFD700" opacity="0.35" className="animate-pulse" />
                <image href={maveliImg} x="-3.5" y="-7" width="7" height="11" />
              </g>
            </svg>
          )}
        </motion.div>
        {/* Progress bar on map */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center gap-2">
          <div className="flex-1 bg-emerald-950/70 rounded-full h-1.5 border border-gold-500/20 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold-500 to-amber-400 rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[9px] font-mono font-bold text-gold-400 bg-emerald-950/80 px-1.5 py-0.5 rounded-full border border-gold-500/20">{progress}%</span>
        </div>
        {/* Story beat dots */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 z-20">
          {storyBeats.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full border transition-all duration-500 ${storyMomentsShown.includes(i) ? 'bg-gold-400 border-gold-300 shadow-[0_0_6px_#F59E0B]' : 'bg-emerald-900 border-emerald-700'}`} />
          ))}
          <span className="text-[9px] text-gold-400/70 font-bold ml-1">STORY BEATS</span>
        </div>
      </div>

      {/* Story Panel */}
      <div className="mt-4">
        <AnimatePresence mode="wait">

          {travelPhase === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              className="rounded-2xl border border-gold-500/30 bg-gradient-to-br from-emerald-950/80 via-emerald-900/40 to-emerald-950/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
              <img src={maveliImg} alt="Maveli" className="w-16 h-24 object-contain filter drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]" />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-gold-400" />
                  <span className="text-[10px] font-black tracking-widest text-gold-400 uppercase">Interactive Journey Story</span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-black text-cream-50 mb-1">
                  The Road to <span className="text-gold-300">{destination?.district}</span>
                </h3>
                <p className="text-xs text-cream-200/80 leading-relaxed mb-4 max-w-lg">
                  Your journey unfolds as a living story. Along the way, Maveli will encounter{' '}
                  <span className="text-gold-300 font-bold">story moments</span> — and at each one,{' '}
                  <span className="text-amber-300 font-bold">you choose what happens next</span>.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <button onClick={handleStartJourney}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-emerald-950 font-black text-sm shadow-lg flex items-center gap-2 transition-all hover:scale-105">
                    <ScrollText className="w-4 h-4" /> BEGIN THE STORY
                  </button>
                  <button onClick={handleFastTravel}
                    className="px-4 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-gold-300 border border-gold-500/30 text-xs font-bold flex items-center gap-1.5 transition-all">
                    <Zap className="w-3.5 h-3.5 text-gold-400" /> FAST TRAVEL (SKIP STORY)
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {travelPhase === 'moving' && (
            <motion.div key="moving" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              className="rounded-2xl border border-emerald-700/40 bg-emerald-950/60 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.img src={maveliImg} alt="Maveli" animate={{ y: [0, -6, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-10 h-14 object-contain opacity-90" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Navigation className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">Traveling…</span>
                  </div>
                  <p className="text-sm font-serif italic text-cream-100 leading-relaxed">"{movingTexts[movingTextIdx]}"</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }} className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    ))}
                    <span className="text-[10px] text-cream-300/50 ml-1">Next story moment approaching</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleFastTravel}
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-emerald-950 text-xs font-black hover:scale-105 transition-all flex items-center gap-1"
                >
                  <Zap className="w-3.5 h-3.5 fill-emerald-950" />
                  <span>ARRIVE NOW</span>
                </button>
                <button
                  onClick={handleResetJourney}
                  className="p-2 rounded-xl bg-emerald-900/40 hover:bg-emerald-900 text-cream-300 border border-emerald-700/40"
                  title="Reset Journey"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {travelPhase === 'choice' && activeStoryMoment && (
            <motion.div key="choice" initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -16 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="rounded-2xl border border-gold-500/40 bg-gradient-to-br from-emerald-950/90 via-emerald-900/50 to-emerald-950/90 overflow-hidden">
              <div className="px-5 pt-4 pb-3 border-b border-gold-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold-500/20 border border-gold-400/50 flex items-center justify-center">
                    <Crown className="w-3.5 h-3.5 text-gold-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black tracking-widest text-gold-400 uppercase block">
                      Story Moment {(activeStoryMoment.momentIndex ?? 0) + 1} of {storyBeats.length}
                    </span>
                    <span className="text-[10px] text-cream-300/60">On the road to {destination?.district}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {storyBeats.map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i <= (activeStoryMoment.momentIndex ?? 0) ? 'bg-gold-400' : 'bg-emerald-800'}`} />
                    ))}
                  </div>
                  <button
                    onClick={handleFastTravel}
                    className="px-2.5 py-1 rounded-lg bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 border border-gold-500/40 text-[10px] font-bold flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Skip to End</span>
                  </button>
                </div>
              </div>
              <div className="p-5 flex flex-col sm:flex-row gap-4">
                {scenarioImages.tasks[activeStoryMoment.momentIndex ?? 0] && (
                  <button
                    type="button"
                    onClick={() => setSelectedScenarioImage({
                      src: scenarioImages.tasks[activeStoryMoment.momentIndex ?? 0],
                      district: destination?.district,
                      task: activeStoryMoment.task,
                    })}
                    className="w-full sm:w-44 shrink-0 text-left group"
                    aria-label={`View ${destination?.district} travel scenario image larger`}
                  >
                    <img
                      src={scenarioImages.tasks[activeStoryMoment.momentIndex ?? 0]}
                      alt={`${destination?.district} journey story moment`}
                      className="w-full aspect-video sm:aspect-square object-cover rounded-xl border border-gold-500/30 shadow-lg group-hover:border-gold-300 transition-colors"
                    />
                    <span className="block mt-1 text-[10px] text-gold-300 font-bold uppercase tracking-wide">View scenario image</span>
                  </button>
                )}
                <motion.img src={maveliImg} alt="Maveli" animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-14 h-20 object-contain filter drop-shadow-[0_0_16px_rgba(245,158,11,0.6)] mx-auto sm:mx-0" />
                <div className="flex-1">
                  <NarrationText text={activeStoryMoment.task} />
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {getChoicesForMoment(activeStoryMoment).map((choice, ci) => (
                      <motion.button key={choice.id} onClick={() => handleStoryChoice(choice)}
                        initial={{ opacity: 0, x: ci === 0 ? -10 : 10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + ci * 0.1 }} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-2xl border text-left bg-gradient-to-br ${choice.grad} ${choice.border} group transition-all hover:shadow-lg cursor-pointer`}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-lg leading-none">{choice.icon}</span>
                          <span className={`text-xs font-black ${choice.textColor} uppercase tracking-wide`}>{choice.label}</span>
                        </div>
                        <p className="text-[11px] text-cream-200/70 leading-relaxed">{choice.subtext}</p>
                        <div className={`mt-2 flex items-center gap-1 ${choice.textColor} opacity-60 group-hover:opacity-100 transition-opacity`}>
                          <ChevronRight className="w-3 h-3" />
                          <span className="text-[10px] font-bold">Choose this path</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {travelPhase === 'response' && choiceResponse && (
            <motion.div key="response" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-gold-950/20 to-amber-950/40 p-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 0.6 }}
                  className="text-3xl leading-none mt-1 shrink-0">✨</motion.div>
                <div>
                  <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase block mb-1">The Story Unfolds…</span>
                  <p className="text-sm font-serif italic text-cream-100 leading-relaxed">"{choiceResponse}"</p>
                  <div className="mt-3 flex items-center gap-2 text-[10px] text-cream-300/50">
                    <motion.div animate={{ scaleX: [0, 1] }} transition={{ duration: 2.8 }}
                      className="h-0.5 bg-gold-500/40 rounded-full w-24 origin-left" />
                    <span>Continuing journey…</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleFastTravel}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-emerald-950 text-xs font-black hover:scale-105 transition-all shrink-0"
              >
                SKIP ➔
              </button>
            </motion.div>
          )}

          {travelPhase === 'arrived' && (
            <motion.div key="arrived" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              className="rounded-2xl border border-gold-400/50 bg-gradient-to-br from-emerald-900/60 via-gold-950/20 to-emerald-900/60 overflow-hidden">
              <div className="px-5 pt-4 pb-3 border-b border-gold-500/20 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">Journey Complete • {destination?.district} Reached</span>
              </div>
              <div className="p-5 flex flex-col sm:flex-row gap-5 items-center">
                <motion.img src={maveliImg} animate={{ y: [0, -12, 0], scale: [1, 1.04, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} alt="Maveli arrived"
                  className="w-16 h-24 object-contain filter drop-shadow-[0_0_20px_rgba(245,158,11,0.7)]" />
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-serif italic text-cream-50 leading-relaxed mb-3">
                    "{travelScenario?.arrivalScene || `${destination?.district} erupts in celebration as Maveli arrives!`}"
                  </p>
                  {journeyLog.length > 0 && (
                    <div className="mb-4 space-y-1.5">
                      <span className="text-[9px] font-black tracking-widest text-gold-400 uppercase">Your Journey Diary</span>
                      {journeyLog.map((entry, i) => (
                        <div key={i} className="flex items-start gap-2 text-[10px] text-cream-200/70 bg-emerald-950/50 rounded-xl px-3 py-2 border border-emerald-800/40">
                          <span className="text-gold-400 font-bold shrink-0">#{i + 1}</span>
                          <span className="italic">You chose to <span className="text-amber-300 font-semibold not-italic">{entry.choice.toLowerCase()}</span></span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setIsArrivalMusicPlaying(true)}
                      className="px-4 py-2.5 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 border border-gold-400/40 text-xs font-black flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>♫</span> PLAY ARRIVAL MUSIC
                    </button>
                    <button onClick={handleEnterExperience}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-gold-500 hover:scale-105 text-emerald-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all">
                      <Sparkles className="w-4 h-4" /> ENTER THE EXPERIENCE
                    </button>
                    <button onClick={handleResetJourney}
                      className="px-4 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-cream-200 border border-gold-500/30 text-xs font-bold flex items-center gap-1.5 transition-all">
                      <RotateCcw className="w-3.5 h-3.5" /> EXPLORE ANOTHER DISTRICT
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedScenarioImage && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScenarioImage(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-gold-400/60 bg-emerald-950 shadow-2xl"
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
              onClick={event => event.stopPropagation()}
            >
              <img src={selectedScenarioImage.src} alt={`${selectedScenarioImage.district} travel scenario`} className="w-full max-h-[75vh] object-contain" />
              <div className="p-4 border-t border-gold-500/20">
                <span className="text-[10px] font-black tracking-widest text-gold-400 uppercase">{selectedScenarioImage.district} travel scenario</span>
                <p className="text-sm text-cream-100 mt-1">{selectedScenarioImage.task}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScenarioImage(null)}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-emerald-950/90 text-cream-100 border border-gold-400/50 text-xs font-bold"
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Street View Modal */}
      <AnimatePresence>
        {isStreetViewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl glass-panel-gold rounded-3xl border-2 border-gold-400 overflow-hidden flex flex-col">
              <div className="p-4 bg-emerald-950 flex items-center justify-between border-b border-gold-500/30">
                <span className="text-xs font-black text-gold-300 uppercase tracking-widest flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>360° VIEW • {destination?.district} — {destination?.location}</span>
                </span>
                <button onClick={() => setIsStreetViewOpen(false)} className="text-cream-200 hover:text-gold-200 text-xl px-2">✕</button>
              </div>
              <div className="relative w-full h-96 bg-black overflow-hidden">
                <iframe title="Street View" width="100%" height="100%" frameBorder="0" style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent((destination?.location || '') + ', ' + (destination?.district || '') + ', Kerala')}&layer=c&cbll=${destination?.coordinates?.lat || 10.1632},${destination?.coordinates?.lng || 76.6413}&cbp=12,90,0,0,0&output=svembed`}
                  allowFullScreen />
              </div>
              <div className="p-4 bg-emerald-950/90 border-t border-gold-500/20 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-serif font-bold text-cream-50">{destination?.title}</h3>
                  <p className="text-xs text-cream-200/70">{destination?.description?.slice(0, 80)}...</p>
                </div>
                <a href={`https://www.google.com/maps/search/${encodeURIComponent((destination?.location || '') + ', ' + (destination?.district || '') + ', Kerala')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-black text-xs hover:scale-105 transition-all">
                  Open in Google Maps ↗
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {travelPhase === 'arrived' && isArrivalMusicPlaying && (
        <iframe
          title="Arrival celebration music"
          src="https://www.youtube.com/embed/VrrnflVEiMg?si=0hgkANHdKPlattTw&autoplay=1&loop=1&playlist=VrrnflVEiMg"
          allow="autoplay; encrypted-media"
          className="absolute w-px h-px opacity-0 pointer-events-none"
        />
      )}

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
