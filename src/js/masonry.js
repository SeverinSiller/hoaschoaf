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
      let recGrade;
      imgSize.width > imgSize.height + imgSize.height * 0.2 ? (recGrade = 'a') : imgSize.width > imgSize.height ? (recGrade = 'b') : (recGrade = 'c');

      div.classList = `grid-item grid-item--${recGrade}`;
      div.style.backgroundImage = `url(".${shownImgs[i]}")`;
      div.style.backgroundSize = 'cover';

      col.append(div);
    }
  }

  fetchImages() {
    const images = import.meta.glob('/src/img/gallery/*.{jpg,png}');
    const imgsPaths = Object.keys(images);
    imgsPaths.sort().reverse();

    const newestImgs = imgsPaths.slice(0, SHOW_HOW_MANY_LATEST_IMGS);
    return newestImgs;
  }

  getSize(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
      };

      img.onerror = reject;
    });
  }
}

export const masonry = new Masonry();
