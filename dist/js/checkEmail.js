import validator from 'email-validator';
import { showAlert } from './alerts';

export const checkEmail = (email) => {
  const res = validator.validate(email);

  if (res === true) {
    return true;
  }
  else {
    showAlert('error', `Sorry, can't register with this email.`);
    document.getElementById('btn--register').innerHTML = '<i class="fas fa-user-plus me-2"></i>Sign Up';
		document.getElementById('btn--register').disabled = false;
    return false;
  }
}