const signInBtn = document.querySelector('.signinbtn');
const signUpBtn = document.querySelector('.signupbtn');
const formBox = document.querySelector('.formBox');
const body = document.querySelector('body');

signUpBtn.addEventListener('click', () => {
	formBox.classList.add('active');
	body.classList.add('active');
});
signInBtn.addEventListener('click', () => {
	formBox.classList.remove('active');
	body.classList.remove('active');
});
