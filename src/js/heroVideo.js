// Steuert das Hintergrundvideo im Hero:
// - respektiert "Bewegung reduzieren" (prefers-reduced-motion) -> Video pausiert, Poster bleibt sichtbar
// - fängt blockiertes Autoplay (z. B. Energiesparmodus) still ab, es bleibt dann das Poster
export function heroVideo() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const apply = () => {
    if (reduced.matches) {
      video.pause();
    } else {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
  };

  apply();
  reduced.addEventListener?.('change', apply);
}
