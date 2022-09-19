import { TextureLoader } from "three";

export default function createTexture(palette: string[]) {
  const sideSize = Math.min(window.innerHeight, window.innerWidth);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = sideSize;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const numberOfStripes = 800;
  let activePaletteIndex = 0;
  for (let i = 0; i < numberOfStripes; i++) {
    const thickness = sideSize / numberOfStripes;
    ctx.beginPath();
    ctx.strokeStyle = palette[activePaletteIndex];
    activePaletteIndex++;
    if (activePaletteIndex === palette.length) {
      activePaletteIndex = 0;
    }
    ctx.lineWidth = thickness;
    ctx.moveTo(0, i * thickness + thickness / 2);
    ctx.lineTo(sideSize, i * thickness + thickness / 2);
    ctx.stroke();
  }
  const url = canvas.toDataURL();
  const texture = new TextureLoader().load(url);
  return texture;
}
