import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/homeView.vue'
import SignInView from '../views/signinView.vue'
import SignUpView from '../views/signupView.vue'
import ForgotView from '../views/forgotView.vue'

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
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode
})
export default router