import { createRouter } from 'vue-router'
import HomeView from '../views/homeView.vue'
import SignInView from '../views/signinView.vue'
import SignUpView from '../views/signupView.vue'
import ForgotView from '../views/forgotView.vue'
import ResetView from '../views/resetView.vue'
import ProfileView from '../views/profileView.vue'

const mode = 'history';

const routes = [
  {
    path: '/',
    redirect: {name: 'Home'}
  },
  {
    path: '/E09/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/E09/signin',
    name: 'SignIn',
    component: SignInView
  },
  {
    path: '/E09/signup',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/E09/forgot',
    name: 'Forgot',
    component: ForgotView
  },
  {
    path: '/E09/reset/:token',
    name: 'Reset',
    component: ResetView
  },
  {
    path: '/E09/profile/:userName',
    name: 'Profile',
    component: ProfileView
  }
]
const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL),
  //history: createWebHistory('/E09/'),
  routes,
  mode
})
export default router