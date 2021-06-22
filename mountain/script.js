gsap.to('#bg', {
	scrollTrigger: {
		scrub: 1,
	},
	scale: 1.5,
});
gsap.to('#man', {
	scrollTrigger: {
		scrub: 1,
	},
	scale: 0.5,
});
gsap.to('#mountain_left', {
	scrollTrigger: {
		scrub: 1,
	},
	x: -500,
});
gsap.to('#mountain_right', {
	scrollTrigger: {
		scrub: 1,
	},
	x: 500,
});

gsap.to('#clouds_1', {
	scrollTrigger: {
		scrub: 1,
	},
	y: 300,
	x: 200,
});
gsap.to('#clouds_2', {
	scrollTrigger: {
		scrub: 1,
	},
	x: -200,
	y: 300,
});
gsap.to('#text', {
	scrollTrigger: {
		scrub: 1,
	},
	y: 200,
});
