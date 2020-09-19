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
let isRunCounter = false;

document.body.addEventListener(`screenChanged`, (ev) => {
  const screenElement = ev.detail.screenElement;
  const textBlocks = screenElement.getElementsByClassName(`js-text-animation`);
  let animationTopScreenTextLine = {};

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
