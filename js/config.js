/**
 * PRINCESS DAY SURPRISE - CONFIGURATION
 * All texts, URLs, and customization settings are neatly organized here.
 */
const PRINCESS_CONFIG = {
  // Princess & Prince Information
  princessName: "Dhanshree",
  princeName: "Your Prince",
  occasion: "Princess Day",
  date: "November 18",

  // Audio Configuration
  audio: {
    songName: "Dil Kaa Jo Haal Hai",
    movie: "Besharam (2013)",
    singer: "Abhijeet Bhattacharya & Shreya Ghoshal",
    audioSrc: "assets/music/dil-kaa-jo-haal-hai.mp3",
    audioFallbackSrc: "assets/music/dil-kaa-jo-haal-hai.m4a",
    youtubeId: "udgrClXV26Y",
    defaultVolume: 0.85,
    loop: true
  },

  // QR Code Configuration
  qrCode: {
    // When published, the QR code automatically adapts to the live website URL.
    // If running on localhost or file://, this fallback published URL is encoded.
    fallbackPublishedUrl: "https://7c665ced0311f6.app.lhr.life",
    label: "Scan for Princess Day Surprise ✨",
    colorDark: "#3b1238",
    colorLight: "#ffffff"
  },

  // Page 1: It's Princess Day (Opening Night Garden)
  page1: {
    title: "IT'S PRINCESS DAY",
    subtitle: "A Magical Celebration for a True Princess",
    enterButtonText: "ENTER THE ROYAL GARDEN 👑",
    qrTitle: "Official Royal Pass",
    qrSubtitle: "Scan with any phone camera to open on mobile"
  },

  // Page 2: Happy Princess Day
  page2: {
    heading: "HAPPY PRINCESS DAY",
    toText: "To My Sweetheart 💕",
    message: "To the most graceful, kind, and wonderful girl who brings endless light, comfort, and pure joy into my life. Today and every day, you deserve to be treated like the absolute royalty you are.",
    badge: "Royal Princess Edition • Hello Kitty Approved 🌸"
  },

  // Page 3: Gifts For My Princess
  page3: {
    heading: "GIFTS FOR MY PRINCESS 🎁",
    subtitle: "A treasure chest of heartfelt promises crafted just for you...",
    gifts: [
      {
        icon: "🍫",
        title: "Sweet Delights & Treats",
        description: "A lifetime supply of your favorite chocolates, warm comforting cuddles, and sweet surprises."
      },
      {
        icon: "🌸",
        title: "Infinite Pampering & Care",
        description: "Always listening to your thoughts, standing by you, and making sure your smile never fades."
      },
      {
        icon: "🌟",
        title: "The Warmest Safe Haven",
        description: "A gentle hand to hold whenever you feel tired, and a shoulder always ready to rest upon."
      },
      {
        icon: "💖",
        title: "Pure, Undivided Devotion",
        description: "My whole heart, completely loyal, patient, and dedicated to you through every chapter of life."
      }
    ]
  },

  // Page 4: The Missing Crown
  page4: {
    heading: "THE MISSING CROWN 👑",
    subtitle: "A royal mystery that only one person can solve...",
    initialPrompt: "The royal treasury reported a crown missing from its pedestal... Tap below to place it where it truly belongs!",
    actionButton: "Place The Crown Where It Belongs ✨",
    revealedMessage: "They searched high in the skies and across every kingdom for the missing crown, not realizing you were wearing it all along. You never needed gold or diamonds to be royalty — your kindness, gentle soul, and radiant smile are your eternal crown."
  },

  // Page 5: Just For You (Royal Note)
  page5: {
    heading: "JUST FOR YOU 💌",
    royalNoteHeader: "FROM THE ROYAL DESK OF PRINCE DEVANSHU",
    sealText: "ROYAL SEAL OF LOVE",
    salutation: "Dearest Dhanshree,",
    letterBody: [
      "If I had a single wish for every time you brought a genuine smile to my face, I would be holding the entire cosmos in my hands tonight.",
      "In a world that can often be loud and rushed, your presence brings peace, warmth, and steady joy. You have this rare, magical way of making ordinary moments feel like beautiful pages from a fairy tale.",
      "Thank you for being so thoughtful, so sweet, and so wonderfully you. Celebrating you today is my greatest delight.",
      "Always your safe haven, your prince, and your biggest supporter."
    ],
    closing: "Forever & Always With All My Heart,",
    signature: "Devanshu ❤️"
  },

  // Page 6: Royal Surprises
  page6: {
    heading: "ROYAL SURPRISES 🎀",
    metaFrom: "From Your Prince 🤴",
    metaTo: "To Sweetheart Dhanshree 👸",
    coupons: [
      {
        code: "HUG-100",
        title: "100 Warmest Tight Hugs",
        desc: "Redeemable anytime you need warmth, reassurance, or a cozy moment. Never expires.",
        icon: "🤗"
      },
      {
        code: "DATE-VIP",
        title: "Dream Dinner & Long Drive",
        desc: "A romantic evening at any place of your choice, with your favorite music and treats.",
        icon: "🌹"
      },
      {
        code: "SWEET-CR",
        title: "Midnight Sweet Treats Delivery",
        desc: "Instant ice cream, dessert, or snacks delivered to brighten any day or mood.",
        icon: "🍨"
      },
      {
        code: "QUEEN-DAY",
        title: "Princess Rules For The Day",
        desc: "You make 100% of the choices, decisions, and plans. Your word is royal law!",
        icon: "👑"
      }
    ]
  },

  // Page 7: My Princess Forever & Always
  page7: {
    heading: "MY PRINCESS FOREVER & ALWAYS 💍",
    subtitle: "A vow carried through every tomorrow",
    quote: "“Every love story is beautiful, but ours is my favorite fairy tale.”",
    closingText: "No matter where the journey of life leads us, through every high, every low, and every season under the sun, you will always remain my cherished princess. Today and forever, you are deeply treasured.",
    ctaButton: "A Final Special Message For You... 💌"
  },

  // Page 8: Special Extra Surprise Page
  page8: {
    mainHeading: "I LOVE YOU DHANSHREE ❤️",
    message: "You are my favourite person, today, tomorrow and forever. You make my world more beautiful. ❤️",
    subBadge: "Happy Princess Day 2026, My Dhanshree 🌸",
    replayButtonText: "REPLAY SURPRISE ↺"
  }
};
