export function initScrollReveals() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(
    '.opening-content, .photo-wrapper, .scroll-fade, .memory-item, .frame-group, .wish-block p, .editorial-block, .career-step, .filmstrip-item, .contact-sheet, .photo-duo, .photo-grid-2'
  );
  
  revealElements.forEach(el => {
    if (!el.classList.contains('fade-in-up') && !el.classList.contains('photo-wrapper') && !el.classList.contains('scroll-fade')) {
      el.classList.add('fade-in-up');
    }
    
    if (prefersReducedMotion) {
      el.style.transitionDuration = '0.05s';
    }
    
    observer.observe(el);
  });
}
