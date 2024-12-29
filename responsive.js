import * as THREE from 'three';
// import { GUI } from 'dat.gui';

let width = window.innerWidth;
let height = window.innerHeight;

//const gui = new GUI();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x262626);

// camera
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
camera.position.set(0, 0, 10);

// cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// dynamic canvas resizing 
window.addEventListener('resize', () => {
  width = window.innerWidth; // set the height to the window's width
  height = window.innerHeight; // set the height to the window's height 
  camera.aspect = width / height; // make the new camera aspect 
  camera.updateProjectionMatrix(); // update the projection matrix, commonly used to scale 3D to 2D based on camera properties
  renderer.setSize(window.innerWidth, window.innerHeight); // set the new size whenever resizing happens 
  renderer.render(scene, camera); // 
});

/*
 * Other techniques include adaptive camera settings, model optimization, scaling scene elements, using devicePixelRatio, lazy loading, 
 * adaptive LOD, avoid blocking the main thread, and using OrbitControls for responsive interaction design.
 *
 * Frankly, there is so much to test. 
 *
 * */

// renderer 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// animation 
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// render the scene 

const container = document.querySelector('#threejs-container');

if (container != null) {
  container.append(renderer.domElement);
  renderer.render(scene, camera); // what if I just called animate()?
  animate();
}

