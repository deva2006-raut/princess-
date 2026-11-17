/**
 * PRINCESS DAY - PERSISTENT AUDIO ENGINE
 * Seamless background music playing "Dil Kaa Jo Haal Hai" (Besharam 2013)
 * Sung by Abhijeet Bhattacharya & Shreya Ghoshal.
 * Supports:
 * 1. Local High-Quality Audio: assets/music/dil-kaa-jo-haal-hai.mp3 (.m4a fallback)
 * 2. Official YouTube Stream API (Video ID: udgrClXV26Y)
 * Features:
 * - Autoplay on tap of ENTER on Page 1 or user gesture
 * - Continuous uninterrupted playback across all 8 pages
 * - Play/Pause, Mute/Unmute, and Looping
 * - Synchronized visualizer animations
 */

class PrincessAudioPlayer {
  constructor(config) {
    this.config = config || (typeof PRINCESS_CONFIG !== 'undefined' ? PRINCESS_CONFIG.audio : {});
    
    // Primary HTML5 Audio element from DOM or memory
    this.audioElement = document.getElementById('princessNativeAudio');
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.src = this.config.audioSrc || 'assets/music/dil-kaa-jo-haal-hai.mp3';
    }
    
    this.audioElement.loop = this.config.loop !== false;
    this.audioElement.volume = typeof this.config.defaultVolume === 'number' ? this.config.defaultVolume : 0.85;

    this.isPlaying = false;
    this.isMuted = false;
    this.activeSource = null; // 'html5' | 'youtube'
    this.isYtReady = false;
    this.pendingPlay = false;

    this.setupUI();
    this.setupHTML5Audio();
    this.setupYouTubeAPI();
    this.setupGlobalGestureUnlock();
  }

  setupUI() {
    this.playBtn = document.getElementById('audioPlayToggle');
    this.muteBtn = document.getElementById('audioMuteToggle');
    this.visualizerBars = document.querySelectorAll('.eq-bar');
    this.trackTitleEl = document.getElementById('audioTrackTitle');
    this.singerTitleEl = document.getElementById('audioSingerTitle');

    if (this.trackTitleEl && this.config.songName) {
      this.trackTitleEl.textContent = this.config.songName;
    }
    if (this.singerTitleEl && this.config.singer) {
      this.singerTitleEl.textContent = `${this.config.singer} (${this.config.movie || 'Besharam'})`;
    }

    if (this.playBtn) {
      this.playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePlay();
      });
    }

    if (this.muteBtn) {
      this.muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMute();
      });
    }
  }

  setupHTML5Audio() {
    this.audioElement.addEventListener('playing', () => {
      this.isPlaying = true;
      this.activeSource = 'html5';
      this.updateUI();
    });

    this.audioElement.addEventListener('pause', () => {
      if (this.activeSource === 'html5') {
        this.isPlaying = false;
        this.updateUI();
      }
    });

    this.audioElement.addEventListener('ended', () => {
      if (this.config.loop !== false) {
        this.audioElement.currentTime = 0;
        this.audioElement.play().catch(() => {});
      }
    });

    this.audioElement.addEventListener('error', (e) => {
      console.warn("HTML5 audio error, falling back to YouTube:", e);
      if (this.isPlaying || this.pendingPlay) {
        this.playYouTubeTrack();
      }
    });
  }

  setupYouTubeAPI() {
    window.princessAudioInstance = this;

    const initYT = () => {
      if (this.ytPlayer || !window.YT || !window.YT.Player) return;
      try {
        const container = document.getElementById('ytAudioContainer');
        if (!container) return;

        this.ytPlayer = new YT.Player('ytAudioContainer', {
          height: '200',
          width: '200',
          videoId: this.config.youtubeId || 'udgrClXV26Y',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: this.config.youtubeId || 'udgrClXV26Y',
            playsinline: 1,
            rel: 0,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (e) => {
              this.isYtReady = true;
              if (this.pendingPlay) {
                this.pendingPlay = false;
                this.playYouTubeTrack();
              }
            },
            onStateChange: (e) => {
              if (e.data === YT.PlayerState.PLAYING) {
                this.isPlaying = true;
                this.activeSource = 'youtube';
                this.updateUI();
              } else if (e.data === YT.PlayerState.PAUSED) {
                if (this.activeSource === 'youtube') {
                  this.isPlaying = false;
                  this.updateUI();
                }
              } else if (e.data === YT.PlayerState.ENDED) {
                if (this.config.loop !== false) {
                  e.target.playVideo();
                }
              }
            },
            onError: (err) => {
              console.warn("YouTube player warning/error:", err);
            }
          }
        });
      } catch (err) {
        console.warn("Error initializing YT.Player:", err);
      }
    };

    if (window.YT && window.YT.Player) {
      initYT();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') prevCallback();
        initYT();
      };

      // Ensure API script is added if missing
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }
  }

  // Safety net: ensure first user click anywhere unlocks browser audio context
  setupGlobalGestureUnlock() {
    const unlockHandler = () => {
      if (!this.isPlaying) {
        // Start playback if not already started
        this.startPlayback();
      }
      document.removeEventListener('click', unlockHandler);
      document.removeEventListener('touchstart', unlockHandler);
    };
    document.addEventListener('click', unlockHandler, { once: true, passive: true });
    document.addEventListener('touchstart', unlockHandler, { once: true, passive: true });
  }

  // Called when user taps ENTER on Page 1 or uses global play
  startPlayback() {
    if (this.isPlaying) return;

    this.audioElement.volume = typeof this.config.defaultVolume === 'number' ? this.config.defaultVolume : 0.85;
    this.audioElement.muted = this.isMuted;

    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        this.activeSource = 'html5';
        this.updateUI();
      }).catch(err => {
        console.warn("HTML5 audio play blocked or failed, attempting YouTube fallback:", err);
        this.playYouTubeTrack();
      });
    } else {
      this.playYouTubeTrack();
    }
  }

  playYouTubeTrack() {
    if (this.ytPlayer && typeof this.ytPlayer.playVideo === 'function') {
      try {
        if (this.isMuted) {
          this.ytPlayer.mute();
        } else {
          this.ytPlayer.unMute();
          this.ytPlayer.setVolume(Math.round((this.config.defaultVolume || 0.85) * 100));
        }
        this.ytPlayer.playVideo();
        this.isPlaying = true;
        this.activeSource = 'youtube';
        this.updateUI();
      } catch (err) {
        console.warn("YouTube playVideo call error:", err);
      }
    } else {
      this.pendingPlay = true;
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (this.activeSource === 'html5') {
      this.audioElement.play().catch(() => this.playYouTubeTrack());
    } else if (this.activeSource === 'youtube') {
      this.playYouTubeTrack();
    } else {
      this.startPlayback();
    }
  }

  pause() {
    if (this.activeSource === 'html5') {
      this.audioElement.pause();
    } else if (this.activeSource === 'youtube' && this.ytPlayer) {
      try { this.ytPlayer.pauseVideo(); } catch (e) {}
    }
    this.isPlaying = false;
    this.updateUI();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioElement.muted = this.isMuted;

    if (this.ytPlayer && typeof this.ytPlayer.mute === 'function') {
      if (this.isMuted) {
        this.ytPlayer.mute();
      } else {
        this.ytPlayer.unMute();
      }
    }

    this.updateUI();
  }

  updateUI() {
    const playIcon = document.getElementById('playIconSvg');
    const pauseIcon = document.getElementById('pauseIconSvg');
    const muteIcon = document.getElementById('muteIconSvg');
    const volumeIcon = document.getElementById('volumeIconSvg');

    if (playIcon && pauseIcon) {
      playIcon.style.display = this.isPlaying ? 'none' : 'block';
      pauseIcon.style.display = this.isPlaying ? 'block' : 'none';
    }

    if (muteIcon && volumeIcon) {
      muteIcon.style.display = this.isMuted ? 'block' : 'none';
      volumeIcon.style.display = this.isMuted ? 'none' : 'block';
    }

    // Toggle visualizer equalizer bar animation
    if (this.visualizerBars) {
      this.visualizerBars.forEach(bar => {
        if (this.isPlaying && !this.isMuted) {
          bar.classList.add('animating');
        } else {
          bar.classList.remove('animating');
        }
      });
    }
  }
}
