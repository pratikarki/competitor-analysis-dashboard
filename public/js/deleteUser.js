import axios from 'axios';
import { showAlert } from './alerts';

export const deleteUser = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/users/${id}`
    })

    if (res.statusText === 'No Content') {
      showAlert('success', 'User successfully deleted!');
      return 'success';
    }
  }
  catch (err) {
    showAlert('error', err.response.data.message);
    // if (err.response.data.message.includes('. ')) {
    //   let reversed = err.response.data.message.split('. ').reverse();
    //   showAlert('error', reversed[0]);
    // }
    // else {
    //   showAlert('error', err.response.data.message);
    // }
  }
}