/**
 * Background music controller.
 * Unobtrusive audio toggle with smooth play/pause and video playback coordination.
 */

let bgmAudio = null;
let musicToggleBtn = null;
let isPlaying = false;
let pausedByVideo = false;

export function initAudio() {
  bgmAudio = document.getElementById('bgmAudio');
  musicToggleBtn = document.getElementById('musicToggleBtn');

  if (!bgmAudio || !musicToggleBtn) return { pauseForVideo: () => {}, resumeAfterVideo: () => {} };

  musicToggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  bgmAudio.addEventListener('ended', () => {
    // Loop track smoothly
    bgmAudio.currentTime = 0;
    bgmAudio.play().catch(() => {});
  });

  bgmAudio.addEventListener('error', () => {
    console.log('Background music not found or audio format unsupported. Place bgm.mp3 in public/audio/');
    musicToggleBtn.classList.remove('is-playing');
    musicToggleBtn.setAttribute('title', 'Lagu belum tersedia (public/audio/bgm.mp3)');
    isPlaying = false;
  });

  return {
    pauseForVideo,
    resumeAfterVideo
  };
}

function playMusic() {
  if (!bgmAudio) return;
  const playPromise = bgmAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isPlaying = true;
      if (musicToggleBtn) {
        musicToggleBtn.classList.add('is-playing');
        musicToggleBtn.setAttribute('aria-label', 'Jeda musik latar');
      }
    }).catch(err => {
      console.log('Audio playback prevented or missing audio file:', err);
      isPlaying = false;
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
  isPlaying = false;
  if (musicToggleBtn) {
    musicToggleBtn.classList.remove('is-playing');
    musicToggleBtn.setAttribute('aria-label', 'Putar musik latar');
  }
}

export function pauseForVideo() {
  if (isPlaying) {
    pausedByVideo = true;
    if (bgmAudio) {
      bgmAudio.pause();
    }
    if (musicToggleBtn) {
      musicToggleBtn.classList.remove('is-playing');
    }
  }
}

export function resumeAfterVideo() {
  if (pausedByVideo) {
    pausedByVideo = false;
    playMusic();
  }
}
