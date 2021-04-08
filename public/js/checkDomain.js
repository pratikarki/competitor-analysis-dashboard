import isValidDomain from 'is-valid-domain';
import { showAlert } from './alerts';

export const checkDomain = (domain) => {
  const res = isValidDomain(domain);

  if (res === true) {
    return true;
  }
  else {
    showAlert('error', 'Sorry, the domain name is not valid.');
    document.getElementById('btn--register').innerHTML = '<i class="fas fa-user-plus me-2"></i>Sign Up';
		document.getElementById('btn--register').disabled = false;
    return false;
  }
}