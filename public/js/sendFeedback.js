import axios from 'axios';
import { showAlert } from './alerts';

export const sendFeedback = async (data) => {
	try {
		const res = await axios({
			method: 'POST',
			url: '/api/v1/feedbacks',
			data: data,
		});

		if (res.data.status === 'success') {
			showAlert('success', `Thank you for your feedback! We'll try improve your experience :)`);
			document.querySelector('input[name="rate"]:checked').checked = false;
			document.querySelector('.select-btn').classList.remove('select-btn');
			document.getElementById('feedbackMessage').value = '';
		}
	} catch (err) {
		if (err.response.data.message.includes('. ')) {
			let reversed = err.response.data.message.split('. ').reverse();
			showAlert('error', reversed[0]);
		} else {
			showAlert('error', err.response.data.message);
		}
	}
};
