const fragmentShader = `
  #define LINEAR_TO_SRGB(c) pow((c), vec3(1.0 / 2.2))
  
  varying float vDistort;
  varying vec2 vUv;      

  uniform vec3 firstColor;
  uniform vec3 secondColor;
  uniform vec3 thirdColor;
  uniform vec3 fourthColor;
  uniform float uTime;
  uniform float uIntensity;
  
  void main() {
    float h = 0.33; // adjust position of middleColor
    float distort = vDistort * uIntensity;
    
    vec3 col1 = mix(mix(firstColor, secondColor, vUv.y/h), mix(secondColor, thirdColor, (vUv.y - h)/(1.0 - h*2.0)), step(h, vUv.y));  
    vec3 col2 = mix(mix(thirdColor, fourthColor, (vUv.y - h)/(1.0 - h*2.0)), mix(thirdColor, fourthColor, (vUv.y - h*2.0)/(1.0-h*2.0)), step(h*2.0, vUv.y));
    vec3 finalColor = mix(col1,col2,distort);
    
    finalColor = LINEAR_TO_SRGB(finalColor);

    gl_FragColor = vec4(finalColor, 1.0);
  }  
`;

export default fragmentShader;
