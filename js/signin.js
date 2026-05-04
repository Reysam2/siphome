'use strict'

import { validateEmail, validatePassword, createErrorNodes } from './auth-validation.js'


const form = document.querySelector('#form_auth');
const emailInput = document.querySelector('#userEmail')
const passwordInput = document.querySelector('#userPassword');

const userData = JSON.parse(localStorage.getItem('userData')) || {}

console.log(userData)



// Event listeners
emailInput.addEventListener('input', () => {
  validateEmail(emailInput);
});

passwordInput.addEventListener('input', () => {
  validatePassword(passwordInput)
});


// Validate form
form.addEventListener('submit', (e) => {

  e.preventDefault();

  const validEmail = validateEmail(emailInput);
  const validPassword = validatePassword(passwordInput)

  if (!validEmail || !validPassword) return

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim()


  if (email === userData.email && password === userData.password) {
    userData.isLoggedIn = true;
    localStorage.setItem('userData', JSON.stringify(userData));

    window.location.href = '../index.html';
  }

  else {
    const message = 'Invalid email or password'
    const group = emailInput.closest('.field')
     if (group) {
    createErrorNodes(group, message);
  }
     console.log(message);
  }

}) 