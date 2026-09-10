export function initParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // Disable parallax if reduced motion preferred

  const parallaxElements = document.querySelectorAll('.parallax, .parallax-slow');
  
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(el => {
      const speed = el.classList.contains('parallax-slow') ? 0.05 : 0.1;
      const rect = el.getBoundingClientRect();
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = -(rect.top * speed);
        el.style.transform = `translateY(${yPos}px)`;
      }
    });
  }, { passive: true });
}
