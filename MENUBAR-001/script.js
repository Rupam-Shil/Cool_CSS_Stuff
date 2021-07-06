const btns = document.querySelectorAll('[data-color]');
const body = document.querySelector('body');
const btnDivs = document.querySelectorAll('.btn');
const icons = document.querySelectorAll('.fas');
const root = document.documentElement;

btns.forEach((btn) => {
	btn.addEventListener('click', getBtnColor);
});

function getBtnColor() {
	let color = this.getAttribute('data-color');
	body.style.background = color;
	btnDivs.forEach((btn) => {
		btn.classList.remove('active');
	});
	this.classList.add('active');
	root.style.setProperty('--active-color', color);
}
