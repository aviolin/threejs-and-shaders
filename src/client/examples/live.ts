// Import
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'


export const liveExample = () => {
    // Create a scene
    const scene = new THREE.Scene()
    // scene.background = new THREE.Color( 0x770077 )
    
    // Create a camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 4
    
    // Create a renderer and attach to a dom element
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // const controls = new OrbitControls(camera, renderer.domElement)
    // controls.enableDamping = true
    // controls.update();

    // const pointerLockControls = new PointerLockControls(camera, renderer.domElement)
    // const onKeyDown = function (event: KeyboardEvent) {
    // switch (event.code) {
    //     case "KeyW":
    //         pointerLockControls.moveForward(.25)
    //         break
    //     case "KeyA":
    //         pointerLockControls.moveRight(-.25)
    //         break
    //     case "KeyS":
    //         pointerLockControls.moveForward(-.25)
    //         break
    //     case "KeyD":
    //         pointerLockControls.moveRight(.25)
    //         break
    //     case "Space":
    //         pointerLockControls.lock()
    //     }
    // }
    // document.addEventListener('keydown', onKeyDown, false)


    // Add some helpers
    // scene.add(new THREE.AxesHelper(5)) 

    // const dir = new THREE.Vector3( 1, 2, 0 );
    // dir.normalize();
    // const origin = new THREE.Vector3( 0, 0, 0 );
    // const length = 1;
    // const hex = 0xffff00;
    // const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    // scene.add( arrowHelper );

    // const gridHelper = new THREE.GridHelper( 10, 10 );
    // scene.add( gridHelper );
    
    // Create a geometry
    const geometry = new THREE.BoxGeometry()
    // const geometry = new THREE.PlaneGeometry()
    // const geometry = new THREE.CapsuleGeometry()
    // const geometry = new THREE.ConeGeometry()
    // const geometry = new THREE.SphereGeometry()
    // const geometry = new THREE.DodecahedronGeometry()
    // const geometry = new THREE.TorusGeometry()
    // const geometry = new THREE.TorusKnotGeometry()
    // const geometry = new THREE.BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    // const vertices = new Float32Array( [
    //     -1.0, -1.0,  1.0,
    //      1.0, -1.0,  1.0,
    //      1.0,  1.0,  1.0,
    
    //      1.0,  1.0,  1.0,
    //     -1.0,  1.0,  1.0,
    //     -1.0, -1.0,  1.0
    // ] );
    // itemSize = 3 because there are 3 values (components) per vertex
    // geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    
    // Create a material
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
    })
    // material.side = THREE.DoubleSide;

    // const material = new THREE.MeshLambertMaterial({
    //     color: 0xffffff,
    //     wireframe: false,
    // })
    // const material = new THREE.MeshPhongMaterial({
    //     color: 0x00ffff,
    //     wireframe: false,
    // })
    // const material = new THREE.MeshStandardMaterial({
    //     color: 0x00ffff,
    //     wireframe: false,
    // })
    // const material = new THREE.MeshToonMaterial({
    //     color: 0x00ffff,
    //     wireframe: false,
    // })

    // const texture = new THREE.TextureLoader().load("img/grid.png")
    // material.map = texture

    // const envTexture = new THREE.CubeTextureLoader().load(["img/px_50.png", "img/nx_50.png", "img/py_50.png", "img/ny_50.png", "img/pz_50.png", "img/nz_50.png"])
    // envTexture.mapping = THREE.CubeReflectionMapping
    // envTexture.mapping = THREE.CubeRefractionMapping
    // material.envMap = envTexture
    
    // Create a mesh (primitive shape)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    
    // Add a light
    // const light = new THREE.PointLight()
    // light.position.set(2.5, 5, 2.5)
    // scene.add(light)

    // const ambient = new THREE.AmbientLight();
    // ambient.intensity = .2;
    // scene.add(ambient);

    // const directionalLight = new THREE.DirectionalLight(0xff7700, 1);
    // scene.add(directionalLight);
    
    // Update the camera and renderer when the screen is resized
    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    }
    
    
    // Runs in a loop for animations
    function update() {
        requestAnimationFrame(update)
        
        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01
        
        // pointerLockControls.update()
    
        render()
    }
    
    function render() {
        renderer.render(scene, camera)
    }
    
    update()
}