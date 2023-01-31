// Import
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// @ts-ignore
// import { vertexShader, fragmentShader } from '../shaders/phong.glsl';
// @ts-ignore
import { vertexShader, fragmentShader } from '../shaders/texture.glsl';

export const shadersExample = () => {
    // Create a scene
    const scene = new THREE.Scene()
    // scene.background = new THREE.Color( 0xeeeeee )
    
    // Create a camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 2
    
    // Create a renderer and attach to a dom element
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update();

    // Add arrow helper for light
    // let modelPos = new THREE.Vector3(0, 0, 0);
    // let lightPos = new THREE.Vector3(2, 2, 2);
    // lightPos.normalize();
    // const dir = lightPos.sub(modelPos);
    // const origin = new THREE.Vector3( -2, -2, -2 );
    // const length = 1;
    // const hex = 0xffff00;
    // const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    // scene.add( arrowHelper );
    
    // Create a geometry
    const geometry = new THREE.BoxGeometry()
    // const geometry = new THREE.PlaneGeometry()
    // const geometry = new THREE.SphereGeometry()
    // const geometry = new THREE.DodecahedronGeometry(1, 10)
    // const geometry = new THREE.TorusGeometry()
    // const geometry = new THREE.TorusKnotGeometry()

    const gridTexture = new THREE.TextureLoader().load("img/grid.png")
    const earthTexture = new THREE.TextureLoader().load("img/earthSpecular.jpg")

    //Shader Material
    const material = new THREE.ShaderMaterial( {

        uniforms: {

            time: { value: 0 },
            mouse: { value: new THREE.Vector2() },
            lightPos: { value: new THREE.Vector3(-2, -2, -2) },
            cameraPos: { value: camera.position },
            image: {
                value: gridTexture
            },
            image2: {
                value: earthTexture
            }

        },
        
        // @ts-ignore
        // vertexShader: document.getElementById( 'vertexShader' ).textContent as string,
        // @ts-ignore
        // fragmentShader: document.getElementById( 'fragmentShader' ).textContent as string,

        vertexShader,
        fragmentShader

    } );
    //End Shader Material
    
    // Create a mesh (primitive shape)
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    
    // Add a light
    const light = new THREE.PointLight()
    light.position.set(2.5, 5, 2.5)
    scene.add(light)
    
    // Update the camera and renderer when the screen is resized
    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    }

    window.addEventListener('mousemove', (event) => {
        material.uniforms.mouse.value = new THREE.Vector2( event.clientX / window.innerWidth, event.clientY / window.innerHeight);
    })
    
    // Runs in a loop for animations
    function update() {
        requestAnimationFrame(update)

        material.uniforms.time.value += 1;

        material.uniforms.cameraPos.value = camera.position;

        

        render()
    }
    
    function render() {
        renderer.render(scene, camera)
    }
    
    update()
}
