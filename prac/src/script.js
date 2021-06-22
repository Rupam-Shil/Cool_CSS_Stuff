import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import * as CANNON from 'cannon-es';

//Audio
const hitSound = new Audio('/hit.mp3');
const playSound = (collision) => {
	const impactStrength = collision.contact.getImpactVelocityAlongNormal();

	if (impactStrength > 1.5) {
		hitSound.volume = Math.random();
		hitSound.currentTime = 0;
		hitSound.play();
	}
};

//Debug
const gui = new dat.GUI();

const debugObject = {};
debugObject.createSphere = () => {
	createSphere(Math.random() * 0.5, {
		x: (Math.random() - 0.5) * 3,
		y: 3,
		z: (Math.random() - 0.5) * 3,
	});
};

debugObject.reset = () => {
	for (const { mesh, body } of objectToUpdate) {
		world.removeBody(body);
		scene.remove(mesh);
	}
};

gui.add(debugObject, 'createSphere');
gui.add(debugObject, 'reset');

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

//Textures
const textureLoader = new THREE.TextureLoader();

//physics world
const world = new CANNON.World();
world.gravity.set(0, -9.32, 0);
const defaultMaterial = new CANNON.Material('default');
const defaultContactMaterial = new CANNON.ContactMaterial(
	defaultMaterial,
	defaultMaterial,
	{
		friction: 0.1,
		restitution: 0.7,
	}
);
world.addContactMaterial(defaultContactMaterial);
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;
// Objects
const objectToUpdate = [];
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
// const sphereMaterial = new THREE.MeshStandardMaterial({
// 	metalness: 0.3,
// 	roughness: 0.4,
// });

const createSphere = (radius, position) => {
	const sphereMaterial = new THREE.MeshStandardMaterial({
		metalness: 0.3,
		roughness: 0.4,
	});
	sphereMaterial.color.setHex(Math.random() * 0xffffff);
	const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
	mesh.scale.set(radius, radius, radius);
	mesh.castShadow = true;
	mesh.position.copy(position);
	scene.add(mesh);

	//Cannon js body
	const shape = new CANNON.Sphere(radius);
	const body = new CANNON.Body({
		mass: 1,
		shape: shape,
		position: new CANNON.Vec3(0, 0, 0),
		material: defaultMaterial,
	});
	body.position.copy(position);
	body.addEventListener('collide', playSound);

	world.addBody(body);

	//save in object to update
	objectToUpdate.push({ mesh, body });
};
createSphere(0.5, { x: 0, y: 3, z: 0 });

//floor
const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(20, 20),
	new THREE.MeshStandardMaterial({
		metalness: 0.5,
		roughness: 0.4,
		color: 0xed00d1,
	})
);
floor.rotation.x = -Math.PI * 0.5;
floor.receiveShadow = true;
scene.add(floor);
//physics floor
const floorGeometry = new CANNON.Plane();
const floorBody = new CANNON.Body({
	mass: 0,
	shape: floorGeometry,
	material: defaultMaterial,
});
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
world.addBody(floorBody);

//Light
const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(2, 2, 5);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 2;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);
/**
 * Light
 */

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
// renderer.setClearColor(0xed00d1);
// scene.background = new THREE.Color(0xed00d1);

// //Fog
// const fog = new THREE.Fog(0xed00d1, 1, 15);
// scene.fog = fog;

/**
 * Clock
 */

const clock = new THREE.Clock();
let getCurrentTime = 0;

/**
 * Controls
 */

const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

/**
 * Animate
 */

const tick = () => {
	const elaspsedTime = clock.getElapsedTime();
	const deltaTIme = elaspsedTime - getCurrentTime;
	getCurrentTime = elaspsedTime;

	control.update();
	//Rotations
	//Physcis world
	world.step(1 / 60, deltaTIme, 3);

	for (const { mesh, body } of objectToUpdate) {
		mesh.position.copy(body.position);
		mesh.quaternion.copy(body.quaternion);
	}
	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
