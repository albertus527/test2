/**
 * Media handler for images and inline videos.
 * Handles graceful loading, missing asset fallbacks, and video controls.
 */

export function initMediaHandling(onVideoPlay, onVideoPause) {
  // 1. Image fallback & loaded state handler
  const images = document.querySelectorAll('.photo-frame img.memory-media, .ending-photo img.memory-media');
  
  images.forEach(img => {
    if (img.complete) {
      if (img.naturalWidth > 0) {
        img.classList.add('is-loaded');
      } else {
        img.classList.add('media-failed');
      }
    } else {
      img.addEventListener('load', () => {
        img.classList.add('is-loaded');
      });
      img.addEventListener('error', () => {
        img.classList.add('media-failed');
      });
    }
  });

  // 2. Video inline tap handling
  const videoFrames = document.querySelectorAll('.video-frame');
  const allVideos = document.querySelectorAll('.video-frame video');

  allVideos.forEach(video => {
    video.addEventListener('error', () => {
      video.classList.add('media-failed');
      const frame = video.closest('.video-frame');
      if (frame) frame.classList.add('video-failed');
    });

    video.addEventListener('play', () => {
      const frame = video.closest('.video-frame');
      if (frame) frame.classList.add('is-playing');
      
      // Pause any other video that might be playing
      allVideos.forEach(otherVideo => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });

      if (typeof onVideoPlay === 'function') {
        onVideoPlay(video);
      }
    });

    video.addEventListener('pause', () => {
      const frame = video.closest('.video-frame');
      if (frame) frame.classList.remove('is-playing');
      if (typeof onVideoPause === 'function') {
        onVideoPause(video);
      }
    });

    video.addEventListener('ended', () => {
      const frame = video.closest('.video-frame');
      if (frame) frame.classList.remove('is-playing');
      if (typeof onVideoPause === 'function') {
        onVideoPause(video);
      }
    });
  });

  // Tap frame to toggle play/pause
  videoFrames.forEach(frame => {
    const video = frame.querySelector('video');
    if (!video) return;

    frame.addEventListener('click', (e) => {
      // Don't interfere if clicked standard native controls
      if (e.target === video && video.hasAttribute('controls') && e.offsetY > video.clientHeight - 40) {
        return;
      }
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log('Video play interrupted or file not found:', err);
          });
        }
      } else {
        video.pause();
      }
    });
  });
}
