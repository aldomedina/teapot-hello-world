import { TSettings } from "../types";

export const initialSettings: TSettings = {
  cameraX: 0,
  cameraY: 0,
  cameraZ: 50,
  speed: 0.2,
  density: 0.2, // min 0.1
  strength: 10.5,
  frequency: 0.1,
  amplitude: 3.0,
  intensity: 0.5,
  period: 10,
  animated: false,
  firstColor: "#F25E5E",
  secondColor: "#F29F05",
  thirdColor: "#F28705",
  fourthColor: "#F25E5E", // Visible desde strg > 2. Los colores estan ajustados a la distorsión
  teapotFragments: 105,
  bbboxRange: 5,
  scaleX: 1, // fixed value
  scaleY: 1, // fixed value
  scaleZ: 1,
  fov: 30,
  backgroundColor: "#f2f2f2",
  border: false,
  borderColor: "#C3FE48",
};
