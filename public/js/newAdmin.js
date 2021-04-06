import { showAlert } from './alerts';

export const newAdmin = async (user_id) => {
  if (user_id) showAlert('success', 'New admin created successfully!');
}