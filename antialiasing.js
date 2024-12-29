import * as THREE from 'three';


let width = window.innerWidth;
let height = window.innerHeight;

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x262626);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);

camera.position.set(0, 0, 10);

const geometry = new THREE.BoxGeometry(2, 2, 2);

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});

// renderer anti aliasing: prevent jagged edges on edges and objects 
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.physicallyCorrectLights = true;
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

const container = document.querySelector('#threejs-container');
if (container != null) {
  container.append(renderer.domElement);
  renderer.render(scene, camera);
  animate();
}

