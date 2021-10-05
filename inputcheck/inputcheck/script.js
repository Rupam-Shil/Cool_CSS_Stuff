const showPassword = document.querySelector('[data-showPassword]');
const inputPassword = document.querySelector('input');
const passwordIntensity = document.querySelector('[data-intensity]');
const text = document.querySelector('[data-text]');

showPassword.addEventListener('click', () => {
	if (inputPassword.type == 'password') {
		inputPassword.type = 'text';
	} else {
		inputPassword.type = 'password';
	}
});

text.style.display = 'none';

inputPassword.addEventListener('keyup', () => {
	if (inputPassword.value.length > 0) {
		text.style.display = 'block';
		if (inputPassword.value.length < 4) {
			text.style.color = '#ff0000';
		} else if (
			inputPassword.value.length >= 4 &&
			inputPassword.value.length < 6
		) {
			passwordIntensity.innerText = 'medium';
			text.style.color = '#d0ff00';
		} else {
			passwordIntensity.innerText = 'strong';
			text.style.color = '#00ff15';
		}
	} else {
		text.style.display = 'none';
	}
});
