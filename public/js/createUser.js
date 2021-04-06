import axios from 'axios';
import { showAlert } from './alerts';


export const createUser = async (regUser, signup) => {

  //first, save User data to check if email and username is unique 
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/users/${signup}`,
      data: regUser
    })

    if (res.data.status === 'success') {
      const user_id = res.data.data.user._id;
      return user_id;
    }
  }
  catch (err) {
    if (err.response.data.message.includes('. ')) {
      showAlert('error', err.response.data.message.split('. ')[1]);
    }
    else {
      showAlert('error', err.response.data.message);
    }
    if (document.getElementById('btn--register')) {
      document.getElementById('btn--register').innerHTML = '<i class="fas fa-user-plus me-2"></i>Sign Up';
      document.getElementById('btn--register').disabled = false;
    }
    if (document.getElementById('btn--createAdmin')) {
      document.getElementById('btn--createAdmin').textContent = 'Create';
      document.getElementById('btn--createAdmin').disabled = false;
    }
  }
}