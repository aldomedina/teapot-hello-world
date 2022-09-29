import {
  Color,
  DoubleSide,
  ShaderMaterial,
  ShaderLib,
  UniformsUtils,
  TextureLoader,
  Texture,
} from "three";
import { TConfig } from "../../types";
import createLinesTexture from "./createLinesTexture";
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";

export default function createColorlinesMaterial(
  config: TConfig,
  texture: Texture
) {
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: DoubleSide,
    uniforms: {
      uTexture: {
        value: texture,
      },
      uTime: { value: 0 },
      uSpeed: { value: 0.2 },
      uNoiseDensity: { value: config.density },
      uNoiseStrength: { value: config.strength },
      uFrequency: { value: config.frequency },
      uAmplitude: { value: config.amplitude },
      uIntensity: { value: config.intensity },
      uPeriod: { value: 10 },
      bboxMin: {
        value: {
          x: 0,
          y: -5,
          z: -6.349206447601318,
        },
      },
      bboxMax: {
        value: {
          x: 10.901825904846191,
          y: 5,
          z: 0.349206447601318,
        },
      },
    },
  });
  return material;
}
