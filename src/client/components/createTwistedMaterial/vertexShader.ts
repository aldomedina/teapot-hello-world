import noise from "../../utils/noise";

const vertexShader = `  
  varying float vDistort;
  
  varying vec2 vUv;
  
  uniform vec3 bboxMin;
  uniform vec3 bboxMax;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uNoiseDensity;
  uniform float uNoiseStrength;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uPeriod;
  
  ${noise}
  
  mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat3(
      c, 0.0, s,
      0.0, 1.0, 0.0,
      -s, 0.0, c
    );
  }
  
  vec3 rotateY(vec3 v, float angle) {
    return rotation3dY(angle) * v;
  }  
  
  void main() {
    float t = uTime * uSpeed;
    float distortion = pnoise((normal + t) * uNoiseDensity, vec3(uPeriod)) * uNoiseStrength;
    vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);

    // Disturb each vertex along the direction of its normal
    vec3 pos = position + (normal * distortion);
    float angle = sin(uv.y * uFrequency + t) * uAmplitude;
    pos = rotateY(pos, angle);    
    vDistort = distortion;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  }  
`;

export default vertexShader;
