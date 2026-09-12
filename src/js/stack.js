export function initInteractiveStack() {
  const stackCards = document.querySelectorAll('.stack-card');
  if (stackCards.length === 0) return;

  let currentCardIndex = stackCards.length - 1;

  function updateCardTransforms() {
    stackCards.forEach((card, index) => {
      if (index <= currentCardIndex) {
        const reverseIndex = currentCardIndex - index;
        const rotateDeg = reverseIndex === 0 ? 0 : (reverseIndex % 2 === 0 ? reverseIndex * 1.5 : -reverseIndex * 1.5);
        const yOffset = reverseIndex * 6;
        const scaleVal = 1 - reverseIndex * 0.035;
        card.style.transform = `translateY(${yOffset}px) scale(${scaleVal}) rotate(${rotateDeg}deg)`;
        card.style.zIndex = index + 1;
        card.style.opacity = '1';
        card.style.pointerEvents = index === currentCardIndex ? 'auto' : 'none';
      } else {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
      }
    });
  }

  stackCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (index === currentCardIndex) {
        swipeCard(card);
      }
    });
  });

  updateCardTransforms();

  function swipeCard(card) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? '0.1s' : '0.45s';

    card.style.transition = `transform ${duration} cubic-bezier(0.2, 0.8, 0.2, 1), opacity ${duration}`;
    card.style.transform = `translateY(-70px) translateX(80px) rotate(14deg)`;
    card.style.opacity = '0';
    card.style.pointerEvents = 'none';

    currentCardIndex--;

    if (currentCardIndex < 0) {
      setTimeout(() => {
        currentCardIndex = stackCards.length - 1;
        stackCards.forEach((c) => {
          c.style.transition = 'none';
        });
        updateCardTransforms();
        void card.offsetWidth;
        stackCards.forEach((c) => {
          c.style.transition = `transform ${duration} cubic-bezier(0.2, 0.8, 0.2, 1), opacity ${duration}`;
        });
      }, prefersReducedMotion ? 100 : 500);
    } else {
      updateCardTransforms();
    }
  }
}
