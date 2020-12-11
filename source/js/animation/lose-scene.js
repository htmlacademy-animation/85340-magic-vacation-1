import {WW, WH, percentOf} from './helpers/utils';
import {animateDuration} from './helpers/run-functions';

import Keyhole from './lose-scene/keyhole';
import Toy from './lose-scene/toy';

const IMG_PATH = `img/lose-images/`;
const KEY_DURATION = 1500;
const TOY_DURATION = 1000;

export default class LoseScene {
  constructor(duration) {
    this.duration = duration || 10000;

    this.canvas = document.getElementById(`loseScene`);
    this.ctx = this.canvas.getContext(`2d`);
    this.canvas.width = WW;
    this.canvas.height = WH;
  }

  getScenes() {
    return {
      keyhole: new Keyhole(this.ctx, KEY_DURATION, {
        crocodileSrc: `${IMG_PATH}crocodile.png`,
        crocodileSize: percentOf(WW, 39)
      }),

      flamingo: new Toy(this.ctx, TOY_DURATION, {
        src: `${IMG_PATH}flamingo.png`,
        size: percentOf(WW, 8),
        position: {
          x: WW / 2 - percentOf(WW, 19.7),
          y: WH / 2 - percentOf(WH, 12)
        },
      }),

      watermelon: new Toy(this.ctx, TOY_DURATION, {
        src: `${IMG_PATH}watermelon.png`,
        size: percentOf(WW, 6.5),
        position: {
          x: WW / 2 - percentOf(WW, 26),
          y: WH / 2 + percentOf(WH, 13.5)
        },
      }),

      snowflake: new Toy(this.ctx, TOY_DURATION, {
        src: `${IMG_PATH}snowflake.png`,
        size: percentOf(WW, 6),
        position: {
          x: WW / 2 + percentOf(WW, 9.5),
          y: WH / 2 - percentOf(WH, 1)
        },
      }),

      leaf: new Toy(this.ctx, TOY_DURATION, {
        src: `${IMG_PATH}leaf.png`,
        size: percentOf(WW, 8),
        position: {
          x: WW / 2 + percentOf(WW, 21),
          y: WH / 2 - percentOf(WH, 21)
        },
      }),

      saturn: new Toy(this.ctx, TOY_DURATION, {
        src: `${IMG_PATH}saturn.png`,
        size: percentOf(WW, 8.5),
        position: {
          x: WW / 2 + percentOf(WW, 19),
          y: WH / 2 + percentOf(WH, 16.5)
        },
      })
    };
  }

  run() {
    const scenes = this.getScenes();

    scenes.keyhole.animateScene();
    setTimeout(() => {
      scenes.flamingo.animateScene();
      scenes.watermelon.animateScene();
      scenes.snowflake.animateScene();
      scenes.leaf.animateScene();
      scenes.saturn.animateScene();
    }, percentOf(KEY_DURATION, 10));

    animateDuration(this.draw.bind(this, scenes), this.duration);
  }

  draw(scenes) {
    this.ctx.clearRect(0, 0, WW, WH);
    this.ctx.save();

    for (const name of Object.keys(scenes)) {
      scenes[name].drawScene();
    }

    this.ctx.restore();
  }
}
