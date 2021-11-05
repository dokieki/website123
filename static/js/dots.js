function getPos(child, parent) {
    return child.getBoundingClientRect().left - parent.getBoundingClientRect().left;
}

function isMobile() {
	return window.innerWidth <= 780;
}

function dots(selector, current) {
	const mainEl = document.querySelector(selector);
	const dotsContainer = document.querySelector(`${selector} .dot-nav-dots`);
	const elements = Array.from(document.querySelector(`${selector} ul.dot-nav-content-list`).childNodes).filter(x => x.nodeName == 'LI');

	mainEl.current = current;

	let dots = [];

	elements[mainEl.current].classList.add('current');

	for (let i = 0; i < elements.length; ++i) {
		let dot = document.createElement('div');

		dots.push(dot);

		dot.index = i;

		dot.classList.add('dot-nav-dot');

		dotsContainer.append(dot);

		dot.onclick = function() {
			let old = mainEl.current;

			if (mainEl.current == this.index) return;

			mainEl.current = this.index;

			mainEl.dispatchEvent(new CustomEvent('dots-move', {
				detail: {
					index: mainEl.current,
					element: elements[mainEl.current],
					oldIndex: old,
					dot: this,
					container: dotsContainer,
					activeDot: activeDot
				}
			}));
		};
	}

	if (isMobile() && typeof initSwipeEvents !== 'undefined') {
		initSwipeEvents(mainEl);
		mainEl.addEventListener('swipeleft', function() {
			let old = mainEl.current;

			if (mainEl.current == elements.length - 1) return;

			mainEl.current++;
			mainEl.dispatchEvent(new CustomEvent('dots-move', {
				detail: {
					index: mainEl.current,
					element: elements[mainEl.current],
					oldIndex: old,
					dot: dots[mainEl.current],
					container: dotsContainer,
					activeDot: activeDot
				}
			}));
		});
		mainEl.addEventListener('swiperight', function() {
			let old = mainEl.current;

			if (mainEl.current == 0) return;

			mainEl.current--;
			mainEl.dispatchEvent(new CustomEvent('dots-move', {
				detail: {
					index: mainEl.current,
					element: elements[mainEl.current],
					oldIndex: old,
					dot: dots[mainEl.current],
					container: dotsContainer,
					activeDot: activeDot
				}
			}));
		});
	}

	const activeDot = document.createElement('div');

	activeDot.classList.add('dot-nav-current-dot');

	activeDot.style.left = getPos(dots[0], dotsContainer) + 'px';

	dotsContainer.append(activeDot);

	dotsAnimListen(mainEl, elements);

	return mainEl;
}

async function dotsNavMove(event, elements) {
	const data = event.detail;

	elements[data.oldIndex].style.transform = 'scale(1.2)';
	elements[data.oldIndex].style.opacity = '0';

	setTimeout(function() {
		elements[data.oldIndex].style.display = 'none';
			
		elements[data.index].style.transform = 'scale(1)';
		elements[data.index].style.opacity = '0';
		elements[data.index].style.display = 'block';

		setTimeout(function() {
			elements[data.index].style.transform = 'scale(1)';
			elements[data.index].style.opacity = '1';
		}, 200);
	}, 200);
}

function dotsAnimListen(element, elements) {
	element.addEventListener('dots-move', function(event) {
		const data = event.detail;

		dotsNavMove(event, elements);

		const pos = getPos(data.dot, data.container);

		data.activeDot.style.left = pos + 'px';
		data.activeDot.style.transform = 'scale(0)';

		setTimeout(function() {
			data.activeDot.style.transform = 'scale(1)';
		}, 100);
	});
}