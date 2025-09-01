export function hamburger() {
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.header-nav');
  const html = document.documentElement;

  if (!btn || !nav) return;

  // State
  let isOpen = false;
  let lastFocus = null;

  // Setup ARIA
  btn.setAttribute('aria-expanded', 'false');

  // Toggle
  const open = () => {
    if (isOpen) return;
    isOpen = true;
    lastFocus = document.activeElement;

    btn.classList.add('is-active');
    nav.classList.add('is-open');
    html.classList.add('no-scroll');
    btn.setAttribute('aria-expanded', 'true');

    // Optional: Focus trap start
    const firstLink = nav.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
    firstLink?.focus();
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', onDocumentClick, true);
  };

  const close = () => {
    if (!isOpen) return;
    isOpen = false;

    btn.classList.remove('is-active');
    nav.classList.remove('is-open');
    html.classList.remove('no-scroll');
    btn.setAttribute('aria-expanded', 'false');

    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onDocumentClick, true);

    // Zurück zum Button
    lastFocus?.focus?.();
  };

  const toggle = () => (isOpen ? close() : open());

  // ESC & TAB Wrap
  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }

    if (e.key === 'Tab' && isOpen) {
      // kleiner Focus-Trap
      const focusable = nav.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // Outside-Click schließt Menü
  function onDocumentClick(e) {
    if (!isOpen) return;
    if (e.target === btn || btn.contains(e.target)) return;
    if (!nav.contains(e.target)) close();
  }

  // Klicks
  btn.addEventListener('click', toggle);
  nav.addEventListener('click', (e) => {
    if (e.target.matches('a')) close(); // Menü zu nach Link-Klick
  });
}
