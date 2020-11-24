import {linear} from './time-functions';

export const animateDuration = (render, duration) => new Promise((resolve) => {
  let start = Date.now();
  (function loop() {
    let p = Date.now() - start;
    if (p > duration) {
      render(duration);
      resolve();
    } else {
      requestAnimationFrame(loop);
      render(p);
    }
  }());
});

export const animateEasing = (render, duration, easing) => new Promise((resolve) => {
  const start = Date.now();
  (function loop() {
    const p = (Date.now() - start) / duration;
    if (p > 1) {
      render(1);
      resolve();
    } else {
      requestAnimationFrame(loop);
      render(easing(p));
    }
  }());
});

export const animateLinear = (render, duration) => animateEasing(render, duration, linear);

export const runSerial = (tasks) => {
  let result = Promise.resolve();
  tasks.forEach((task) => {
    result = result.then(task);
  });
  return result;
};
