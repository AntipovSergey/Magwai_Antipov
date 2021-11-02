window.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.main-header__menu');
  const headerMenu = document.querySelector('.main-header__list');
  const userMenu = document.querySelector('.user-navigation');

  burger.addEventListener('click', () => {
    headerMenu.classList.toggle('active');
    userMenu.classList.toggle('active');
  })

});

