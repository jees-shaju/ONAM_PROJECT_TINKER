import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EXPERIENCES } from '../data/experiences';
import { useApp } from '../context/AppContext';
import { Maveli } from '../components/Maveli';
import { Sparkles, MapPin, Clock, ArrowRight, CheckCircle2, Heart } from 'lucide-react';
import { sound } from '../utils/sound';
import { getScenarioImages } from '../data/scenarioImages';

export function Experience() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { completeExperience, myDayExperiences } = useApp();

  const experience = EXPERIENCES.find(e => e.id === id) || EXPERIENCES[0];
  const scenarioImages = getScenarioImages(experience.district);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoice = (choice) => {
    sound.playPop();
    setSelectedChoice(choice);
  };

  const handleComplete = () => {
    sound.playCelebration();
    completeExperience(experience.id, selectedChoice);
    navigate('/memories');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Experience Header */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-400 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {experience.categories.map((c, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-black uppercase tracking-wider">
              {c}
            </span>
          ))}
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-bold border border-emerald-500/40">
            ✓ Verified Celebration
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-black text-cream-50 gold-glow-text">
          {experience.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-cream-200/90 pt-2 border-t border-gold-500/20">
          <span className="flex items-center gap-1.5 font-semibold">
            <MapPin className="w-4 h-4 text-gold-400" />
            {experience.location} ({experience.district})
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <Clock className="w-4 h-4 text-amber-400" />
            {experience.duration} minutes
          </span>
        </div>
      </div>

      {/* Main Encounter Area: Animated Scene & Maveli */}
      <div className="rounded-3xl overflow-hidden border border-gold-500/30 shadow-xl">
        <img src={scenarioImages.hero} alt={`${experience.title} at ${experience.location}`} className="w-full aspect-video object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Maveli Character Visual Companion */}
        <div className="md:col-span-1 flex justify-center">
          <Maveli
            message="Looks like I arrived at the right time! What do you want to discover here?"
            size="lg"
          />
        </div>

        {/* Narrative & Interactive Choices */}
        <div className="md:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/20 space-y-6">
          <p className="text-sm text-cream-100 leading-relaxed italic bg-emerald-950/60 p-4 rounded-2xl border border-gold-500/20">
            "{experience.description}"
          </p>

          <div>
            <span className="text-xs font-black tracking-widest text-gold-400 uppercase block mb-3">
              WHAT DO YOU WANT TO DISCOVER?
            </span>

            <div className="space-y-3">
              {experience.interactiveChoices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs transition-all flex items-center justify-between group ${
                    selectedChoice?.id === choice.id
                      ? 'bg-gradient-to-r from-gold-500/20 to-amber-500/20 border-gold-400 text-gold-200 font-bold shadow-lg'
                      : 'bg-emerald-950/60 hover:bg-emerald-900/80 border-gold-500/20 text-cream-100'
                  }`}
                >
                  <span>{choice.text}</span>
                  <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Narrative Response feedback */}
          {selectedChoice && (
            <div className="bg-gold-500/10 p-4 rounded-2xl border border-gold-500/30 text-xs text-cream-100 space-y-2">
              <span className="font-bold text-amber-300 block uppercase">Maveli's Moment:</span>
              <p className="italic leading-relaxed">{selectedChoice.response}</p>
            </div>
          )}

          {/* Complete Button */}
          <button
            onClick={handleComplete}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 via-amber-500 to-terracotta-500 text-emerald-950 font-black text-sm shadow-xl hover:scale-102 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>COMPLETE EXPERIENCE & SAVE MEMORY 🌼</span>
          </button>
        </div>

      </div>

    </div>
  );
}
