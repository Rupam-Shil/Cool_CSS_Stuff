const btns = document.querySelectorAll('.bottom button');
const leftContent = document.querySelectorAll('.left-content');
const rightContent = document.querySelectorAll('.right-content');
const mobileOpenBtn = document.querySelector('.mobile-btn');
const mobileCloseBtn = document.querySelector('.close-btn');
const mobileModal = document.querySelector('.menu-items');
btns.forEach((btn) => {
	btn.addEventListener('click', changeStuff);
});

function changeStuff() {
	const me = this;
	btns.forEach((btn) => {
		if (btn !== this) {
			btn.classList.remove('active');
		}
	});

	if (!this.classList.contains('active')) {
		this.classList.add('active');
	}
	changeSlider(leftContent, me);
	changeSlider(rightContent, me);
}
function changeSlider(payload, value) {
	console.log(value);
	payload.forEach((content) => {
		content.classList.remove('active');
		if (content.dataset.no === value.dataset.no) {
			content.classList.add('active');
		}
	});
}

mobileOpenBtn.addEventListener('click', () => {
	mobileModal.style.transform = 'translateX(0)';
});
mobileCloseBtn.addEventListener('click', () => {
	mobileModal.style.transform = 'translateX(100%)';
});
