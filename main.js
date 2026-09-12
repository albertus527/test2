import { initScrollReveals } from './src/js/scroll.js';
import { initInteractiveStack } from './src/js/stack.js';
import { initLetterReveal } from './src/js/letter.js';
import { initParallax } from './src/js/parallax.js';
import { initMediaHandling } from './src/js/media.js';
import { initAudio } from './src/js/audio.js';

document.addEventListener('DOMContentLoaded', () => {
  const audioController = initAudio();
  initMediaHandling(
    () => audioController.pauseForVideo(),
    () => audioController.resumeAfterVideo()
  );
  initScrollReveals();
  initInteractiveStack();
  initLetterReveal();
  initParallax();
});
