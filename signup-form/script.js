const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fields = [
    {
      id: 'name',
      label: 'name',
      validator: nameIsValid
    },
    {
      id: 'last_name',
      label: 'last_name',
      validator: nameIsValid
    },
    {
      id: 'birthdate',
      label: 'birthdate',
      validator: birthdateIsValid
    },
    {
      id: 'email',
      label: 'email',
      validator: emailIsValid
    },
    {
      id: 'password',
      label: 'password',
      validator: passwordIsValid
    },
    {
      id: 'confirm-password',
      label: 'confirm-password',
      validator: confirmPasswordIsValid
    }
  ]

  const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>';

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const inputBox = input.closest('.input__box');
    const inputValue = input.value;

    const errorSpan = inputBox.querySelector('.error')
    errorSpan.innerHTML = '';

    inputBox.classList.remove('invalid')
    inputBox.classList.add('valid')

    const fieldValidator = field.validator(inputValue)

    if (!fieldValidator.isValid) {
      errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMessage}`
      inputBox.classList.add('invalid')
      inputBox.classList.remove('valid')
      return;
    }
  })

  const genders = document.getElementsByName('gender');
  const radioContainer =  document.querySelector('.radio__container')
  const genderErrorSpan = radioContainer.querySelector('.error')

  const selectedGender = [...genders].find(input => input.checked);
  radioContainer.classList.add('invalid')
  radioContainer.classList.remove('valid')
  genderErrorSpan.innerHTML = `${errorIcon} Please select a gender!`

  if (selectedGender) {
    radioContainer.classList.add('valid')
    radioContainer.classList.remove('invalid')
    genderErrorSpan.innerHTML = ''
    return
  }
})

function isEmpty(value) {
  return value === '';
}

function nameIsValid(value) {
  const validator = {
    isValid: true,
    errorMessage: null
  }

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = 'This field is required!';
    return validator;
  }

  const min = 5;

  if (value.length < min) {
    validator.isValid = false;
    validator.errorMessage = `This field must be at least ${min} characters!`;
    return validator;
  }

  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(value)) {
    validator.isValid = false;
    validator.errorMessage = 'This field must contain only letters!';
    return validator;
  }

  return validator;
}


function birthdateIsValid(value) {
  const validator = {
    isValid: true,
    errorMessage: null
  }

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = 'This field is required!';
    return validator;
  }

  const year = new Date(value).getFullYear();

  if (year < 1920 || year > new Date().getFullYear()) {
    validator.isValid = false;
    validator.errorMessage = 'Date invalid!';
    return validator;
  }

  return validator;
}


function emailIsValid(value) {
  const validator = {
    isValid: true,
    errorMessage: null
  }

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = 'This field is required!';
    return validator;
  }

  const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
  if (!regex.test(value)) {
    validator.isValid = false;
    validator.errorMessage = 'Invalid email!';
    return validator;
  }

  return validator;
}



function passwordIsValid(value) {
  const validator = {
    isValid: true,
    errorMessage: null
  }

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = 'This field is required!';
    return validator;
  }

  const min = 8;

  if (value.length < min) {
    validator.isValid = false;
    validator.errorMessage = `This field must be at least ${min} characters!`;
    return validator;
  }

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(value)) {
    validator.isValid = false;
    validator.errorMessage = 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character!';
    return validator;
  }

  return validator;
}

function confirmPasswordIsValid(value) {
  const validator = {
    isValid: true,
    errorMessage: null
  }

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = 'This field is required!';
    return validator;
  }

  const passwordValue = document.getElementById('password').value;

  if (value === '' || passwordValue !== value) {
    validator.isValid = false;
    validator.errorMessage = 'Passwords do not match!';
    return validator;
  } 
  return validator;
}


const passwordIcons = document.querySelectorAll('.password-icon');


passwordIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const input = icon.parentElement.querySelector('.form-control');
    input.type = input.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('fa-eye');
  })
})

