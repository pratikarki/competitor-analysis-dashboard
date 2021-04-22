import axios from 'axios';
import { showAlert } from './alerts';

export const forgotPass = async (email) => {
	try {
		const res = await axios({
			method: 'POST',
			url: 'http://127.0.0.1:3000/api/v1/users/forgotPassword',
			data: {
				email: email,
			},
		});

		if (res.data.status === 'success') {
			showAlert('success', `Reset link sent successfully, do check your inbox or spam within 24hrs.`);
			document.getElementById('forgotEmail').value = '';
			document.getElementById('btnForgotSubmit').disabled = true;
		}
	} catch (err) {
		showAlert('error', err.response.data.message);
	}
};
