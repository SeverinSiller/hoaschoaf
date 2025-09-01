import { ITEM_TRANSLATEX_SPACING, SLIDER_ITEMS_NUM, SLIDER_SPEED } from './config';

class Slider {
  constructor() {
    this.sliderDiv = document.querySelector('.band-members-slider');
    this.sliderDivEls = [...document.querySelectorAll('.members')];
    this.sliderTitle = document.querySelector('.band-members-slider-title');

    this.mousedown = false;
    this.touchStart = false;
    this.directionChanged = false;
    this.defaultTranslateXSetted = false;
    this.movementDirectionNow = null;
    this.movementDirectionThen = null;
    this.screenX = this.getScreenX();
    this.mouseMoveStart = null;
    this.lastPageX = null;
    this.movement = 0;
    this.hideTimeout = null;

    // 👇 WICHTIG: sofort initiale Positionen setzen
    this.setInitialPositions();

    this.initSliderListeners(this.sliderDivEls);
    this.initDocListenersForSlider();
  }

  setInitialPositions() {
    // falls Bilder/Fonts layouten: 1 tick warten
    requestAnimationFrame(() => {
      this.sliderDivEls.forEach((el, i) => {
        const x = i * ITEM_TRANSLATEX_SPACING; // bei dir 80
        el.dataset.translateX = x;
        el.style.transform = `translateX(${x}%)`;
      });
      this.defaultTranslateXSetted = true;
    });
  }

  initSliderListeners(elements) {
    elements.forEach((element) => {
      // (optional) verhindert Link-Klick, wenn man wirklich draggt
      let moved = false;
      element.addEventListener('mousedown', (e) => {
        moved = false;
        this.startDrag(e.pageX);
      });
      element.addEventListener('mousemove', () => {
        if (this.mousedown) moved = true;
      });
      element.addEventListener('click', (e) => {
        if (moved) e.preventDefault();
      });

      element.addEventListener('touchstart', (e) => this.startDrag(e.touches[0].pageX), { passive: true });
      element.addEventListener('mouseenter', () => {
        if (this.hideTimeout) clearTimeout(this.hideTimeout);
        this.sliderTitle.classList.add('hidden');
      });
      element.addEventListener('mouseleave', () => {
        this.hideTimeout = setTimeout(() => {
          this.sliderTitle.classList.remove('hidden');
          this.hideTimeout = null;
        }, 400);
      });
    });
  }

  startDrag(startX) {
    this.mouseMoveStart = startX;
    this.mousedown = true;
    this.touchStart = true;
  }

  initDocListenersForSlider() {
    document.addEventListener('mousemove', (e) => this.drag(e.pageX));
    document.addEventListener('mouseup', () => this.endDrag());

    document.addEventListener(
      'touchmove',
      (e) => {
        if (!this.touchStart) return;
        this.drag(e.touches[0].pageX);
      },
      { passive: true }
    );
    document.addEventListener('touchend', () => this.endDrag());
    document.addEventListener('touchcancel', () => this.endDrag());
  }

  drag(currentX) {
    if (!this.mousedown && !this.touchStart) return;

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.sliderTitle.classList.remove('hidden');
    this.sliderDiv.classList.add('is-sliding');

    this.movement = ((currentX - this.mouseMoveStart) / this.screenX) * 100;

    this.movementDirectionNow = currentX < this.lastPageX ? 'L' : 'R';
    if (this.movementDirectionThen !== this.movementDirectionNow) this.mouseMoveStart = currentX;
    this.movementDirectionThen = this.movementDirectionNow;
    this.lastPageX = currentX;

    this.moveSlider();
  }

  endDrag() {
    this.mousedown = false;
    this.touchStart = false;
    this.mouseMoveStart = null;
    setTimeout(() => this.sliderDiv.classList.remove('is-sliding'), 50);
  }

  moveSlider() {
    const slideWidthFrac = 0.3; // 25% vom Container
    const maxDelta = (1440 / this.screenX) * (1 / slideWidthFrac);
    const deltaX = Math.max(-maxDelta, Math.min(maxDelta, this.movement * SLIDER_SPEED));

    this.sliderDivEls.forEach((el) => {
      const baseX = parseFloat(el.dataset.translateX);
      const newX = baseX + deltaX;
      el.dataset.translateX = newX;
      el.style.transform = `translateX(${newX}%)`;
    });

    this.rearrangeOutsideElements();
  }

  rearrangeOutsideElements() {
    this.sliderDivEls.forEach((el) => {
      let x = parseFloat(el.dataset.translateX);
      while (x < -ITEM_TRANSLATEX_SPACING) x += SLIDER_ITEMS_NUM * ITEM_TRANSLATEX_SPACING;
      while (x > (SLIDER_ITEMS_NUM - 1) * ITEM_TRANSLATEX_SPACING) x -= SLIDER_ITEMS_NUM * ITEM_TRANSLATEX_SPACING;
      el.dataset.translateX = x;
      el.style.transform = `translateX(${x}%)`;
    });
  }

  getScreenX() {
    const update = () => {
      this.screenX = this.sliderDiv.getBoundingClientRect().width;
    };
    window.addEventListener('resize', update);
    update();
    return this.screenX;
  }
}

export const slider = new Slider();
