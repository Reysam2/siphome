'use strict'

const tesCardCarousel = document.querySelector('#testimonial__card-carousel')
const serviceCarousel = document.querySelector('#carousel');
const indicators = document.querySelectorAll('.card-carousel__indicator-blk .indicator');
const card = tesCardCarousel?.querySelector('.testimonial__card');

let serviceScrollSpeed = 1;
let isServicePaused = false;
let isTesCardPaused = false;
let currentIndex = 0;
let resumeTimeout;

if (window.innerWidth < 1024) {
  if (serviceCarousel) {
    serviceCarousel.innerHTML += serviceCarousel.innerHTML;
  }

}

// EVENT LISTENERS
// SERVICE 

if (serviceCarousel) {
  serviceCarousel.addEventListener('mouseenter', () => {
    isServicePaused = true;
  })

  serviceCarousel.addEventListener('mouseleave', () => {
    isServicePaused = false;
  })
}


// TESTIMONIALS
if (tesCardCarousel) {
  tesCardCarousel.addEventListener('mouseenter', () => {
    isTesCardPaused = true;
  })

  tesCardCarousel.addEventListener('mouseleave', () => {
    isTesCardPaused = false;
  })

}

document.addEventListener('visibilitychange', () => {
  isTesCardPaused = document.hidden;
});


///////////////////////////////////////////////////
//FUNCTION
// SERVICE 
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

if (serviceCarousel) {
  scrollServiceCarousel()

}


///////////////////////////////////////////////
// FUNCTION
// TESTIMONIALS
function testimonialCarousel() {

  if (!tesCardCarousel || !card) {
    setTimeout(testimonialCarousel, 2000);
    return;
  }
  if (isTesCardPaused) {
    setTimeout(testimonialCarousel, 2000);
    return
  };

  const cardWidth = card?.offsetWidth || 0;
  const columnGap = tesCardCarousel
    ? parseInt(getComputedStyle(tesCardCarousel).columnGap) || 0
    : 0;

  tesCardCarousel.scrollBy({
    left: cardWidth + columnGap,
    behavior: 'smooth',
  });

  if (tesCardCarousel.scrollLeft >= tesCardCarousel.scrollWidth / 2) {
    tesCardCarousel.style.scrollBehavior = 'auto';
    tesCardCarousel.scrollLeft = 0;
    requestAnimationFrame(() => {
      tesCardCarousel.style.scrollBehavior = 'smooth';
    });
    currentIndex = 0;
  }
  setTimeout(testimonialCarousel, 7500);
}


// Manual User Scroll
if (tesCardCarousel) {
  tesCardCarousel.addEventListener('scroll', () => {
    isTesCardPaused = true;

    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      isTesCardPaused = false;
    }, 3000);

    if (!card) return;

    const cardWidth = card?.offsetWidth || 0;
    const columnGap = tesCardCarousel
      ? parseInt(getComputedStyle(tesCardCarousel).columnGap) || 0
      : 0;

    if (indicators.length > 0) {
      currentIndex = Math.floor(
        tesCardCarousel.scrollLeft / (cardWidth + columnGap)
      ) % indicators.length;

      setActiveIndicator(currentIndex);
    }
  });
  setTimeout(testimonialCarousel, 7500);
}


////////////////////////////////////////////////////
// LIVE INDICATOR
function setActiveIndicator(index) {
  indicators.forEach((dot, i) => {
    dot.classList.toggle('indicator-active', i === index);
  });
}

if (indicators.length > 0) {
  setActiveIndicator(currentIndex);
}


