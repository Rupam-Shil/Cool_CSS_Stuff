document.addEventListener('mousemove', (e) => {
	let mouseX = e.clientX;
	let mouseY = e.clientY;
	gsap.set('.cursor', { x: mouseX, y: mouseY });
	gsap.to('.shape', { x: mouseX, y: mouseY, stagger: -0.1 });
});
