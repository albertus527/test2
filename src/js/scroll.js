export function initScrollReveals() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(
    '.opening-content, .photo-wrapper, .scroll-fade, .memory-item, .frame-group, .wish-block p'
  );
  
  revealElements.forEach(el => {
    if (!el.classList.contains('fade-in-up') && !el.classList.contains('photo-wrapper') && !el.classList.contains('scroll-fade')) {
      el.classList.add('fade-in-up');
    }
    
    // If user prefers reduced motion, we can either instantly show or still fade
    if (prefersReducedMotion) {
      el.style.transitionDuration = '0.1s';
    }
    
    observer.observe(el);
  });
}
