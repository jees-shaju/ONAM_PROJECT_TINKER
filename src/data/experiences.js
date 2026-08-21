export const EXPERIENCES = [
  {
    id: 'exp-1',
    title: 'Community Pookalam & Flower Rituals',
    location: 'Thrissur Town Square',
    district: 'Thrissur',
    coordinates: { x: 45, y: 48 }, // Percentage coordinates for SVG map grid
    duration: 45,
    distanceKm: 1.2,
    categories: ['Culture', 'People'],
    tagline: 'Join 50 families crafting a massive 20-foot floral carpet.',
    description: 'A local neighborhood association gathers at sunrise to compose a traditional multi-layered floral design. The air smells of freshly plucked marigolds, yellow mukkutti, and jasmine.',
    verified: true,
    organizer: 'Thrissur Swaraj Round Youth Club',
    happeningNow: true,
    color: '#F59E0B', // Gold / Yellow
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Help arrange yellow marigold petals in the central ring',
        response: 'Maveli kneels alongside grandmother Sharada and college students. "The secret to a lasting Pookalam," she smiles, "is starting from the heart." Maveli places the golden center petal.',
      },
      {
        id: 'c2',
        text: 'Ask about the origin of the traditional flower patterns',
        response: 'Elder Raghavan Nair explains how each ring represents a deity and a slice of nature. Maveli marvels at how ancient geometric precision is passed down orally.',
      },
      {
        id: 'c3',
        text: 'Share royal stories from 1,000 years ago',
        response: 'Children cluster around Maveli as he recounts ancient Onam harvests. The crowd cheers and snaps photos with the King.',
      }
    ],
    whatChanged: {
      then: 'Flowers were hand-picked strictly from local backyards and sacred groves.',
      today: 'Digital blueprint designs meet eco-sourced local blossoms, crafted collaboratively by students and elders.',
      maveliReaction: 'The flowers change with the seasons, but the unity of hands working together remains untouched.'
    },
    memoryQuote: 'Some traditions survive because people keep choosing to celebrate them together.'
  },
  {
    id: 'exp-2',
    title: 'Grand Family Onam Sadya Feast',
    location: 'Thiruvambady Heritage Home',
    district: 'Thrissur',
    coordinates: { x: 47, y: 52 },
    duration: 60,
    distanceKm: 2.8,
    categories: ['Food', 'People'],
    tagline: 'Experience a authentic 26-dish feast served on fresh banana leaves.',
    description: 'The Menon family has opened their courtyard to guests. Crisp upperi, creamy avial, tangy pulinji, and piping hot palada payasam cooked over woodfire stoves.',
    verified: true,
    organizer: 'Menon Family Ancestral Home',
    happeningNow: true,
    color: '#10B981', // Emerald Green
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Learn the exact order of serving 26 dishes on a banana leaf',
        response: 'Ammini Amma guides Maveli: salt on the bottom left, banana chips next, hot pappadam crushed over parboiled rice and ghee. Maveli savors every burst of spice!',
      },
      {
        id: 'c2',
        text: 'Help serve Payasam to guests in the courtyard',
        response: 'Maveli carries the brass payasam vessel, pouring warm cardamom-infused jaggery payasam for guests. Laughter fills the ancestral hall.',
      },
      {
        id: 'c3',
        text: 'Engage in a friendly payasam drinking contest',
        response: 'Maveli finishes three banana-leaf bowls of Palada Payasam! The family crowns Maveli as the undisputed Sadya Champion of 2026.',
      }
    ],
    whatChanged: {
      then: 'Feasts were strictly home-cooked over traditional mud chulhas for extended family.',
      today: 'Families open doors to international travelers, neighbors, and strangers via open feast invitations.',
      maveliReaction: 'A leaf of food shared with a stranger turns them into family in seconds.'
    },
    memoryQuote: 'A feast is not measured by the number of dishes, but by the warmth of those who share it.'
  },
  {
    id: 'exp-3',
    title: 'Young Kerala Tech & AI Innovation Hub',
    location: 'Kochi Startup Village',
    district: 'Kochi',
    coordinates: { x: 42, y: 62 },
    duration: 50,
    distanceKm: 18.5,
    categories: ['Modern Kerala', 'People'],
    tagline: 'Meet young innovators building Kerala’s tech & creative future.',
    description: 'Inside a sunlit glass studio in Kochi, 20-something founders demonstrate AI tools for traditional artisans, renewable solar boats, and indie game prototypes.',
    verified: true,
    organizer: 'Kochi Tech Collective',
    happeningNow: true,
    color: '#3B82F6', // Blue
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Test a VR simulation of Kerala’s backwaters',
        response: 'Maveli puts on a futuristic headset and gasped: "I can feel the breeze on the Vembanad Lake! Technology has become a magic mirror."',
      },
      {
        id: 'c2',
        text: 'Listen to a pitch about AI-driven coconut harvesting',
        response: 'Young founder Ananya shows a sleek lightweight robot climber. Maveli chuckles: "My old royal tree-climbers would have loved this assistant!"',
      },
      {
        id: 'c3',
        text: 'Co-create an Onam digital artwork with young developers',
        response: 'Maveli draws a digital gold stroke on a massive interactive screen, blending traditional mural aesthetics with neon graphics.',
      }
    ],
    whatChanged: {
      then: 'Youth migrated away for technological opportunities.',
      today: 'Youth are returning home to launch world-class tech ventures right from Kerala’s palm-fringed coast.',
      maveliReaction: 'The future of my land is in bright, compassionate, inventive hands.'
    },
    memoryQuote: 'Progress is sweetest when it honours where we came from while building where we are going.'
  },
  {
    id: 'exp-4',
    title: 'Thunderous Chenda Melam Rehearsal',
    location: 'Peruvanam Temple Grounds',
    district: 'Thrissur',
    coordinates: { x: 48, y: 46 },
    duration: 40,
    distanceKm: 5.4,
    categories: ['Music', 'Culture'],
    tagline: 'Feel the earth-shaking rhythm of 100 traditional drummers.',
    description: 'Master drummers lead a crescendo of Panchari Melam. The complex rhythmic cycles build from slow majestic beats to exhilarating high-velocity climaxes.',
    verified: true,
    organizer: 'Peruvanam Drumming Academy',
    happeningNow: true,
    color: '#EF4444', // Red
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Try playing the bass drum (Thoppi Chenda)',
        response: 'The master hands Maveli a drum stick. Maveli strikes a boom that echoes across the courtyard! Drummers smile and nod in approval.',
      },
      {
        id: 'c2',
        text: 'Listen closely to the intricate 7-beat mathematical rhythm',
        response: 'Maveli closes his eyes. The heart-like pulse of the Chenda drum resonates deep within his royal chest.',
      },
      {
        id: 'c3',
        text: 'Dance along with young children on the sidelines',
        response: 'Maveli twirls his silk sash as kids imitate his royal step. The drum master speeds up the tempo in delight!',
      }
    ],
    whatChanged: {
      then: 'Chenda was played exclusively by hereditary temple artists.',
      today: 'Women drummers, international students, and young prodigies now lead major melam ensembles.',
      maveliReaction: 'Rhythm knows no barriers. When the drum sounds, all souls beat as one.'
    },
    memoryQuote: 'The sound of the Chenda is not music—it is the living pulse of Kerala.'
  },
  {
    id: 'exp-5',
    title: 'Sunset Vallam Kali (Snake Boat) Practice',
    location: 'Punnamada Backwaters',
    district: 'Alappuzha',
    coordinates: { x: 43, y: 74 },
    duration: 60,
    distanceKm: 42.0,
    categories: ['Nature', 'People'],
    tagline: '100 oarsmen slicing through golden evening waters in unison.',
    description: 'Long wooden snake boats glide across serene backwaters as oarsmen sing traditional Vanchipattu boat songs under a fiery orange sunset sky.',
    verified: true,
    organizer: 'Punnamada Boat Club',
    happeningNow: false,
    color: '#8B5CF6', // Purple
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Board the lead boat and rhythmically chant Vanchipattu songs',
        response: 'Maveli shouts "Thai Thai Thithai!" as 100 oars dip synchronously. The boat surges forward like a golden arrow.',
      },
      {
        id: 'c2',
        text: 'Watch from a wooden canoe while sipping fresh tender coconut',
        response: 'Silhouetted against coconut palms, Maveli marvels at the golden ripples and fierce camaraderie of the oarsmen.',
      },
      {
        id: 'c3',
        text: 'Meet the master boat artisan who spent 3 years carving the boat',
        response: 'Craftsman Kunjappan shows Maveli how wild teak timber is shaped by hand using traditional wooden rulers.',
      }
    ],
    whatChanged: {
      then: 'Boat races were seasonal feudal rivalries.',
      today: 'They are globally celebrated water carnivals bringing together diverse communities in sportsmanship.',
      maveliReaction: 'One boat, one song, 100 hands rowing together—that is true unity.'
    },
    memoryQuote: 'We move fastest not by rowing individually, but by keeping time with one another.'
  },
  {
    id: 'exp-6',
    title: 'Kathakali Twilight Storytelling',
    location: 'Kerala Kalamandalam',
    district: 'Thrissur',
    coordinates: { x: 50, y: 44 },
    duration: 50,
    distanceKm: 12.0,
    categories: ['Culture', 'Music'],
    tagline: 'Watch master artists paint intricate facial mudras under oil lamps.',
    description: 'Behind the bronze Nilavilakku lamp, artists spend hours applying natural green and red minerals to express epic legends purely through facial expressions (Navarasas).',
    verified: true,
    organizer: 'Kalamandalam Performing Arts',
    happeningNow: true,
    color: '#EC4899', // Pink
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Learn the facial eye movements of Joy (Hasya) and Wonder (Adbhutam)',
        response: 'Maveli practices wide eye rolls with the grandmaster artist. Maveli’s expressive face brings burst of laughter to the greenroom!',
      },
      {
        id: 'c2',
        text: 'Examine how natural organic paints are ground from river stones',
        response: 'Maveli rubs raw green stone on coconut oil. He praises the commitment to zero synthetic chemicals.',
      },
      {
        id: 'c3',
        text: 'Sit in the front row as the bronze lamp illuminates the stage',
        response: 'The heavy gungru bells chime. Without a single spoken word, the story speaks directly to Maveli’s heart.',
      }
    ],
    whatChanged: {
      then: 'Performances lasted all night long under dim oil torches for royal courts.',
      today: 'Shorter, accessible classical showcases educate global audiences while retaining raw spiritual depth.',
      maveliReaction: 'Eyes can tell stories that words can only dream of capturing.'
    },
    memoryQuote: 'Art requires no translation when it is performed with pure devotion.'
  },
  {
    id: 'exp-7',
    title: 'Organic Village Tea & Story Circle',
    location: 'Kumarakom Backwater Village',
    district: 'Alappuzha',
    coordinates: { x: 46, y: 78 },
    duration: 35,
    distanceKm: 38.0,
    categories: ['Village', 'People'],
    tagline: 'Steaming hot meter tea and rustic gossip under banyan trees.',
    description: 'An iconic roadside wooden tea shop where village elders, farmers, and young poets gather to debate sports, politics, and local folklore over hot banana fritters (pazham pori).',
    verified: true,
    organizer: 'Vakkan’s Village Tea Stall',
    happeningNow: true,
    color: '#D97706', // Gold dark
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Order hot Meter Tea poured from high above',
        response: 'Vakkan stretches the frothy tea three feet between metal tumblers. Maveli catches the fragrant froth without spilling a single drop!',
      },
      {
        id: 'c2',
        text: 'Ask the elders what they tell their grandchildren about King Maveli',
        response: 'Elder Chellappan chuckles: "We tell them you are the reason we treat every neighbor with a wide smile!" Maveli wipes a nostalgic tear.',
      },
      {
        id: 'c3',
        text: 'Eat crispy Pazham Pori hot out of the coconut oil vessel',
        response: 'Sweet golden banana fritters melt on Maveli’s tongue. "Simple flavors are the true luxury of life!" he exclaims.',
      }
    ],
    whatChanged: {
      then: 'Village news traveled via wooden boat couriers.',
      today: 'Smartphones rest on wooden tea tables, but the lively spirit of village debate is unchanged.',
      maveliReaction: 'A cup of tea and good company can resolve the biggest troubles of the world.'
    },
    memoryQuote: 'The true heart of Kerala beats in quiet village tea shops under ancient shade trees.'
  },
  {
    id: 'exp-8',
    title: 'Kalaripayattu Martial Arts Showcase',
    location: 'Calicut Heritage Arena',
    district: 'Kozhikode',
    coordinates: { x: 35, y: 28 },
    duration: 45,
    distanceKm: 75.0,
    categories: ['Culture', 'Nature'],
    tagline: 'Ancient physical discipline, fluid leaps, and weapon agility.',
    description: 'Inside an earthen floor Kalari, practitioners smeared with sesame oil execute gravity-defying high kicks and feline maneuvers inspired by Kerala fauna.',
    verified: true,
    organizer: 'Cappan Kalaripayattu Sangam',
    happeningNow: false,
    color: '#059669', // Teal green
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Observe the Meippayattu feline stretch posture',
        response: 'Maveli tries the royal lion stance. The Gurukkal praises Maveli’s natural royal balance and agility!',
      },
      {
        id: 'c2',
        text: 'Ask Gurukkal about traditional Ayurvedic bone healing secrets',
        response: 'The master demonstrates herbal oil marma massage points. Maveli learns how physical defense is linked to healing.',
      },
      {
        id: 'c3',
        text: 'Watch teenage female warriors master flexible sword (Urumi) duels',
        response: 'Sparks fly as flexible blades whirl in golden arches. Maveli applauds the fierce grace of Kerala’s women warriors.',
      }
    ],
    whatChanged: {
      then: 'Kalari was practiced in secret for royal battlefield defense.',
      today: 'It is a celebrated global movement art for mental clarity, flexibility, and self-defense.',
      maveliReaction: 'Strength without discipline is a storm; strength with discipline is a mountain.'
    },
    memoryQuote: 'True mastery is not about defeating others, but mastering oneself.'
  }
];
