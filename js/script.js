'use strict';

/* =========================
   DOM SELECTORS
========================= */

const navLinks = document.querySelectorAll('.header__nav-link');
const patternDots = document.querySelectorAll('.hero-intro__pattern svg g circle');

const form = document.querySelector('#form');
const userNameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const subjectInput = document.querySelector('#subject');


/* =========================
   HELPERS
========================= */

function getUserData() {
  return JSON.parse(localStorage.getItem('userData'));
}

function createErrorNodes(group, message) {
  const errorBox = document.createElement('div');
  const errorText = document.createElement('p');

  errorText.textContent = message;
  errorBox.appendChild(errorText);
  errorBox.classList.add('validation__status');

  group.appendChild(errorBox);
}


/* =========================
   NAVIGATION
========================= */

function selectNavLink() {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((navLink) => {
        navLink.classList.remove('header__nav-link-active');
      });

      link.classList.add('header__nav-link-active');

      setTimeout(() => {
        link.classList.remove('header__nav-link-active');
      }, 2000);
    });
  });
}


/* =========================
   HERO PATTERN EFFECT
========================= */

function animateHeroPattern() {
  patternDots.forEach((dot, i) => {
    dot.style.animationDelay = `${i * 0.3}s`;
    dot.classList.add('show');
  });
}


/* =========================
   CONTACT FORM VALIDATION
========================= */

function validateInput(input) {
  const value = input.value.trim();
  const group = input.closest('.form__group');

  if (!group) return false;

  const existingError = group.querySelector('.validation__status');

  if (!value) {
    if (!existingError) {
      createErrorNodes(group, 'Please fill out this field');
    }

    return false;
  }

  if (existingError) {
    existingError.remove();
  }

  return true;
}

function validateEmail(input) {
  const value = input.value.trim();
  const group = input.closest('.form__group');

  if (!group) return false;

  const existingError = group.querySelector('.validation__status');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    if (!existingError) {
      createErrorNodes(group, 'Please fill out this field');
    }

    return false;
  }

  if (!emailPattern.test(value)) {
    if (existingError) {
      const errorText = existingError.querySelector('p');
      if (errorText) {
        errorText.textContent = 'Please enter a valid email';
      }
    } else {
      createErrorNodes(group, 'Please enter a valid email');
    }

    return false;
  }

  if (existingError) {
    existingError.remove();
  }

  return true;
}

function initContactFormValidation() {
  if (!form || !userNameInput || !emailInput || !subjectInput) return;

  userNameInput.addEventListener('input', () => {
    validateInput(userNameInput);
  });

  emailInput.addEventListener('input', () => {
    validateEmail(emailInput);
  });

  subjectInput.addEventListener('input', () => {
    validateInput(subjectInput);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const validUserName = validateInput(userNameInput);
    const validEmail = validateEmail(emailInput);
    const validSubject = validateInput(subjectInput);

    const isValid = validUserName && validEmail && validSubject;

    if (isValid) {
      form.submit();
    }
  });
}


/* =========================
   AUTH UI STATE
========================= */

function getGreeting() {
  const time = new Date().getHours();

  if (time < 12) {
    return 'Good morning';
  }

  if (time >= 12 && time < 17) {
    return 'Good day';
  }

  return 'Good evening';
}

function userLoginState() {
  const userData = getUserData();

  if (!userData?.isLoggedIn) return;

  const loggedInHidden = document.querySelectorAll('.logged-in-hidden');
  const greetUserContainer = document.querySelector('.header__auth-link-blk');
  const saluteDisplay = document.querySelector('.salute');
  const userNameDisplay = document.querySelector('.user-name');

  if (!saluteDisplay || !userNameDisplay || !greetUserContainer) return;

  loggedInHidden.forEach((item) => {
    item.style.display = 'none';
  });

  saluteDisplay.textContent = getGreeting();
  userNameDisplay.textContent = userData.firstName;

  saluteDisplay.classList.add('salute-active');
  userNameDisplay.classList.add('user-name-active');
  greetUserContainer.classList.add('header__auth-link-blk-active');
}

function displayUserProfile() {
  const userData = getUserData();

  if (!userData?.isLoggedIn) return;

  const userProfileMenu = document.querySelector('.user-menu-blk');
  const userNameDisplay = document.querySelector('.user-name');
  const userFullName = document.querySelector('.user-info__text-name')
  const userEmail = document.querySelector('.user-info__text-email')

  if (!userProfileMenu || !userNameDisplay || !userFullName || !userEmail) return;

  userFullName.textContent = userData.fullName ||`${userData.firstName} ${userData.lastName}`;
  userEmail.textContent = userData.email;


  userNameDisplay.addEventListener('click', (e) => {
    e.stopPropagation();
    userProfileMenu.classList.toggle('user-menu-active');
  });

  userProfileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('click', () => {
    userProfileMenu.classList.remove('user-menu-active');
  });


}


/* =========================
   INIT APP
========================= */

function initApp() {
  selectNavLink();
  animateHeroPattern();
  initContactFormValidation();
  userLoginState();
  displayUserProfile();
}

initApp();