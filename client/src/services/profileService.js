import api from './api'

export default {
  userData (userId) {
    return api.get(`/user/user-data/${userId}`);
  },
  updateProfile(userId, profileUpdates) {
    return api.put(`/user/edit/${userId}`, profileUpdates)
  }
}