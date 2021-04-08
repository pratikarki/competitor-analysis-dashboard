import '@babel/polyfill';
import { organicVsPaidChart, organicComparison } from './charts';
import { login, logout } from './login';
import { updateProfile } from './updateUser';
import { sendFeedback } from './sendFeedback';
import { forgotPass } from './forgotPass';
import { resetPass } from './resetPass';
import { checkDomain } from './checkDomain';
import { checkEmail } from './checkEmail';
import { register } from './register';
import { createUser } from './createUser';
import { deleteUser } from './deleteUser';
import { deleteFeedback } from './deleteFeedback';
import { newAdmin } from './newAdmin';

// DOM ELEMENTS
const year = document.getElementById('year');
const loginForm = document.querySelector('.form--login');
const registerForm = document.querySelector('.form--register');
const forgotForm = document.querySelector('.form--forgot');
const resetForm = document.querySelector('.form--reset');
const logoutBtn = document.getElementById('logout_Btn');
const profileForm = document.querySelector('.form--profile');
const pwToggle = document.querySelector('.pwToggle');
const pwToggleConfirm = document.querySelector('.pwToggleConfirm');
const btnSuggestion = document.getElementById('suggestion');
const btnSomethingWrong = document.getElementById('somethingWrong');
const btnCompliment = document.getElementById('compliment');
const feedbackForm = document.querySelector('.form--feedback');
const adminFeedbackTable = document.getElementById('adminFeedback-table');
const adminOverviewTable = document.getElementById('adminOverview-table');
const newAdminForm = document.querySelector('.form--newAdmin');

const trimValue = document.querySelector('.trimValue');

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
if (document.getElementById('organicVsPaidSixth')) {
	const graphs = JSON.parse(document.getElementById('organicVsPaidSixth').dataset.graphs);
	organicVsPaidChart('organicVsPaidSixth', graphs);
}

if (document.getElementById('organicComparison')) {
	const graphs = JSON.parse(document.getElementById('organicComparison').dataset.graphs);
	organicComparison('organicComparison', graphs);
}

if (loginForm) {
	loginForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		login(email, password);
	});
}

if (registerForm) {
	registerForm.addEventListener('submit', async (event) => {
		event.preventDefault();
		document.getElementById('btn--register').textContent = 'Processing...';
		document.getElementById('btn--register').disabled = true;

		const fullName = document.getElementById('fullName').value;
		let userName = document.getElementById('userName').value;
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const confirmPassword = document.getElementById('confirmPassword').value;
		const domainName = document.getElementById('domainName').value;

		if (userName === '') userName = undefined;

		//Check if email exists
		if (checkEmail(email) === false) return;

		//Check if domain is valid
		if (checkDomain(domainName) === false) return;

		const user_id = await createUser({ fullName, userName, email, password, confirmPassword, domainName }, 'signup');
		if (!user_id) return;

		//window.location.replace('/loading');
		//window.location.assign(`/loading/domain/${domainName}/id/${user_id}`);
		document.querySelector('.loading-message').classList.add('loading-message--show');
		document.getElementById('headerSection').style.display = 'none';
		document.getElementById('footerSection').style.display = 'none';

		await register({ fullName, userName, email, password, confirmPassword, domainName }, user_id); //domain_id, competitorSites
		document.getElementById('btn--register').innerHTML = '<i class="fas fa-user-plus me-2"></i>Sign Up';
		document.getElementById('btn--register').disabled = false;
	});
}

if (forgotForm) {
	forgotForm.addEventListener('submit', async(event) => {
		event.preventDefault();
		document.getElementById('btnForgotSubmit').textContent = 'Processing...';
		document.getElementById('btnForgotSubmit').disabled = true;

		const email = document.getElementById('forgotEmail').value;

		await forgotPass(email);
		document.getElementById('btnForgotSubmit').textContent = 'Submit';
		document.getElementById('btnForgotSubmit').disabled = false;
	});
}

if (resetForm) {
	resetForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const password = document.getElementById('password').value;
		const confirmPassword = document.getElementById('confirmPassword').value;
		const path = window.location.pathname;

		resetPass(password, confirmPassword, path);
	});
}

if (logoutBtn) {
	logoutBtn.addEventListener('click', logout);
}

if (profileForm) {
	profileForm.addEventListener('submit', async (event) => {
		event.preventDefault();
		document.getElementById('btn--save').textContent = 'Saving...';
		document.getElementById('btn--save').disabled = true;

		const form = new FormData();
		form.append('fullName', document.getElementById('fullName').value);
		form.append('userName', document.getElementById('userName').value);
		form.append('photo', document.getElementById('photo').files[0]);

		const currentPassword = document.getElementById('currentpassword').value;
		const newPassword = document.getElementById('newpassword').value;
		const confirmPassword = document.getElementById('confirmpassword').value;

		if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
			await updateProfile(form);
		} else {
			form.append('currentPassword', currentPassword);
			form.append('newPassword', newPassword);
			form.append('confirmPassword', confirmPassword);
			await updateProfile(form);
		}

		document.getElementById('btn--save').textContent = 'Save Profile';
		document.getElementById('btn--save').disabled = false;
		document.getElementById('currentpassword').value = '';
		document.getElementById('newpassword').value = '';
		document.getElementById('confirmpassword').value = '';
	});
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
		} catch {
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
		} catch {
			this.childNodes[1].classList.toggle('fa-eye-slash');
			this.childNodes[1].classList.toggle('fa-eye');
		}
	});
}

if (btnSuggestion) {
	btnSuggestion.addEventListener('click', function (event) {
		event.preventDefault();
		btnSuggestion.parentElement.childNodes.forEach((el) => {
			if (el.classList.contains('select-btn')) {
				el.classList.remove('select-btn');
			}
		});
		btnSuggestion.classList.add('select-btn');
	});
}
if (btnSomethingWrong) {
	btnSomethingWrong.addEventListener('click', function (event) {
		event.preventDefault();
		btnSomethingWrong.parentElement.childNodes.forEach((el) => {
			if (el.classList.contains('select-btn')) {
				el.classList.remove('select-btn');
			}
		});
		btnSomethingWrong.classList.add('select-btn');
	});
}
if (btnCompliment) {
	btnCompliment.addEventListener('click', function (event) {
		event.preventDefault();
		btnCompliment.parentElement.childNodes.forEach((el) => {
			if (el.classList.contains('select-btn')) {
				el.classList.remove('select-btn');
			}
		});
		btnCompliment.classList.add('select-btn');
	});
}

if (feedbackForm) {
	feedbackForm.addEventListener('submit', async (event) => {
		event.preventDefault();
		document.getElementById('btn--send').textContent = 'Sending...';
		document.getElementById('btn--send').disabled = true;

		let rating;
		if (document.querySelector('input[name="rate"]:checked')) {
			rating = document.querySelector('input[name="rate"]:checked').value;
		} else {
			rating = undefined;
		}

		let category;
		if (document.querySelector('.select-btn')) {
			category = document.querySelector('.select-btn').value;
		} else {
			category = undefined;
		}

		let message = document.getElementById('feedbackMessage').value;
		if (message == '') {
			message = undefined;
		}

		await sendFeedback({ rating, category, message });
		document.getElementById('btn--send').textContent = 'Send';
		document.getElementById('btn--send').disabled = false;
	});
}

if (adminOverviewTable) {
	document.querySelectorAll('.btn-delete').forEach((btn) => {
		btn.addEventListener('click', (event) => {
			// let email
			//console.log(event.target.parentNode.parentNode.childNodes[2].getAttribute('value'));
			let user_id = event.target.parentNode.parentNode.getAttribute('id');

			document.getElementById('confirmUserDelete').addEventListener('click', async (e) => {
				const status = await deleteUser(user_id);

				if (status == 'success') {
					//update table and userCount
					document.getElementById(`${user_id}`).remove();
					let userCount = parseInt(document.getElementById('userCount').textContent);
					document.getElementById('userCount').textContent = userCount - 1;
				}
			});
		});
	});
}

if (adminFeedbackTable) {
	document.querySelectorAll('.btn-delete').forEach((btn) => {
		btn.addEventListener('click', (event) => {
			// let email
			//console.log(event.target.parentNode.parentNode.childNodes[2].getAttribute('value'));
			let feedback_id = event.target.parentNode.parentNode.getAttribute('id');

			document.getElementById('confirmFeedbackDelete').addEventListener('click', async (e) => {
				// e.preventDefault();
				const status = await deleteFeedback(feedback_id);

				if (status == 'success') {
					//update table
					document.getElementById(`${feedback_id}`).remove();
				}
			});
		});
	});
}

if (newAdminForm) {
	newAdminForm.addEventListener('submit', async (event) => {
		event.preventDefault();
		document.getElementById('btn--createAdmin').textContent = 'Creating...';
		document.getElementById('btn--createAdmin').disabled = true;

		const fullName = document.getElementById('fullName').value;
		let userName = document.getElementById('userName').value;
		const email = document.getElementById('email').value;
		const password = document.getElementById('newPassword').value;
		const confirmPassword = document.getElementById('confirmPassword').value;
		const role = 'admin';

		if (userName === '') userName = undefined;

		//Check if email exists
		if (checkEmail(email) === false) return;

		const user_id = await createUser({ fullName, userName, email, password, confirmPassword, role }, 'signupOnly');
		if (!user_id) return;

		await newAdmin(user_id);

		document.getElementById('btn--createAdmin').textContent = 'Create';
		document.getElementById('btn--createAdmin').disabled = false;
	})
}

if (trimValue) {
	document.querySelectorAll('.trimValue').forEach((el) => {
		let value = el.textContent;
		if (value !== '-') {
			// remove values after dot
			value = value.split('.')[0];
			// insert commas between numbers
			value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

			el.textContent = value;
		}
	});
}

$(document).ready(function () {
	$('.table-sortable').tablesorter({ sortList: [[0, 0]] });
});
