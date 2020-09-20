export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);

        animateResultTitle(targetEl[0]);
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }

  function animateResultTitle(resultBlock) {
    const svgTitle = resultBlock.querySelector(`.js-svg-title`);
    const svgId = svgTitle.querySelector(`use`).getAttribute(`xlink:href`);
    const originSvg = document.querySelector(svgId);
    const paths = originSvg.querySelectorAll(`path`);
    const startAnimationEls = originSvg.querySelectorAll(`[begin="indefinite"]`);

    paths.forEach((path, i, arr) => {
      const pathTotalLength = path.getTotalLength();
      const pathAnimate = path.querySelector(`animate`);

      path.setAttribute(`stroke-dashoffset`, `0`);
      path.setAttribute(`stroke-dasharray`, `${arr.length} ${pathTotalLength / 2.36}`);

      pathAnimate.setAttribute(`to`, `${pathTotalLength / 3} 0`);
    });

    startAnimationEls.forEach((el) => {
      el.beginElement();
    });
  }
};
