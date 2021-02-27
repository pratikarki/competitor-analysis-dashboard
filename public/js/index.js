import '@babel/polyfill';
import { organicVsPaidChart, organicComparison } from './charts';
import { login, logout } from './login';
import { updateUserProfile } from './updateUser'
import { sendFeedback } from './sendFeedback'

// DOM ELEMENTS
const year = document.getElementById('year');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.getElementById('logout_Btn');
const profileForm = document.querySelector('.form--profile');
const pwToggle = document.querySelector('.pwToggle');
const pwToggleConfirm = document.querySelector('.pwToggleConfirm');
const btnSuggestion = document.getElementById('suggestion');
const btnSomethingWrong = document.getElementById('somethingWrong');
const btnCompliment = document.getElementById('compliment');
const feedbackForm = document.querySelector('.form--feedback');

if (year) {
  year.innerHTML = ` ${new Date().getFullYear()}`;
}

if (document.getElementById('organicVsPaid')) {
  const graphs = JSON.parse(document.getElementById('organicVsPaid').dataset.graphs);
  organicVsPaidChart('organicVsPaid', graphs);
}
if (document.getElementById('organicVsPaidSecond')) {
  const graphs = JSON.parse(document.getElementById('organicVsPaidSecond').dataset.graphs);
  organicVsPaidChart('organicVsPaidSecond', graphs);
}
if (document.getElementById('organicVsPaidThird')) {
  const graphs = JSON.parse(document.getElementById('organicVsPaidThird').dataset.graphs);
  organicVsPaidChart('organicVsPaidThird', graphs);
}
if (document.getElementById('organicVsPaidFourth')) {
  const graphs = JSON.parse(document.getElementById('organicVsPaidFourth').dataset.graphs);
  organicVsPaidChart('organicVsPaidFourth', graphs);
}
if (document.getElementById('organicVsPaidFifth')) {
  const graphs = JSON.parse(document.getElementById('organicVsPaidFifth').dataset.graphs);
  organicVsPaidChart('organicVsPaidFifth', graphs);
}

if (document.getElementById('organicComparison')) {
  const graphs = JSON.parse(document.getElementById('organicComparison').dataset.graphs);
  organicComparison('organicComparison', graphs);
}


if (loginForm) {
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password)
  })
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (profileForm) {
  addEventListener('submit', async (event) => {
    event.preventDefault();
    document.getElementById('btn--save').textContent = 'Saving...';

    const fullName = document.getElementById('fullName').value;
    const userName = document.getElementById('userName').value;
    const currentPassword = document.getElementById('currentpassword').value;
    const newPassword = document.getElementById('newpassword').value;
    const confirmPassword = document.getElementById('confirmpassword').value;

    if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
      await updateUserProfile({ fullName, userName });
    }
    else {
      await updateUserProfile({ fullName, userName, currentPassword, newPassword, confirmPassword });
    }

    document.getElementById('btn--save').textContent = 'Save Profile';
    document.getElementById('currentpassword').value = '';
    document.getElementById('newpassword').value = '';
    document.getElementById('confirmpassword').value = '';
  })
}

if (pwToggle) {
  pwToggle.addEventListener('click', function (event) {
    event.preventDefault();
    const password = document.querySelector('#password');
    // toggle & set the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle eye slash icon
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

if (pwToggleConfirm) {
  pwToggleConfirm.addEventListener('click', function (event) {
    event.preventDefault();
    const password = document.querySelector('#confirmPassword');
    // toggle & set the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle eye slash icon
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

if (btnSuggestion) {
  btnSuggestion.addEventListener('click', function (event) {
    event.preventDefault();
    btnSuggestion.parentElement.childNodes.forEach(el => {
      if (el.classList.contains('select-btn')) {
        el.classList.remove('select-btn');
      }
    })
    btnSuggestion.classList.add('select-btn');
  })
}
if (btnSomethingWrong) {
  btnSomethingWrong.addEventListener('click', function (event) {
    event.preventDefault();
    btnSomethingWrong.parentElement.childNodes.forEach(el => {
      if (el.classList.contains('select-btn')) {
        el.classList.remove('select-btn');
      }
    })
    btnSomethingWrong.classList.add('select-btn');
  })
}
if (btnCompliment) {
  btnCompliment.addEventListener('click', function (event) {
    event.preventDefault();
    btnCompliment.parentElement.childNodes.forEach(el => {
      if (el.classList.contains('select-btn')) {
        el.classList.remove('select-btn');
      }
    })
    btnCompliment.classList.add('select-btn');
  })
}

if (feedbackForm) {
  addEventListener('submit', async (event) => {
    event.preventDefault();
    document.getElementById('btn--send').textContent = 'Sending...';

    let rating;
    if (document.querySelector('input[name="rate"]:checked')) {
      rating = document.querySelector('input[name="rate"]:checked').value;
    } else { rating = undefined }

    let category;
    if (document.querySelector('.select-btn')) {
      category = document.querySelector('.select-btn').value;
    } else { category = undefined }

    let message = document.getElementById('feedbackMessage').value;
    if (message == '') { message = undefined }

    await sendFeedback({ rating, category, message });
    document.getElementById('btn--send').textContent = 'Send';
  })
}