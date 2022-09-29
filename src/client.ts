import createPiece from "./createPiece";
import createConfig from "./system/createConfig";
import { TTexture } from "./types";

const form = document.querySelector("form.select-form") as HTMLFormElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const config = createConfig(
    Number(form.composition.value),
    Number(form.palette.value)
  );
  if (!config) {
    console.error("Something went wrong");
    return;
  }

  // RESET CANVAS
  const canvasDOM = document.getElementsByTagName("canvas")[0];
  if (canvasDOM) {
    canvasDOM.remove();
  }

  createPiece(config);
});
