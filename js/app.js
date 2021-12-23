let mainSlider = new Swiper('.main__slider', {
	// effect: 'fade',
	// autoplay: {
	// 	delay: 3000,
	// 	disableOnInteraction: false,
	// },
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	speed: 800,
	pagination: {
		el: '.main__slider-pagination',
		clickable: true,
	},
});

let galerySlider = new Swiper('.galery__slider', {
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
//MenuOpen===================================================================================
const menuButton = document.querySelector('.header__menu-top');
const menuBody = document.querySelector('.header__menu');
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

window.addEventListener('resize', function() {
  if (window.innerWidth < 1220) {
    contactButton.addEventListener('click', openContact);
  } else {
    contactButton.removeEventListener('click', openContact);
  }
});

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

let productItems = document.querySelectorAll('.products__item');
for (let i = 0; i < productItems.length; i++) {
  let productItem = productItems[i];
  let itemTop = offset(productItem).top;
  let itemHeight = productItem.clientHeight;

  window.addEventListener('scroll', onScroll);

  function onScroll() {
    if (window.pageYOffset > itemTop && window.pageYOffset < itemTop + itemHeight && !productItem.classList.contains('_active')) {
      productItem.classList.add('_active');
    } else if (window.pageYOffset <= itemTop || window.pageYOffset >= itemTop + itemHeight && productItem.classList.contains('_active')) {
      productItem.classList.remove('_active');
    }
  }
}

function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
