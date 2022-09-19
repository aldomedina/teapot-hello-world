export type TSettings = {
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  speed: number;
  density: number;
  strength: number;
  frequency: number;
  amplitude: number;
  intensity: number;
  period: number;
  animated: boolean;
  firstColor: string;
  secondColor: string;
  thirdColor: string;
  fourthColor: string;
  backgroundColor: string;
  teapotFragments: number;
  bbboxRange: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  fov: number;
  border: boolean;
  borderColor: string;
};

export type Range = {
  min: number;
  max: number;
};

export type Ranges = {
  amplitude: Range;
  density: Range;
  fov: Range;
  frequency: Range;
  intensity: Range;
  scaleX: Range;
  scaleY: Range;
  scaleZ: Range;
  strength: Range;
};

export type TCompositionsID = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type TTexture = "lines" | "gradient";

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
};
