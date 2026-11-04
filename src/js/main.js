import {masonry} from './masonry';
import {hamburger} from './hamburger';
import {heroVideo} from './heroVideo';
import {checkLoading} from './checkLoading';
import '../scss/main.scss';
import {startTitleScaler} from "@/js/titleScaler";

function init() {
    const spinner = document.querySelector('.loading-spinner');

    masonry;
    hamburger();
    heroVideo();

    window.addEventListener('load', async () => {
        if (spinner) spinner.classList.add('hidden');
        startTitleScaler();
    });


    setTimeout(() => checkLoading(), 4000);

}

init();
