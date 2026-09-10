// main.js

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Scroll Reveals (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: unobserve after reveal if we only want it once
        // observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  // Select elements to animate
  const revealElements = document.querySelectorAll(
    '.opening-content, .photo-wrapper, .scroll-fade, .memory-item, .frame-group, .wish-block p'
  );
  
  // Initially add fade-in-up class to these elements if they don't have a specific animation class
  revealElements.forEach(el => {
    if (!el.classList.contains('fade-in-up') && !el.classList.contains('photo-wrapper') && !el.classList.contains('scroll-fade')) {
      el.classList.add('fade-in-up');
    }
    observer.observe(el);
  });

  // 2. Interactive Photo Stack
  const stackCards = document.querySelectorAll('.stack-card');
  let currentCardIndex = stackCards.length - 1; // Top card is the last in the DOM

  // Initialize stack visual arrangement
  stackCards.forEach((card, index) => {
    // Reverse index for styling (0 is bottom, n-1 is top)
    const reverseIndex = stackCards.length - 1 - index;
    card.style.transform = `translateY(${reverseIndex * 8}px) scale(${1 - reverseIndex * 0.05}) rotate(${reverseIndex % 2 === 0 ? reverseIndex : -reverseIndex}deg)`;
    card.style.zIndex = index;
    
    // Add event listeners for interaction (tap/click to swipe away)
    card.addEventListener('click', () => {
      if (index === currentCardIndex) {
        swipeCard(card, index);
      }
    });
  });

  function swipeCard(card, index) {
    // Animate out
    card.style.transform = `translateY(-100px) translateX(100px) rotate(20deg) opacity(0)`;
    card.style.opacity = '0';
    card.style.pointerEvents = 'none'; // Disable clicks
    
    currentCardIndex--;
    
    // Rearrange remaining cards
    stackCards.forEach((c, i) => {
      if (i <= currentCardIndex) {
        const reverseIndex = currentCardIndex - i;
        c.style.transform = `translateY(${reverseIndex * 8}px) scale(${1 - reverseIndex * 0.05}) rotate(${reverseIndex % 2 === 0 ? reverseIndex : -reverseIndex}deg)`;
      }
    });

    // Reset stack if all are swiped (optional, for fun)
    if (currentCardIndex < 0) {
      setTimeout(() => {
        currentCardIndex = stackCards.length - 1;
        stackCards.forEach((c, i) => {
          const reverseIndex = stackCards.length - 1 - i;
          c.style.transition = 'none'; // Disable transition for reset
          c.style.transform = `translateY(${reverseIndex * 8}px) scale(${1 - reverseIndex * 0.05}) rotate(${reverseIndex % 2 === 0 ? reverseIndex : -reverseIndex}deg)`;
          c.style.opacity = '1';
          c.style.pointerEvents = 'auto';
          
          // Force reflow
          void c.offsetWidth;
          
          c.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s';
        });
      }, 600);
    }
  }

  // 3. Letter Reveal Logic
  const openBtn = document.getElementById('openLetterBtn');
  const closeBtn = document.getElementById('closeLetterBtn');
  const overlay = document.getElementById('letterOverlay');

  if(openBtn && closeBtn && overlay) {
    openBtn.addEventListener('click', () => {
      overlay.classList.add('visible');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
    });

    // Close on background click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
      }
    });
  }

  // 4. Subtle Parallax effect on scroll
  const parallaxElements = document.querySelectorAll('.parallax, .parallax-slow');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    parallaxElements.forEach(el => {
      const speed = el.classList.contains('parallax-slow') ? 0.05 : 0.1;
      const rect = el.getBoundingClientRect();
      
      // Only animate if element is in viewport vertically
      if(rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = -(rect.top * speed);
        el.style.transform = `translateY(${yPos}px)`;
      }
    });
  }, { passive: true });

});
