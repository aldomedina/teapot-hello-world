import * as THREE from "three";
import { TeapotGeometry } from "three/examples/jsm/geometries/TeapotGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import createColorlinesMaterial from "./components/createColorlinesMaterial";
import createTwistedMaterial from "./components/createTwistedMaterial";
import { TConfig, TTexture } from "./types";
import handleCameraListener from "./utils/handleCameraListener";

export default function createPiece(
  config: TConfig,
  texture: TTexture,
  fragments: number,
  stripes: number,
  bgColor: string
) {
  // THREE SCENE
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
  canvasDOM.style.margin = "0 auto";

  // BORDER
  // canvasDOM.style.boxSizing = "border-box";
  // canvasDOM.style.border = "solid 4vh #EB0A60";
  // canvasDOM.style.backgroundImage =
  //   "radial-gradient( #FBF0BF, #FBF0BF,#EB7B3B)";

  // BG
  switch (bgColor) {
    case "white-gradient":
      canvasDOM.style.backgroundImage =
        "radial-gradient(circle, rgba(255,255,255,1) 50%, rgba(210,210,210,1)  100%)";
      break;
    case "random-gradient":
      canvasDOM.style.backgroundImage =
        "radial-gradient(circle, rgba(255,255,255,.9) 0%, rgba(0,0,0,0) 100%)";
    case "random-solid":
    case "random-gradient":
      canvasDOM.style.backgroundColor = config.backgroundColor;
      break;
  }

  // TEAPOT

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

  // Render scene
  function animate() {
    handleCameraListener(controls);
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
