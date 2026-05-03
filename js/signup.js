'use strict'

let firstNameInput = document.querySelector('#firstName')
let lastNameInput = document.querySelector('#lastName');


let form = document.querySelector('#form_auth')

// let userPassword = document.querySelector('#userPassword');
// let userConfirmedPassword = document.querySelector('#confirmPassword');
// let group = document.querySelector('.field')

let emailInput = document.querySelector('#userEmail')
let createButton = document.querySelector('#create-btn');


firstNameInput.addEventListener('input', () => {
  validateInput(firstNameInput);
});

lastNameInput.addEventListener('input', () => {
  validateInput(lastNameInput);
});

emailInput.addEventListener('input', () => {
  validateEmail(emailInput);
});

// Create Error Message
function createErrorNodes(group, message) {

  let errorBox = document.createElement('div');
  let errorText = document.createElement('p');
  errorText.textContent = message;
  errorBox.appendChild(errorText);
  errorBox.classList.add('validation__status')
  group.appendChild(errorBox)

}

// validate user input
function validateInput(input) {
  const value = input.value.trim();
  const group = input.closest('.field');
  if (!group) return false;
  const existingError = group.querySelector('.validation__status')

  if (!value) {
    if (!existingError) {
      createErrorNodes(group, 'Please fill out this field')
    }
    return false;

  }

  else {
    if (existingError) {
      existingError.remove()
    }
    return true;
  }
}

// Validate Email
function validateEmail(input) {
  const value = input.value.trim();
  const group = input.closest('.field')
  if (!group) return false;
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


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const validFirstName = validateInput(firstNameInput);

  const validLastName = validateInput(lastNameInput);

  const validUserName = validFirstName && validLastName;

  const validEmail = validateEmail(emailInput);


  const isValid = validUserName && validEmail



  if (isValid) {
    form.submit()

  }

})