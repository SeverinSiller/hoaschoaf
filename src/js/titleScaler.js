class TitleScaler {
  constructor() {
    this.overlay = document.querySelector('.loading-spinner');
    this.title = document.querySelector('.bottom-text');
    this.titleContent = this.title.firstElementChild;
    this.timeout = null;
    this.isScaling = false;
    this._hasInitialScale = false;


    window.addEventListener('resize', this.rebounce.bind(this));
    this.rebounce();
  }

  rebounce() {
    const currentWidth = window.innerWidth;
    if (currentWidth === this._lastWidth) {
      return;
    }

    // only show overlay for the first scale
    if (!this._hasInitialScale) {
      this.overlay.classList.remove('hidden');
    }

    this.titleContent.style.fontSize = '1rem';
    this.titleContent.style.letterSpacing = 'normal';
    clearTimeout(this.timeout);
    if (this.isScaling) return;

    this.timeout = setTimeout(() => {
      this.isScaling = true;
      this.adjustTitleScale();
      this._hasInitialScale = true; // never show spinner again after initial scale
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

      // probably not needed, why make loop calls?
      // if (this.titleWidth < contentWidth) this.rebounce();

      if (Math.abs(difference) < 1 || iterations > maxIterations) {
        this.titleContent.style.letterSpacing = `${Math.round(Math.abs(difference) / letterSpaces)}px`;
        this.isScaling = false;
        this.overlay.classList.add('hidden');

        return;
      }

      const increment = Math.abs(difference) > 100 ? 1 : Math.abs(difference) > 10 ? 0.1 : 0.01;

      this.titleContent.style.fontSize = `${fontSize + increment}rem`;
      iterations++;
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}

export const titleScaler = new TitleScaler();
