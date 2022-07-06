// burger handler
(function () {
  const burger = document.querySelector('.header_burger');
  const menu = document.querySelector('.header_nav');
  const menuLink = document.querySelectorAll('.header_nav_link');
  const menuCloseButton = document.querySelector('.header_nav_close');
  const blackBg = document.querySelector('.black_bg');
    
  burger.addEventListener('click', () => {
    menu.classList.add('header_nav_active');
    blackBg.classList.add('black_bg_active');
   });
  
  blackBg.addEventListener('click', () => {
    menu.classList.remove('header_nav_active');
    blackBg.classList.remove('black_bg_active');
  });
  
  menuLink.forEach(link => {
    link.addEventListener('click', () => {
    menu.classList.remove('header_nav_active');
    blackBg.classList.remove('black_bg_active'); 
    });
  });
   
}());