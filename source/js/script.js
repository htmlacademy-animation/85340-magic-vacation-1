// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import TypographyAnimation from './modules/typography-animation';
import FullPageScroll from './modules/full-page-scroll';
import MinutesCounter from './animation/minutes-counter';
import CountUp from './animation/count-up';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

const minutesCounter = new MinutesCounter(300000);
const countUpCases = new CountUp({
  from: 1,
  to: 7,
  fps: 12,
  element: `.js-count-cases`
});

const countUpCodes = new CountUp({
  from: 11,
  to: 900,
  fps: 12,
  element: `.js-count-codes`
});

let isRunCounter = false;
let timeoutCases = null;
let timeoutCodes = null;

document.body.addEventListener(`screenChanged`, (ev) => {
  const screenElement = ev.detail.screenElement;
  const textBlocks = screenElement.getElementsByClassName(`js-text-animation`);
  let animationTopScreenTextLine = {};

  prizesScreenAnimation(screenElement.id);
  gameScreenAnimation(screenElement.id);

  for (let i = 0; i < textBlocks.length; i++) {
    animationTopScreenTextLine[i] = new TypographyAnimation(textBlocks[i], 700, `active`, `transform`);
  }

  for (let key in animationTopScreenTextLine) {
    if ({}.hasOwnProperty.call(animationTopScreenTextLine, key)) {
      animationTopScreenTextLine[key].destroyAnimation();

      setTimeout(() => {
        animationTopScreenTextLine[key].runAnimation(key);
      }, 300);
    }
  }
});

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.addEventListener(`load`, () => {
  document.body.classList.add(`load`);
});

function gameScreenAnimation(screenId) {
  if (screenId === `game`) {
    minutesCounter.run();
    isRunCounter = true;
  } else if (isRunCounter) {
    minutesCounter.reset();
    isRunCounter = false;
  }
}

function prizesScreenAnimation(screenId) {
  if (screenId === `prizes`) {
    timeoutCases = setTimeout(() => {
      countUpCases.run();
    }, 5500);

    timeoutCodes = setTimeout(() => {
      countUpCodes.run();
    }, 7500);
  } else {
    clearTimeout(timeoutCases);
    clearTimeout(timeoutCodes);

    countUpCases.reset();
    countUpCodes.reset();
  }
}
