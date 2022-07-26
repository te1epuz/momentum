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

  const popUp = document.querySelector('.pop_up');
  const popUppers = document.querySelectorAll('.pop_upper');

  popUppers.forEach(button => {
    button.addEventListener('click', () => {
      popUp.classList.add('pop_up_active');       
      });
  });

  popUp.addEventListener('mousedown', (event) => {
    if (event.target === popUp) {
    popUp.classList.remove('pop_up_active');}   
  });


  const popUpTogglers = document.querySelectorAll('.pop_up_toggler');
  const loginWindow = document.querySelector('.login_window');
  const registerWindow = document.querySelector('.register_window');
  
  popUpTogglers.forEach(toggler => {
    toggler.addEventListener('click', () => {
      loginWindow.classList.toggle('window_hide');       
      registerWindow.classList.toggle('window_hide');  
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
  
  
  const formLogin = document.getElementById('form_login');
  formLogin.addEventListener("submit", function (event) {
    event.preventDefault();   
    alert(`Login: ${formLogin.elements["email"].value} \nPassword: ${formLogin.elements["password"].value}`);
  });

  const formRegister = document.getElementById('form_register');
  formRegister.addEventListener("submit", function (event) {
    event.preventDefault();   
    alert(`Register: ${formRegister.elements["email"].value} \nPassword: ${formRegister.elements["password"].value}`);
  });



}());