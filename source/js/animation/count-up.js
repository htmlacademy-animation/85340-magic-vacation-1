import animate from './animation-frame';

export default class CountUp {
  constructor({
    from,
    to,
    fps,
    element
  }) {
    this.from = from || 0;
    this.to = to || 100;
    this.fps = fps || 60;
    this.element = element ? document.querySelector(element) : document.querySelector(`.js-count-up`);
    this.DURATION = 1000;
    this.ITERATION_PERCENT = 15;
  }

  run() {
    this.start = Date.now();

    if (!this.element) {
      return;
    }

    this.requestId = animate({
      duration: this.DURATION,
      timing: this.linearTiming,
      draw: this.drawCountUp.bind(this),
      fps: this.fps
    });
  }

  stop() {
    cancelAnimationFrame(this.requestId);
  }

  reset() {
    this.stop();
    this.from = 0;
    this.innerText(this.from);
  }

  linearTiming(timeFraction) {
    return timeFraction;
  }

  drawCountUp() {
    if (this.from >= this.to) {
      this.from = this.to;
      this.innerText(this.from);
      this.stop();
      return;
    }

    this.innerText(this.from);
    this.from += Math.round(this.to * this.ITERATION_PERCENT / 100);
  }

  innerText(text) {
    this.element.innerText = text;
  }
}
