'use strict'

const tesCardCarousel = document.querySelector('#testimonial__card-carousel')
const serviceCarousel = document.querySelector('#carousel');
let serviceScrollSpeed = 1;
let isServicePaused = false;
let isTesCardPaused = false;

if (window.innerWidth < 1024) {
  if (serviceCarousel) {
    serviceCarousel.innerHTML += serviceCarousel.innerHTML;
  }

}

if (serviceCarousel) {
  serviceCarousel.addEventListener('mouseenter', () => {
    isServicePaused = true;
  })

  serviceCarousel.addEventListener('mouseleave', () => {
    isServicePaused = false;
  })
}



if (tesCardCarousel) {
  tesCardCarousel.addEventListener('mouseenter', () => {
    isTesCardPaused = true;
  })

  tesCardCarousel.addEventListener('mouseleave', () => {
    isTesCardPaused = false;
  })
}




function scrollServiceCarousel() {
  if (!serviceCarousel || isServicePaused) {
    requestAnimationFrame(scrollServiceCarousel);
    return
  };

  serviceCarousel.scrollLeft += serviceScrollSpeed;
  if (serviceCarousel.scrollLeft >= serviceCarousel.scrollWidth / 2) {
    serviceCarousel.style.scrollBehavior = 'auto';
    serviceCarousel.scrollLeft = 0;
  }

  requestAnimationFrame(scrollServiceCarousel);

}


function testimonialCarousel() {


  if (!tesCardCarousel || isTesCardPaused) {
    setTimeout(testimonialCarousel, 2000);
    return
  };

  const card = tesCardCarousel.querySelector('.testimonial__card');
  if (!card) return;

 
  const cardWidth = card.offsetWidth;  
  const columnGap = parseInt(getComputedStyle(tesCardCarousel).columnGap) || 2; 

  tesCardCarousel.scrollBy({
    left: cardWidth + columnGap,
    behavior: 'smooth'
  });



  if (tesCardCarousel.scrollLeft >= tesCardCarousel.scrollWidth / 2) {
    tesCardCarousel.style.scrollBehavior = 'auto';
    tesCardCarousel.scrollLeft = 0;
  }

  setTimeout(testimonialCarousel, 7500);

}



if (serviceCarousel) {
  scrollServiceCarousel()

}


if (tesCardCarousel) {
  testimonialCarousel();
}
