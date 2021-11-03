window.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.main-header__menu');
  const headerMenu = document.querySelector('.main-header__list');
  const userMenu = document.querySelector('.user-navigation');
  const promoSlides = document.querySelectorAll('.promo__slide')
  const promoButtons = document.querySelectorAll('.promo__button');

// Открытие меню-бургера

  burger.addEventListener('click', () => {
    headerMenu.classList.toggle('active');
    userMenu.classList.toggle('active');
  })

  if(headerMenu && userMenu) {
    headerMenu.classList.remove('main-header__list--nojs');
    userMenu.classList.remove('user-navigation--nojs');
  }

// Реализация слайдера

  promoSlides.forEach((slide) => {
    slide.classList.add('promo__slide--hidden');
  });
  promoButtons[0].classList.add('promo__button--active');
  promoSlides[0].classList.remove('promo__slide--hidden');

  const changeSlides = (index) => {
    promoButtons.forEach((button) => {
      button.classList.remove('promo__button--active');
    });
    promoSlides.forEach((slide) => {
      slide.classList.add('promo__slide--hidden');
    });

    promoButtons[index].classList.add('promo__button--active');
    promoSlides[index].classList.remove('promo__slide--hidden');
  };

  promoButtons.forEach((element, index) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      changeSlides(index);
    });
  });

});
