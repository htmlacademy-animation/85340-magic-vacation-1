import {rotate} from '../helpers/utils';
import {animateLinear} from '../helpers/run-functions';

export default class Snowflake {
  constructor(ctx, duration, params) {
    this.ctx = ctx;
    this.duration = duration || 10000;

    this.img = new Image();
    this.img.src = params.src;
    this.imgH = this.imgW = params.size;
    this.position = params.position;
    this.scale = params.scale;
    this.skew = params.skew;
    this.rotate = params.rotate;
    this.timeout = params.timeout;
  }

  animateScene() {
    animateLinear(this.opacityChange(0, 1), 1000);
    setTimeout(() => {
      animateLinear(this.positionYAnimation(this.position.y, this.position.y + this.position.offset), this.duration);
    }, this.timeout);
  }

  positionYAnimation(from, to) {
    return (progress) => {
      this.positionY = from + Math.abs(from - to) * Math.sin(progress * this.duration / 1000 * Math.PI);
    };
  }

  opacityChange(from, to) {
    return (progress) => {
      this.opacity = from + progress * (to - from);
    };
  }

  drawScene() {
    this.ctx.save();
    if (this.rotate) {
      rotate(this.ctx, this.rotate, this.position.x, this.positionY);
    }

    this.ctx.transform(1, -this.skew, this.skew, 1, this.position.x, this.positionY);
    this.ctx.globalAlpha = this.opacity;

    this.ctx.drawImage(this.img, 0, 0, this.imgW, this.imgH);
    this.ctx.restore();
  }
}
