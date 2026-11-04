class TitleScaler {
  constructor() {
    this.title = document.querySelector('.bottom-text');

    if (!this.title) return; // defensive

    this.titleContent = this.title.firstElementChild;
    this.timeout = null;
    this.isScaling = false;
    this._lastWidth = -1;

    window.addEventListener('resize', this.rebounce.bind(this));
    this.rebounce(); // first run
  }

  rebounce() {
    const currentWidth = window.innerWidth;

    // only react if width really changed
    if (currentWidth === this._lastWidth || this.isScaling) {
      return;
    }

    this._lastWidth = currentWidth;

    this.titleContent.style.fontSize = '1rem';
    this.titleContent.style.letterSpacing = 'normal';
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.isScaling = true;
      // Wait for webfonts to finish loading first — measuring against a
      // fallback font makes the loop chase a moving target and can run away.
      // Two extra animation frames afterwards let layout settle before we
      // take our first real measurement.
      const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      ready
        .catch(() => {})
        .then(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))))
        .then(() => this.adjustTitleScale());
    }, 300);
  }

  adjustTitleScale() {
    const titleWidth = this.title.getBoundingClientRect().width;
    // Emergency ceiling only: the loop should converge on its own once the
    // font is loaded and layout is stable. This just stops it from ever
    // running away (e.g. if a font fails to load) instead of shaping the
    // normal result.
    const maxFontSizeRem = 30;
    let iterations = 0;
    const maxIterations = 100;

    const step = () => {
      const contentWidth = this.titleContent.getBoundingClientRect().width;
      const difference = titleWidth - contentWidth;
      const fontSize = parseFloat(getComputedStyle(this.titleContent).fontSize) / 16;
      const letterSpaces = this.title.textContent.length - 1;

      const hitCeiling = fontSize >= maxFontSizeRem;

      if (Math.abs(difference) < 1 || iterations > maxIterations || hitCeiling) {
        if (letterSpaces > 0 && !hitCeiling) {
          this.titleContent.style.letterSpacing =
              `${Math.round(Math.abs(difference) / letterSpaces)}px`;
        }
        this.isScaling = false;
        return;
      }

      const step_ =
          Math.abs(difference) > 100 ? 1 :
              Math.abs(difference) > 10 ? 0.1 :
                  0.01;

      // Move toward the target width — grow when we're still short of it,
      // shrink when we've overshot it. The previous version always grew,
      // which meant a single overshoot (e.g. while the webfont swaps in)
      // could send the font size spiralling upward forever.
      const signedStep = difference > 0 ? step_ : -step_;
      const nextFontSize = Math.max(0.5, Math.min(fontSize + signedStep, maxFontSizeRem));

      this.titleContent.style.fontSize = `${nextFontSize}rem`;
      iterations++;
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}

export function startTitleScaler() {
  return new TitleScaler();
}
