import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Mail, CheckCircle2, AlertTriangle, MapPin, Clock, Plus } from 'lucide-react';
import { EXPERIENCES } from '../data/experiences';
import { sound } from '../utils/sound';

export function InvitationCard({ invitation }) {
  const { addExperienceToDay, myDayExperiences } = useApp();

  const linkedExperience = EXPERIENCES.find(e => e.id === invitation.experienceId);
  const isAdded = linkedExperience && myDayExperiences.some(item => item.id === linkedExperience.id);

  const handleAccept = () => {
    sound.playChime();
    if (linkedExperience) {
      addExperienceToDay(linkedExperience);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
        invitation.verified
          ? 'glass-card border-gold-500/20 hover:border-gold-400/50'
          : 'bg-rose-950/30 border-rose-500/40 hover:border-rose-500/70'
      }`}
    >
      <div>
        {/* Header & Verification badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-xs text-cream-300 font-medium">
            <Mail className="w-4 h-4 text-gold-400" />
            <span className="font-bold text-cream-100">{invitation.organizer}</span>
          </div>

          {invitation.verified ? (
            <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 uppercase">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>✓ Verified</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-extrabold text-rose-400 bg-rose-950/90 px-2 py-0.5 rounded-full border border-rose-500/50 uppercase animate-pulse">
              <AlertTriangle className="w-3 h-3 text-rose-400" />
              <span>Unverified</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-serif font-bold text-cream-50 mb-1.5">
          {invitation.title}
        </h3>

        {/* Message quote */}
        <p className="text-xs text-cream-200/90 italic bg-emerald-950/40 p-3 rounded-xl border border-gold-500/10 mb-3 leading-relaxed">
          "{invitation.message}"
        </p>
      </div>

      <div>
        {/* Meta info */}
        <div className="flex items-center justify-between text-[11px] text-cream-300/80 pt-2 border-t border-gold-500/10 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gold-400" />
            <span>{invitation.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{invitation.time} ({invitation.duration})</span>
          </div>
        </div>

        {/* Warning banner for fake invitations */}
        {!invitation.verified && invitation.warning && (
          <div className="mb-3 text-[10px] text-rose-300 bg-rose-950/60 p-2 rounded-lg border border-rose-500/30 font-semibold">
            ⚠️ {invitation.warning}
          </div>
        )}

        {/* Action Button */}
        {linkedExperience ? (
          <button
            onClick={handleAccept}
            disabled={isAdded}
            className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              isAdded
                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 cursor-default'
                : invitation.verified
                ? 'bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-emerald-950 font-black shadow-md'
                : 'bg-rose-900/40 hover:bg-rose-800/60 text-rose-200 border border-rose-600/40'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAdded ? 'ACCEPTED & ADDED ✓' : 'ACCEPT INVITATION'}</span>
          </button>
        ) : (
          <button
            disabled
            className="w-full py-2 rounded-xl text-xs font-bold bg-gray-800/40 text-gray-400 border border-gray-700/40 cursor-not-allowed text-center"
          >
            COMMERCIAL SPAM - SKIPPED
          </button>
        )}
      </div>
    </motion.div>
  );
}
