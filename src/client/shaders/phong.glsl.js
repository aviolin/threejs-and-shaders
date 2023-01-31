export const vertexShader = /* GLSL vert shader */`
uniform float time;
uniform vec2 mouse;
varying vec3 v_normal;
void main()	{

    v_normal = normal;    

    vec4 temp = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    // if (temp.x < .3) {

    //   temp.x += mouse.x;

    // }

    // temp.y += mouse.y;

    gl_Position = temp;
}
`;

export const fragmentShader = /* GLSL frag shader */`
precision lowp float;
uniform vec3 lightPos;
varying vec3 v_normal;

void main() {

  // AMBIENT lighting (global illuminance)

  vec3 ambient = vec3(0.2, 0.2, 0.2);

  
  
  // DIFFUSE (lambertian) lighting
  
  vec3 normal = normalize(v_normal);
  
  vec3 diffuseLightColor = vec3(1.0, 1.0, 1.0);

  float diffuseStrength = max(0.0, dot(lightPos, normal));

  vec3 diffuse = diffuseStrength * diffuseLightColor;



  // SPECULAR light

  vec3 viewSource = normalize(cameraPosition);

  vec3 reflectSource = normalize(reflect(-lightPos, normal));

  float specularStrength = max(0.0, dot(viewSource, reflectSource));

  specularStrength = pow(specularStrength, 256.0);

  vec3 specularLightColor = vec3(1.0, 1.0, 1.0);

  vec3 specular = specularStrength * specularLightColor;



  // LIGHTING = ambient + diffuse + specular

  vec3 lighting = vec3(0., 0., 0.); // no lighting

  // lighting = ambient;

  // lighting = ambient * 1.0 + diffuse;

  // lighting = ambient * 1.0 + diffuse * 0.0 + specular;

  // lighting = ambient * 0.5 + diffuse * 0.3 + specular * 1.;



  // OUTPUT = modelColor * lighting

  vec3 modelColor = vec3(0.75, 0.75, 0.75);

  vec3 color = modelColor * lighting;

  gl_FragColor = vec4(color, 1.0);
  
}
`;