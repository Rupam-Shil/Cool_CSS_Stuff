VanillaTilt.init(document.querySelectorAll('img'), {
	max: 30,
	speed: 500,
	glare: true,
	'max-glare': 0.5,
});

VanillaTilt.init(document.querySelector('a'), {
	max: 15,
	speed: 200,
	glare: true,
	'max-glare': 0.5,
});

VanillaTilt.init(document.querySelectorAll('img'));
//GSAP

const header = document.querySelector('.right-down >h1');
header.innerHTML = header.textContent.replace(
	/\S/g,
	"<span class='letter'>$&</span>"
);
let tl = gsap.timeline({ delay: 1 });
tl.fromTo(
	'.letter',
	{ opacity: 0, y: 10 },
	{ opacity: 1, y: 0, stagger: 0.1, duration: 1 },
	0
);
tl.to('.section__hero', {
	x: 0,
	duration: 1,
	ease: Power1.easeIn,
});
tl.to('img', {
	opacity: 1,
	duration: 1,
	stagger: 0.2,
});
tl.to(
	'.para',
	{
		opacity: 1,
		y: 0,
		duration: 0.5,
		stagger: 0.1,
	},
	3
);
