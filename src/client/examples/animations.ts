import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GUI } from 'dat.gui'
// @ts-ignore
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'

export const animationsExample = () => {

    const scene = new THREE.Scene()

    const light1 = new THREE.PointLight() //new THREE.SpotLight();
    light1.position.set(2.5, 5, 2.5)
    light1.castShadow = true;
    light1.shadow.mapSize.width = 1024;
    light1.shadow.mapSize.height = 1024;
    scene.add(light1)

    const light2 = new THREE.PointLight() //new THREE.SpotLight();
    light2.position.set(-2.5, 5, 2.5)
    scene.add(light2)

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.set(8, 14, 10)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.target.set(0, 1, 0)

    const sceneMeshes: THREE.Mesh[] = []

    const planeGeometry = new THREE.PlaneGeometry(25, 25)
    const texture = new THREE.TextureLoader().load("img/grid.png")
    const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({ map: texture }))
    plane.rotateX(-Math.PI / 2)
    plane.receiveShadow = true
    scene.add(plane)
    sceneMeshes.push(plane)

    let mixer: THREE.AnimationMixer
    let modelReady = false
    let modelMesh: THREE.Object3D
    const animationActions: THREE.AnimationAction[] = []
    let activeAction: THREE.AnimationAction
    let lastAction: THREE.AnimationAction
    const gltfLoader = new GLTFLoader()

    gltfLoader.load(
        'models/dragon_animated.glb',
        (gltf) => {
            gltf.scene.scale.set(.1,.1,.1)
            gltf.scene.traverse(function (child) {
                if ((child as THREE.Mesh).isMesh) {
                    let m = child as THREE.Mesh
                    m.castShadow = true
                }
            })

            mixer = new THREE.AnimationMixer(gltf.scene)

            let tempAnimationAction = mixer.clipAction((gltf as any).animations[0])
            animationActions.push(tempAnimationAction)
            animationsFolder.add(animations, 'fly')

            tempAnimationAction = mixer.clipAction((gltf as any).animations[1])
            animationActions.push(tempAnimationAction)
            animationsFolder.add(animations, 'idle')

            tempAnimationAction = mixer.clipAction((gltf as any).animations[2])
            animationActions.push(tempAnimationAction)
            animationsFolder.add(animations, 'run')

            tempAnimationAction = mixer.clipAction((gltf as any).animations[3])
            animationActions.push(tempAnimationAction)
            animationsFolder.add(animations, 'walk')

            activeAction = animationActions[0]
            setAction(animationActions[1])
    
            scene.add(gltf.scene)
            modelMesh = gltf.scene

            modelReady = true
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



    // Raycasting
    const raycaster = new THREE.Raycaster();
    const targetQuaternion = new THREE.Quaternion()

    renderer.domElement.addEventListener('dblclick', onDoubleClick, false)
    function onDoubleClick(event: MouseEvent) {
        const mouse = {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        }
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(sceneMeshes, false)

        if (intersects.length > 0) {

            const p = intersects[0].point

            const distance = modelMesh.position.distanceTo(p)

            const rotationMatrix = new THREE.Matrix4()
            rotationMatrix.lookAt(p, modelMesh.position, modelMesh.up)
            targetQuaternion.setFromRotationMatrix(rotationMatrix)

            setAction(animationActions[2])

            TWEEN.removeAll()
            new TWEEN.Tween(modelMesh.position)
                .to({
                    x: p.x,
                    y: p.y,
                    z: p.z
                }, 1000/4 * distance) //walks 2 meters a second * the distance
                .onUpdate(() => {
                    controls.target.set(
                        modelMesh.position.x,
                        modelMesh.position.y + 1,
                        modelMesh.position.z)
                    // light1.target = modelMesh
                //     light2.target = modelMesh
                })
                .start()
                .onComplete(() => setAction(animationActions[1]))
        }
    }

    const animations = {
        fly: function () {
            setAction(animationActions[0])
        },
        idle: function () {
            setAction(animationActions[1])
        },
        run: function () {
            setAction(animationActions[2])
        },
        walk: function () {
            setAction(animationActions[3])
        },
    }

    const setAction = (toAction: THREE.AnimationAction) => {
        if (toAction != activeAction) {
            lastAction = activeAction
            activeAction = toAction
            //lastAction.stop()
            lastAction.fadeOut(0.2)
            activeAction.reset()
            activeAction.fadeIn(0.2)
            activeAction.play()
        }
    }

    const gui = new GUI()
    const animationsFolder = gui.addFolder('Animations')
    animationsFolder.open()

    const clock = new THREE.Clock()

    function animate() {
        requestAnimationFrame(animate)

        controls.update()

        if (modelReady) {
            mixer.update(clock.getDelta())

            if (!modelMesh.quaternion.equals(targetQuaternion)) {
                modelMesh.quaternion.rotateTowards(targetQuaternion, clock.getDelta() * 200)
            }
        }

        TWEEN.update()

        render()
    }

    function render() {
        renderer.render(scene, camera)
    }

    animate()

}