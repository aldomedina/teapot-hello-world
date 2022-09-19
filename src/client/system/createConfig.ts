import { TCompositionsID, TTexture } from "../types";
import palettes from "./colors";
import { Random } from "./Random";
import ranges from "./ranges";

export default function createConfig(compositionId: number, texture: TTexture) {
  const R = new Random();

  // 1.1 Select composition's ranges
  const composition: any = ranges.find((el) => el.id === compositionId);
  if (!composition) return;
  let config: any = {};
  Object.keys(composition).map((el) => {
    if (el === "name" || el === "id") return;
    config[el] = R.random_num(composition[el].min, composition[el].max);
  });

  // 1.2 Generate number of stripes
  // const numberOfStripes = 20;
  // const numberOfStripes = R.random_int(20, 100);
  // config.numberOfStripes = numberOfStripes;

  // 2.1 Select palette acording the texture type
  let paletteIndex = R.random_int(0, palettes.length - 1);
  let palette = palettes[paletteIndex];

  console.log("🎨 PALETTE INDEX: ", paletteIndex);
  console.log("🎨 ORDERED PALETTE:", palette);

  palette = texture === "lines" ? palette : palette.slice(0, 5);
  const backgroundColor = R.random_choice(palette);

  // 2.2 Shuffle palette with AB Random
  let paletteOrder: number[] = [];
  let index = R.random_int(0, palette.length - 1);
  for (let i = 0; i < palette.length; i++) {
    while (paletteOrder.includes(index)) {
      index = R.random_int(0, palette.length - 1);
    }
    paletteOrder.push(index);
  }
  const shuffledPalette = paletteOrder.map((ni) => palette[ni]);
  config.palette = shuffledPalette;
  config.backgroundColor = backgroundColor;

  console.log("⚙️ CONFIG:", config);
  return config;
}
