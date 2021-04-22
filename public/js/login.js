import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
	try {
		const res = await axios({
			method: 'POST',
			url: 'http://127.0.0.1:3000/api/v1/users/login',
			data: {
				email: email,
				password: password,
			},
		});

		if (res.data.status === 'success') {
			showAlert('success', 'Logged in successfully!');

			if (res.data.data.user.role == 'user') {
				location.assign('/overview');
			} else if (res.data.data.user.role == 'admin') {
				location.assign('/adminOverview');
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
			url: 'http://127.0.0.1:3000/api/v1/users/logout',
		});

		if (res.data.status === 'success') {
			showAlert('success', 'Logging you out please wait..');
			location.assign('/');
		}
	} catch (err) {
		showAlert('error', 'Error logging out. Please try again in a moment.');
	}
};
