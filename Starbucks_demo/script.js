const imgSlider = (imgsrc) => {
	document.querySelector('.starbucks').src = imgsrc;
};
const changeCircleColor = (color) => {
	const circle = document.querySelector('.circle');
	circle.style.background = color;
};
const toggleMenu = () => {
	var menuToggle = document.querySelector('.toggle');
	var nagivation = document.querySelector('.nagivation');
	menuToggle.classList.toggle('active');
	nagivation.classList.toggle('active');
};
