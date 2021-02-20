if (document.querySelector('.pwToggle')) {
  document.querySelector('.pwToggle').addEventListener('click', function (event) {
    event.preventDefault();
    const password = document.querySelector('#password');

    // toggle & set the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // toggle eye slash icon
    console.log(this.childNodes);
    try {
      this.childNodes[0].classList.toggle('fa-eye-slash');
      this.childNodes[0].classList.toggle('fa-eye');
    }
    catch {
      this.childNodes[1].classList.toggle('fa-eye-slash');
      this.childNodes[1].classList.toggle('fa-eye');
    }
  });
}

if (document.querySelector('.pwToggleConfirm')) {
  document.querySelector('.pwToggleConfirm').addEventListener('click', function (event) {
    event.preventDefault();
    const password = document.querySelector('#confirmPassword');
  
    // toggle & set the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
  
    // toggle eye slash icon
    console.log(this.childNodes);
    try {
      this.childNodes[0].classList.toggle('fa-eye-slash');
      this.childNodes[0].classList.toggle('fa-eye');
    }
    catch {
      this.childNodes[1].classList.toggle('fa-eye-slash');
      this.childNodes[1].classList.toggle('fa-eye');
    }
  });
}
