import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Maveli } from '../components/Maveli';
import { RecommendationCard } from '../components/RecommendationCard';
import { InvitationCard } from '../components/InvitationCard';
import { InterestSelectorModal } from '../components/InterestSelectorModal';
import { INVITATIONS } from '../data/invitations';
import { KERALA_CHANGES } from '../data/whatChanged';
import { Sparkles, MapPin, Clock, Calendar, Mail, ArrowRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sound } from '../utils/sound';

export function Home() {
  const { formattedTimeRemaining, currentLocation, completedMemories, myDayExperiences, userInterests } = useApp();
  const [isInterestsModalOpen, setIsInterestsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
      
      {/* Hero Banner Section */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Hero Text */}
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-bounce-gentle" />
            <span>ONAM HACKATHON MVP • TRACK 02</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-cream-50 gold-glow-text leading-tight">
            Good morning, Maveli.
          </h1>

          <p className="text-base sm:text-lg text-cream-100 font-serif italic">
            "One day. Thousands of possibilities. Let's choose what matters."
          </p>

          {/* Quick Context Bar */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs pt-2">
            <div className="px-3.5 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/50 text-cream-100 flex items-center gap-1.5 font-semibold">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>CURRENT LOCATION: {currentLocation}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-300 flex items-center gap-1.5 font-bold">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>TIME REMAINING: ⏳ {formattedTimeRemaining()}</span>
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
              📋 ORGANISE MY DAY ({myDayExperiences.length})
            </button>
          </div>
        </div>

        {/* Right Maveli Avatar Visual Companion */}
        <div className="shrink-0">
          <Maveli
            expression="happy"
            message="Welcome! Everyone wants me at their celebration today, but I only have 12 hours!"
            size="lg"
          />
        </div>

      </div>

      {/* Today's Journey Timeline Progress Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-gold-500/20 shadow-xl">
        <div className="flex items-center justify-between text-xs font-bold text-cream-200 mb-3">
          <span className="text-gold-300 uppercase tracking-wider font-serif">TODAY'S JOURNEY TIMELINE</span>
          <span className="text-cream-300">{myDayExperiences.filter(e => e.completed).length} / {myDayExperiences.length} Experiences Completed • {completedMemories.length} Memories Saved</span>
        </div>

        <div className="relative w-full bg-emerald-950 rounded-full h-3 overflow-hidden border border-gold-500/30">
          <div
            className="bg-gradient-to-r from-gold-500 via-amber-400 to-terracotta-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${(myDayExperiences.filter(e => e.completed).length / Math.max(1, myDayExperiences.length)) * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-gold-400 font-black mt-2">
          <span>09:00 AM</span>
          <span>12:00 PM</span>
          <span>03:00 PM</span>
          <span>06:00 PM</span>
          <span>09:00 PM</span>
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

      {/* Everyone Wants Maveli Somewhere (Invitations Inbox Teaser) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black tracking-widest text-gold-400 uppercase">
              Inbox ({INVITATIONS.length} Pending)
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-cream-50">
              Everyone Wants Maveli Somewhere
            </h2>
            <p className="text-xs text-cream-200/80 mt-0.5">
              Verified invitations from families, clubs, tech hubs, and traditional drummers.
            </p>
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

    </div>
  );
}
