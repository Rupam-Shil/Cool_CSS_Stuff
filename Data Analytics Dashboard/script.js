const menuBtn = document.querySelector('.menu-btn');
const backBtn = document.querySelector('.back-btn');
const menu = document.querySelector('nav');

menuBtn.addEventListener('click', () => {
	menu.style.transform = 'translateX(0)';
});
backBtn.addEventListener('click', () => {
	menu.style.transform = 'translateX(-100%)';
});
