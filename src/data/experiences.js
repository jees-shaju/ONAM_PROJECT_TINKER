export const EXPERIENCES = [
  {
    id: 'exp-1',
    title: 'Grand Swaraj Round Pulikali & Pookalam',
    location: 'Swaraj Round',
    district: 'Thrissur',
    coordinates: { x: 45, y: 48, lat: 10.52, lng: 76.21 },
    duration: 60,
    distanceKm: 1.2,
    categories: ['Culture', 'People'],
    tagline: 'Witness 500 tiger dancers (Pulikali) and a 30-foot mega floral carpet.',
    description: 'The heart of Thrissur comes alive as hundreds of performers painted as tigers dance to thundering Urumi drums around Vadakkunnathan temple.',
    verified: true,
    organizer: 'Thrissur Swaraj Round Pulikali Samithi',
    happeningNow: true,
    color: '#F59E0B',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Help paint tiger stripes on a veteran Pulikali dancer',
        response: 'Maveli picks up the paintbrush. The artist smiles: "Yellow ochre and charcoal black—the royal coat of Kerala!"',
      },
      {
        id: 'c2',
        text: 'Join the rhythm circle of Urumi & Chenda drummers',
        response: 'Maveli matches the roaring pulse of the drums as tiger dancers leap into the air around him!',
      },
      {
        id: 'c3',
        text: 'Place the central golden petal of the 30-foot Pookalam',
        response: 'Maveli kneels at the center ring. The crowd of 10,000 erupts in cheers as the royal golden petal is set.',
      }
    ],
    whatChanged: {
      then: 'Pulikali was performed by local neighborhood troupes with natural clay paints.',
      today: 'Eco-friendly vibrant body art, women troupes, and high-definition livestreaming reach millions worldwide.',
      maveliReaction: 'The roar of the tigers and the warmth of the people make Thrissur unforgettable!'
    },
    memoryQuote: 'Culture lives when every generation dances to the same joyous beat.'
  },
  {
    id: 'exp-2',
    title: 'Kanakakkunnu Illumination & State Onam Pageant',
    location: 'Kanakakkunnu Palace Grounds',
    district: 'Thiruvananthapuram',
    coordinates: { x: 52, y: 92, lat: 8.52, lng: 76.93 },
    duration: 90,
    distanceKm: 280.0,
    categories: ['Culture', 'Modern Kerala'],
    tagline: 'Illuminated heritage palace, 100+ cultural stages, and royal procession.',
    description: 'The capital city lights up in millions of golden LEDs with continuous classical dances, Kathakali, Mohiniyattam, and fusion music shows.',
    verified: true,
    organizer: 'Kerala Tourism Department',
    happeningNow: true,
    color: '#EC4899',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Walk through the illuminated golden palm canopy tunnel',
        response: 'Maveli gazes up at a quarter-million glowing fairy lights illuminating ancient teak trees.',
      },
      {
        id: 'c2',
        text: 'Watch a Mohiniyattam recital under the palace archways',
        response: 'Graceful white and gold Kasavu dancers portray the serene beauty of Kerala harvest songs.',
      },
      {
        id: 'c3',
        text: 'Address the opening ceremony crowd alongside local artisans',
        response: 'Maveli takes the microphone: "May prosperity and equality bless every home in Kerala!"',
      }
    ],
    whatChanged: {
      then: 'Onam lights were simple clay oil lamps along palace pathways.',
      today: 'Solar-powered smart LED illuminations transform Trivandrum into a fairy tale city.',
      maveliReaction: 'The light of happiness shines brighter than a million suns.'
    },
    memoryQuote: 'When a city lights up for joy, every heart inside it glows.'
  },
  {
    id: 'exp-3',
    title: 'Aranmula Valla Sadya & Uthrattathi Rituals',
    location: 'Aranmula Parthasarathy Temple',
    district: 'Pathanamthitta',
    coordinates: { x: 54, y: 78, lat: 9.26, lng: 76.78 },
    duration: 75,
    distanceKm: 130.0,
    categories: ['Food', 'Culture'],
    tagline: 'Sacred ritual feast with 64 traditional dishes served on banana leaves.',
    description: 'Palliyodams (sacred snake boats) arrive in grand procession. Devotees chant Vanchipattu songs to request specific dishes during the legendary feast.',
    verified: true,
    organizer: 'Aranmula Palliyodam Sangham',
    happeningNow: true,
    color: '#D97706',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Sing Vanchipattu to request special Ambazhanga Chutney',
        response: 'Maveli sings the rhythmic verse aloud. The cooks rush out with steaming bowls of fragrant chutney!',
      },
      {
        id: 'c2',
        text: 'Inspect the ancient Aranmula Kannadi (metal mirror crafting)',
        response: 'Master craftsman Krishnan demonstrates the secret copper-tin alloy technique used for centuries.',
      },
      {
        id: 'c3',
        text: 'Bless the oarsmen arriving in the sacred snake boat',
        response: 'Maveli sprinkles holy tulsi water as 100 oarsmen bow in reverence and joy.',
      }
    ],
    whatChanged: {
      then: 'Feasts were reserved for temple priests and local oarsmen.',
      today: 'Thousands of pilgrims from around the globe join the sacred 64-dish feast together.',
      maveliReaction: 'Food served with devotion and song satisfies the soul.'
    },
    memoryQuote: 'True abundance is when there is enough joy on every banana leaf.'
  },
  {
    id: 'exp-4',
    title: 'Nehru Trophy Snake Boat Race & Water Carnival',
    location: 'Punnamada Lake',
    district: 'Alappuzha',
    coordinates: { x: 43, y: 74, lat: 9.49, lng: 76.33 },
    duration: 80,
    distanceKm: 160.0,
    categories: ['People', 'Culture'],
    tagline: '100 oarsmen slicing through golden waters in high-octane racing.',
    description: 'The roaring water stadium of Punnamada Lake reverberates with synchronized oars, drums, and 200,000 cheering spectators.',
    verified: true,
    organizer: 'Alappuzha Boat Race Society',
    happeningNow: true,
    color: '#3B82F6',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Board the lead snake boat as honorary helm commander',
        response: 'Maveli stands at the stern, waving his royal umbrella as 100 oars slice the water synchronously!',
      },
      {
        id: 'c2',
        text: 'Cheer from a traditional wooden houseboat balcony',
        response: 'Maveli sips fresh tender coconut as snake boats flash past like golden arrows.',
      },
      {
        id: 'c3',
        text: 'Present the silver trophy to the winning boat club',
        response: 'Maveli lifts the shining trophy high as oarsmen splash water into the sunset sky.',
      }
    ],
    whatChanged: {
      then: 'Boat races were seasonal village rivalries.',
      today: 'International water sports spectacle with GPS tracking and high-speed live camera drones.',
      maveliReaction: '100 oars moving as one body—this is the strength of Kerala.'
    },
    memoryQuote: 'We move fastest when we paddle together toward the same horizon.'
  },
  {
    id: 'exp-5',
    title: 'Thripunithura Athachamayam Royal Procession',
    location: 'Thripunithura Hill Palace',
    district: 'Ernakulam',
    coordinates: { x: 42, y: 58, lat: 9.98, lng: 76.28 },
    duration: 90,
    distanceKm: 65.0,
    categories: ['Culture', 'People'],
    tagline: 'The official ceremonial kickoff of Onam celebrations across Kerala.',
    description: 'A spectacular carnival parade featuring caparisoned elephants, Theyyam, Kathakali, Theyyam folk dancers, and royal palanquins.',
    verified: true,
    organizer: 'Thripunithura Royal Heritage Society',
    happeningNow: true,
    color: '#10B981',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Lead the ceremonial procession alongside traditional Panchavadyam artists',
        response: 'Maveli walks in front of the royal palanquin as gold trumpets blow across the town.',
      },
      {
        id: 'c2',
        text: 'Ride the Kochi Water Metro electric ferry to the venue',
        response: 'Maveli admires the silent, zero-emission battery ferry gliding across Kochi backwaters.',
      },
      {
        id: 'c3',
        text: 'Distribute traditional Atham sweets to neighborhood children',
        response: 'Children cheer "Maveli Thamburan Ki Jai!" as fresh jaggery sharkara upperi is shared.',
      }
    ],
    whatChanged: {
      then: 'Athachamayam was an exclusive military march of the Maharaja of Cochin.',
      today: 'A public secular carnival celebrating every art form and community of Kerala.',
      maveliReaction: 'Royalty belongs to the people, and today the people are kings.'
    },
    memoryQuote: 'A procession that welcomes everyone is a true royal celebration.'
  },
  {
    id: 'exp-6',
    title: 'Mananchira Square Kozhikode Halwa & Culinary Fest',
    location: 'Mananchira Square & SM Street',
    district: 'Kozhikode',
    coordinates: { x: 35, y: 28, lat: 11.25, lng: 75.78 },
    duration: 60,
    distanceKm: 120.0,
    categories: ['Food', 'Culture'],
    tagline: 'Taste 50 varieties of world-famous Kozhikode Halwa and Malabar Onam delicacies.',
    description: 'Sweetmeat Street (SM Street) transforms into a fragrant paradise of coconut oil halwa, banana chips, and historic Malabar hospitality.',
    verified: true,
    organizer: 'Kozhikode Bakers Association',
    happeningNow: true,
    color: '#8B5CF6',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Stir a giant copper cauldron of black sesame Kozhikode Halwa',
        response: 'Master confectioner Basheer hands Maveli a long wooden paddle. The aroma of pure ghee fills the square!',
      },
      {
        id: 'c2',
        text: 'Sample tender coconut halwa and dates sadya payasam',
        response: 'Maveli smiles: "Kozhikode sweetens the tongue and warms the soul!"',
      },
      {
        id: 'c3',
        text: 'Listen to Mappila songs under the historic Mananchira trees',
        response: 'Musicians perform soulful melodies blending Malabar folk and harvest celebration tunes.',
      }
    ],
    whatChanged: {
      then: 'Halwa was crafted in small family wood-fired kitchens.',
      today: 'Global culinary heritage status attracting food lovers from across continents.',
      maveliReaction: 'Sweetness shared with love never grows old.'
    },
    memoryQuote: 'The taste of hospitality stays in the memory forever.'
  },
  {
    id: 'exp-7',
    title: 'Kumarakom Water Carnival & Lake Pookalam',
    location: 'Vembanad Lake Grounds',
    district: 'Kottayam',
    coordinates: { x: 48, y: 68, lat: 9.59, lng: 76.52 },
    duration: 50,
    distanceKm: 150.0,
    categories: ['Nature', 'Village'],
    tagline: 'Floating Pookalam floral carpets on country craft canoes.',
    description: 'Villagers compose intricate floral carpets floating on water mirrors along the serene lotus-filled canals of Kumarakom.',
    verified: true,
    organizer: 'Kumarakom Responsible Tourism Mission',
    happeningNow: true,
    color: '#06B6D4',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Row a traditional country canoe to place lotus petals on floating Pookalam',
        response: 'Maveli glides past water lilies, carefully placing pink lotus petals on the floating carpet.',
      },
      {
        id: 'c2',
        text: 'Enjoy fresh duck curry and kappa in a village homestay',
        response: 'Farmer Appachan serves rustic home-grown tapioca cooked with crushed red shallots.',
      },
      {
        id: 'c3',
        text: 'Join the evening village Vanchipattu choir along the bunds',
        response: 'Sunset paints the sky crimson as Maveli sings harvest folk songs with local fishermen.',
      }
    ],
    whatChanged: {
      then: 'Kumarakom was a quiet agrarian fishing hamlet.',
      today: 'Global pioneer in Responsible Community Tourism empowering local households.',
      maveliReaction: 'Nature and humans living in harmony—this is the real wealth of my kingdom.'
    },
    memoryQuote: 'When we respect the waters, the waters bless our harvest.'
  },
  {
    id: 'exp-8',
    title: 'Ashtamudi Craft Expo & Lake Boat Training',
    location: 'Ashtamudi Craft Village',
    district: 'Kollam',
    coordinates: { x: 48, y: 84, lat: 8.89, lng: 76.60 },
    duration: 55,
    distanceKm: 210.0,
    categories: ['Culture', 'People'],
    tagline: 'Coir handicrafts, cashew delights, and traditional boat racing drills.',
    description: 'Explore the historic port city’s vibrant coir weaving displays, cashew treats, and sunset boat practice on eight-loop Ashtamudi Lake.',
    verified: true,
    organizer: 'Kollam Heritage Trust',
    happeningNow: true,
    color: '#F43F5E',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Try spinning golden coir yarn on a traditional spinning wheel',
        response: 'Maveli spins natural coconut fiber into strong golden ropes used for ships and mats.',
      },
      {
        id: 'c2',
        text: 'Taste roasted Kollam cashews spiced with Onam pepper marinade',
        response: 'Crispy, buttery cashews delight Maveli’s palate!',
      },
      {
        id: 'c3',
        text: 'Watch sunset over the iconic Chinese Fishing Nets at Tangasseri',
        response: 'Golden sea waves glow as fishermen lower massive wooden net structures.',
      }
    ],
    whatChanged: {
      then: 'Kollam was an ancient spice trading port visited by Romans and Chinese merchants.',
      today: 'Modern eco-friendly coir processing and sustainable lake conservation initiatives.',
      maveliReaction: 'The sea has connected Kerala to the wide world for thousands of years.'
    },
    memoryQuote: 'Ropes made of coconut fiber hold ships, but love holds people together.'
  },
  {
    id: 'exp-9',
    title: 'Munnar High Range Tea & Flower Harvest Fest',
    location: 'Munnar Hills & Tea Estates',
    district: 'Idukki',
    coordinates: { x: 62, y: 64, lat: 9.85, lng: 76.96 },
    duration: 70,
    distanceKm: 180.0,
    categories: ['Nature', 'Village'],
    tagline: 'Mist-shrouded green hills, Neelakurinji blooms, and plantation Onasadya.',
    description: 'Cool mountain breeze, lush tea plantations, and colorful wild mountain blossoms gathered by estate workers for mountain-style Onam celebrations.',
    verified: true,
    organizer: 'Munnar Eco-Tourism Collective',
    happeningNow: true,
    color: '#10B981',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Pluck fresh tea leaves with estate plantation workers',
        response: 'Maveli straps on a woven bamboo basket, learning the "two leaves and a bud" harvesting art.',
      },
      {
        id: 'c2',
        text: 'Spot rare Nilgiri Tahr mountain goats at Eravikulam',
        response: 'The gentle mountain goats graze peacefully near high elevation mountain waterfalls.',
      },
      {
        id: 'c3',
        text: 'Share cardamom tea and jaggery payasam at a hilltop camp',
        response: 'Surrounded by swirling mist, Maveli warms his hands around a hot kulhad cup of spiced tea.',
      }
    ],
    whatChanged: {
      then: 'Densely forested inaccessible mountain peaks.',
      today: 'World-renowned eco-friendly hill destination preserving pristine wildlife sanctuaries.',
      maveliReaction: 'The air up here is as pure as a child’s laughter.'
    },
    memoryQuote: 'High up in the mountains, you realize how small our worries truly are.'
  },
  {
    id: 'exp-10',
    title: 'Valluvanad Folk Dances & Kalpathi Heritage Walk',
    location: 'Kalpathi Heritage Village',
    district: 'Palakkad',
    coordinates: { x: 55, y: 41, lat: 10.78, lng: 76.65 },
    duration: 60,
    distanceKm: 70.0,
    categories: ['Culture', 'Village'],
    tagline: 'Agraharam heritage streets, Kummattikali masks, and Palakkad Matta rice sadya.',
    description: 'Step into preserved heritage streets lined with traditional tiled houses, vibrant wooden mask dances, and rich agricultural harvest traditions.',
    verified: true,
    organizer: 'Kalpathi Heritage Preservation Forum',
    happeningNow: true,
    color: '#D97706',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Wear a wooden Kummattikali grass mask and dance through the street',
        response: 'Maveli dons the painted wooden mask, dancing with children adorned in braided grass costumes!',
      },
      {
        id: 'c2',
        text: 'Savor authentic Palakkad Sambar made with freshly harvested red Matta rice',
        response: 'The rich aroma of roasted coriander and coconut sambar fills the ancient agraharam courtyard.',
      },
      {
        id: 'c3',
        text: 'Visit Palakkad Fort built with massive granite blocks',
        response: 'Maveli explores the green moat and historic ramparts overlooking the Western Ghats pass.',
      }
    ],
    whatChanged: {
      then: 'Granary of Kerala with manual ox-drawn paddy plowing.',
      today: 'Sustainable organic rice farming models preserving indigenous seed varieties.',
      maveliReaction: 'The soil of Palakkad feeds the soul of Kerala.'
    },
    memoryQuote: 'Honor the land that feeds you, for it is the mother of all prosperity.'
  },
  {
    id: 'exp-11',
    title: 'Valluvanadan Harvest Songs & Teak Heritage Fest',
    location: 'Nilambur Teak Heritage Grounds',
    district: 'Malappuram',
    coordinates: { x: 44, y: 35, lat: 11.07, lng: 76.07 },
    duration: 50,
    distanceKm: 110.0,
    categories: ['Culture', 'Music'],
    tagline: 'Historic teak forests, Oppana folk songs, and Malabar harvest cheer.',
    description: 'Immerse in the rhythmic folk songs of Valluvanad, Oppana dance celebrations, and the majestic canopy of the world’s oldest teak plantations.',
    verified: true,
    organizer: 'Malappuram Cultural Forum',
    happeningNow: true,
    color: '#8B5CF6',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Clap along to Oppana harvest songs performed by young women',
        response: 'Rhythmic clapping and silver bangles chime as celebratory wedding-style harvest songs fill the air.',
      },
      {
        id: 'c2',
        text: 'Visit Kannimara Teak—the world’s largest living teak tree',
        response: 'Maveli marvels at the 400-year-old giant tree trunk spanning over 7 meters around.',
      },
      {
        id: 'c3',
        text: 'Taste Unnakkaya (sweet banana cashew rolls) served on banana leaf',
        response: 'Crispy fried mashed banana stuffed with coconut and nuts melts in Maveli’s mouth.',
      }
    ],
    whatChanged: {
      then: 'Timber extraction for colonial shipyards.',
      today: 'Eco-conservation parks and community forestry protecting bio-diversity.',
      maveliReaction: 'Trees that stand for centuries teach us patience and dignity.'
    },
    memoryQuote: 'Roots run deep when communities take care of their natural heritage.'
  },
  {
    id: 'exp-12',
    title: 'Tribal Heritage Onam & Chembra Peak Harvest',
    location: 'Vythiri & Chembra Estate',
    district: 'Wayanad',
    coordinates: { x: 42, y: 22, lat: 11.68, lng: 76.13 },
    duration: 65,
    distanceKm: 140.0,
    categories: ['Village', 'Nature'],
    tagline: 'Heart-shaped lake views, Kurumbar tribal drum circles, and wild honey sadya.',
    description: 'Celebrate harvest traditions with indigenous tribal communities in the mist-laden high ranges of Wayanad.',
    verified: true,
    organizer: 'Wayanad Indigenous Heritage Trust',
    happeningNow: true,
    color: '#059669',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Join the Tudi drum dance with Kurichiya tribal elders',
        response: 'Maveli plays the earthen Tudi drum under giant wild fern trees as villagers step in harmony.',
      },
      {
        id: 'c2',
        text: 'Taste wild forest honey harvested from high cliff honeycombs',
        response: 'Pure, amber forest honey combined with steamed wild yams delights Maveli.',
      },
      {
        id: 'c3',
        text: 'Hike to the natural heart-shaped lake on Chembra Peak',
        response: 'Maveli gazes down at the heart-shaped crystal lake reflecting misty green hills.',
      }
    ],
    whatChanged: {
      then: 'Isolated mountain settlements cut off during monsoon rains.',
      today: 'Eco-friendly sustainable agro-tourism supporting tribal livelihoods directly.',
      maveliReaction: 'The ancient wisdom of the forest is Kerala’s greatest treasure.'
    },
    memoryQuote: 'Listen to the forest—it has been whispering truth for thousands of years.'
  },
  {
    id: 'exp-13',
    title: 'Theyyam Sacred Performances & Handloom Fair',
    location: 'Parassinikadavu Heritage Temple',
    district: 'Kannur',
    coordinates: { x: 28, y: 16, lat: 11.87, lng: 75.37 },
    duration: 75,
    distanceKm: 210.0,
    categories: ['Culture', 'People'],
    tagline: 'Gods come alive in fiery Theyyam rituals and handloom Kasavu weaving.',
    description: 'Witness the intense spiritual art of Theyyam where performers transform into divine avatars amidst red silk crowns, fire torches, and sacred drums.',
    verified: true,
    organizer: 'North Malabar Theyyam Council',
    happeningNow: true,
    color: '#EF4444',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Receive blessing and rice grains from Muchilot Bhagavathi Theyyam',
        response: 'The towering red-crowned Theyyam deity hands Maveli sacred yellow rice grains with divine words.',
      },
      {
        id: 'c2',
        text: 'Try handloom shuttle weaving at the Cannanore Weavers Co-op',
        response: 'Maveli throws the wooden shuttle, weaving golden zari threads into pure white Kasavu cotton.',
      },
      {
        id: 'c3',
        text: 'Watch Kalari combat duels on Payyambalam beach at sunset',
        response: 'Warriors leap across golden beach sands as ocean waves crash against the shore.',
      }
    ],
    whatChanged: {
      then: 'Theyyam was performed exclusively in village shrines (Kavu).',
      today: 'Global cultural recognition while preserving intense sacred rituals untouched.',
      maveliReaction: 'When human beings channel the divine, miracles happen before our eyes.'
    },
    memoryQuote: 'Faith is not seen in stone, but felt in the living spirit of art.'
  },
  {
    id: 'exp-14',
    title: 'Bekal Fort Sunset Fest & North Malabar Festivities',
    location: 'Bekal Fort & Beach Park',
    district: 'Kasaragod',
    coordinates: { x: 22, y: 8, lat: 12.50, lng: 74.99 },
    duration: 70,
    distanceKm: 260.0,
    categories: ['Culture', 'Nature'],
    tagline: 'Keyhole fort overlooking Arabian Sea, Yakshagana theater, and beach sadya.',
    description: 'Explore Kerala’s northernmost coastal fortress where ancient stone bastions meet rolling Arabian sea waves and colorful Yakshagana harvest theater.',
    verified: true,
    organizer: 'Kasaragod Tourism Development Council',
    happeningNow: true,
    color: '#F59E0B',
    interactiveChoices: [
      {
        id: 'c1',
        text: 'Stand at the observation tower of Bekal Fort overlooking the ocean',
        response: 'Maveli gazes across 360-degree views of golden coastline, palm groves, and crashing waves.',
      },
      {
        id: 'c2',
        text: 'Watch Yakshagana dance theater combining Kannada and Malayalam lore',
        response: 'Performers in elaborate crowns act out epic harmony tales where two linguistic cultures meet.',
      },
      {
        id: 'c3',
        text: 'Participate in the beachside sunset Pookalam ceremony',
        response: 'Locals and travelers create a giant sea-shell and flower carpet on the golden sands.',
      }
    ],
    whatChanged: {
      then: 'Strategic coastal defense fort built by Shivappa Nayaka.',
      today: 'Vibrant cultural heritage park symbolising peace and cross-border harmony.',
      maveliReaction: 'Forts that once guarded against enemies now open their gates to welcome friends.'
    },
    memoryQuote: 'The ocean connects all shores, just as love connects all hearts.'
  }
];
