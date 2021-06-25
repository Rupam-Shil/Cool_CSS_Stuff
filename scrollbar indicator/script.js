let cursorMeter = document.querySelector('#cursorMeter');
let percent = document.querySelector('#percent');
let progressBar = document.querySelector('#progressBar');

let totalHeight = document.body.scrollHeight - window.innerHeight;
document.addEventListener('mousemove', (e) => {
	cursorMeter.style.top = e.clientY + 'px';
	cursorMeter.style.left = e.clientX + 'px';
});

document.addEventListener('scroll', (e) => {
	let value = (window.scrollY / totalHeight) * 100;
	progressBar.style.width = value + '%';
	percent.innerHTML = `Page Scrolled ${Math.floor(parseInt(value))}%`;
});
