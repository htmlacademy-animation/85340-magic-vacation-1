import {WW, WH, rotate, percentOf} from '../helpers/utils';
import {animateDuration, animateEasing, runSerial} from '../helpers/run-functions';
import {elasticOut} from '../helpers/time-functions';

export default class Calf {
  constructor(ctx, duration, params) {
    this.ctx = ctx;
    this.duration = duration || 3000;

    this.img = new Image();
    this.img.src = params.src;
    this.imgH = this.imgW = params.size;
    this.angle = params.angle;
    this.imageX = (WW - this.imgW) / 2;
    this.imgYPos = {
      from: WH,
      to: (WH - this.imgH) / 2 + percentOf(WH, 12.5)
    };
  }

  animateScene() {
    const imageRotateAnimationArray = [
      () => animateDuration(this.imageRotateAnimation(this.angle, this.angle), 200),
      () => animateEasing(this.imageRotateAnimation(this.angle, 0), this.duration - 500, elasticOut(3)),
    ];

    animateEasing(this.imageYAnimation(this.imgYPos.from, this.imgYPos.to), this.duration, elasticOut(5));
    runSerial(imageRotateAnimationArray);
  }

  imageRotateAnimation(from, to) {
    return (progress) => {
      this.angle = from + progress * (to - from);
    };
  }

  imageYAnimation(from, toY) {
    return (progress) => {
      this.imageY = from + progress * (toY - from);
    };
  }

  drawScene() {
    this.ctx.save();

    rotate(this.ctx, this.angle, this.imageX + this.imgW / 2, this.imageY + this.imgH / 2);

    this.ctx.drawImage(this.img, this.imageX, this.imageY, this.imgW, this.imgH);
    this.ctx.restore();
  }
}
