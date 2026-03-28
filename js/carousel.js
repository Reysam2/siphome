'use strict'

const carousel = document.querySelector('#carousel');
let scrollSpeed = 1;
let isPaused = false;

if (document.body.clientWidth < 1024) {
  carousel.innerHTML += carousel.innerHTML;

}

carousel.addEventListener('mouseenter', () => {
  isPaused = true;
})

carousel.addEventListener('mouseleave', () => {
  isPaused = false;
})


function scrollCarousel() {
  if (!carousel || isPaused) {
     requestAnimationFrame(scrollCarousel);
     return
  };

  carousel.scrollLeft += scrollSpeed;
  if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
    carousel.style.scrollBehavior = 'auto';
    carousel.scrollLeft = 0;
  }

  requestAnimationFrame(scrollCarousel);

}



scrollCarousel()


