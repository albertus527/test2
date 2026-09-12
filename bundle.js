/**
 * Combined standalone bundle for "Untuk Biu"
 * Runs seamlessly on both file:/// (direct double click) and http:// (Vite / local servers)
 * without CORS or ES Module restrictions.
 */

(function() {
  'use strict';

  // 1. Audio controller
  let bgmAudio = null;
  let musicToggleBtn = null;
  let isMusicPlaying = false;
  let pausedByVideo = false;

  function initAudio() {
    bgmAudio = document.getElementById('bgmAudio');
    musicToggleBtn = document.getElementById('musicToggleBtn');

    if (!bgmAudio || !musicToggleBtn) {
      return { pauseForVideo: function() {}, resumeAfterVideo: function() {} };
    }
    bgmAudio.volume = 0.25;
    musicToggleBtn.addEventListener('click', function() {
      if (isMusicPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }
    });

    bgmAudio.addEventListener('ended', function() {
      bgmAudio.currentTime = 0;
      bgmAudio.play().catch(function() {});
    });

    bgmAudio.addEventListener('error', function() {
      console.log('Background music not found or audio format unsupported. Place bgm.mp3 in public/audio/');
      musicToggleBtn.classList.remove('is-playing');
      musicToggleBtn.setAttribute('title', 'Lagu belum tersedia (public/audio/bgm.mp3)');
      isMusicPlaying = false;
    });

    return {
      pauseForVideo: pauseForVideo,
      resumeAfterVideo: resumeAfterVideo
    };
  }

  function playMusic() {
    if (!bgmAudio) return;
    var playPromise = bgmAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(function() {
        isMusicPlaying = true;
        if (musicToggleBtn) {
          musicToggleBtn.classList.add('is-playing');
          musicToggleBtn.setAttribute('aria-label', 'Jeda musik latar');
        }
      }).catch(function(err) {
        console.log('Audio playback prevented or missing audio file:', err);
        isMusicPlaying = false;
        if (musicToggleBtn) {
          musicToggleBtn.classList.remove('is-playing');
          musicToggleBtn.setAttribute('title', 'Silakan masukkan file public/audio/bgm.mp3');
        }
      });
    }
  }

  function pauseMusic() {
    if (!bgmAudio) return;
    bgmAudio.pause();
    isMusicPlaying = false;
    if (musicToggleBtn) {
      musicToggleBtn.classList.remove('is-playing');
      musicToggleBtn.setAttribute('aria-label', 'Putar musik latar');
    }
  }

  function pauseForVideo() {
    if (isMusicPlaying) {
      pausedByVideo = true;
      if (bgmAudio) bgmAudio.pause();
      if (musicToggleBtn) musicToggleBtn.classList.remove('is-playing');
    }
  }

  function resumeAfterVideo() {
    if (pausedByVideo) {
      pausedByVideo = false;
      playMusic();
    }
  }

  // 2. Media handling (images, fallbacks, inline videos)
  function initMediaHandling(onVideoPlay, onVideoPause) {
    var images = document.querySelectorAll('.photo-frame img.memory-media, .ending-photo img.memory-media, .contact-thumb img');

    images.forEach(function(img) {
      if (img.complete) {
        if (img.naturalWidth > 0) {
          img.classList.add('is-loaded');
        } else {
          tryAlternativePath(img);
        }
      }

      img.addEventListener('load', function() {
        img.classList.add('is-loaded');
        img.classList.remove('media-failed');
      });

      img.addEventListener('error', function() {
        tryAlternativePath(img);
      });
    });

    function tryAlternativePath(img) {
      var currentSrc = img.getAttribute('src');
      if (!img.dataset.triedFallback && currentSrc) {
        img.dataset.triedFallback = 'true';
        if (currentSrc.startsWith('public/')) {
          img.src = './' + currentSrc;
          return;
        } else if (currentSrc.startsWith('./public/')) {
          img.src = currentSrc.replace(/^\.\/public\//, './memories/');
          return;
        } else if (currentSrc.startsWith('/memories/')) {
          img.src = './public' + currentSrc;
          return;
        }
      }
      img.classList.add('media-failed');
      img.classList.remove('is-loaded');
    }

    var videoFrames = document.querySelectorAll('.video-frame');
    var allVideos = document.querySelectorAll('.video-frame video');

    allVideos.forEach(function(video) {
      function markVideoFailed() {
        video.classList.add('media-failed');
        var frame = video.closest('.video-frame');
        if (frame) frame.classList.add('video-failed');
      }

      video.addEventListener('error', markVideoFailed);
      var sources = video.querySelectorAll('source');
      sources.forEach(function(source) {
        source.addEventListener('error', markVideoFailed);
      });

      video.addEventListener('play', function() {
        var frame = video.closest('.video-frame');
        if (frame) frame.classList.add('is-playing');

        allVideos.forEach(function(otherVideo) {
          if (otherVideo !== video && !otherVideo.paused) {
            otherVideo.pause();
          }
        });

        if (typeof onVideoPlay === 'function') {
          onVideoPlay(video);
        }
      });

      video.addEventListener('pause', function() {
        var frame = video.closest('.video-frame');
        if (frame) frame.classList.remove('is-playing');
        if (typeof onVideoPause === 'function') {
          onVideoPause(video);
        }
      });

      video.addEventListener('ended', function() {
        var frame = video.closest('.video-frame');
        if (frame) frame.classList.remove('is-playing');
        if (typeof onVideoPause === 'function') {
          onVideoPause(video);
        }
      });
    });

    videoFrames.forEach(function(frame) {
      var video = frame.querySelector('video');
      if (!video) return;

      frame.addEventListener('click', function(e) {
        if (e.target === video && video.hasAttribute('controls') && e.offsetY > video.clientHeight - 40) {
          return;
        }
        if (video.paused) {
          var playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(function(err) {
              console.log('Video playback interrupted or missing file:', err);
            });
          }
        } else {
          video.pause();
        }
      });
    });
  }

  // 3. Scroll reveals
  function initScrollReveals() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.12
    };

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    var revealElements = document.querySelectorAll(
      '.opening-content, .photo-wrapper, .scroll-fade, .memory-item, .frame-group, .wish-block p, .editorial-block, .career-step, .filmstrip-item, .contact-sheet, .photo-duo, .photo-grid-2'
    );

    revealElements.forEach(function(el) {
      if (!el.classList.contains('fade-in-up') && !el.classList.contains('photo-wrapper') && !el.classList.contains('scroll-fade')) {
        el.classList.add('fade-in-up');
      }

      if (prefersReducedMotion) {
        el.style.transitionDuration = '0.05s';
      }

      observer.observe(el);
    });
  }

  // 4. Interactive photo stack
  function initInteractiveStack() {
    var stackCards = document.querySelectorAll('.stack-card');
    if (stackCards.length === 0) return;

    var currentCardIndex = stackCards.length - 1;

    function updateCardTransforms() {
      stackCards.forEach(function(card, index) {
        if (index <= currentCardIndex) {
          var reverseIndex = currentCardIndex - index;
          var rotateDeg = reverseIndex === 0 ? 0 : (reverseIndex % 2 === 0 ? reverseIndex * 1.5 : -reverseIndex * 1.5);
          var yOffset = reverseIndex * 6;
          var scaleVal = 1 - reverseIndex * 0.035;
          card.style.transform = 'translateY(' + yOffset + 'px) scale(' + scaleVal + ') rotate(' + rotateDeg + 'deg)';
          card.style.zIndex = index + 1;
          card.style.opacity = '1';
          card.style.pointerEvents = index === currentCardIndex ? 'auto' : 'none';
        } else {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
        }
      });
    }

    stackCards.forEach(function(card, index) {
      card.addEventListener('click', function() {
        if (index === currentCardIndex) {
          swipeCard(card);
        }
      });
    });

    updateCardTransforms();

    function swipeCard(card) {
      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var duration = prefersReducedMotion ? '0.1s' : '0.45s';

      card.style.transition = 'transform ' + duration + ' cubic-bezier(0.2, 0.8, 0.2, 1), opacity ' + duration;
      card.style.transform = 'translateY(-70px) translateX(80px) rotate(14deg)';
      card.style.opacity = '0';
      card.style.pointerEvents = 'none';

      currentCardIndex--;

      if (currentCardIndex < 0) {
        setTimeout(function() {
          currentCardIndex = stackCards.length - 1;
          stackCards.forEach(function(c) {
            c.style.transition = 'none';
          });
          updateCardTransforms();
          void card.offsetWidth;
          stackCards.forEach(function(c) {
            c.style.transition = 'transform ' + duration + ' cubic-bezier(0.2, 0.8, 0.2, 1), opacity ' + duration;
          });
        }, prefersReducedMotion ? 100 : 500);
      } else {
        updateCardTransforms();
      }
    }
  }

  // 5. Letter reveal overlay
  function initLetterReveal() {
    var openBtn = document.getElementById('openLetterBtn');
    var closeBtn = document.getElementById('closeLetterBtn');
    var overlay = document.getElementById('letterOverlay');

    if (openBtn && closeBtn && overlay) {
      openBtn.addEventListener('click', function() {
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
      });

      closeBtn.addEventListener('click', function() {
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
      });

      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          overlay.classList.remove('visible');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // 6. Subtle Parallax
  function initParallax() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    var parallaxElements = document.querySelectorAll('.parallax, .parallax-slow');

    window.addEventListener('scroll', function() {
      parallaxElements.forEach(function(el) {
        var speed = el.classList.contains('parallax-slow') ? 0.05 : 0.1;
        var rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          var yPos = -(rect.top * speed);
          el.style.transform = 'translateY(' + yPos + 'px)';
        }
      });
    }, { passive: true });
  }

  // Initialize all on DOM ready
  function initAll() {
    var audioController = initAudio();
    initMediaHandling(
      function() { audioController.pauseForVideo(); },
      function() { audioController.resumeAfterVideo(); }
    );
    initScrollReveals();
    initInteractiveStack();
    initLetterReveal();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
