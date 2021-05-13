let list = document.querySelectorAll('.list');
let itemBox = document.querySelectorAll('.itemBox');
list.forEach((n, i) =>
	n.addEventListener('click', () => {
		list.forEach((n) => n.classList.remove('active'));
		n.classList.add('active');
		let datafilter = n.getAttribute('data-filter');
		itemBox.forEach((item) => {
			item.classList.add('hide');

			if (
				item.getAttribute('data-item') === datafilter ||
				datafilter === 'all'
			) {
				item.classList.remove('hide');

				item.classList.add('active');
			}
		});
	})
);
