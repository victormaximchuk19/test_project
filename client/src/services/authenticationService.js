import api from './api';

export default {
  register (creds) {
    return api.post('/user/sign-up', creds)
  },
  signIn (creds) {
    return api.post('/user/sign-in', creds)
  }
}