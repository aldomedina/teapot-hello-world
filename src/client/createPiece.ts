import * as THREE from "three";
import { TeapotGeometry } from "three/examples/jsm/geometries/TeapotGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import createColorlinesMaterial from "./components/createColorlinesMaterial";
import createTwistedMaterial from "./components/createTwistedMaterial";
import { TConfig, TTexture } from "./types";

export default function createPiece(
  config: TConfig,
  texture: TTexture,
  fragments: number,
  stripes: number,
  bgColor: string
) {
  // Scene settings
  const sideSize = Math.min(window.innerHeight, window.innerWidth);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(config.fov, 1, 1, 10000);
  camera.position.z = 50;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const controls = new OrbitControls(camera, renderer.domElement);
  renderer.setSize(sideSize, sideSize);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  const canvasDOM = document.getElementsByTagName("canvas")[0];
  canvasDOM.style.boxSizing = "border-box";
  canvasDOM.style.margin = "0 auto";
  canvasDOM.style.backgroundColor = config.backgroundColor;
  // if (bgColor === "random") {
  //   canvasDOM.style.backgroundImage =
  //     "radial-gradient(circle, rgba(255,255,255,.9) 0%, rgba(0,0,0,0) 100%)";
  // } else {
  //   canvasDOM.style.backgroundImage =
  //     "radial-gradient(circle, rgba(255,255,255,1) 50%, rgba(176,174,174,1)  100%)";
  // }

  // canvasDOM.style.border = "solid 4vh #EB0A60";
  // canvasDOM.style.backgroundImage =
  //   "radial-gradient( #FBF0BF, #FBF0BF,#EB7B3B)";

  // Create Teapot

  const material =
    texture === "gradient"
      ? createTwistedMaterial(config)
      : createColorlinesMaterial(config, stripes);
  const geometry = new TeapotGeometry(5, fragments, true, true, true, true);
  const teapot = new THREE.Mesh(geometry, material);
  teapot.scale.x = config.scaleX;
  teapot.scale.y = config.scaleY;
  teapot.scale.z = config.scaleZ;
  scene.add(teapot);

  // Create BG
  // const bg_material = new THREE.MeshStandardMaterial({
  //   color: 0xfefefe,
  // });
  // const bg_geometry = new THREE.PlaneGeometry(1000, 1000);
  // const bg = new THREE.Mesh(bg_geometry, bg_material);
  // bg.position.z = -100;

  // const spotLight = new THREE.SpotLight(0xffffff);
  // spotLight.target = bg;
  // spotLight.intensity = 1.2;
  // spotLight.decay = 0.1;
  // spotLight.position.set(0, 0, -40);

  // scene.add(bg, spotLight, spotLight.target);

  // Render scene
  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }

  animate();

  // RESIZE HANDLER
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    const sideSize = Math.min(window.innerHeight, window.innerWidth);
    camera.updateProjectionMatrix();
    renderer.setSize(sideSize, sideSize);
    render();
  }
}
