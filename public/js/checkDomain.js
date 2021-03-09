import isValidDomain from 'is-valid-domain';
import { showAlert } from './alerts';

export const checkDomain = (domain) => {
  const res = isValidDomain(domain);

  if (res === true) {
    return true;
  }
  else {
    showAlert('error', 'Sorry, the domain name is not valid.');
    return false;
  }
}