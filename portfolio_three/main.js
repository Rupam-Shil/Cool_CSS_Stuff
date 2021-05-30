// import './style.css';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// //scene
// const scene = new THREE.Scene();
// //canvas
// const canvas = document.querySelector('.webgl');
// //sizes
// const sizes = {
// 	width: window.innerWidth,
// 	height: window.innerHeight,
// };
// //Object
// const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const torusMaterial = new THREE.MeshStandardMaterial({
// 	color: 0xff6347,
// });
// const torus = new THREE.Mesh(torusGeometry, torusMaterial);
// scene.add(torus);
// //camera
// const camera = new THREE.PerspectiveCamera(
// 	75,
// 	sizes.width / sizes.height,
// 	0.1,
// 	100
// );
// camera.position.z = 30;
// scene.add(camera);
// //Light
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(20, 20, 20);
// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, ambientLight);
// //resize
// window.addEventListener('resize', (e) => {
// 	sizes.width = window.innerWidth;
// 	sizes.height = window.innerHeight;
// 	camera.aspect = sizes.width / sizes.height;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize(sizes.width, sizes.height);
// 	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// //clock
// const clock = new THREE.Clock();
// //renderer
// const renderer = new THREE.WebGL1Renderer({
// 	canvas,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// //gridHelper
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);
// //controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// //star
// const addStar = () => {
// 	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
// 	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
// 	const star = new THREE.Mesh(geometry, material);

// 	const pos = Array(3)
// 		.fill()
// 		.map(() => THREE.MathUtils.randFloatSpread(100));

// 	star.position.set(...pos);
// 	scene.add(star);
// };
// Array(200).fill().forEach(addStar);

// //Texture
// const spaceTexture = new THREE.TextureLoader().load('./space.jpg');
// scene.background = spaceTexture;

// //Avatar
// const rupamTexture = new THREE.TextureLoader().load('my.png');

// const rupam = new THREE.Mesh(
// 	new THREE.BoxGeometry(3, 3, 3),
// 	new THREE.MeshBasicMaterial({ map: rupamTexture })
// );
// scene.add(rupam);
// //Moon
// const moonTexture = new THREE.TextureLoader().load('moon.jpg');
// const moonNormalTexture = new THREE.TextureLoader().load('normal.jpg');
// const moon = new THREE.Mesh(
// 	new THREE.SphereGeometry(3, 32, 32),
// 	new THREE.MeshStandardMaterial({
// 		map: moonTexture,
// 		normalMap: moonNormalTexture,
// 	})
// );
// moon.position.z = 30;
// moon.position.x = -10;
// scene.add(moon);

// //MoveCamera
// const moveCamera = () => {
// 	const t = document.body.getBoundingClientRect().top;
// 	// console.log(t);
// 	moon.rotation.x += 0.05;
// 	moon.rotation.y += 0.075;
// 	moon.rotation.z += 0.05;

// 	rupam.rotation.y += 0.01;
// 	rupam.rotation.z += 0.01;

// 	camera.position.z = t * -0.01;
// 	camera.position.x = t * -0.0002;
// 	camera.position.y = t * -0.0002;
// };
// document.body.onscroll = moveCamera;

// //tick
// const tick = () => {
// 	const elapsedTime = clock.getElapsedTime();
// 	torus.rotation.x = elapsedTime * 0.5;
// 	torus.rotation.y = elapsedTime * 0.5;
// 	torus.rotation.z = elapsedTime * 0.5;
// 	controls.update();

// 	renderer.render(scene, camera);
// 	window.requestAnimationFrame(tick);
// };
// tick();
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('.webgl'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(100));

	star.position.set(x, y, z);
	scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const rupamTexture = new THREE.TextureLoader().load('my.png');

const rupam = new THREE.Mesh(
	new THREE.BoxGeometry(3, 3, 3),
	new THREE.MeshBasicMaterial({ map: rupamTexture })
);

scene.add(rupam);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({
		map: moonTexture,
		normalMap: normalTexture,
	})
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

rupam.position.z = -5;
rupam.position.x = 2;
//resize
window.addEventListener('resize', (e) => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
// Scroll Animation

function moveCamera() {
	const t = document.body.getBoundingClientRect().top;
	moon.rotation.x += 0.05;
	moon.rotation.y += 0.075;
	moon.rotation.z += 0.05;

	rupam.rotation.y += 0.01;
	rupam.rotation.z += 0.01;

	camera.position.z = t * -0.01;
	camera.position.x = t * -0.0002;
	camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
	requestAnimationFrame(animate);

	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
	torus.rotation.z += 0.01;

	moon.rotation.x += 0.005;

	// controls.update();

	renderer.render(scene, camera);
}

animate();
