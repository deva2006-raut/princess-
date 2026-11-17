/**
 * PRINCESS DAY SURPRISE - MAIN APPLICATION ENGINE
 * Orchestrates page routing, smooth transitions, interactive components,
 * real QR code generation, and mobile touch gestures.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Ambient Particle and Effects Canvas
  const effects = new PrincessEffects('ambientCanvas');

  // 2. Initialize Audio Engine
  const audioPlayer = new PrincessAudioPlayer(PRINCESS_CONFIG.audio);

  // 3. Application State
  const state = {
    currentPage: 1,
    totalPages: 8,
    isTransitioning: false,
    crownPlaced: false,
    sealBroken: false,
    loveCount: 0
  };

  // Cache Page Elements
  const pages = document.querySelectorAll('.princess-page');
  const pageIndicator = document.getElementById('pageIndicator');
  const currentIndicator = document.getElementById('currentIndicator');

  // Initial button visibility
  const initialPrevBtn = document.getElementById('globalPrevBtn');
  if (initialPrevBtn) {
    initialPrevBtn.style.display = 'none';
  }

  // 4. Page Navigation Engine - Direct Instant Page Switching
  function goToPage(targetPage, direction = 'next') {
    if (targetPage < 1 || targetPage > state.totalPages) return;
    if (targetPage === state.currentPage) return;

    const prevPageNum = state.currentPage;
    const prevPageEl = document.getElementById(`page-${prevPageNum}`);
    const nextPageEl = document.getElementById(`page-${targetPage}`);

    // Update State & Indicator
    state.currentPage = targetPage;
    if (currentIndicator) {
      currentIndicator.textContent = state.currentPage;
    }

    // Update Global Nav Buttons Visibility
    const prevBtn = document.getElementById('globalPrevBtn');
    const nextBtn = document.getElementById('globalNextBtn');
    if (prevBtn) {
      prevBtn.style.display = targetPage === 1 ? 'none' : 'inline-flex';
    }
    if (nextBtn) {
      nextBtn.style.display = targetPage === 8 ? 'none' : 'inline-flex';
    }

    // Immediately remove active from ALL pages so none occupy vertical space
    pages.forEach(p => p.classList.remove('active'));

    // Open target page directly in full view!
    if (nextPageEl) {
      nextPageEl.classList.add('active');
      nextPageEl.scrollTop = 0;
    }

    // Scroll browser window to the exact top instantly
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // Trigger page-specific celebratory effects
    onPageEnter(targetPage);
  }

  // Triggers when landing on a page
  function onPageEnter(pageNum) {
    if (pageNum === 4) {
      // Crown sparkle trigger
      effects.burstHearts(window.innerWidth / 2, 220, 15);
    } else if (pageNum === 8) {
      // Grand Page 8 celebration explosion!
      setTimeout(() => {
        effects.burstConfetti(window.innerWidth / 2, window.innerHeight * 0.35, 70);
        effects.burstHearts(window.innerWidth / 2, window.innerHeight * 0.45, 35);
      }, 350);
    }
  }

  // 6. Navigation Button Bindings
  // Enter Button on Page 1
  const enterBtn = document.getElementById('enterGardenBtn');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      // Start background music immediately upon user interaction
      audioPlayer.startPlayback();
      // Burst celebratory hearts and transition to Page 2
      effects.burstHearts(window.innerWidth / 2, window.innerHeight / 2, 30);
      goToPage(2, 'next');
    });
  }

  // Standard Next & Back Buttons across pages
  document.querySelectorAll('[data-action="next"]').forEach(btn => {
    btn.addEventListener('click', () => {
      audioPlayer.startPlayback();
      goToPage(state.currentPage + 1, 'next');
    });
  });

  document.querySelectorAll('[data-action="prev"]').forEach(btn => {
    btn.addEventListener('click', () => {
      goToPage(state.currentPage - 1, 'prev');
    });
  });

  // Replay Button on Page 8
  const replayBtn = document.getElementById('replayBtn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      effects.burstHearts(window.innerWidth / 2, window.innerHeight / 2, 35);
      // Smoothly navigate back to Page 1 without stopping background audio
      goToPage(1, 'prev');
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      if (state.currentPage < state.totalPages) {
        goToPage(state.currentPage + 1, 'next');
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      if (state.currentPage > 1) {
        goToPage(state.currentPage - 1, 'prev');
      }
    }
  });

  // 6. PAGE 3: Interactive Gift Boxes
  const giftBoxes = document.querySelectorAll('.gift-interactive-card');
  giftBoxes.forEach(card => {
    card.addEventListener('click', function () {
      this.classList.toggle('unwrapped');
      const rect = this.getBoundingClientRect();
      effects.burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
    });
  });


  // 8. PAGE 4: "Place The Crown Where It Belongs"
  const placeCrownBtn = document.getElementById('placeCrownBtn');
  const crownWrapper = document.getElementById('crownStageWrapper');
  const crownMessage = document.getElementById('crownRevealedMessage');
  const crownGraphic = document.getElementById('movableCrown');

  if (placeCrownBtn && crownWrapper) {
    placeCrownBtn.addEventListener('click', () => {
      state.crownPlaced = !state.crownPlaced;
      if (state.crownPlaced) {
        crownWrapper.classList.add('crowned');
        crownMessage.classList.add('revealed');
        placeCrownBtn.innerHTML = `<span>Crown Lovingly Placed 👑✨</span>`;
        effects.burstHearts(window.innerWidth / 2, 180, 40);
        effects.burstConfetti(window.innerWidth / 2, 220, 50);
      } else {
        crownWrapper.classList.remove('crowned');
        crownMessage.classList.remove('revealed');
        placeCrownBtn.innerHTML = `<span>Place The Crown Where It Belongs ✨</span>`;
      }
    });
  }


  // 9. PAGE 5: Royal Note Wax Seal Unfolding
  const waxSealBtn = document.getElementById('waxSealStamp');
  const royalScrollCard = document.getElementById('royalScrollCard');
  if (waxSealBtn && royalScrollCard) {
    waxSealBtn.addEventListener('click', () => {
      state.sealBroken = !state.sealBroken;
      royalScrollCard.classList.toggle('unsealed');
      const rect = waxSealBtn.getBoundingClientRect();
      effects.burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
    });
  }


  // 10. PAGE 6: Royal Coupons Claiming
  document.querySelectorAll('.coupon-claim-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const parentCard = this.closest('.royal-coupon-card');
      if (parentCard) {
        parentCard.classList.add('claimed');
        this.textContent = 'Claimed with Love! ❤️';
        this.disabled = true;

        const rect = parentCard.getBoundingClientRect();
        effects.burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
        effects.burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
      }
    });
  });


  // 11. PAGE 8: Interactive Heart Tap & Reactions
  const giantHeart = document.getElementById('giantAnimatedHeart');
  const loveTapCounter = document.getElementById('loveTapCount');
  const loveTapBtn = document.getElementById('loveTapBtn');

  function sendLoveReaction(x, y) {
    state.loveCount++;
    if (loveTapCounter) {
      loveTapCounter.textContent = state.loveCount;
    }
    effects.burstHearts(x || window.innerWidth / 2, y || window.innerHeight * 0.45, 20);

    if (giantHeart) {
      giantHeart.classList.remove('pump');
      void giantHeart.offsetWidth; // Force reflow
      giantHeart.classList.add('pump');
    }
  }

  if (giantHeart) {
    giantHeart.addEventListener('click', (e) => {
      sendLoveReaction(e.clientX, e.clientY);
    });
  }

  if (loveTapBtn) {
    loveTapBtn.addEventListener('click', (e) => {
      sendLoveReaction(e.clientX, e.clientY);
    });
  }

  // Clicking on background anywhere spawns a gentle heart
  document.addEventListener('click', (e) => {
    // Only if not clicking buttons or interactive elements
    if (e.target.closest('button, a, input, .gift-interactive-card, .royal-coupon-card')) return;
    effects.burstHearts(e.clientX, e.clientY, 5);
  });
});
