const menuItems = document.querySelectorAll('a');
const root = document.documentElement;

menuItems.forEach((item) => {
	item.addEventListener('click', changeStyle);
});

function changeStyle() {
	menuItems.forEach((item) => {
		if (item != this) {
			item.classList.remove('active');
		} else {
			item.classList.add('active');
			root.style.setProperty('--distance', this.dataset.style);
			root.style.setProperty('--color', this.dataset.color);
		}
	});
	console.log(this.length);
}
