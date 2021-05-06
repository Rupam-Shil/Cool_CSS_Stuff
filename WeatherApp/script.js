const city = document.querySelector('.searchBox');
const temperature = document.querySelector('.temp');
const type = document.querySelector('.type');
const range = document.querySelector('.range');
const cityname = document.querySelector('.name');
const date = document.querySelector('.date');
const container = document.querySelector('.container');
city.addEventListener('keyup', async (evt) => {
	if (evt.keyCode === 13) {
		const value = city.value;
		searchCity(value);
	}
});
async function searchCity(value) {
	const api = 'YOUR_API_KEY';
	await fetch(
		`https://api.openweathermap.org/data/2.5/weather?appid=${api}&q=${value}&units=metric`
	)
		.then((res) => res.json())
		.then((data) => {
			const temp = Math.round(data.main.temp);
			container.style.backgroundImage = "url('./assets/bg.png')";

			if (temp <= 10) {
				container.style.backgroundImage = "url('./assets/cold-bg.png')";
			}
			const minTemp = Math.round(data.main.temp_min);
			const maxTemp = Math.round(data.main.temp_max);
			let now = new Date();
			cityname.innerText = data.name;
			date.innerText = dateBuilder(now);
			temperature.innerText = temp + '°c';
			type.innerText = data.weather[0].main;
			range.innerText = minTemp + '°c-' + maxTemp + '°c';
			city.value = '';
		})
		.catch((err) => console.log(err));
}
function dateBuilder(d) {
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}
searchCity('kolkata');
