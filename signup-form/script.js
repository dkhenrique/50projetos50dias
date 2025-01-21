const passwordIcons = document.querySelectorAll('.password-icon');


passwordIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const input = icon.parentElement.querySelector('.form-control');
    input.type = input.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('fa-eye');
  })
})

