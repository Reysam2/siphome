'use strict'


function selectNavLink() {
  const navLinks = document.querySelectorAll('.header__nav-link')


  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((navLink) => {
        navLink.classList.remove('header__nav-link-active')
      })
      link.classList.add('header__nav-link-active')

      setTimeout(() => {
        link.classList.remove('header__nav-link-active')
      }, 2000)
    })
  })
}

selectNavLink()


// Design Pattern effect
let patternDots = document.querySelectorAll('.hero-intro__pattern svg g circle');


patternDots.forEach((dot, i) => {
  dot.style.animationDelay = `${i * 0.3}s`;
  dot.classList.add('show');
});

///////////////////////////////////////////////////////
// Form Validation

/* This part of the code is handling form validation. Here's a breakdown of what it does: */

const form = document.querySelector('#form');
const userNameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email')
const subjectInput = document.querySelector('#subject');



function createErrorNodes(group, message) {

  let errorBox = document.createElement('div');
  let errorText = document.createElement('p');
  errorText.textContent = message;
  errorBox.appendChild(errorText);
  errorBox.classList.add('validation__status')
  group.appendChild(errorBox)

}


function validateInput(input) {
  const value = input.value.trim();
  const group = input.closest('.form__group')
  const existingError = group.querySelector('.validation__status')

  if (!value) {
    if (!existingError) {
      createErrorNodes(group, 'Please fill out this field')
    }

    return false
  }
  else {
    if (existingError) {
      existingError.remove();
    }

    return true
  }



}

function validateEmail(input) {
  const value = input.value.trim();
  const group = input.closest('.form__group')
  const existingError = group.querySelector('.validation__status')
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    if (!existingError) {
      createErrorNodes(group, 'Please fill out this field')
    }
    return false
  }

  else if (!emailPattern.test(value)) {
    if (existingError) {
      const errorText = existingError.querySelector('p')
      if (errorText) {
        errorText.textContent = 'Please enter a valid email'
      }

    }
    else {
      createErrorNodes(group, 'Please enter a valid email');
    }
    return false

  }

  else {
    if (existingError) {
      existingError.remove();
    }

    return true
  }


}


/* These event listeners are listening for input events on the `userNameInput`, `emailInput` and
`subjectInput` elements respectively. */
userNameInput.addEventListener('input', () => {
  validateInput(userNameInput)
})

emailInput.addEventListener('input', () => {
  validateEmail(emailInput);

})


subjectInput.addEventListener('input', () => {
  validateInput(subjectInput)
})



form.addEventListener('submit', (e) => {
  e.preventDefault();

  const validUserName = validateInput(userNameInput);
  const validEmail = validateEmail(emailInput);
  const validSubject = validateInput(subjectInput);

  const isValid = validUserName && validEmail && validSubject;



  if (isValid) {
    form.submit()

  }

})



/* 
1. I want to be able to display the user's firstName in the home page after sign in.
 2. When you click on the user's name, you should get a dropdown menu that gives the option to sign out
*/




/**
 * The function `userLoginState` retrieves user data from local storage, displays a greeting based on the time of day, and shows the user's first name on the webpage if the user is logged in.
 
 * @returns The `userLoginState` function checks if the user is logged in based on the data retrieved from localStorage. 44

 * If the user is logged in, it updates the display to greet the user with a message based on the time of the day and displays the user's first name. 
 * If the user is not logged in, the function will exit early without making any changes to the display.
 */

function getUserData() {
  return JSON.parse(localStorage.getItem('userData'));
}

function userLoginState() {
  const userData = getUserData();
  if (!userData?.isLoggedIn) return

  const loggedInHidden = document.querySelectorAll('.logged-in-hidden');
  const greetUserContainer = document.querySelector('.header__auth-link-blk')
  const saluteDisplay = document.querySelector('.salute');
  const userNameDisplay = document.querySelector('.user-name');


  if (!saluteDisplay || !userNameDisplay || !greetUserContainer) return;



  loggedInHidden.forEach(item => {
    item.style.display = 'none';

  });



  const time = new Date().getHours()

  if (time < 12) {
    saluteDisplay.textContent = 'Good morning'
  }

  else if (time >= 12 && time < 17) {
    saluteDisplay.textContent = 'Good day'
  }


  else {
    saluteDisplay.textContent = 'Good evening'
  }

  userNameDisplay.textContent = userData.firstName;

  saluteDisplay.classList.add('salute-active');
  userNameDisplay.classList.add('user-name-active');
  greetUserContainer.classList.add('header__auth-link-blk-active')

}

userLoginState()

/*
 * The function `displayUserProfile` handles displaying a user profile menu when the user clicks on their username.

 * @returns If the user is not logged in or if either the userProfileMenu or userNameDisplay elements are not found in the document, the function will return early and not execute the rest of the code.
 */

function displayUserProfile() {
  const userData = getUserData();
  const userProfileMenu = document.querySelector('.user-menu-blk');
  const userNameDisplay = document.querySelector('.user-name');

  if (!userData?.isLoggedIn) return
  if (!userProfileMenu || !userNameDisplay) return;


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


displayUserProfile()