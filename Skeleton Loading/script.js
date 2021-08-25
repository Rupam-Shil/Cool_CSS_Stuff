const cardTemplate = document.querySelector('.card-template');

const grid = document.querySelector('.grid');

for (let i = 0; i < 100; i++) {
	grid.append(cardTemplate.content.cloneNode(true));
}

fetch('https://jsonplaceholder.typicode.com/posts')
	.then((res) => res.json())
	.then((data) => {
		grid.innerHTML = '';
		data.forEach((post) => {
			const div = cardTemplate.content.cloneNode(true);
			div.querySelector('.card__header-title').textContent = post.title;
			div.querySelector('.card__body').textContent = post.body;
			grid.append(div);
		});
	});
