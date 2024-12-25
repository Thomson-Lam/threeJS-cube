import * as THREE from 'three'; 

/*
    Some things you need to know to make THREE:
    1. scene - the container for everything we see on the screen 
    2. camera - defines what we see when we render the scene. PerspectiveCamera matches the worldview
        Takes in fov, aspect, near and far args 
    3. renderer  - calculates what the scene looks like based on the camera, takes in size of app to be rendered as params 
    4. the object - made up of geometry and mesh; in this case the cube 

*/


const width = window.innerWidth;
const height = window.innerHeight;

// scene 
const scene = new THREE.Scene(); 
scene.background = new THREE.Color('#000000');

// camera 
const fov = 45; // field of view
const aspect = window.innerWidth / window.innerHeight;

const near = 0.1; // the near clipping plane 
const far = 100; // the far clipping plane 

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 10); 

// renderer 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// making the cube: geometry and mesh 
const geometry = new THREE.BoxGeometry(2,2,2); 
const material = new THREE.MeshBasicMaterial(
    {
        wireframe: true,
        color: 0xffffff,
    }
);

// geometry of the mesh defines the shape, material defines surface properties 
// make the cube 
const cube = new THREE.Mesh(geometry, material);

// add the cube to the scene 
scene.add(cube);

// rendering the scene
const container = document.querySelector("#threejs-container");

if (container != null) {
    container.append(renderer.domElement); // .domElement is the <canvas> created by the Threejs renderer, adds the canvas to the container element in the DOM 
    renderer.render(scene, camera); // render is called on the renderer to display the 3D scene with the specified scene and camera 
    // this would be looping in an animate function to constantly render and update 
} else {
    console.error("The container is null");
}
