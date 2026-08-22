import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { WhileYouWereAway } from './components/WhileYouWereAway';
import { FinalDaySummary } from './components/FinalDaySummary';
import { AiGuideChatbot } from './components/AiGuideChatbot';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { MyDay } from './pages/MyDay';
import { Map } from './pages/Map';
import { Memories } from './pages/Memories';
import { Experience } from './pages/Experience';
import { motion, AnimatePresence } from 'framer-motion';

function AppContent() {
  const { introDismissed, setIntroDismissed, isDayFinished, activeNotification } = useApp();

  return (
    <div className="min-h-screen bg-emerald-950 text-cream-50 flex flex-col font-sans relative selection:bg-gold-500 selection:text-emerald-950">
      
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-black text-xs shadow-2xl border border-gold-300 flex items-center gap-2"
          >
            <span>👑</span>
            <span>{activeNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opening 10-15s "While You Were Away" Intro Sequence */}
      {!introDismissed && (
        <WhileYouWereAway onComplete={() => setIntroDismissed(true)} />
      )}

      {/* Final Day Summary Visual Celebration */}
      {isDayFinished && (
        <FinalDaySummary />
      )}

      {/* Sticky Onam Header Navbar */}
      <Navbar />

      {/* Draggable Cute Floating Kili AI Assistant Chatbot */}
      <AiGuideChatbot />

      {/* Page Routing */}
      <main className="flex-1 pb-20 md:pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/my-day" element={<MyDay />} />
          <Route path="/map" element={<Map />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/experience/:id" element={<Experience />} />
        </Routes>
      </main>

      {/* Onam Footer */}
      <footer className="glass-panel border-t border-gold-500/20 py-6 px-4 text-center text-xs text-cream-300/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">👑</span>
            <span className="font-serif font-bold text-cream-100">MAVELI 24H — KERALA ONAM VAULT 2026</span>
          </div>
          <p className="italic text-gold-300/90">
            "14 DISTRICTS • 24 HOURS • UNLIMITED MEMORIES BACKEND VAULT"
          </p>
          <p className="text-[11px]">Onam Hackathon MVP • Track 02</p>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}
