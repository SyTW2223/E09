import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/homeView.vue'
import SignInView from '../views/signinView.vue'
import SignUpView from '../views/signupView.vue'
import ForgotView from '../views/forgotView.vue'
import ResetView from '../views/resetView.vue'
import ProfilePageView from '../views/profilePageView.vue'
import JuisView from '../views/juiceView.vue'

const mode = 'history';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignInView
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: ForgotView
  },
  {
    path: '/reset/:token',
    name: 'Reset',
    component: ResetView
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePageView
  },
  {
    path: '/juice',
    name: 'JuisComponent',
    component: JuisView
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode
})
export default router