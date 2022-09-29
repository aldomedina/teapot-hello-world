export type TCompositionName =
  | "squigg"
  | "Isometric Pot"
  | "Petal Pot"
  | "Scaled X Zaha"
  | "Stretched Blobby"
  | "Blobby"
  | "Space Gordita"
  | "Gordita"
  | "Stretched Flat Butterfly"
  | "Flat Cactus"
  | "Spiky Sun"
  | "Pot on the Sun";

export type TCompositionsID = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Range = {
  min: number;
  max: number;
};

export type Ranges = {
  amplitude: number[];
  density: number[];
  fov: number[];
  frequency: number[];
  intensity: number[];
  scaleX: number[];
  scaleY: number[];
  scaleZ: number[];
  strength: number[];
};

export interface TComposition extends Ranges {
  id: TCompositionsID;
  name: TCompositionName;
  camera: number[][];
  texture: TTexture[];
}

export type TTexture = "lines" | "gradient";

export type TBgType =
  | "random-solid"
  | "random-gradient"
  | "white-solid"
  | "white-gradient";

export type TConfig = {
  fov: number;
  density: number;
  strength: number;
  frequency: number;
  amplitude: number;
  intensity: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  numberOfStripes: number;
  palette: string[];
  backgroundColor: string;
  texture: TTexture;
  bgType: TBgType;
  fragments: number;
  stripes: number;
  camera: number[];
};
