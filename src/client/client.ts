import createPiece from "./createPiece";
import createConfig from "./system/createConfig";

const form = document.querySelector("form.select-form") as HTMLFormElement;
const stripesDOM = document.getElementById("stripes") as HTMLInputElement;
const dsDOM = document.getElementById("ds") as HTMLInputElement;

stripesDOM.addEventListener("input", (e) => {
  const { value } = e.target as HTMLInputElement;
  dsDOM.value = value;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const {
    composition: { value: compositionId },
    texture: { value: texture },
    fragments: { value: fragments },
    stripes: { value: stripes },
    bgColor: { value: bgColor },
  } = form;

  const config = createConfig(Number(compositionId), texture);
  const canvasDOM = document.getElementsByTagName("canvas")[0];
  if (canvasDOM) {
    canvasDOM.remove();
  }
  createPiece(config, texture, Number(fragments), Number(stripes), bgColor);
});

const uiCheckbox = document.querySelector("#ui") as HTMLInputElement;
const cameraDOM = document.querySelector(".camera") as HTMLDivElement;
const handleUIChange = (e: Event) => {
  if (uiCheckbox.checked) {
    form.style.opacity = "1";
    cameraDOM.style.opacity = "1";
  } else {
    form.style.opacity = "0";
    cameraDOM.style.opacity = "0";
  }
};
uiCheckbox.addEventListener("change", (e) => handleUIChange(e));
