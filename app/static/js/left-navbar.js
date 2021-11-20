function isMobile() {
	return window.innerWidth <= 780;
}

function initLeftNavbar(selector, current) {
	const mainEl = document.querySelector(selector);
	const elements = document.querySelectorAll(`${selector} div.navbar-item`);

	mainEl.current = current;

	elements[current].classList.add('current');

	for (let i = 0; i < elements.length; ++i) {
		elements[i].index = i;
		elements[i].onclick = function() {
			let old = mainEl.current;

			if (mainEl.current == this.index) return;

			elements[mainEl.current].classList.remove('current');
			elements[this.index].classList.add('current');

			mainEl.current = this.index;

			mainEl.dispatchEvent(new CustomEvent('left-nav', {
				detail: {
					index: mainEl.current,
					oldIndex: old 
				}
			}));
		}
	}
}

function leftNavbar(selector, current, itemsSelector) {
	initLeftNavbar(selector, current);

	const mainEl = document.querySelector(selector);
	const elements = document.querySelectorAll(`${itemsSelector} div.left-navbar-item`);

	mainEl.current = current;

	elements[current].style.display = 'block';
	elements[current].style.opacity = '1';

	mainEl.addEventListener('left-nav', function(event) {
		const data = event.detail;

		if (isMobile()) {
			if (data.oldIndex < data.index) elements[data.oldIndex].style.left = '60%';
			else elements[data.oldIndex].style.left = '30%';
		} else {
			if (data.oldIndex < data.index) elements[data.oldIndex].style.top = '60%';
			else elements[data.oldIndex].style.top = '20%';
		}

		elements[data.oldIndex].style.opacity = '0';

		setTimeout(function() {
			elements[data.oldIndex].style.display = 'none';
			elements[data.index].style.display = 'block';

			setTimeout(function() {
				if (isMobile()) {
					elements[data.oldIndex].style.left = '50%';
				} else elements[data.oldIndex].style.top = '40%';
				elements[data.index].style.opacity = '1';
			}, 200);
		}, 200);
	});
}