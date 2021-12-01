const menus = document.querySelectorAll('.each');
const root = document.documentElement;

menus.forEach((menu) => {
	menu.addEventListener('click', () => {
		removeActive();
		const { left } = menu.dataset;
		menu.classList.add('active');
		root.style.setProperty('--left', left + '%');
		console.log(left);
	});
});

const removeActive = () => {
	menus.forEach((menu) => {
		menu.classList.remove('active');
	});
};
