import React, { createContext, useContext, useState, useEffect } from 'react';
import { EXPERIENCES } from '../data/experiences';
import { INVITATIONS } from '../data/invitations';
import { ON_THE_WAY_DISCOVERIES } from '../data/discoveries';
import { optimizeItinerary } from '../utils/optimizer';
import { getNextMemoryRecommendation } from '../utils/recommender';
import { sound } from '../utils/sound';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. Initial State Setup
  const [userInterests, setUserInterests] = useState(['People', 'Food', 'Culture', 'Modern Kerala']);
  
  // Default itinerary starts with 3 initial items
  const [myDayExperiences, setMyDayExperiences] = useState([
    { ...EXPERIENCES[0], assignedTime: '10:30 AM', completed: false },
    { ...EXPERIENCES[1], assignedTime: '12:30 PM', completed: false },
    { ...EXPERIENCES[2], assignedTime: '03:00 PM', completed: false }
  ]);

  const [completedMemories, setCompletedMemories] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('Thrissur');
  const [timeRemainingMins, setTimeRemainingMins] = useState(703); // 11h 43m
  const [activeJourney, setActiveJourney] = useState(null); // Destination exp currently traveling to
  const [discoveredDetours, setDiscoveredDetours] = useState([]);
  const [introDismissed, setIntroDismissed] = useState(false);
  const [isDayFinished, setIsDayFinished] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);

  // Auto notification dismissal helper
  const notify = (msg) => {
    setActiveNotification(msg);
    setTimeout(() => setActiveNotification(null), 4500);
  };

  // Add experience to My Day
  const addExperienceToDay = (exp) => {
    if (myDayExperiences.some(item => item.id === exp.id)) {
      notify(`"${exp.title}" is already in your day plan!`);
      return;
    }
    sound.playChime();
    setMyDayExperiences(prev => [
      ...prev,
      { ...exp, assignedTime: `${10 + prev.length}:30 AM`, completed: false }
    ]);
    notify(`Added "${exp.title}" to My Day! 🌼`);
  };

  // Remove experience from My Day
  const removeExperienceFromDay = (expId) => {
    sound.playPop();
    setMyDayExperiences(prev => prev.filter(item => item.id !== expId));
    notify(`Removed experience from itinerary.`);
  };

  // Optimize day itinerary
  const optimizeDay = () => {
    sound.playChime();
    const result = optimizeItinerary(myDayExperiences);
    setMyDayExperiences(result.optimizedList);
    notify(result.message);
  };

  // Complete an experience & save memory
  const completeExperience = (expId, choiceSelected = null) => {
    sound.playCelebration();
    const exp = EXPERIENCES.find(e => e.id === expId) || myDayExperiences.find(e => e.id === expId);
    if (!exp) return;

    // Mark as completed in My Day
    setMyDayExperiences(prev => prev.map(item => item.id === expId ? { ...item, completed: true } : item));

    // Deduct time
    setTimeRemainingMins(prev => Math.max(0, prev - exp.duration));

    // Update location to completed experience location
    if (exp.district) setCurrentLocation(exp.district);

    // Create memory object
    const newMemory = {
      id: `mem-${Date.now()}`,
      title: exp.title,
      district: exp.district || exp.location,
      categories: exp.categories,
      memoryQuote: exp.memoryQuote,
      color: exp.color || '#F59E0B',
      choiceMade: choiceSelected ? choiceSelected.text : 'Explored with local community',
      choiceResponse: choiceSelected ? choiceSelected.response : exp.description,
      whatChanged: exp.whatChanged,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setCompletedMemories(prev => [newMemory, ...prev]);
    notify(`🌼 Memory Unlocked: "${exp.title}"! Added to your Pookalam.`);
  };

  // Save unexpected On-The-Way detour discovery as a memory
  const completeDetourDiscovery = (detour, choiceSelected) => {
    sound.playCelebration();
    setDiscoveredDetours(prev => [...prev, detour.id]);
    setTimeRemainingMins(prev => Math.max(0, prev - detour.detourMins));

    const newMemory = {
      id: `detour-mem-${Date.now()}`,
      title: `✨ Unexpected: ${detour.title}`,
      district: currentLocation,
      categories: [detour.category, 'Unexpected'],
      memoryQuote: detour.memoryQuote,
      color: '#EC4899', // Hot Pink for unexpected detours
      choiceMade: choiceSelected ? choiceSelected.text : 'Stopped to explore on the way',
      choiceResponse: choiceSelected ? choiceSelected.response : detour.description,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setCompletedMemories(prev => [newMemory, ...prev]);
    notify(`✨ Detour Memory Unlocked: "${detour.title}"!`);
  };

  // Get current recommendation
  const getNextRecommendation = () => {
    const completedIds = completedMemories.map(m => m.id);
    return getNextMemoryRecommendation({
      userInterests,
      completedExperienceIds: completedIds,
      currentLocation,
      timeRemainingMins
    });
  };

  // Time remaining formatted (e.g. "11h 43m")
  const formattedTimeRemaining = () => {
    const hours = Math.floor(timeRemainingMins / 60);
    const mins = timeRemainingMins % 60;
    return `${hours}h ${mins < 10 ? '0' : ''}${mins}m`;
  };

  return (
    <AppContext.Provider value={{
      userInterests,
      setUserInterests,
      myDayExperiences,
      setMyDayExperiences,
      completedMemories,
      currentLocation,
      setCurrentLocation,
      timeRemainingMins,
      formattedTimeRemaining,
      activeJourney,
      setActiveJourney,
      discoveredDetours,
      introDismissed,
      setIntroDismissed,
      isDayFinished,
      setIsDayFinished,
      activeNotification,
      addExperienceToDay,
      removeExperienceFromDay,
      optimizeDay,
      completeExperience,
      completeDetourDiscovery,
      getNextRecommendation,
      notify
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
