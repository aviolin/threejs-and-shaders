export const vertexShader = /* GLSL vert shader */`
varying vec3 vPos;

void main()	{

    vPos = (modelMatrix * vec4(position, 1.0)).xyz;;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
`;

export const fragmentShader = /* GLSL frag shader */`
precision lowp float;
varying vec3 vPos;

void main() {
  
  if ( vPos.x > -14.3 && vPos.x < 14.3 ) {

    gl_FragColor = vec4(1.,1.,.5,.7);

  } else {

    gl_FragColor = vec4(0.,0.,0.,0.);

  }

}
`;