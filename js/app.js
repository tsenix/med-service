let mainSlider = new Swiper('.main__slider', {
	// effect: 'fade',
	// autoplay: {
	// 	delay: 3000,
	// 	disableOnInteraction: false,
	// },
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 1,
	speed: 800,
	pagination: {
		el: '.main__slider-pagination',
		clickable: true,
	},
});

let galerySlider = new Swiper('.galery__slider', {
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	observer: true,
	observeParents: true,
	speed: 800,
	loop: true,
	pagination: {
		el: '.galery__slider-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.galery__slider-arrow_right',
		prevEl: '.galery__slider-arrow_left',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	},
});
let iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
let eventMobile = iOS != null ? "click" : "touchstart";

//MenuOpen===================================================================================
const menuButton = document.querySelector('.header__menu-top');
const menuBody = document.querySelector('.header__menu');
const menuLinks = document.querySelectorAll('.header__menu-link');
const contactButton = document.querySelector('.header__contact-icon');
const contactBody = document.querySelector('.header__contact');

const toggleMenu = function() {
  menuBody.classList.toggle('_active');
}
const toggleContact = function() {
  contactBody.classList.toggle('_active');
}

function openMenu(e) {
  e.stopPropagation();
  toggleMenu();
  if (contactBody.classList.contains('_active')) {
    toggleContact();
  }
}

function openContact(e) {
  e.stopPropagation();
  toggleContact();
  if (menuBody.classList.contains('_active')) {
    toggleMenu();
  }
}

for (let i = 0; i < menuLinks.length; i++) {
  let menuLink = menuLinks[i];
  menuLink.addEventListener('click', function() {
    toggleMenu();
  });
}
menuButton.addEventListener('click', openMenu);

document.addEventListener('click', function(e) {
  const target = e.target;
  const its_menuBody = target == menuBody || menuBody.contains(target);
  const its_menuButton = target == menuButton;
  const menuBody_is_active = menuBody.classList.contains('_active');
  
  if (!its_menuBody && !its_menuButton && menuBody_is_active) {
    toggleMenu();
  }
});
document.addEventListener('click', function(e) {
  const target = e.target;
  const its_contactBody = target == contactBody || contactBody.contains(target);
  const its_contactButton = target == contactButton;
  const contactBody_is_active = contactBody.classList.contains('_active');
  
  if (!its_contactBody && !its_contactButton && contactBody_is_active) {
    toggleContact();
  }
});

// window.addEventListener('resize', function() {
  if (window.innerWidth < 1220) {
    contactButton.addEventListener('click', openContact);
  } else {
    contactButton.removeEventListener('click', openContact);
  }
// });

let numbers = document.querySelectorAll('.statistic__number');
for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  let numberTop = number.getBoundingClientRect().top;
  let end = number.dataset.number;
  let start = 0;
  let interval;
  let step;
  if (end >= 10000) {
    interval = 1;
    step = 100;
  } else if (end >= 500 && end < 10000) {
    interval = 10;
    step = 20;
  } else if (end >= 100 && end < 500) {
    interval = 20;
    step = 10;
  } else {
    interval = 50;
    step = 1;
  }

  window.addEventListener('scroll', function onScroll() {
    if(window.pageYOffset > numberTop - window.innerHeight / 2 - 200) {
      this.removeEventListener('scroll', onScroll);
      let count = setInterval(function() {
        start += step;
        number.innerHTML = start;
        if(start == end) {
          clearInterval(count);
        }
      }, interval);
    }
  });
}

let productBody = document.querySelector('.products__body');
let descriptionItems = document.querySelectorAll('.products__description');

productBody.addEventListener('click', function(e) {
  let item = e.target.closest('.products__item');

  if (!item) return;

  showDescription(item);
});

function showDescription(item) {
  let description = item.querySelector('.products__description');
  if (window.innerWidth < 992) {
    description.classList.add('_active');
  }
}

for (let i = 0; i < descriptionItems.length; i++) {
  let descriptionItem = descriptionItems[i];

  descriptionItem.addEventListener('click', function(e) {
    if (descriptionItem.classList.contains('_active')) {
      e.stopPropagation();
      descriptionItem.classList.remove('_active');
    }
  });
}

//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index++) {
		let el = link[index];
		let block_name = el.getAttribute('href').replace('#', '');
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.header__content._active')) {
				iconMenu.classList.remove("_active");
    		menuBody.classList.remove("_active");
			}
			let target_block_class = el.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 500, 100);
			e.preventDefault();
		})
	}

	window.addEventListener('scroll', function (el) {
		let old_current_link = document.querySelectorAll('._goto-block._active');
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				let el = old_current_link[index];
				el.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			let block = blocks[index];
			let block_item = document.querySelector('.' + block);
			if (block_item) {
				let block_offset = offset(block_item).top;
				let block_height = block_item.offsetHeight;
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
					for (let index = 0; index < current_links.length; index++) {
						let current_link = current_links[index];
						current_link.classList.add('_active');
					}
				}
			}
		}
	})
}
function _goto(target_block, speed, offset = 0) {
	let header = '';
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
window.addEventListener('scroll', scroll_scroll);
//ScrollOnScroll
function scroll_scroll() {
	let src_value = pageYOffset;
	let header = document.querySelector('header.header');
	if (header !== null) {
		if (src_value > 10) {
			header.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
		}
	}
}

//Popups
let unlock = true;
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let image = el.getAttribute('data-image');
			popup_open(item, image);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, image = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (image != '' && image != null) {
			let popup_image = curent_popup.querySelector('.popup_image');
			popup_image.src = image;
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let image = popup.querySelector('.popup_image');
				if (image) {
					image.src = 'img/base24.png';
				}
				popup.classList.remove('_active');
			}
		} else {
			let image = item.querySelector('.popup_image');
			if (image) {
				image.src = 'img/base24.png';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}