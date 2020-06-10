import Vue from 'vue';
import Router from 'vue-router';
import signUpForm from '../components/signUpForm';
import signInForm from '../components/loginForm';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/sign-up',
      name: 'signUpForm',
      component: signUpForm
    },
    {
      path: '/sign-in',
      name: 'signInForm',
      component: signInForm
    }
  ]
})

export default router;

