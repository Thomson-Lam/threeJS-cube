import * as THREE from 'three';
import { GUI } from 'dat.gui';

const width = window.innerWidth;
const height = window.innerHeight;

// makes the GUI for controlling zoom 
const gui = new GUI(); // TODO: check what the dat means! 

// scene 
const scene = new THREE.Scene(); 
scene.background = new THREE.Color('#000000');

// ambient light 
const ambientLight = new THREE.AmbientLight(0xfffff, 0.5);
scene.add(ambientLight);

// light 
const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(-10, 10, -10);

light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 100; 
scene.add(light);

// fog 
scene.fog = new THREE.Fog(0xffffff, 0.015, 100); // fog color, near, far 

// mist 
scene.fog = new THREE.FogExp2(0xffffff, 0.01); // color and mist density. 
// TODO: Experiment! 


// OVERRIDE material property: force all materials to have the same property 
scene.overrideMaterial = new THREE.MeshLambertMaterial({color: 0x000000});

/*
    NOTE: Three JS scene is also called a scene graph, a structure holding all necessary information about a 
    graphical scene (THREE.scene contains all objects, light and other objects needed for rendering)
    Renderer uses the scene and camera to draw output to the screen, ie. <canvas> container element  
*/

// camera 
const fov = 45; // field of view
const aspect = window.innerWidth / window.innerHeight;

const near = 0.1; // the near clipping plane 
const far = 1000; // the far clipping plane 

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 10, 40); // x, y, z vectors 
camera.lookAt(0, 0, 0); // the direction the camera is facing 

gui.add(camera.position, 'z', 10, 200, 1).name('camera-z');
// making the plane 
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const plane = new THREE.Mesh(
    planeGeometry,
    new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide})
);

plane.rotateX(Math.PI / 2);
plane.position.y = -1.75;
plane.receiveShadow = true;

scene.add(plane);


/* // making the cube and sphere: geometry and mesh 
const sphere_geo = new THREE.SphereGeometry(15, 13, 26);
const geometry = new THREE.BoxGeometry(2,2,2); 
const material = new THREE.MeshBasicMaterial(
    {
        wireframe: true,
        color: 0xffffff,
    }
); */

function addCube() {
    const cubeSize = Math.ceil(Math.random() * 3);
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff
    });

    // randomize coordinates and add shadow 
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = 'cube-' + scene.children.length;
    cube.position.x = -30 + Math.round(Math.random() * 50);
    cube.position.y = Math.round(Math.random() * 5);
    cube.position.z = -20 + Math.round(Math.random() * 50);
    scene.add(cube);

}


const add = document.querySelector('.add'); // select the button with the add CSS selector 
if (add) {
    add.addEventListener('click', () => {
       addCube();
       console.log('cube added')
    });
} else {
    console.error("Error!");
}


function removeCube() {
    const allChildren = scene.children;
    const lastObj = allChildren[allChildren.length - 1];
    if (lastObj.name) {
        scene.remove(lastObj);
    }
}


const remove = document.querySelector('.rem');

if (remove) {
    remove.addEventListener('click', () => {
        removeCube();
        console.log("Cube removed");
    });
} else {
    console.log("DNE");
}

// geometry of the mesh defines the shape, material defines surface properties 
// make the cube 
//const cube = new THREE.Mesh(geometry, material);
//const sphere = new THREE.Mesh(sphere_geo, material);

//scene.add(cube); // adds the cube
//scene.add(sphere); // adds a sphere

/*
To get an object, simply do scene.getObjectByName(name, recursive)

*/


// renderer 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


// rendering the scene
const container = document.querySelector("#threejs-container");

if (container != null) {
    container.append(renderer.domElement); // .domElement is the <canvas> created by the Threejs renderer, adds the canvas to the container element in the DOM 
    //renderer.render(scene, camera); // render is called on the renderer to display the 3D scene with the specified scene and camera 
    // this would be looping in an animate function to constantly render and update 
    animate();
   /*  console.log(scene.children); // scene.children returns an array of children of the scene 
    console.log("Length of children: " + scene.children.length); */
} else {
    console.error("The container is null");
}