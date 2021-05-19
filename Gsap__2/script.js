const button = document.querySelector('button');
const overlay = document.querySelector('.overlay');
const exit = document.querySelector('.exit');

const tl = gsap.timeline({
	defaults: { duration: 1, ease: Back.easeOut.config(2) },
});

tl.paused(true)
	.fromTo('.overlay', { clipPath: 'circle(0%)' }, { clipPath: 'circle(100%)' })
	.to('.menu-container', { opacity: 1, y: '30px', stagger: 0.1 }, '-=1');
button.addEventListener('click', () => {
	tl.play();
});
exit.addEventListener('click', () => {
	tl.timeScale(3).reverse();
});
