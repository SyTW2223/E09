//import './plugins/bootstrap-vue'
import {createApp} from 'vue'
//import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index'
//import { BootstrapVue } from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'


const app = createApp(App)
//Vue.use(BootstrapVue)
app.use(router)
app.use(store)
app.mount('#app')

