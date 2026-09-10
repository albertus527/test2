export function initInteractiveStack() {
  const stackCards = document.querySelectorAll('.stack-card');
  if (stackCards.length === 0) return;

  let currentCardIndex = stackCards.length - 1;

  // Initialize visual arrangement
  stackCards.forEach((card, index) => {
    const reverseIndex = stackCards.length - 1 - index;
    card.style.transform = `translateY(${reverseIndex * 8}px) scale(${1 - reverseIndex * 0.05}) rotate(${reverseIndex % 2 === 0 ? reverseIndex : -reverseIndex}deg)`;
    card.style.zIndex = index;
    
    card.addEventListener('click', () => {
      if (index === currentCardIndex) {
        swipeCard(card, index);
      }
    });
  });

  function swipeCard(card, index) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? '0.1s' : '0.4s';
    
    card.style.transition = `transform ${duration} cubic-bezier(0.2, 0.8, 0.2, 1), opacity ${duration}`;
    card.style.transform = `translateY(-100px) translateX(100px) rotate(20deg) opacity(0)`;
    card.style.opacity = '0';
    card.style.pointerEvents = 'none';
    
    currentCardIndex--;
    
    stackCards.forEach((c, i) => {
      if (i <= currentCardIndex) {
        const reverseIndex = currentCardIndex - i;
        c.style.transform = `translateY(${reverseIndex * 8}px) scale(${1 - reverseIndex * 0.05}) rotate(${reverseIndex % 2 === 0 ? reverseIndex : -reverseIndex}deg)`;
      }
    });

    if (currentCardIndex < 0) {
      setTimeout(() => {
        currentCardIndex = stackCards.length - 1;
        stackCards.forEach((c, i) => {
          const reverseIndex = stackCards.length - 1 - i;
          c.style.transition = 'none';
          c.style.transform = `translateY(${reverseIndex * 8}px) scale(${1 - reverseIndex * 0.05}) rotate(${reverseIndex % 2 === 0 ? reverseIndex : -reverseIndex}deg)`;
          c.style.opacity = '1';
          c.style.pointerEvents = 'auto';
          
          void c.offsetWidth; // Reflow
          c.style.transition = `transform ${duration} cubic-bezier(0.2, 0.8, 0.2, 1), opacity ${duration}`;
        });
      }, prefersReducedMotion ? 100 : 600);
    }
  }
}
