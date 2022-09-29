import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const posX = document.getElementById("px") as HTMLInputElement;
const posY = document.getElementById("py") as HTMLInputElement;
const posZ = document.getElementById("pz") as HTMLInputElement;
const targetX = document.getElementById("tx") as HTMLInputElement;
const targetY = document.getElementById("ty") as HTMLInputElement;
const targetZ = document.getElementById("tz") as HTMLInputElement;

let npx = 0,
  npy = 0,
  npz = 0,
  ntx = 0,
  nty = 0,
  ntz = 0;

export default function handleCameraListener(controls: OrbitControls) {
  if (controls.object.position.x !== npx) {
    posX.value = controls.object.position.x.toString();
    npx = controls.object.position.x;
  }

  if (controls.object.position.y !== npy) {
    posY.value = controls.object.position.y.toString();
    npy = controls.object.position.y;
  }

  if (controls.object.position.z !== npz) {
    posZ.value = controls.object.position.z.toString();
    npz = controls.object.position.z;
  }

  if (controls.target.x !== ntx) {
    targetX.value = controls.target.x.toString();
    npx = controls.target.x;
  }
  if (controls.target.y !== nty) {
    targetY.value = controls.target.y.toString();
    npy = controls.target.x;
  }
  if (controls.target.z !== ntz) {
    targetZ.value = controls.target.z.toString();
    npz = controls.target.z;
  }
}
