const hideBtn = document.querySelector('.hide-menu');
const menuArea = document.querySelector('.menu__area');
const menuBtn = document.querySelectorAll('.btn');
hideBtn.addEventListener('click', () => {
	menuArea.classList.toggle('fullsize');
});

for (let i = 0; i < 5; i++) {
	menuBtn[i].addEventListener('click', makeActive);
}
function makeActive() {
	menuBtn.forEach((menu) => {
		menu.classList.remove('active');
	});
	this.classList.add('active');
}
