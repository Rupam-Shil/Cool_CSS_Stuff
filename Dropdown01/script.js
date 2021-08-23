const dropdownBtn = document.querySelector('.js-dropdown-open');
const dropdownArea = document.querySelector('.card__default__dropdown');
const dropdownIcon = document.querySelector('.btn .bx');
dropdownBtn.addEventListener('click', () => {
	dropdownArea.classList.toggle('active');
	dropdownIcon.classList.toggle('rotate');
});
