<template>
  <div>
   <div class="container text-center">
    <h1 class="font-weight-bold"> Edit profile</h1>
    <form class="login-form" v-on:submit="updateProfile">
      <input v-model="user.firstName" type="text" class="form-control mb-1" placeholder="First Name" required="true">
      <input v-model="user.lastName" type="text" class="form-control mb-1" placeholder="Last Name" required="true">
      <input v-model="user.email" type="email" class="form-control mb-1" placeholder="Email" required="true">
      <input v-model="user.phoneNumber" type="text" class="form-control mb-1" placeholder="Phone Number" required="true">
      <input v-model="user.address" type="text" class="form-control mb-1" placeholder="Address" required="true">
      <button type="submit" class="btn btn-primary btn-lg btn-block mt-4"> Confirm changes </button>
    </form>
  </div>
  </div>
</template>

<script>
  import profileService from '../services/profileService'
  export default {
    data () {
        return {
          userId: null,
          user: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
          }
        }
    },
    created() {
      profileService.userData(localStorage.userId)
        .then(response => {
          this.user = response.data
          this.userId = localStorage.userId
      })
    },
    methods: {
      async updateProfile (e) {
        e.preventDefault();
        try {
          await profileService.updateProfile(this.userId, this.user)
          .then(response => {
          console.log(response)
        })
        } catch (error) {
          console.log(error)
        }
        
      }
    } 
  }
</script>>