const modalBtn = document.querySelectorAll('.modalBtn');
const modalBox = document.querySelectorAll('.modal__box');

modalBtn.forEach((modal, index) => {
	modal.addEventListener('click', () => {
		modalBox[index].classList.toggle('db');
	});
});
