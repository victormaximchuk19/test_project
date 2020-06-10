import api from './api';

export default {
  register (creds) {
    return api.post('/sign-up', creds)
  }
}