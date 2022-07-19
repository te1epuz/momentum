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
  
  let currentDestination = 2;

  const paginator = document.querySelector('.destinations_pagination').childNodes;

  destinations.addEventListener('click', (event) => {
    event.preventDefault()
 
    let target = event.target.getAttribute('alt')    

    if (target !== 'destination 1' 
      && target !== 'destination 2'
      && target !== 'destination 3'
      && target !== 'arrow left'
      && target !== 'arrow right') return;

    if (target === 'destination 1') {
      currentDestination -= 1
      if (currentDestination < 1) currentDestination = 1;
    }

    if ((target === 'destination 2') && (currentDestination === 1)) {
      currentDestination += 1
      if (currentDestination > 3) currentDestination = 3;
    }

    if ((target === 'destination 2') && (currentDestination === 3)) {
      currentDestination -= 1
      if (currentDestination < 1) currentDestination = 1;
    }

    if (target === 'destination 3') {
      currentDestination += 1
      if (currentDestination > 3) currentDestination = 3;
    }

    if (target === 'arrow left') {
      currentDestination -= 1
      if (currentDestination < 1) currentDestination = 1;
    }

    if (target === 'arrow right') {
      currentDestination += 1
      if (currentDestination > 3) currentDestination = 3;
    }

    if (currentDestination === 1) {
      destinations_cards_container.classList.remove('courusel_center', 'courusel_right');
      destinations_cards_container.classList.add('courusel_left');
      paginator[1].classList.remove('destination_pagination_circle');
      paginator[1].classList.add('destination_pagination_circle_active');
      paginator[3].classList.remove('destination_pagination_circle_active');
      paginator[3].classList.add('destination_pagination_circle');
      arrowleft.classList.add('dest_arrow_opacity')
    }

    if (currentDestination === 2) {
      destinations_cards_container.classList.remove('courusel_left', 'courusel_right');      
      destinations_cards_container.classList.add('courusel_center');
      paginator[3].classList.remove('destination_pagination_circle');
      paginator[3].classList.add('destination_pagination_circle_active');
      paginator[1].classList.remove('destination_pagination_circle_active');
      paginator[1].classList.add('destination_pagination_circle');
      paginator[5].classList.remove('destination_pagination_circle_active');
      paginator[5].classList.add('destination_pagination_circle');
      arrowleft.classList.remove('dest_arrow_opacity')
      arrowright.classList.remove('dest_arrow_opacity')
    }

    if (currentDestination === 3) {
      destinations_cards_container.classList.remove('courusel_left', 'courusel_center');      
      destinations_cards_container.classList.add('courusel_right');
      paginator[5].classList.remove('destination_pagination_circle');
      paginator[5].classList.add('destination_pagination_circle_active');
      paginator[3].classList.remove('destination_pagination_circle_active');
      paginator[3].classList.add('destination_pagination_circle');
      arrowright.classList.add('dest_arrow_opacity')
    }

  }) 
  
   
}());