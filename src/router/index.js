import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/homeView.vue'
import SignIn from '../views/signinView.vue'
import SignUp from '../views/signupView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router