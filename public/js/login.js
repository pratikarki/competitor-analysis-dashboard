import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
	try {
		const res = await axios({
			method: 'POST',
			url: '/api/v1/users/login',
			data: {
				email: email,
				password: password,
			},
		});

		if (res.data.status === 'success') {
			showAlert('success', 'Logged in successfully!');

			if (res.data.data.user.role == 'user') {
				window.setTimeout(() => {
					location.assign('/overview');
				}, 500);
			} else if (res.data.data.user.role == 'admin') {
				window.setTimeout(() => {
					location.assign('/adminOverview');
				}, 500);
			}
		}
	} catch (err) {
		showAlert('error', err.response.data.message);
		return false;
	}
};

export const logout = async () => {
	try {
		const res = await axios({
			method: 'GET',
			url: '/api/v1/users/logout',
		});

		if (res.data.status === 'success') {
			showAlert('success', 'Logging you out please wait..');
			window.setTimeout(() => {
				location.assign('/');
			}, 500);
		}
	} catch (err) {
		showAlert('error', 'Error logging out. Please try again in a moment.');
	}
};
