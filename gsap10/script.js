const openBtn = document.querySelector('.circle');
const closeBtn = document.querySelector('.closecircle');
const tl = gsap.timeline();
tl.to('.circle', { duration: 2, scale: 100 });
tl.to('.closecircle', { duration: 1.5, scale: 1 }, 0.1);

tl.pause();

openBtn.addEventListener('click', () => {
	tl.play();
});
closeBtn.addEventListener('click', () => {
	tl.timeScale(1.5);
	tl.reverse(1);
});
