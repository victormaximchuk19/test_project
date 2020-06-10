<template>
  <div class="container text-center">
    <h1 class="font-weight-bold"> Sign In </h1>
    <form class="login-form" v-on:submit="signIn">
      <input v-model="user.email" type="email" class="form-control mb-1" placeholder="Email" required="true">
      <input v-model="user.password" type="password" class="form-control" placeholder="Password" required="true">
      <button type="submit" class="btn btn-primary btn-lg btn-block mt-4"> Sign Up! </button>
    </form>
      <router-link to="/sign-up"> Don't have an account? </router-link>
  </div>
</template>

<script>
  import authenticationService from '../services/authenticationService';

  export default {
    data () {
      return {
        user: {
          email: null,
          password: null
        }
      }
    },
    methods: {
      async signIn (e) {
        e.preventDefault();
        try {
          await authenticationService.signIn(this.user).then(response => {
            if (response.data.token) { 
              localStorage.authToken = response.data.token
              localStorage.userId = response.data.userId
              this.$router.push({ name: 'userProfile', params: { id: response.data.userId } })
            }
          })
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