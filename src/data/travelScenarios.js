// Unique travel task scenarios for each district journey
// Each scenario has different tasks Maveli performs while traveling
export const TRAVEL_SCENARIOS = {
  'Thrissur': {
    icon: '🐯',
    travelTasks: [
      { progress: 20, task: 'Maveli spots Pulikali tiger dancers rehearsing on the roadside and joins for a quick roar! 🐯' },
      { progress: 45, task: 'A fragrant garland seller at the Thrissur bypass insists on adorning Maveli\'s royal umbrella with marigolds 🌼' },
      { progress: 70, task: 'The Guruvayur road is lined with caparisoned elephants. Maveli blesses each one by name 🐘' }
    ],
    arrivalScene: 'The thundering Chenda Melam welcomes the king as Thrissur erupts in gold!'
  },
  'Thiruvananthapuram': {
    icon: '👑',
    travelTasks: [
      { progress: 20, task: 'Maveli passes the Padmanabha Swamy Temple spires glowing in sunrise gold. He bows in reverence 🙏' },
      { progress: 45, task: 'A student from NIT Trivandrum shows Maveli Kerala\'s first solar-powered autonomous bus! ☀️🚌' },
      { progress: 70, task: 'At Kanakakunnu junction, the State Onam parade floats are being assembled. Maveli rides one! 🎪' }
    ],
    arrivalScene: 'A million LED lights illuminate the palace grounds as the capital city roars in welcome!'
  },
  'Alappuzha': {
    icon: '🛶',
    travelTasks: [
      { progress: 20, task: 'The Kuttanad backwaters sparkle. Maveli hops on a bamboo raft and punts through paddy fields 🌾' },
      { progress: 45, task: 'Houseboat cooks call out — fresh karimeen fish curry is being prepared for the race-day feast 🐟' },
      { progress: 70, task: 'Snake boat oarsmen practice their war chants. Maveli joins in: \"VANCHI VANCHI VANCHI!\" 🚣' }
    ],
    arrivalScene: 'Punnamada Lake roars with 200,000 spectators as the snake boats race toward the horizon!'
  },
  'Ernakulam': {
    icon: '🐘',
    travelTasks: [
      { progress: 20, task: 'Maveli boards the Kochi Water Metro — the silent electric ferry glides through the harbour 🚤' },
      { progress: 45, task: 'Lulu Mall Onam window displays show 3D holograms of historical Kerala scenes. Maveli marvels! 🌐' },
      { progress: 70, task: 'The Thripunithura road is packed with royal palanquins and Panchavadyam musicians! 🥁' }
    ],
    arrivalScene: 'Thripunithura Hill Palace opens its gates as thousands cheer for the king\'s ceremonial return!'
  },
  'Pathanamthitta': {
    icon: '🍲',
    travelTasks: [
      { progress: 20, task: 'The road winds beside the Pampa River. Maveli cups his hand and drinks crystal-clear water 💧' },
      { progress: 45, task: 'Pilgrims walking barefoot to Sabarimala greet Maveli. He blesses them with both hands raised 🙌' },
      { progress: 70, task: 'Aranmula artisans are polishing metal mirrors (Kannadi) by the roadside. Each one reflects Maveli! 🔮' }
    ],
    arrivalScene: '64-dish Onasadya served on banana leaves as sacred Palliyodam boats arrive in procession!'
  },
  'Kottayam': {
    icon: '🪷',
    travelTasks: [
      { progress: 20, task: 'The rubber estates of Kottayam line both sides. Maveli watches dawn tappers harvest white latex 🌿' },
      { progress: 45, task: 'Vembanad Lake appears — lotus flowers everywhere! Maveli plucks one for his royal crown 🪷' },
      { progress: 70, task: 'A local newspaper office hands Maveli the Onam edition featuring HIM on the front page! 📰' }
    ],
    arrivalScene: 'Kumarakom\'s floating Pookalams drift across mirror-still waters under a brilliant sunrise!'
  },
  'Kollam': {
    icon: '⛵',
    travelTasks: [
      { progress: 20, task: 'Cashew plantations stretch across the Kollam hills. Maveli cracks open a fresh cashew and tastes! 🥜' },
      { progress: 45, task: 'Ashtamudi Lake glimmers with Chinese fishing nets rising and falling in rhythm 🎣' },
      { progress: 70, task: 'Coir mat weavers wave from thatched workshops. Maveli tries his hand at the spinning wheel 🧵' }
    ],
    arrivalScene: 'The historic port city glows at sunset as Kollam\'s boat race traditions come to life!'
  },
  'Idukki': {
    icon: '🍃',
    travelTasks: [
      { progress: 20, task: 'The Western Ghats road twists through mist. Maveli\'s royal umbrella drips with mountain dew ☁️' },
      { progress: 45, task: 'Munnar Tea estate workers in bright saris call out — fresh ginger tea is brewing for the king! ☕' },
      { progress: 70, task: 'A Nilgiri Tahr mountain goat crosses the road and bows to Maveli (or so it seems!) 🐐' }
    ],
    arrivalScene: 'Neelakurinji wildflowers carpet the Eravikulam hills in purple as Maveli reaches the summit!'
  },
  'Palakkad': {
    icon: '🌾',
    travelTasks: [
      { progress: 20, task: 'The Palakkad Gap opens — flat paddy fields stretch to the horizon like a golden sea 🌾' },
      { progress: 45, task: 'Kalpathi agraharam houses with antique wooden pillars. Maveli admires the Kerala architecture 🏛️' },
      { progress: 70, task: 'Organic Matta rice farmers wave from their fields. Maveli helps transplant a few seedlings! 🌱' }
    ],
    arrivalScene: 'Palakkad Fort\'s massive granite gates open as Kummattikali mask dancers surround Maveli!'
  },
  'Malappuram': {
    icon: '🎶',
    travelTasks: [
      { progress: 20, task: 'Oppana singers perform at a roadside wedding. Maveli claps along to the joyful harvest song 👏' },
      { progress: 45, task: 'Nilambur teak forests tower on both sides — these trees were here when Maveli last visited! 🌳' },
      { progress: 70, task: 'A group of boys perform traditional Kolkali stick dance. Maveli joins, missing every beat! 🪄' }
    ],
    arrivalScene: 'Nilambur teak heritage grounds come alive with Malabar Onam folk celebrations!'
  },
  'Kozhikode': {
    icon: '🍌',
    travelTasks: [
      { progress: 20, task: 'SM Street beckons with the aroma of Kozhikode Halwa. Maveli tastes 3 varieties before moving on 🍯' },
      { progress: 45, task: 'Mananchira Square\'s banyan tree is draped with golden harvest lanterns. Stunning! 🏮' },
      { progress: 70, task: 'Beypore shipwrights are constructing a traditional Uru wooden ship. Maveli helps hammer a plank! ⚓' }
    ],
    arrivalScene: 'Mananchira Square erupts in fragrant halwa and Mappila songs as the king enters!'
  },
  'Wayanad': {
    icon: '⛰️',
    travelTasks: [
      { progress: 20, task: 'Thick mist covers the road. Maveli uses his royal conch as a horn and wakes the misty valley! 🐚' },
      { progress: 45, task: 'Kurichiya tribal elders greet Maveli at the roadside with wild forest honey and tubers 🍯' },
      { progress: 70, task: 'The Chembra Peak trail marker appears. Maveli spots the heart-shaped lake shimmering below 💚' }
    ],
    arrivalScene: 'Tribal Tudi drums echo through the forest as Wayanad\'s ancient harvest rituals begin!'
  },
  'Kannur': {
    icon: '🔥',
    travelTasks: [
      { progress: 20, task: 'Theyyam preparation is underway at a roadside shrine. Maveli watches performers put on face paint 🎭' },
      { progress: 45, task: 'Payyambalam Beach appears — Kalaripayattu warriors practice flips on the golden sand! 🏖️' },
      { progress: 70, task: 'Cannanore handloom weavers toss gold Kasavu thread into the loom. Maveli catches one! 🧵' }
    ],
    arrivalScene: 'Theyyam fire rituals blaze as Kannur\'s sacred northern Kerala traditions come alive!'
  },
  'Kasaragod': {
    icon: '🏰',
    travelTasks: [
      { progress: 20, task: 'Bekal Fort\'s massive stone walls appear on the horizon. Maveli remembers these defenses! 🏰' },
      { progress: 45, task: 'Yakshagana performers in towering crowns rehearse epic drama on the beach. Maveli joins! 🎪' },
      { progress: 70, task: 'The Arabian Sea roars with orange sunset waves. Maveli stands at the water\'s edge and smiles 🌅' }
    ],
    arrivalScene: 'Bekal Fort\'s keyhole view frames the setting Arabian Sea as Kerala\'s northernmost tip celebrates!'
  }
};

// Get scenario for a given district, with fallback
export function getTravelScenario(district) {
  return TRAVEL_SCENARIOS[district] || {
    icon: '👑',
    travelTasks: [
      { progress: 20, task: 'Maveli waves to village children lining the roadside with marigold garlands 🌼' },
      { progress: 45, task: 'A lone piper plays harvest songs as Maveli\'s entourage passes through golden paddy fields 🎵' },
      { progress: 70, task: 'The destination appears on the horizon — Maveli stands tall in anticipation! 👑' }
    ],
    arrivalScene: 'Kerala erupts in celebration as Maveli arrives to bless the festivities!'
  };
}
