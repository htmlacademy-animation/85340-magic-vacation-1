import {WW, WH, percentOf} from './helpers/utils';
import {animateDuration} from './helpers/run-functions';

import Calf from './win-scene/calf';
import Airplane from './win-scene/airplane';
import Snowflake from './win-scene/snowflake';

const IMG_PATH = `img/win-primary/`;
const AIRPLANE_DURATION = 800;
const CALF_DURATION = 3000;

export default class WinScene {
  constructor(duration) {
    this.duration = duration || 60000;

    this.canvas = document.getElementById(`winScene`);
    this.ctx = this.canvas.getContext(`2d`);
    this.canvas.width = WW;
    this.canvas.height = WH;
  }

  run() {
    const scenes = {};

    scenes.calf = new Calf(this.ctx, CALF_DURATION, {
      src: `${IMG_PATH}sea-calf-on-ice.png`,
      size: Math.round(percentOf(WW, 35)),
      angle: 30
    });

    scenes.airplane = new Airplane(this.ctx, AIRPLANE_DURATION, {
      src: `${IMG_PATH}airplane.png`,
      size: Math.round(percentOf(WW, 9.5))
    });

    scenes.snowflakeLeft = new Snowflake(this.ctx, this.duration, {
      src: `${IMG_PATH}snowflake.png`,
      size: Math.round(percentOf(WW, 10)),
      position: {
        x: WW / 2 - percentOf(WW, 23.7),
        y: WH / 2,
        offset: percentOf(WH, 1.2)
      },
      skew: 0.3,
      timeout: 0
    });

    scenes.snowflakeRight = new Snowflake(this.ctx, this.duration - 300, {
      src: `${IMG_PATH}snowflake.png`,
      size: Math.round(percentOf(WW, 8)),
      position: {
        x: WW / 2 + percentOf(WW, 21),
        y: WH / 2 + percentOf(WH, 22.5),
        offset: percentOf(WH, 1.5)
      },
      skew: 0.2,
      rotate: 180,
      timeout: 300
    });

    scenes.calf.animateScene();
    setTimeout(() => scenes.airplane.animateScene(), CALF_DURATION / 8);
    setTimeout(() => scenes.snowflakeLeft.animateScene(), CALF_DURATION / 6);
    setTimeout(() => scenes.snowflakeRight.animateScene(), CALF_DURATION / 6);

    animateDuration(this.draw.bind(this, scenes), this.duration);
  }

  draw(scenes) {
    this.ctx.clearRect(0, 0, WW, WH);
    this.ctx.save();

    scenes.airplane.drawScene();
    scenes.calf.drawScene();

    scenes.snowflakeLeft.drawScene();
    scenes.snowflakeRight.drawScene();

    this.ctx.restore();
  }
}
