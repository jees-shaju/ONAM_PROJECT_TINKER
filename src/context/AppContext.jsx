import React, { createContext, useContext, useState, useEffect } from 'react';
import { EXPERIENCES } from '../data/experiences';
import { INVITATIONS } from '../data/invitations';
import { ON_THE_WAY_DISCOVERIES } from '../data/discoveries';
import { optimizeItinerary } from '../utils/optimizer';
import { getNextMemoryRecommendation } from '../utils/recommender';
import { sound } from '../utils/sound';

const AppContext = createContext();

const LOCAL_STORAGE_KEY_MEMORIES = 'maveli_onam_memories_vault_v3';
const LOCAL_STORAGE_KEY_MYDAY = 'maveli_my_day_plan_v3';

// 10 Live Kerala Current Affairs Stories
export const KERALA_LIVE_NEWS = [
  { id: 1, title: 'K-FON Gigabit Internet expands to 20,000 rural schools & homes', tag: 'TECH & INFRA', time: '10m ago', icon: '📶' },
  { id: 2, title: 'Kochi Water Metro launches 5 new electric boats for zero-emission Onam travel', tag: 'SUSTAINABILITY', time: '25m ago', icon: '🚤' },
  { id: 3, title: 'Record 50-Foot Pookalam composed at Swaraj Round Thrissur', tag: 'CULTURE', time: '1h ago', icon: '🌼' },
  { id: 4, title: 'Aranmula Valla Sadya serves 64 traditional dishes to 100,000 pilgrims', tag: 'HERITAGE', time: '2h ago', icon: '🍲' },
  { id: 5, title: 'Kerala Tourism wins Gold at Global Eco-Tourism Awards in Geneva', tag: 'GLOBAL', time: '3h ago', icon: '🏆' },
  { id: 6, title: 'Wayanad Agro-Tourism opens green forest canopy walkways for visitors', tag: 'NATURE', time: '4h ago', icon: '🌲' },
  { id: 7, title: 'Calicut Halwa Street festival crafts 500-kg mega banana halwa', tag: 'FOOD', time: '5h ago', icon: '🍌' },
  { id: 8, title: 'Kannur Handloom Expo showcases eco-dyed Kasavu silk sarees', tag: 'CRAFT', time: '6h ago', icon: '🧵' }
];

export function AppProvider({ children }) {
  const [userInterests, setUserInterests] = useState(['People', 'Food', 'Culture', 'Modern Kerala', 'Nature', 'Music']);
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  // Default 24-hour itinerary
  const [myDayExperiences, setMyDayExperiences] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_MYDAY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { ...EXPERIENCES[0], assignedTime: '09:00', completed: false },
      { ...EXPERIENCES[1], assignedTime: '12:30', completed: false },
      { ...EXPERIENCES[2], assignedTime: '15:30', completed: false },
      { ...EXPERIENCES[3], assignedTime: '18:30', completed: false }
    ];
  });

  // Persistent Memory Vault (survives web page refreshes and browser restarts)
  const [completedMemories, setCompletedMemories] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_MEMORIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'mem-seed-1',
        title: 'Thripunithura Athachamayam Grand Procession',
        district: 'Ernakulam',
        categories: ['Culture', 'People'],
        memoryQuote: 'A procession that welcomes everyone is a true royal celebration.',
        color: '#10B981',
        choiceMade: 'Led the ceremonial procession with traditional Panchavadyam drummers',
        choiceResponse: 'Maveli walked in front of the royal palanquin as gold trumpets blew across town.',
        timestamp: '08:30',
        year: 2026
      }
    ];
  });

  const [currentLocation, setCurrentLocation] = useState('Thrissur');
  const [timeRemainingMins, setTimeRemainingMins] = useState(1320); // 22 hours
  const [activeJourney, setActiveJourney] = useState(null);
  const [discoveredDetours, setDiscoveredDetours] = useState([]);
  const [introDismissed, setIntroDismissed] = useState(false);
  const [isDayFinished, setIsDayFinished] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);

  // Sync My Day to LocalStorage Backend
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_MYDAY, JSON.stringify(myDayExperiences));
    } catch (e) {
      console.error(e);
    }
  }, [myDayExperiences]);

  // Sync Memories to Persistent Vault Backend (survives refreshes!)
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_MEMORIES, JSON.stringify(completedMemories));
    } catch (e) {
      console.error(e);
    }
  }, [completedMemories]);

  // Toast notification helper
  const notify = (msg) => {
    setActiveNotification(msg);
    setTimeout(() => setActiveNotification(null), 4500);
  };

  // Add experience to My Day
  const addExperienceToDay = (exp) => {
    if (myDayExperiences.some(item => item.id === exp.id)) {
      notify(`"${exp.title}" is already in your 24-hour day plan!`);
      return;
    }
    sound.playChime();
    const hour = (8 + myDayExperiences.length * 2) % 24;
    const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;

    setMyDayExperiences(prev => [
      ...prev,
      { ...exp, assignedTime: formattedHour, completed: false }
    ]);
    notify(`Added "${exp.title}" to your 24-Hour Itinerary! 🌼`);
  };

  // Remove experience from My Day
  const removeExperienceFromDay = (expId) => {
    sound.playPop();
    setMyDayExperiences(prev => prev.filter(item => item.id !== expId));
    notify(`Removed experience from itinerary.`);
  };

  // Delete individual memory from persistent vault
  const removeMemory = (memId) => {
    sound.playPop();
    setCompletedMemories(prev => prev.filter(m => m.id !== memId));
    notify('Memory deleted from vault 🗑️');
  };

  // Optimize day itinerary across 24h
  const optimizeDay = () => {
    sound.playChime();
    const result = optimizeItinerary(myDayExperiences);
    setMyDayExperiences(result.optimizedList);
    notify(result.message);
  };

  // Complete an experience & save memory to permanent vault
  const completeExperience = (expId, choiceSelected = null) => {
    sound.playCelebration();
    const exp = EXPERIENCES.find(e => e.id === expId) || myDayExperiences.find(e => e.id === expId);
    if (!exp) return;

    setMyDayExperiences(prev => prev.map(item => item.id === expId ? { ...item, completed: true } : item));
    setTimeRemainingMins(prev => Math.max(0, prev - exp.duration));
    if (exp.district) setCurrentLocation(exp.district);

    const now = new Date();
    const time24h = `${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;

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
      timestamp: time24h,
      year: 2026
    };

    setCompletedMemories(prev => [newMemory, ...prev]);
    notify(`🌼 Memory Saved to Vault: "${exp.title}"!`);
  };

  // Save unexpected On-The-Way detour discovery as a memory
  const completeDetourDiscovery = (detour, choiceSelected) => {
    sound.playCelebration();
    setDiscoveredDetours(prev => [...prev, detour.id]);
    setTimeRemainingMins(prev => Math.max(0, prev - detour.detourMins));

    const now = new Date();
    const time24h = `${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;

    const newMemory = {
      id: `detour-mem-${Date.now()}`,
      title: `✨ Unexpected: ${detour.title}`,
      district: detour.district || currentLocation,
      categories: [detour.category, 'Unexpected'],
      memoryQuote: detour.memoryQuote,
      color: '#EC4899',
      choiceMade: choiceSelected ? choiceSelected.text : 'Stopped to explore on the way',
      choiceResponse: choiceSelected ? choiceSelected.response : detour.description,
      timestamp: time24h,
      year: 2026
    };

    setCompletedMemories(prev => [newMemory, ...prev]);
    notify(`✨ Detour Memory Saved: "${detour.title}"!`);
  };

  // Clear memory vault option
  const clearMemoriesVault = () => {
    if (window.confirm('Are you sure you want to clear your current Onam memory vault?')) {
      setCompletedMemories([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY_MEMORIES);
      notify('Memory vault reset successfully.');
    }
  };

  // Export memory vault to JSON file
  const exportMemoriesVault = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(completedMemories, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Maveli_Onam_Memories_2026.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    notify('Exported memories vault to JSON file! 📜');
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

  // 24-Hour Time remaining formatted
  const formattedTimeRemaining = () => {
    const hours = Math.floor(timeRemainingMins / 60);
    const mins = timeRemainingMins % 60;
    return `${hours < 10 ? '0' : ''}${hours}h ${mins < 10 ? '0' : ''}${mins}m`;
  };

  return (
    <AppContext.Provider value={{
      userInterests,
      setUserInterests,
      selectedDistrict,
      setSelectedDistrict,
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
      removeMemory,
      optimizeDay,
      completeExperience,
      completeDetourDiscovery,
      clearMemoriesVault,
      exportMemoriesVault,
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
