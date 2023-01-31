// Import
import * as THREE from 'three'

export const cubeExample = () => {

    // Create a scene
    const scene = new THREE.Scene()
    
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

    
    // Create a geometry
    const geometry = new THREE.BoxGeometry()
    
    // Create a material
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
    })
    
    // Create a mesh (primitive shape)
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    
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
        
        // cube.rotation.x += 0.01
        // cube.rotation.y += 0.01
    
        render()
    }
    
    function render() {
        renderer.render(scene, camera)
    }
    
    update()
}