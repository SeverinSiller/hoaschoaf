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

    /*
    // only show overlay for the first scale
    if (!this._hasInitialScale) {
      this.overlay.classList.remove('hidden');
    }
   */

    this.titleContent.style.fontSize = '1rem';
    this.titleContent.style.letterSpacing = 'normal';
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.isScaling = true;
      this.adjustTitleScale();
    }, 300);
  }

  adjustTitleScale() {
    const titleWidth = this.title.getBoundingClientRect().width;
    let iterations = 0;
    const maxIterations = 100;

    const step = () => {
      const contentWidth = this.titleContent.getBoundingClientRect().width;
      const difference = titleWidth - contentWidth;
      const fontSize = parseFloat(getComputedStyle(this.titleContent).fontSize) / 16;
      const letterSpaces = this.title.textContent.length - 1;

      // fixed: use local titleWidth, not this.titleWidth
      // if (titleWidth < contentWidth) this.rebounce();  // probably not needed

      if (Math.abs(difference) < 1 || iterations > maxIterations) {
        if (letterSpaces > 0) {
          this.titleContent.style.letterSpacing =
              `${Math.round(Math.abs(difference) / letterSpaces)}px`;
        }
        this.isScaling = false;
        return;
      }

      const increment =
          Math.abs(difference) > 100 ? 1 :
              Math.abs(difference) > 10 ? 0.1 :
                  0.01;

      this.titleContent.style.fontSize = `${fontSize + increment}rem`;
      iterations++;
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}

export function startTitleScaler() {
  return new TitleScaler();
}
