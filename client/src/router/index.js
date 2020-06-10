import Vue from 'vue';
import Router from 'vue-router';
import signUpForm from '../components/signUpForm';
import signInForm from '../components/loginForm';
import userProfile from '../components/userProfile';
import editProfile from '../components/editProfile';
import App from '../App';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: App,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign-up',
      name: 'signUpForm',
      component: signUpForm
    },
    {
      path: '/sign-in',
      name: 'signInForm',
      component: signInForm
    },
    {
      path: '/user/profile/:id',
      name: 'userProfile',
      component: userProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/edit/:id',
      name: 'editProfile',
      component: editProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!localStorage.authToken) {
      next({ name: 'signInForm' })
    } else {
      next()
    }
  } else {
    next();
  }
});

export default router;

