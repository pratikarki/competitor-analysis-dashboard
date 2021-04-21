import axios from 'axios';
import { showAlert } from './alerts';

export const resetPass = async (password, confirmPassword, path) => {
	try {
		const res = await axios({
			method: 'PATCH',
			url: `http://127.0.0.1:3000/api/v1/users/${path}`,
			data: {
				password: password,
				confirmPassword: confirmPassword,
			},
		});

		if (res.data.status === 'success') {
			showAlert('success', `Password updated successfully, Logging you in..`);
			document.getElementById('password').value = '';
			document.getElementById('confirmPassword').value = '';

			if (res.data.data.user.role == 'admin') {
				location.assign('/adminOverview');
			}
			else {
				location.assign('/overview');
			}
		}
	} catch (err) {
		showAlert('error', err.response.data.message);
	}
};
