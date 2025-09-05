import { titleScaler } from './titleScaler';

export function checkLoading() {
  const title = document.querySelector('.bottom-text').firstElementChild;
  const titleSize = title.computedStyleMap().get('font-size');

  if (titleSize < 8) titleScaler.rebounce;
}
