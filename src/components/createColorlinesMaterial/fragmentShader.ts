const fragmentShader = `
  varying vec2 vUv;      
  uniform sampler2D uTexture;
  uniform float uAlpha;
  
  void main() {
    vec3 color = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(color, 1.);
  }  
`;

export default fragmentShader;
