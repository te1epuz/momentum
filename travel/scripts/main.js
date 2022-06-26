// burger handler
(function () {
  const burger = document.querySelector('.header_burger');
  const menu = document.querySelector('.header_nav');
  const menuCloseButton = document.querySelector('.header_nav_close');
  burger.addEventListener('click', () => {
    menu.classList.add('header_nav_active');
  });
  menuCloseButton.addEventListener('click', () => {
    menu.classList.remove('header_nav_active');
  });
}());