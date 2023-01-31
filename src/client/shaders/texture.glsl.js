export const vertexShader = /* GLSL vert shader */`
uniform float time;
uniform vec2 mouse;
varying vec2 vUv;

void main()	{

    vUv = uv;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
`;

export const fragmentShader = /* GLSL frag shader */`
precision lowp float;
uniform float time;
uniform vec2 mouse;
uniform sampler2D image;
uniform sampler2D image2;
varying vec2 vUv;

void main() {
  
  // if ( vUv.x > mouse.x ) {    //  abs(sin(time / 100.))
  
  //   gl_FragColor = texture2D(image, vUv); 
    
  // } else {

  //   gl_FragColor = texture2D(image2, vUv); 

  // }


  

  // vec4 alphaMap = texture2D(image2, vUv);

  // if ( alphaMap.r > .5 ) {

  //   gl_FragColor = texture2D(image, vUv);

  // } else {

  //   gl_FragColor = texture2D(image2, vUv);

  // }




  gl_FragColor = texture2D(image, vUv); 

}
`;