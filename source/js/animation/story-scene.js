import {WW} from './helpers/utils';
import Scene from './helpers/scene';

export default class storyScene extends Scene {
  constructor() {
    super(`storyScene`);

    this.sceneImgs = [
      `img/story/scene-1.png`,
      `img/story/scene-2.png`,
      `img/story/scene-3.png`,
      `img/story/scene-4.png`,
    ];
  }

  render() {
    this.animation = requestAnimationFrame(this.render);

    document.body.addEventListener(`slideChange`, (ev) => {
      this.camera.position.x = WW * (ev.detail.active / 2);
    });

    this.renderer.render(this.scene, this.camera);
  }
}
