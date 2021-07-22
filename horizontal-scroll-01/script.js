let section = document.querySelector('section');
let secs = document.getElementsByClassName('sec');
let hs = new HorizontalScroll.default({
	blocks: secs,
	container: section,
});
