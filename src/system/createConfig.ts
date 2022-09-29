import { TCompositionsID, TConfig, TTexture } from "../types";
import stripesColors from "./colors";
import gradientColors from "./gradientColors";
import { Random } from "./Random";
import ranges from "./ranges";

const bgTypes = [
  "random-solid",
  "random-gradient",
  "white-solid",
  "white-gradient",
];

export default function createConfig(
  compositionId: number,
  paeltteIndex: number
): TConfig | undefined {
  const R = new Random();

  const composition: any = ranges.find((el) => el.id === compositionId);
  if (!composition) return;
  let config: any = {};
  Object.keys(composition).map((el) => {
    if (el === "name" || el === "id") return;
    if (el === "camera" || el === "texture") {
      config[el] = R.random_choice(composition[el]);
    } else {
      config[el] = R.random_num(composition[el][0], composition[el][1]);
    }
  });

  //  ----------LOGICA POR DEFINIR-----------
  const bgType = R.random_choice(bgTypes);
  config.bgType = bgType;
  //  -------------------------------------

  const stripes = R.random_int(100, 150);
  config.stripes = stripes;

  const fragments = 205;
  config.fragments = fragments;

  config.texture = "lines";
  let palette = stripesColors[paeltteIndex];
  let backgroundColor = palette[0];
  // let palette =
  //   config.texture === "lines"
  //     ? R.random_choice(stripesColors)
  //     : R.random_choice(gradientColors);
  // const backgroundColor = palette[0];
  // palette = palette.slice(1, palette.length);

  // Shuffle palette with AB Random
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
