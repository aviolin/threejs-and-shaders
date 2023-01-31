// Import
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// @ts-ignore
// import { vertexShader, fragmentShader } from '../shaders/car.glsl';

export const modelsExample = () => {

    const scene = new THREE.Scene()

    const pointLight = new THREE.PointLight() //new THREE.SpotLight();
    pointLight.position.set(-12.5, 25, 12.5)
    pointLight.intensity = 2500; // 500
    // pointLight.castShadow = true;
    // pointLight.shadow.mapSize.width = 2048;
    // pointLight.shadow.mapSize.height = 2048;
    scene.add(pointLight)

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 50
    camera.position.y = 50

    const renderer = new THREE.WebGLRenderer()
    // renderer.physicallyCorrectLights = true
    // renderer.shadowMap.enabled = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)

    // const materialMain = new THREE.MeshToonMaterial({
    //     color: 0xffffff,
    //     wireframe: false,
    // })

    // Separate object materials
    // const materialMain = new THREE.MeshStandardMaterial({
    //     color: 0xffffff,
    //     wireframe: false,
    // })
    // const materialGrass = new THREE.MeshLambertMaterial({
    //     color: 0x00ff00,
    //     wireframe: false,
    // })
    // const materialCar = new THREE.MeshLambertMaterial({
    //     color: 0xffffff,
    //     wireframe: false,
    // })

    // const texture = new THREE.TextureLoader().load("img/grid.png")
    // materialCar.map = texture

    // const materialCar = new THREE.ShaderMaterial({
    //     uniforms: {
    //         image: {
    //             value: texture
    //         }
    //     },

    //     vertexShader,
    //     fragmentShader
    // })
    // materialCar.transparent = true;

    // let car: THREE.Mesh | null = null;


    const loader = new GLTFLoader()
    loader.load(
        'models/blender-example.glb',
        function (gltf) {
            // gltf.scene.traverse(function (child) {
            //     if ((child as THREE.Mesh).isMesh) {
            //         const m = child as THREE.Mesh
            //         m.material = materialMain;
            //         m.receiveShadow = true
            //         m.castShadow = true

            //         // if (child.name === 'Ground__Lawn') {
            //         //     m.material = materialGrass;
            //         // }
            //         // if (child.name === 'Body002') {
            //         //     m.material = materialCar;
            //         //     car = (child as THREE.Mesh);
            //         //     m.castShadow = false;
            //         // }
            //     }
            //     if ((child as THREE.Light).isLight) {
            //         // const l = child as THREE.Light
            //         // l.castShadow = true
            //         // l.shadow.bias = -0.003
            //         // l.shadow.mapSize.width = 2048
            //         // l.shadow.mapSize.height = 2048
            //     }
            // })
            // console.log(gltf);
            scene.add(gltf.scene)
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )

    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    }

    // let isMovingCar = false;
    // window.addEventListener('keydown', (event) => {
    //     if (car) {
    //         switch (event.code) {
    //             case "KeyG":
    //                 isMovingCar = true;
    //                 break
    //         }
    //     }
    // });
    // const clock = new THREE.Clock;

    function animate() {
        requestAnimationFrame(animate)

        controls.update()

        // if (isMovingCar && car) {
        //     car.position.x += 10 * clock.getDelta();

        //     if (car.position.x > 20) {
        //         car.position.x = -20;
        //     }
        // }

        render()
    }

    function render() {
        renderer.render(scene, camera)
    }

    animate()
}