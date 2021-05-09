const menuBtn = document.querySelector('.menu-btn');
const exitBtn = document.querySelector('.exit-btn');
const navMenu = document.querySelector('nav ul');
menuBtn.addEventListener('click', () => {
	navMenu.style.transform = 'translateX(0%)';
});
exitBtn.addEventListener('click', () => {
	navMenu.style.transform = 'translateX(100%)';
});
