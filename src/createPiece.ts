import * as THREE from "three";
import { TeapotGeometry } from "three/examples/jsm/geometries/TeapotGeometry.js";
import createColorlinesMaterial from "./components/createColorlinesMaterial";
import createTwistedMaterial from "./components/createTwistedMaterial";
import createLinesTexture from "./components/createColorlinesMaterial/createLinesTexture";
import { TConfig } from "./types";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default async function createPiece(config: TConfig) {
  let material: THREE.ShaderMaterial;

  if (config.texture === "lines") {
    const url = await createLinesTexture(config.palette, config.stripes);
    new THREE.TextureLoader().load(url, (t) => {
      material = createColorlinesMaterial(config, t);
      generateTeapot(config, material);
    });
  } else {
    material = createTwistedMaterial(config);
    generateTeapot(config, material);
  }
}

const generateTeapot = (config: TConfig, material: THREE.ShaderMaterial) => {
  // THREE SCENE
  const sideSize = Math.min(window.innerHeight, window.innerWidth);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(config.fov, 1, 1, 10000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(sideSize, sideSize);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  const canvasDOM = document.getElementsByTagName("canvas")[0];
  canvasDOM.style.margin = "0 auto";

  // BG
  // switch (config.bgType) {
  //   case "white-gradient":
  //     canvasDOM.style.backgroundImage =
  //       "radial-gradient(circle, rgba(255,255,255,1) 50%, rgba(210,210,210,1)  100%)";
  //     break;
  //   case "random-gradient":
  //     canvasDOM.style.backgroundImage =
  //       "radial-gradient(circle, rgba(255,255,255,.9) 0%, rgba(0,0,0,0) 100%)";
  //   case "random-solid":
  //   case "random-gradient":
  //     canvasDOM.style.backgroundColor = config.backgroundColor;
  //     break;
  // }
  canvasDOM.style.backgroundColor = config.backgroundColor;
  const geometry = new TeapotGeometry(
    5,
    config.fragments,
    true,
    true,
    true,
    true
  );
  const teapot = new THREE.Mesh(geometry, material);
  teapot.scale.x = config.scaleX;
  teapot.scale.y = config.scaleY;
  teapot.scale.z = config.scaleZ;
  scene.add(teapot);

  // CAMERA
  // const controls = new OrbitControls(camera, renderer.domElement);
  // camera.position.z = 50;
  const [px, py, pz, tx, ty, tz] = config.camera;
  camera.position.set(px, py, pz);
  const target = new THREE.Object3D();
  target.position.set(tx, ty, tz);
  camera.lookAt(target.position);
  console.log(camera);

  function render() {
    renderer.render(scene, camera);
  }

  render();

  // RESIZE HANDLER
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    const sideSize = Math.min(window.innerHeight, window.innerWidth);
    camera.updateProjectionMatrix();
    renderer.setSize(sideSize, sideSize);
    render();
  }

  // TODO: TO BE REMOVED
  const colorDOM = document.getElementById("bg") as HTMLInputElement;
  colorDOM.addEventListener("change", (e) => {
    //@ts-ignore
    canvasDOM.style.backgroundColor = e.target.value;
  });
};
