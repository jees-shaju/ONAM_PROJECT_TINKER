import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp, KERALA_LIVE_NEWS } from '../context/AppContext';
import { Maveli } from '../components/Maveli';
import { RecommendationCard } from '../components/RecommendationCard';
import { InvitationCard } from '../components/InvitationCard';
import { InterestSelectorModal } from '../components/InterestSelectorModal';
import { DistrictSelectorModal, KERALA_14_DISTRICTS } from '../components/DistrictSelectorModal';
import { INVITATIONS } from '../data/invitations';
import { KERALA_CHANGES } from '../data/whatChanged';
import { Sparkles, MapPin, Clock, Calendar, Mail, ArrowRight, Heart, Newspaper, Radio, Compass, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sound } from '../utils/sound';

export function Home() {
  const { formattedTimeRemaining, currentLocation, selectedDistrict, setSelectedDistrict, completedMemories, myDayExperiences, userInterests } = useApp();
  const [isInterestsModalOpen, setIsInterestsModalOpen] = useState(false);
  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
      
      {/* Live Kerala Current Affairs News Ticker Header */}
      <div className="glass-panel rounded-full px-4 py-2 border border-gold-500/30 flex items-center gap-3 overflow-hidden shadow-lg">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-black uppercase tracking-wider shrink-0 animate-pulse">
          <Radio className="w-3.5 h-3.5" />
          <span>K-NEWS LIVE</span>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-8 text-xs font-semibold text-cream-100 whitespace-nowrap"
          >
            {KERALA_LIVE_NEWS.concat(KERALA_LIVE_NEWS).map((news, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                <span>{news.icon}</span>
                <span className="text-gold-300 font-bold">[{news.tag}]:</span>
                <span>{news.title}</span>
                <span className="text-[10px] text-cream-300/60 font-mono">({news.time})</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Hero Text */}
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-bounce-gentle" />
            <span>24-HOUR ONAM ITINERARY • 14 DISTRICTS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-cream-50 gold-glow-text leading-tight">
            Good morning, Maveli.
          </h1>

          <p className="text-base sm:text-lg text-cream-100 font-serif italic">
            "24 Hours. 14 Districts. Endless Kerala Memories."
          </p>

          {/* Quick Context Bar */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs pt-2">
            <button
              onClick={() => setIsDistrictModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/50 text-cream-100 flex items-center gap-1.5 font-bold transition-all"
            >
              <Compass className="w-4 h-4 text-gold-400 animate-spin-slow" />
              <span>DISTRICT: {selectedDistrict === 'All' ? '14 Districts' : selectedDistrict} (Change)</span>
            </button>

            <div className="px-3.5 py-2 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-300 flex items-center gap-1.5 font-bold">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>24H CLOCK: ⏳ {formattedTimeRemaining()}</span>
            </div>
          </div>

          {/* Hero Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
            <button
              onClick={() => {
                sound.playChime();
                const element = document.getElementById('find-next-memory');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 via-amber-500 to-terracotta-500 hover:from-gold-400 hover:to-amber-500 text-emerald-950 font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>FIND MY NEXT MEMORY</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                navigate('/my-day');
              }}
              className="px-6 py-3 rounded-full bg-emerald-900/60 hover:bg-emerald-800/80 text-cream-100 border border-emerald-600/40 font-bold text-sm transition-all"
            >
              📋 ORGANISE 24H DAY ({myDayExperiences.length})
            </button>
          </div>
        </div>

        {/* Right Maveli Standalone Avatar (No Background Box) */}
        <div className="shrink-0">
          <Maveli
            expression="happy"
            message="Welcome! Exploring all 14 districts across Kerala in 24 hours!"
            size="lg"
          />
        </div>

      </div>

      {/* 24-Hour Journey Timeline Progress Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-gold-500/20 shadow-xl">
        <div className="flex items-center justify-between text-xs font-bold text-cream-200 mb-3">
          <span className="text-gold-300 uppercase tracking-wider font-serif">24-HOUR JOURNEY TIMELINE SCHEME</span>
          <span className="text-cream-300">{myDayExperiences.filter(e => e.completed).length} / {myDayExperiences.length} Experiences Completed • {completedMemories.length} Memories Saved in Vault</span>
        </div>

        <div className="relative w-full bg-emerald-950 rounded-full h-3.5 overflow-hidden border border-gold-500/30">
          <div
            className="bg-gradient-to-r from-gold-500 via-amber-400 to-terracotta-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${(myDayExperiences.filter(e => e.completed).length / Math.max(1, myDayExperiences.length)) * 100}%` }}
          />
        </div>

        {/* 24-Hour Clock Markers */}
        <div className="flex justify-between text-[11px] text-gold-400 font-black mt-2">
          <span>00:00</span>
          <span>04:00</span>
          <span>08:00</span>
          <span>12:00</span>
          <span>16:00</span>
          <span>20:00</span>
          <span>24:00</span>
        </div>
      </div>

      {/* 14 District Quick Navigator Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black tracking-widest text-gold-400 uppercase">
              14 Districts Explorer
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-cream-50">
              Onam Across Every District of Kerala
            </h2>
          </div>
          <button
            onClick={() => setIsDistrictModalOpen(true)}
            className="text-xs font-bold text-gold-300 hover:text-gold-200 flex items-center gap-1"
          >
            <span>CHOOSE DISTRICT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {KERALA_14_DISTRICTS.map((d) => (
            <button
              key={d.name}
              onClick={() => {
                sound.playPop();
                setSelectedDistrict(d.name);
                if (d.name !== 'All') navigate('/map');
              }}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedDistrict === d.name
                  ? 'bg-gold-500 text-emerald-950 border-gold-300 font-black shadow-lg scale-105'
                  : 'bg-emerald-950/70 border-gold-500/20 text-cream-200 hover:bg-emerald-900/60 hover:text-gold-300'
              }`}
            >
              <span>{d.icon}</span>
              <span>{d.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Signature Feature: FIND MY NEXT MEMORY */}
      <div id="find-next-memory">
        <RecommendationCard onSelectInterests={() => setIsInterestsModalOpen(true)} />
      </div>

      {/* "What Changed While I Was Gone?" Comparative Insight Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black tracking-widest text-gold-400 uppercase">
              Story & Culture
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-cream-50">
              What Changed While I Was Gone?
            </h2>
            <p className="text-xs text-cream-200/80 mt-0.5">
              Maveli discovers how Kerala evolved during his 364-day absence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {KERALA_CHANGES.slice(0, 3).map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-5 border border-gold-500/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-black text-gold-300 uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-cream-50 mb-2">{item.title}</h3>
                <p className="text-xs text-cream-200/80 mb-4">{item.summary}</p>
                
                <div className="space-y-2 text-xs">
                  <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/40">
                    <span className="text-gold-400 font-bold block mb-0.5">THEN</span>
                    <span className="text-cream-300">{item.then}</span>
                  </div>
                  <div className="bg-gold-500/10 p-2.5 rounded-xl border border-gold-500/30">
                    <span className="text-amber-300 font-bold block mb-0.5">TODAY</span>
                    <span className="text-cream-100">{item.today}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs italic text-gold-300/90 pt-3 mt-3 border-t border-gold-500/10">
                "{item.maveliQuote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Invitations Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black tracking-widest text-gold-400 uppercase">
              Inbox ({INVITATIONS.length} Pending)
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-cream-50">
              Everyone Wants Maveli Somewhere
            </h2>
          </div>

          <button
            onClick={() => navigate('/discover')}
            className="text-xs font-bold text-gold-300 hover:text-gold-200 flex items-center gap-1"
          >
            <span>VIEW ALL INVITATIONS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INVITATIONS.slice(0, 3).map((inv) => (
            <InvitationCard key={inv.id} invitation={inv} />
          ))}
        </div>
      </div>

      {/* Interest Selector Modal */}
      <InterestSelectorModal
        isOpen={isInterestsModalOpen}
        onClose={() => setIsInterestsModalOpen(false)}
      />

      {/* District Selector Modal */}
      <DistrictSelectorModal
        isOpen={isDistrictModalOpen}
        onClose={() => setIsDistrictModalOpen(false)}
      />

    </div>
  );
}
