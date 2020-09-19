import animate from './animation-frame';

export default class MinutesCounter {
  constructor(
      duration,
      counterContainer
  ) {
    this.duration = duration || 60000;
    this.counter = counterContainer || document.querySelector(`.js-counter`);
    this.totalMinutes = new Date(this.duration).getMinutes();
  }

  run() {
    this.start = Date.now();

    if (!this.counter) {
      return;
    }

    this.requestId = animate({
      duration: this.duration,
      timing: this.linearTiming,
      draw: this.drawCounter.bind(this)
    });
  }

  reset() {
    cancelAnimationFrame(this.requestId);

    this.counter.innerText = `00:00`;
  }

  linearTiming(timeFraction) {
    return timeFraction;
  }

  drawCounter() {
    const msPassed = new Date(Date.now() - this.start);
    const remainingMinutes = this.totalMinutes - msPassed.getMinutes();

    let secondsPassed = msPassed.getSeconds();
    let minutesPassed = secondsPassed > 0 ? remainingMinutes - 1 : remainingMinutes;

    secondsPassed = secondsPassed === 0 ? secondsPassed : 60 - secondsPassed;

    if (minutesPassed < 0) {
      minutesPassed = 0;
    }

    this.counter.innerText = `${this.addZero(minutesPassed)}:${this.addZero(secondsPassed)}`;
  }

  addZero(number) {
    return number < 10 ? `0${number}` : number;
  }
}
