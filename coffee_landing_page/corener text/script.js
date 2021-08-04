const skewOne = document.querySelector('.skew1');
const skewTwo = document.querySelector('.skew2');
document.addEventListener('mousemove', (e) => {
	const value = e.clientX / window.innerWidth - 0.5;
	const moveBy = value * 500;
	skewOne.style.transform = `skewY(15deg) translateX(${moveBy}px) `;
	skewTwo.style.transform = `skewY(-15deg) translateX(${moveBy}px) `;
});
