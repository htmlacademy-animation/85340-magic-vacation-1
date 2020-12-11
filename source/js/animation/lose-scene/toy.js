import {WW, WH, scale, percentOf} from '../helpers/utils';
import {animateEasing, animateLinear} from '../helpers/run-functions';
import {power} from '../helpers/time-functions';

export default class Toy {
  constructor(ctx, duration, params) {
    this.ctx = ctx;
    this.duration = duration || 1000;

    this.img = new Image();
    this.img.src = params.src;
    this.imgSize = params.size;
    this.position = params.position;
  }

  animateScene() {
    animateLinear(this.scaleChange(0, 1), this.duration / 2);

    setTimeout(() => {
      animateEasing(this.dropAnimation(this.position.y, WH + this.position.y), percentOf(this.duration, 70), power(3));
    }, this.duration / 2 + 200);
  }

  scaleChange(from, to) {
    return (progress) => {
      this.scale = from + progress * (to - from);
    };
  }

  dropAnimation(from, to) {
    return (progress) => {
      this.position.y = from + progress * (to - from);
    };
  }

  drawScene() {
    this.ctx.save();

    scale(this.ctx, this.scale, WW / 2, WH / 2);
    this.ctx.drawImage(this.img, this.position.x, this.position.y, this.imgSize, this.imgSize);

    this.ctx.restore();
  }
}
