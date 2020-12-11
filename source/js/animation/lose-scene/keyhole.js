import {WW, WH, scale, percentOf, drawTrapezoid} from '../helpers/utils';
import {animateEasing, animateLinear, runSerial} from '../helpers/run-functions';
import {power} from '../helpers/time-functions';

export default class Keyhole {
  constructor(ctx, duration, params) {
    this.ctx = ctx;
    this.duration = duration || 3000;

    this.keyCircle = {
      x: WW / 2 - percentOf(WH, 0.7),
      y: WH / 2 - percentOf(WH, 6),
      r: percentOf(WW, 5.6)
    };
    this.trapezoidW = this.keyCircle.r * 2;
    this.trapezoidH = this.keyCircle.r * 1.8;
    this.trapezoidIndent = this.keyCircle.r / 2.7;
    this.trapezoidPosition = {
      x: this.keyCircle.x - this.keyCircle.r,
      y: this.keyCircle.y + this.keyCircle.r * 0.77,
    };


    this.crocodile = new Image();
    this.crocodile.src = params.crocodileSrc;
    this.crocodileSize = params.crocodileSize;
    this.crocodilePosition = {
      x: WW / 2 - this.crocodileSize / 2 + percentOf(WW, 1),
      y: WH / 2 - this.crocodileSize / 2 + percentOf(WH, 8)
    };


    this.tear = {
      color: `#b4c3ff`,
      height: percentOf(this.crocodileSize, 10.5),
      position: {
        y: this.crocodilePosition.y + percentOf(this.crocodileSize, 52),
        x: this.crocodilePosition.x + percentOf(this.crocodileSize, 42)
      },
      opacity: 1,
      sizeIncrease: 0,
      sizeDecrease: 0,
      counter: 0,
      maxCount: 3,
      duration: percentOf(this.duration, 25),
    };
  }

  resetTearParams(startParams) {
    this.tear.position.x = startParams.position.x;
    this.tear.position.y = startParams.position.y;
    this.tear.opacity = startParams.opacity;
    this.tear.sizeIncrease = 0;
    this.tear.sizeDecrease = 1;
  }

  animateScene() {
    const startTearParams = {
      position: {
        x: this.tear.position.x,
        y: this.tear.position.y
      },
      opacity: this.tear.opacity
    };

    animateLinear(this.opacityChange(0, 1), this.duration / 4);
    animateLinear(this.scaleChange(0.6, 1), this.duration / 8);

    setTimeout(() => {
      animateEasing(this.transformCrocodilePosition({
        x: WW,
        y: 0
      }, this.crocodilePosition), percentOf(this.duration, 90), power(1));
    }, percentOf(this.duration, 10));

    const interval = setInterval(() => {
      this.tear.counter++;

      if (this.tear.counter === this.tear.maxCount) {
        clearInterval(interval);
      }

      this.resetTearParams(startTearParams);

      runSerial([
        () => animateEasing(this.animateTearSizeIncrease(0, 1), this.tear.duration, power(1)),
        () => animateEasing(
            this.animateTearDrop(
                startTearParams.position.y,
                startTearParams.position.y + percentOf(this.crocodileSize, 10),
            ),
            this.tear.duration,
            power(2)
        ),
        () => {
          animateLinear(this.cryOpacityChange(1, 0), this.tear.duration);
          animateLinear(this.animateTearSizeDecrease(1, 0), this.tear.duration);
        },
      ]);
    }, this.tear.duration * 4 + 200);
  }

  animateTearSizeIncrease(from, to) {
    return (progress) => {
      this.tear.sizeIncrease = from + progress * (to - from);
    };
  }

  animateTearSizeDecrease(from, to) {
    return (progress) => {
      this.tear.sizeDecrease = from + progress * (to - from);
    };
  }

  animateTearDrop(from, to) {
    return (progress) => {
      this.tear.position.y = from + progress * (to - from);
    };
  }

  transformCrocodilePosition(from, to) {
    return (progress) => {
      this.crocodilePositionX = from.x + progress * (to.x - from.x);
      this.crocodilePositionY = from.y + progress * (to.y - from.y);
    };
  }

  opacityChange(from, to) {
    return (progress) => {
      this.opacity = from + progress * (to - from);
    };
  }

  cryOpacityChange(from, to) {
    return (progress) => {
      this.tear.opacity = from + progress * (to - from);
    };
  }

  scaleChange(from, to) {
    return (progress) => {
      this.scale = from + progress * (to - from);
    };
  }

  drawScene() {
    this.ctx.save();

    scale(this.ctx, this.scale, this.keyCircle.x, this.keyCircle.y);
    this.ctx.globalAlpha = this.opacity;

    this.drawKeyhole();

    this.ctx.beginPath();
    this.ctx.moveTo(this.trapezoidPosition.x + this.trapezoidW, this.trapezoidPosition.y + this.trapezoidH);
    this.ctx.lineTo(this.trapezoidPosition.x + this.trapezoidW - this.trapezoidIndent, this.trapezoidPosition.y);
    this.ctx.arc(this.keyCircle.x, this.keyCircle.y, this.keyCircle.r, Math.PI / 4, 3 * Math.PI / 2, true);
    this.ctx.lineTo(0, -WH);
    this.ctx.lineTo(0, WH);
    this.ctx.lineTo(WW / 2, WH);
    this.ctx.closePath();

    this.ctx.clip();
    this.drawCrocodile();
    this.drawCrocodileCry();
    this.ctx.restore();
  }

  drawKeyhole() {
    drawTrapezoid(this.ctx, this.trapezoidPosition.x, this.trapezoidPosition.y, this.trapezoidW, this.trapezoidH, this.trapezoidIndent);
    this.ctx.arc(this.keyCircle.x, this.keyCircle.y, this.keyCircle.r, 0, Math.PI * 2);
    this.ctx.fillStyle = `#a67ee5`;
    this.ctx.fill();
  }

  drawCrocodile() {
    this.ctx.drawImage(this.crocodile, this.crocodilePositionX, this.crocodilePositionY, this.crocodileSize, this.crocodileSize);
  }

  drawCrocodileCry() {
    const lineOffset = {
      x: percentOf(this.crocodileSize, 2.1),
      y: percentOf(this.tear.height, 40)
    };
    const cpOffset = {
      x: percentOf(this.crocodileSize, 3),
      y: percentOf(this.tear.height, 48)
    };
    const leftSide = {
      x: this.tear.position.x - lineOffset.x,
      y: this.tear.position.y + lineOffset.y,
    };
    const rightSide = {
      x: this.tear.position.x + lineOffset.x,
      y: this.tear.position.y + lineOffset.y,
    };
    const bottom = {
      x: this.tear.position.x,
      y: this.tear.position.y + this.tear.height
    };

    this.ctx.globalAlpha = this.tear.opacity;
    scale(this.ctx, this.tear.sizeIncrease, this.tear.position.x, this.tear.position.y);
    scale(this.ctx, this.tear.sizeDecrease, this.tear.position.x, this.tear.position.y + this.tear.height / 2);

    this.ctx.beginPath();
    this.ctx.moveTo(this.tear.position.x, this.tear.position.y);
    this.ctx.lineTo(leftSide.x, leftSide.y);
    this.ctx.quadraticCurveTo(leftSide.x - cpOffset.x, leftSide.y + cpOffset.y, bottom.x, bottom.y);
    this.ctx.quadraticCurveTo(rightSide.x + cpOffset.x, rightSide.y + cpOffset.y, rightSide.x, rightSide.y);
    this.ctx.closePath();

    this.ctx.fillStyle = this.tear.color;
    this.ctx.fill();
  }
}
