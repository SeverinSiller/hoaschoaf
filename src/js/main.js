import { titleScaler } from './titleScaler';
import { masonry } from './masonry';
import { slider } from './memberSlider';
import { hamburger } from './hamburger';
import { checkLoading } from './checkLoading';

function init() {
  titleScaler;
  masonry;
  slider;
  hamburger();

  setTimeout(() => {
    checkLoading();
  }, 4000);
}
init();
