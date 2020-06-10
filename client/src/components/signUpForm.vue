<template>
  <div class="container text-center">
    <h1 class="font-weight-bold"> Sign Up </h1>
    <form class="login-form" v-on:submit="signUp">
      <input v-model="user.firstName" type="text" class="form-control mb-1" placeholder="First Name" required="true">
      <input v-model="user.lastName" type="text" class="form-control mb-1" placeholder="Last Name" required="true">
      <input v-model="user.email" type="email" class="form-control mb-1" placeholder="Email" required="true">
      <input v-model="user.phoneNumber" type="text" class="form-control mb-1" placeholder="Phone Number" required="true">
      <input v-model="user.address" type="text" class="form-control mb-1" placeholder="Address" required="true">
      <input v-model="user.password" type="password" class="form-control" placeholder="Password" required="true">
      <button type="submit" class="btn btn-primary btn-lg btn-block mt-4"> Sign Up! </button>
    </form>
      <router-link to="/sign-in"> Already have an account? </router-link>
  </div>
</template>

<script>
  import authenticationService from '../services/authenticationService';

  export default {
    data () {
      return {
        user: {
          firstName: null,
          lastName: null,
          email: null,
          phoneNumber: null,
          address: null,
          password: null,
        }
      }
    },
    methods: {
      async signUp () {
        try {
          await authenticationService.register(this.user)
        } catch (error){
          console.log(error)
        }
      }
    }
  }
</script>

<style>
  .login-form {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
</style>