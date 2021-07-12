const hour = document.querySelector('#clock-hour');
const minutes = document.querySelector('#clock-minutes');
const seconds = document.querySelector('#clock-seconds');

const clock = () => {
	let date = new Date();
	let hh = date.getHours() * 30;
	let mm = date.getMinutes() * 6;
	let ss = date.getSeconds() * 6;
	hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
	minutes.style.transform = `rotateZ(${mm}deg)`;
	seconds.style.transform = `rotateZ(${ss}deg)`;
};
setInterval(clock, 1000);

const textHour = document.querySelector('#text-hour');
const textMinutes = document.querySelector('#text-minutes');
const textAmPm = document.querySelector('#text-ampm');
const dateDay = document.querySelector('#date-day');
const dateMonth = document.querySelector('#date-month');
const dateYear = document.querySelector('#date-year');

const clockText = () => {
	let date = new Date();
	let hh = date.getHours();
	let ampm = null;
	let mm = date.getMinutes();
	let dat = date.getDate();
	let month = date.getMonth() + 1,
		year = date.getFullYear();

	if (hh >= 12) {
		textHour.innerText = `${hh - 12}:`;
		textAmPm.innerText = 'pm';
	} else {
		textHour.innerText = `${hh}:`;
		textAmPm.innerText = 'am';
	}
	if (hh < 10 || hh - 12 < 10) {
		textHour.innerText = '0' + textHour.innerText;
	}
	textMinutes.innerText = mm;
	if (mm < 10) {
		textMinutes.innerText = `0${mm}`;
	}
	dateDay.innerText = dat + '-';
	dateMonth.innerText = month + '-';
	dateYear.innerText = year;
};
setInterval(clockText, 1000);

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bxs-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
	document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
	themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun';

if (selectedTheme) {
	document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
		darkTheme
	);
	themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](
		iconTheme
	);
}

themeButton.addEventListener('click', () => {
	document.body.classList.toggle(darkTheme);
	themeButton.classList.toggle(iconTheme);
	localStorage.setItem('selected-theme', getCurrentTheme());
	localStorage.setItem('selected-icon', getCurrentIcon());
});
