import * as THREE from 'three';
import {WW, WH} from './utils';

export default class Scene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = WW;
    this.canvas.height = WH;

    this.sceneImgs = [];

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, WW / WH, 0.1, 1000);
    this.camera.position.z = 1000;
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});

    this.render = this.render.bind(this);
    window.addEventListener(`resize`, this.onResize.bind(this));
  }

  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  start() {
    this.setRendererProperties();
    this.setScene();
    this.render();
    this.onResize();
  }

  setScene() {
    const geometry = new THREE.PlaneGeometry(WW, WH);
    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const planeMaterials = this.sceneImgs.map((path) => new THREE.RawShaderMaterial({
      uniforms: {
        map: {
          value: textureLoader.load(path)
        }
      },
      vertexShader: `
      uniform mat4 projectionMatrix;
      uniform mat4 modelMatrix;
      uniform mat4 viewMatrix;

      attribute vec3 position;
      attribute vec3 normal;
      attribute vec2 uv;

      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
      }`,
      fragmentShader: `
        precision mediump float;

        uniform sampler2D map;

        varying vec2 vUv;

        void main() {
          vec4 targetTexel = texture2D( map, vUv );

          gl_FragColor = targetTexel;
        }`
    }));

    planeMaterials.forEach((material, index) => {
      const plane = new THREE.Mesh(geometry, material);
      plane.position.x = WW * index;
      this.scene.add(plane);
    });
  }

  setRendererProperties() {
    const color = new THREE.Color(0x5f458c);
    const alpha = 1;

    this.renderer.setSize(WW, WH);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(color, alpha);
  }

  render() {
    this.animation = requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }

  stop() {
    cancelAnimationFrame(this.animation);
  }
}
