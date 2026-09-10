export function initLetterReveal() {
  const openBtn = document.getElementById('openLetterBtn');
  const closeBtn = document.getElementById('closeLetterBtn');
  const overlay = document.getElementById('letterOverlay');

  if (openBtn && closeBtn && overlay) {
    openBtn.addEventListener('click', () => {
      overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
      }
    });
  }
}
