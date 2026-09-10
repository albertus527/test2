import { initScrollReveals } from './src/js/scroll.js';
import { initInteractiveStack } from './src/js/stack.js';
import { initLetterReveal } from './src/js/letter.js';
import { initParallax } from './src/js/parallax.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initInteractiveStack();
  initLetterReveal();
  initParallax();
});
