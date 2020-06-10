<template>
  <div class="container">
    <h1> Profile </h1>
    <hr>
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ userData.firstName }} {{ userData.lastName }}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Email: {{ userData.email }}</li>
            <li class="list-group-item">Phone Number: {{ userData.phoneNumber }}</li>
            <li class="list-group-item">Address: {{ userData.address }}</li>
          </ul>
          <div class="card-body">
            <router-link :to="{ path: `/user/edit/${this.userId}` }" class="card-link">Edit</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import profileService from '../services/profileService'
  export default {
    data () {
      return {
        userData: {},
        userId: null
      }
    },
    created() {
      profileService.userData(localStorage.userId)
      .then(response => {
        this.userData = response.data
        this.userId = localStorage.userId
      })
    }
  }
</script>