'use strict'

import { validateEmail, validatePassword, createErrorNodes, validateInput,
validateConfirmPassword} from './auth-validation.js'


const form = document.querySelector('#form_auth')
const firstNameInput = document.querySelector('#firstName')
const lastNameInput = document.querySelector('#lastName');
const emailInput = document.querySelector('#userEmail')
const userPwdInput = document.querySelector('#userPassword');
const userConfirmPwdInput = document.querySelector('#confirmPassword');


const userData = {
  firstName: null,
  lastName: null,
  fullName: null,
  email: null,
  password: null,
  isLoggedIn: false
}

console.log(userData)


// Event listeners

firstNameInput.addEventListener('input', () => {
  validateInput(firstNameInput);
});

lastNameInput.addEventListener('input', () => {
  validateInput(lastNameInput);
});

emailInput.addEventListener('input', () => {
  validateEmail(emailInput);
});

userPwdInput.addEventListener('input', () => {
  validatePassword(userPwdInput);
  validateConfirmPassword(userPwdInput, userConfirmPwdInput);
});

userConfirmPwdInput.addEventListener('input', () => {
  validateConfirmPassword(userPwdInput, userConfirmPwdInput);
});



// Validate form
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const validFirstName = validateInput(firstNameInput);

  const validLastName = validateInput(lastNameInput);

  const validUserName = validFirstName && validLastName;

  const validEmail = validateEmail(emailInput);

  const validPassword = validatePassword(userPwdInput)

  const validConfirmPassword = validateConfirmPassword(
    userPwdInput,
    userConfirmPwdInput
  );

  const isValid = validUserName && validEmail && validPassword && validConfirmPassword



  if (isValid) {
    userData.firstName = firstNameInput.value.trim();
    userData.lastName = lastNameInput.value.trim();
    userData.fullName = `${userData.firstName} ${userData.lastName}`;
    userData.email = emailInput.value.trim()
    userData.password = userPwdInput.value.trim();
    userData.isLoggedIn = true;
  

    localStorage.setItem('userData', JSON.stringify(userData))
    setTimeout(() => {
      window.location.href = '../index.html';
      console.log(userData)
    }, 1000)

  }



})
