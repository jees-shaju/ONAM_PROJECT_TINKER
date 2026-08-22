import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Volume2, VolumeX, Compass, Feather, Move, Newspaper, Clock, MapPin, Flower2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sound } from '../utils/sound';

// Comprehensive Kerala Onam knowledge base for Kili
const KILI_KNOWLEDGE = {
  onamHistory: `🦜 Onam celebrates the annual homecoming of the legendary King Mahabali (Maveli)! During his golden reign in ancient Kerala, there was no poverty, crime, or inequality — everyone lived as equals. The gods, jealous of this perfect kingdom, sent Vamana (Vishnu's dwarf avatar) who tricked Maveli into giving away his kingdom. But Maveli, true to his word, gave everything and was pushed to the netherworld. As a boon, he was granted one day per year to visit his beloved people — that's Onam! 🌺`,

  onamEvents: `🦜 Major Onam events across Kerala:\n
• 🌼 **Atham**: First day — Pookalam making begins across all homes
• 🎭 **Chithira**: Thrissur Pulikali tiger dance preparations
• 🐘 **Uthradam**: Elephant processions, Sadya preparations begin
• 👑 **Thiruvonam**: Main Onam — grand Sadya feast, family gatherings
• 🚣 **Panchami**: Nehru Trophy Boat Race in Alappuzha, Aranmula Boat Race
• 🎪 **Thripunithura Athachamayam**: Official Onam kickoff procession in Ernakulam
• 🥁 **Swaraj Round Pulikali**: 500 tiger dancers around Vadakkunnathan Temple, Thrissur
• 💃 **Vallamkali**: Snake boat races in Punnamada, Aranmula, and Payyippad`,

  districts: {
    'Kasaragod': '🏰 Kerala\'s northernmost district. Famous for Bekal Fort (largest in Kerala), Yakshagana theatre where Kannada and Malayalam culture blend, and pristine Arabian Sea beaches.',
    'Kannur': '🔥 Land of Theyyam — divine ritualistic art forms where performers transform into deities. Also known for handloom Kasavu weaving and Kalaripayattu martial arts.',
    'Wayanad': '⛰️ Kerala\'s only highland district. Home to Chembra Peak\'s heart-shaped lake, indigenous Kurumba and Kurichiya tribal communities, and ancient Edakkal rock cave paintings.',
    'Kozhikode': '🍌 Historic Calicut — where Vasco da Gama first landed in India! Famous for Kozhikode Halwa in 50+ varieties, Beypore Uru wooden ships, and Malabar hospitality.',
    'Malappuram': '🎶 Land of Oppana folk songs and the world\'s oldest teak plantation in Nilambur (1842). Malappuram is also known for its art of Kolkali and Duffmuttu performances.',
    'Palakkad': '🌾 The granary of Kerala with paddy fields stretching endlessly. Has the natural Palakkad Gap in the Western Ghats. Famous for Kalpathi Ratholsavam chariot festival and heritage architecture.',
    'Thrissur': '🐯 Cultural capital of Kerala! Home to Thrissur Pooram (world\'s greatest elephant festival), Swaraj Round Pulikali tiger dance, Vadakkunnathan Temple, and Kerala Kalamandalam.',
    'Ernakulam': '🐘 Commercial heart of Kerala. Kochi metro, Water Metro electric ferries, Fort Kochi heritage, and Thripunithura Athachamayam — the official Onam procession kickoff.',
    'Idukki': '🍃 Hill district with Munnar tea estates, Eravikulam National Park (Nilgiri Tahr), Periyar Wildlife Sanctuary, and the rare Neelakurinji flowers blooming every 12 years.',
    'Kottayam': '🪷 Land of letters, latex and lakes. First fully literate district in India! Famous for Vembanad Lake, Kumarakom bird sanctuary, rubber plantations, and ancient church heritage.',
    'Alappuzha': '🛶 Venice of the East! Punnamada Lake\'s Nehru Trophy Boat Race, Kuttanad below-sea-level paddy fields, houseboat backwater experience, and Krishnapuram Palace.',
    'Pathanamthitta': '🍲 Pilgrim\'s district! Home to Sabarimala temple, Aranmula Parthasarathy Temple, and the sacred Aranmula Boat Race with Palliyodam snake boats singing Vanchipattu.',
    'Kollam': '⛵ Ancient cashew capital and port city visited by Chinese and Roman traders. Ashtamudi Lake with 8 loops, coir weaving heritage, and Jatayu Earth\'s Centre adventure park.',
    'Thiruvananthapuram': '👑 State capital with Padmanabha Swamy Temple (world\'s wealthiest temple), Kanakakkunnu Palace Onam celebrations, Kerala State Onam Pageant, and Napier Museum.'
  },

  sadya: `🦜 The Onasadya (Onam feast) is a grand vegetarian feast served on fresh banana leaves! It has 26-64 dishes depending on the region:\n
• Rice (served twice — plain then with curries)
• Sambar (lentil-vegetable stew)
• Avial (15 vegetables in coconut-yoghurt gravy)  
• Olan (ash gourd in coconut milk)
• Kalan (yam in thick curd)
• Pachadi (pineapple/beetroot in spiced curd)
• Thoran (dry stir-fry vegetables)
• Naranga Achar (lime pickle)
• Papad & Banana Chips
• Payasam in 3-4 varieties (Ada, Palada, Banana)
• Banana & Jaggery for dessert
The tradition: meals are served with 6 specified courses in exact order! 🍌`,

  schedule: null, // Will be filled dynamically

  pookalam: `🦜 Pookalam is the beautiful floral carpet made at home entrances during Onam! It starts small on Atham day and grows bigger with each passing day until Thiruvonam (main Onam). Flowers used: marigold, chrysanthemum, globe amaranth, rose petals, and tropical blossoms. The center always has a golden circle symbolizing Maveli's crown! 🌼`,

  kFON: `🦜 K-FON (Kerala Fibre Optic Network) is Kerala's own internet backbone — a state government project connecting 100,000+ rural homes and all 30,000 government schools with high-speed fibre internet, bridging the digital divide! It's government-owned and provides free or subsidized connectivity to BPL families. A truly royal digital gift! 📶`,

  water_metro: `🦜 Kochi Water Metro is India's first water-based metro system! 78 electric ferry boats run on battery power, connecting 10 islands and backwater areas of Kochi. Zero emissions, air-conditioned, and integrated with bus/road metro system. It replaces noisy diesel boats and is a model for sustainable urban water transport worldwide! 🚤`
};

function getKiliResponse(userInput, currentLocation, formattedTimeRemaining, myDayExperiences, getNextRecommendation) {
  const input = userInput.toLowerCase();

  // District queries
  for (const [district, info] of Object.entries(KILI_KNOWLEDGE.districts)) {
    if (input.includes(district.toLowerCase())) {
      return `🦜 **${district}**: ${info}`;
    }
  }

  if (input.includes('next event') || input.includes('suggest') || input.includes('recommend') || input.includes('where')) {
    const nextRec = getNextRecommendation?.();
    if (nextRec) {
      return `🦜 Based on your current spot in ${currentLocation}, I highly recommend visiting **"${nextRec.title}"** in ${nextRec.district}! 
      
📍 Location: ${nextRec.location}
⏱️ Duration: ${nextRec.duration} mins
🎯 ${nextRec.tagline}

Shall we add it to your 24-hour itinerary? 🌺`;
    }
    return `🦜 Try the Pulikali Tiger Dance in Thrissur or the Nehru Trophy Boat Race in Alappuzha — both are spectacular Onam experiences! 🐯🚣`;
  }

  if (input.includes('onam') && (input.includes('history') || input.includes('story') || input.includes('maveli') || input.includes('legend'))) {
    return KILI_KNOWLEDGE.onamHistory;
  }

  if (input.includes('events') || input.includes('celebration') || input.includes('festival')) {
    return KILI_KNOWLEDGE.onamEvents;
  }

  if (input.includes('sadya') || input.includes('food') || input.includes('feast') || input.includes('dish') || input.includes('eat')) {
    return KILI_KNOWLEDGE.sadya;
  }

  if (input.includes('pookalam') || input.includes('flower') || input.includes('floral')) {
    return KILI_KNOWLEDGE.pookalam;
  }

  if (input.includes('schedule') || input.includes('time') || input.includes('plan') || input.includes('itinerary')) {
    return `🦜 You currently have ⏳ ${formattedTimeRemaining()} remaining in your 24-hour Onam journey! You have ${myDayExperiences.length} experiences planned:
${myDayExperiences.slice(0, 4).map(e => `\n• 🕐 ${e.assignedTime} — ${e.title} (${e.district})`).join('')}
${myDayExperiences.length > 4 ? `\n...and ${myDayExperiences.length - 4} more!` : ''}

Go to "My 24H Day" in the menu to organize your full itinerary! 📋`;
  }

  if (input.includes('kfon') || input.includes('internet') || input.includes('broadband')) {
    return KILI_KNOWLEDGE.kFON;
  }

  if (input.includes('water metro') || input.includes('ferry') || input.includes('kochi')) {
    return KILI_KNOWLEDGE.water_metro;
  }

  if (input.includes('memory') || input.includes('vault') || input.includes('save')) {
    return `🦜 Your Onam Memory Vault is permanently stored! Every experience Maveli completes gets saved as a memory with your choice, the response, and historical "Then vs Today" insights. Memories survive page refreshes and browser restarts. Go to the 🌺 Memories tab to view, play 10-second video scenes, or delete individual memories! 📜`;
  }

  if (input.includes('map') || input.includes('travel') || input.includes('journey')) {
    return `🦜 The Kerala Map shows all 14 districts! When Maveli travels, he experiences **unique journey scenarios** for each district — different roadside encounters, sights, and tasks specific to that region. Look for the golden banner that pops up during travel showing what Maveli is doing on the road! 🗺️

Districts from north to south: Kasaragod → Kannur → Wayanad → Kozhikode → Malappuram → Palakkad → Thrissur → Ernakulam → Idukki → Kottayam → Alappuzha → Pathanamthitta → Kollam → Thiruvananthapuram 👑`;
  }

  if (input.includes('hello') || input.includes('hi') || input.includes('namaste') || input.includes('namaskaram')) {
    return `🦜 Namaskaram! I am Kili, your Kerala AI guide! I know all about:
• 14 Districts of Kerala and their Onam celebrations
• Onam history, legend of King Maveli, and traditions  
• Onasadya dishes and how to make Pookalam
• Current Kerala news like K-FON and Water Metro
• Journey tips and next experience recommendations

Ask me anything about Kerala or Onam! 🌺`;
  }

  if (input.includes('news') || input.includes('current') || input.includes('latest') || input.includes('today')) {
    return `🦜 K-NEWS LIVE UPDATE 📰:
• 📶 K-FON gigabit broadband now connects 20,000+ rural schools across Kerala
• 🚤 Kochi Water Metro launched 5 new zero-emission electric ferries for Onam
• 🌼 Record 50-foot Pookalam completed at Swaraj Round, Thrissur
• 🍲 Aranmula Valla Sadya serving 64 dishes to 100,000 pilgrims this season
• 🌲 Wayanad Agro-Tourism opens new forest canopy walkways
• 🏆 Kerala Tourism wins Gold at Global Eco-Tourism Awards in Geneva!`;
  }

  if (input.includes('boat race') || input.includes('vallam kali') || input.includes('snake boat')) {
    return `🦜 The Vallam Kali (Snake Boat Races) are one of Kerala's most thrilling Onam traditions! 🚣

• **Nehru Trophy** in Alappuzha (Punnamada Lake) — most famous, 100+ oarsmen per boat!
• **Aranmula Boat Race** — oldest and most sacred, linked to Parthasarathy Temple
• **Payippad Boat Race** — Kuttanad region, unique 3-day event

Each snake boat (Chundan Vallam) is 100-135 feet long with 60-100 rowers. They row in sync to powerful Vanchipattu songs! The lead singer keeps the rhythm as all oars slice the water together. Absolutely electric to watch! ⚡`;
  }

  // Default warm response
  const defaultReplies = [
    `🦜 That's a wonderful query! Kerala has 14 magnificent districts each with unique Onam traditions. Ask me about any specific district, food, event, or the history of King Maveli! 🌺`,
    `🦜 Interesting! You know, Kerala is one of the few places where ancient traditions and modern innovation coexist perfectly — from Theyyam rituals to Water Metro electric ferries! What would you like to explore? 👑`,
    `🦜 Let me guide King Maveli well! For the best 24-hour Onam experience, I'd recommend mixing cultural events with nature, food, and local village traditions. What's on Maveli's mind? 🌿`,
  ];
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}

export function AiGuideChatbot() {
  const { currentLocation, formattedTimeRemaining, myDayExperiences, getNextRecommendation } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'kili',
      text: `Namaskaram Thamburane! I am Kili 🦜, your adorable Kerala AI guide! 

I can help with:
• 14 Districts & their Onam events
• Onam history, Sadya dishes, Pookalam
• Journey tips & experience recommendations  
• Kerala current affairs & news

What does King Maveli want to know today? 👑`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    sound.playPop();
    setInputVal('');

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const replyText = getKiliResponse(text, currentLocation, formattedTimeRemaining, myDayExperiences, getNextRecommendation);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'kili', text: replyText }]);
      setIsTyping(false);
      if (isAudioEnabled) sound.playChime();
    }, 700);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputVal);
  };

  const quickPrompts = [
    { icon: <Compass className="w-3 h-3" />, label: 'Next Event', text: 'Suggest my next event' },
    { icon: <Feather className="w-3 h-3" />, label: 'Onam Story', text: 'Tell me the Onam history story' },
    { icon: <Clock className="w-3 h-3" />, label: 'My Schedule', text: 'Show my 24-hr schedule' },
    { icon: <Newspaper className="w-3 h-3" />, label: 'K-News', text: 'Kerala news update' },
    { icon: <Flower2 className="w-3 h-3" />, label: 'Sadya', text: 'Tell me about the Onasadya feast' },
    { icon: <MapPin className="w-3 h-3" />, label: 'Districts', text: 'Tell me about Thrissur' },
  ];

  return (
    <>
      {/* Draggable Cute Floating Kili Avatar */}
      <motion.div
        drag
        dragConstraints={{ left: -800, right: 800, top: -800, bottom: 800 }}
        whileDrag={{ scale: 1.1 }}
        initial={{ x: 0, y: 0 }}
        className="fixed bottom-20 right-6 z-50 select-none flex flex-col items-end"
      >
        {/* Floating Bubble Teaser */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gold-100 to-amber-50 text-emerald-950 text-xs font-black shadow-xl border border-gold-400 flex items-center gap-1.5 cursor-pointer"
            onClick={() => { sound.playPop(); setIsOpen(true); }}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
            <span>Ask Kili AI 🦜</span>
          </motion.div>
        )}

        {/* Cute Parrot Avatar Button */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { sound.playPop(); setIsOpen(!isOpen); }}
          className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-400 to-gold-300 p-1 shadow-2xl border-2 border-gold-300 cursor-grab active:cursor-grabbing flex items-center justify-center group"
        >
          <div className="absolute -inset-2 rounded-full bg-gold-400/30 blur-md group-hover:bg-gold-400/50 transition-all animate-pulse" />
          <div className="relative w-full h-full rounded-full bg-emerald-950 flex items-center justify-center overflow-hidden">
            <span className="text-3xl filter drop-shadow-md">🦜</span>
            <span className="absolute top-0 right-1 text-xs">👑</span>
          </div>
          <div className="absolute -top-1 -left-1 bg-gold-500 text-emerald-950 p-0.5 rounded-full border border-gold-300 shadow">
            <Move className="w-3 h-3" />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-36 right-6 z-50 w-80 sm:w-96 glass-panel-gold rounded-3xl border-2 border-gold-400/60 shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="p-3.5 bg-emerald-950/90 border-b border-gold-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-400 to-emerald-500 flex items-center justify-center text-xl shadow-md border border-gold-300">
                  🦜
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-serif font-black text-sm text-gold-300">KILI AI</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-800 text-emerald-300 font-bold border border-emerald-600">KERALA GUIDE</span>
                  </div>
                  <p className="text-[10px] text-cream-200/70">📍 Currently in: {currentLocation} • Draggable</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className="p-1.5 rounded-full hover:bg-gold-500/20 text-cream-200"
                >
                  {isAudioEnabled ? <Volume2 className="w-4 h-4 text-gold-400" /> : <VolumeX className="w-4 h-4 text-red-400" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gold-500/20 text-cream-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Action Chips */}
            <div className="p-2 bg-emerald-950/60 border-b border-gold-500/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(p.text)}
                  className="px-2.5 py-1 rounded-full bg-emerald-900/40 border border-emerald-700/40 hover:bg-gold-500/20 hover:border-gold-500/40 text-cream-100 hover:text-gold-300 whitespace-nowrap font-bold flex items-center gap-1 transition-all"
                >
                  {p.icon}
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'kili' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-800 flex items-center justify-center text-sm shrink-0 mr-1.5 mt-0.5 border border-gold-500/30">🦜</div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 font-bold shadow-md rounded-tr-none'
                        : 'bg-emerald-950/90 text-cream-100 border border-gold-500/30 shadow-md rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 flex items-center justify-center text-sm border border-gold-500/30">🦜</div>
                  <div className="px-4 py-2.5 rounded-2xl rounded-tl-none bg-emerald-950/90 border border-gold-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-2.5 bg-emerald-950/90 border-t border-gold-500/20 flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about Onam, districts, food, Maveli..."
                className="flex-1 px-3.5 py-2 rounded-full bg-emerald-900/60 border border-gold-500/30 text-cream-100 placeholder-cream-300/40 text-xs focus:outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-emerald-950 hover:scale-105 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
