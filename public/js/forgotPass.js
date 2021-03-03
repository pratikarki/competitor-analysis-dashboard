import axios from 'axios';
import { showAlert } from './alerts';

export const forgotPass = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/forgotPassword',
      data: {
        email: email
      }
    })

    if (res.data.status === 'success') {
      showAlert('success', `Reset link sent successfully, please check your email`);
      document.getElementById('forgotEmail').value = '';
    }
  }
  catch (err) {
    showAlert('error', err.response.data.message);
  }
}