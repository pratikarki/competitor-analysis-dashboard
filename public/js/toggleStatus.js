import axios from 'axios';
import { showAlert } from './alerts';

export const toggleUserStatus = async (user_id) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/users/toggleUserStatus/${user_id}`
    })

    console.log(res.data);
    if (res.data.status === 'success') {
      return true;
    }
  }
  catch (err) {
    showAlert('error', 'Something went wrong while changing account status.');
    return false;
  }
}