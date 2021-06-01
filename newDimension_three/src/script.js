import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import gsap from 'gsap';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();
// Material
const material = new THREE.PointsMaterial({
	size: 0.005,
});
const particlesMaterial = new THREE.PointsMaterial({
	size: 0.003,
	transparent: true,
	blending: THREE.AdditiveBlending,
});

//Geometry
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

const sphere = new THREE.Points(geometry, material);
scene.add(sphere);

const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 5000;
const positionArray = new Float32Array(particleCount * 3);
positionArray.forEach((position, index) => {
	positionArray[index] = (Math.random() - 0.5) * (Math.random() * 5);
});
const positionAttirbute = new THREE.BufferAttribute(positionArray, 3);
particlesGeometry.setAttribute('position', positionAttirbute);

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);
// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

//gsap
gsap.registerPlugin(CSSRulePlugin);

const content = new CSSRulePlugin.getRule('.content::before');

const h1 = document.querySelector('h1');
const p = document.querySelector('p');
const tl = gsap.timeline();
tl.from(content, { duration: 4, delay: 0.5, cssRule: { scaleX: 0 } });
tl.to(
	h1,
	{ duration: 2, clipPath: 'Polygon(0 0,100% 0,100% 100%,0% 100%)', y: '30px' },
	'-=3'
);
tl.to(
	p,
	{ duration: 4, clipPath: 'Polygon(0 0,100% 0,100% 100%,0% 100%)', y: '30px' },
	'-=2'
);
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
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
scene.background = new THREE.Color(0x21282a);
//Mouse
document.addEventListener('mousemove', animateParticles);
let mouseY = 0;
let mouseX = 0;
function animateParticles(e) {
	mouseY = e.clientY;
	mouseX = e.clientX;
}
/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update objects
	sphere.rotation.y = 0.5 * elapsedTime;
	particlesMesh.rotation.y = -elapsedTime * 0.1;
	if (mouseX > 0) {
		particlesMesh.rotation.y = mouseY * elapsedTime * 0.00008;

		particlesMesh.rotation.x = mouseX * elapsedTime * 0.00008;
	}

	// Update Orbital Controls
	// controls.update()

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
