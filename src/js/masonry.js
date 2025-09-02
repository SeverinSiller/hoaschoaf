import Colcade from 'colcade';
import { SHOW_HOW_MANY_LATEST_IMGS } from './config';

class Masonry {
  constructor() {
    this.galleryGrid = document.querySelector('.grid');
    window.addEventListener('DOMContentLoaded', () => this.loadMasonry());
  }

  async loadMasonry() {
    const shownImgs = this.fetchImages();

    const col = new Colcade('.grid', {
      columns: '.grid-col',
      items: '.grid-item',
    });

    for (let i = 0; i < shownImgs.length; i++) {
      const div = document.createElement('div');

      const imgSize = await this.getSize(shownImgs[i]);
      const recGrade = imgSize.width > imgSize.height + imgSize.height * 0.2 ? 'a' : imgSize.width > imgSize.height ? 'b' : 'c';

      div.className = `grid-item grid-item--${recGrade}`;
      div.style.backgroundImage = `url("${shownImgs[i]}")`;
      div.style.backgroundSize = 'cover';
      div.style.backgroundPosition = 'center';

      col.append(div);
    }
  }

  fetchImages() {
    const images = import.meta.glob('/src/img/gallery/*.{jpg,jpeg,png,webp}', {
      eager: true,
      as: 'url',
    });
    const sortedUrls = Object.entries(images)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([, url]) => url);
    return sortedUrls.slice(0, SHOW_HOW_MANY_LATEST_IMGS);
  }

  getSize(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
    });
  }
}

export const masonry = new Masonry();
