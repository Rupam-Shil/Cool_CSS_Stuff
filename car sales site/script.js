const menuBtn = document.querySelector('.menu');
const panel = document.querySelector('.filter');
const panelStyles = window.getComputedStyle(panel);
const hearts = document.querySelectorAll('.far');

menuBtn.addEventListener('click', () => {
	if (panelStyles.getPropertyValue('clip-path') === 'circle(0% at 100% 0%)') {
		panel.style.clipPath = 'circle(100% at 50% 50%)';
	} else {
		panel.style.clipPath = 'circle(0% at 100% 0%)';
	}
});
document.addEventListener('mouseup', (e) => {
	if (panelStyles.getPropertyValue('clip-path') === 'circle(100% at 50% 50%)') {
		if (!panel.contains(e.target)) {
			panel.style.clipPath = 'circle(0% at 100% 0%)';
		}
	}
});
function changeHeart(e) {
	e.classList.toggle('fas');
}
