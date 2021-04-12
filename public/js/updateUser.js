import axios from 'axios';
import { showAlert } from './alerts';

export const updateProfile = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateMyInfo',
      data: data
    })

    if (res.data.status === 'success') {
      showAlert('success', 'Data updated successfully!');
    }
  }
  catch (err) {
    if (err.response.data.message.includes('. ')) {
      showAlert('error', err.response.data.message.split('. ')[1]);
    }
    else {
      showAlert('error', err.response.data.message);
    }
  }
}