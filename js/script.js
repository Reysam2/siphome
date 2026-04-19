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

