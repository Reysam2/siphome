'use strict'

const form = document.querySelector('#form_auth')
const firstNameInput = document.querySelector('#firstName')
const lastNameInput = document.querySelector('#lastName');
const emailInput = document.querySelector('#userEmail')
const userPwdInput = document.querySelector('#userPassword');
const userConfirmPwdInput = document.querySelector('#confirmPassword');

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
    const message = 'Please fill out this field'
    if (!existingError) {
      createErrorNodes(group, message)
    }
    else {
      const p = existingError.querySelector('p');
      if (p) {
        p.textContent = message
      }
    }
    return false;

  }

  if (existingError) {
    existingError.remove()
  }
  return true;

}

// Validate Email
function validateEmail(input) {
  const value = input.value.trim();
  const group = input.closest('.field')
  if (!group) return false;
  const existingError = group.querySelector('.validation__status')
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    const message = 'Please fill out this field'
    if (!existingError) {
      createErrorNodes(group, message)
    }
    else {
      const p = existingError.querySelector('p');
      if (p) {
        p.textContent = message
      }
    }
    return false
  }

  else if (!emailPattern.test(value)) {
    const message = 'Please enter a valid email';
    if (existingError) {
      const p = existingError.querySelector('p');

      if (p) {
        p.textContent = message;
      }
    }
    else {
      createErrorNodes(group, message);
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

// Validate Password

function validatePassword(input) {

  const pwdValue = input.value.trim()
  const group = input.closest('.field')
  if (!group) return false;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,}$/

  let existingError = group.querySelector('.validation__status')


  function applyPwdErrorLayout(el) {
    group.classList.add('invalid-password');
    el?.classList.add('validation__status-invalid-password')
  }


  function removePwdErrorLayout() {
    group.classList.remove('invalid-password');
    existingError?.classList.remove('validation__status-invalid-password')
  }


  if (!pwdValue) {

    if (!existingError) {
      createErrorNodes(group, 'Please fill out this field');
      existingError = group.querySelector('.validation__status')

    }
    else {
      const errorText = existingError.querySelector('p');

      if (errorText) {
        errorText.textContent = 'Please fill out this field';
      }

    }
    removePwdErrorLayout()
    return false
  }

  if (!passwordPattern.test(pwdValue)) {
    const message = `• At least 8 characters
• One uppercase letter
• One number
• One special character`;

    if (existingError) {
      const errorText = existingError.querySelector('p')
      if (errorText) {
        errorText.textContent = message;

      }

    }
    else {
      createErrorNodes(group, message)
      existingError = group.querySelector('.validation__status')
    }
    applyPwdErrorLayout(existingError);
    return false
  }

  if (existingError) {
    existingError.remove();
    existingError = null;
  }

  removePwdErrorLayout()

  return true


}

function validateConfirmPassword(passwordInput, confirmInput) {
  const password = passwordInput.value.trim();
  const confirmPassword = confirmInput.value.trim();

  const group = confirmInput.closest('.field');
  if (!group) return false;

  let existingError = group.querySelector('.validation__status')

  if (!confirmPassword) {
    const message = 'Please fill out this field'
    if (!existingError) {
      createErrorNodes(group, message);
    }
    else {
      const p = existingError.querySelector('p');
      if (p) p.textContent = message;

    }

    return false

  }

  if (password !== confirmPassword) {
    const message = 'Passwords do not match'
    if (!existingError) {
      createErrorNodes(group, message)

    }
    else {
      const p = existingError.querySelector('p');
      if (p) {
        p.textContent = message
      }
    }

    return false

  }

  if (existingError) {
    existingError.remove();
    existingError = null;

  }
  return true

}

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
    form.submit()

  }

})