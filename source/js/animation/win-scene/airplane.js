import {WW, WH, percentOf, rotate, rotationMatrix} from '../helpers/utils';
import {animateLinear} from '../helpers/run-functions';

export default class WinScene {
  constructor(ctx, duration, params) {
    this.ctx = ctx;
    this.duration = duration || 1567;

    this.airplaneImg = new Image();
    this.airplaneImg.src = params.src;
    this.airplaneH = this.airplaneW = params.size;
    this.airplaneStart = {
      x: WW / 2 - this.airplaneW / 2 + 10,
      y: WH / 2 - this.airplaneH / 2 - 28.5,
      angle: 74
    };
    this.airplaneFinish = {
      x: this.airplaneStart.x + percentOf(WW, 32.2),
      y: this.airplaneStart.y + percentOf(WW, 8.5),
      angle: 0
    };


    this.trail = {
      progress: 0,
      size: 0,
      color: `#ACC3FF`,
    };


    this.mountainColor = `#5f458c`;
    this.mountainStatic = {
      x: WW / 2 + percentOf(WW, 9.4),
      y: WH / 2 + percentOf(WH, 0.6),
      width: percentOf(WH, 3),
      height: percentOf(WH, 19)
    };
    this.mountainDynamic = {
      x: WW / 2 + percentOf(WW, 5.6),
      fromY: WH / 2 + percentOf(WH, 10),
      toY: WH / 2 - percentOf(WH, 6.4),
      width: percentOf(WH, 4.2),
      height: percentOf(WH, 26)
    };
  }

  animateScene() {
    animateLinear(this.opacityChange(0, 1), this.duration / 3);
    animateLinear(this.planeTranslateAnimation(this.airplaneStart, this.airplaneFinish), this.duration);
    animateLinear(this.planeRotateAnimation(this.airplaneStart.angle, this.airplaneFinish.angle), this.duration);
    animateLinear(this.trailCircleAnimation(this.trail.size, percentOf(WW, 22.7)), this.duration);

    setTimeout(() => {
      animateLinear(this.mountainYAnimation(this.mountainDynamic.fromY, this.mountainDynamic.toY), this.duration / 3);
    }, this.duration * 2 / 3);
  }

  mountainYAnimation(from, to) {
    return (progress) => {
      this.mountainDynamic.y = from + progress * (to - from);
    };
  }

  trailCircleAnimation(from, to) {
    return (progress) => {
      this.trail.progress = progress;
      this.trail.size = from + progress * (to - from);
    };
  }

  planeTranslateAnimation(from, to) {
    return (progress) => {
      this.airplaneProgress = progress;
      this.airplaneX = from.x + progress * (to.x - from.x);
      this.airplaneY = from.y + Math.abs(from.y - to.y) * Math.sin(progress * Math.PI * 4 / 5);
    };
  }

  planeRotateAnimation(from, to) {
    return (progress) => {
      this.airplaneAngle = from + progress * (to - from);
    };
  }

  opacityChange(from, to) {
    return (progress) => {
      this.opacity = from + progress * (to - from);
    };
  }

  drawScene() {
    this.drawAirplane();
    this.drawTrail();
    this.ctx.fillStyle = this.mountainColor;
    this.drawMountain(this.mountainStatic);
    this.drawMountain(this.mountainDynamic);
  }

  drawAirplane() {
    this.ctx.save();

    this.ctx.globalAlpha = this.opacity;
    rotate(this.ctx, this.airplaneAngle, this.airplaneX, this.airplaneY);
    this.ctx.drawImage(this.airplaneImg, this.airplaneX - this.airplaneW / 2, this.airplaneY - this.airplaneH / 2, this.airplaneW, this.airplaneH);

    this.ctx.restore();
  }

  getAirplaneTail() {
    return {
      x: this.airplaneX - this.airplaneW / 2 + percentOf(this.airplaneW, 20),
      y: this.airplaneY + this.airplaneH / 2 - percentOf(this.airplaneH, 23),
    };
  }

  getBezierOffset(val) {
    return val * this.airplaneProgress;
  }

  drawTrail() {
    this.ctx.save();

    const circleRadius = this.trail.size / 2;
    const planeW = this.airplaneW;
    const airplaneTail = this.getAirplaneTail();
    const correctTail = rotationMatrix(this.airplaneX, this.airplaneY, airplaneTail.x, airplaneTail.y, this.airplaneAngle);

    const cp1 = {
      x: this.airplaneStart.x + this.getBezierOffset(percentOf(planeW, 130)),
      y: this.airplaneStart.y + this.getBezierOffset(percentOf(planeW, 16)),
    };
    const cp2 = {
      x: correctTail.x - this.getBezierOffset(percentOf(planeW, 100)),
      y: correctTail.y + this.getBezierOffset(percentOf(planeW, 44)),
    };
    const cp3 = {
      x: correctTail.x - this.getBezierOffset(percentOf(planeW, 38)),
      y: correctTail.y + this.getBezierOffset(percentOf(planeW, 56)),
    };
    const cp4 = {
      x: this.airplaneStart.x + this.getBezierOffset(percentOf(planeW, 160)),
      y: this.airplaneStart.y + this.getBezierOffset(percentOf(planeW, 228)),
    };

    this.ctx.fillStyle = this.trail.color;
    this.ctx.beginPath();
    this.ctx.arc(this.airplaneStart.x, this.airplaneStart.y + circleRadius, circleRadius, 0, Math.PI * 2);

    this.ctx.moveTo(this.airplaneStart.x, this.airplaneStart.y);
    this.ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, correctTail.x, correctTail.y);
    this.ctx.bezierCurveTo(cp3.x, cp3.y, cp4.x, cp4.y, this.airplaneStart.x, this.airplaneStart.y + this.trail.size);

    this.ctx.fill();
    this.ctx.restore();
  }

  drawMountain(mountain) {
    this.ctx.beginPath();
    this.ctx.moveTo(mountain.x, mountain.y);
    this.ctx.lineTo(mountain.x + mountain.width, mountain.y + mountain.height);
    this.ctx.lineTo(mountain.x - mountain.width, mountain.y + mountain.height);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
