import {masonry} from './masonry';
import {slider} from './memberSlider';
import {hamburger} from './hamburger';
import {checkLoading} from './checkLoading';
import '../scss/main.scss';
import {startTitleScaler} from "@/js/titleScaler";

function init() {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) spinner.classList.add('hidden');

    masonry;
    slider;
    hamburger();

    window.addEventListener('load', async () => {
        startTitleScaler();
    });


    setTimeout(() => checkLoading(), 4000);

}

init();
