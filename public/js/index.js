import '@babel/polyfill';
import { organicVsPaidChart, organicComparison } from './charts';
import { login, logout } from './login';
import { updateUserProfile } from './updateUser'

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.getElementById('logout_Btn');
const userProfileForm = document.querySelector('.form--profile');


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

if (userProfileForm) {
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
