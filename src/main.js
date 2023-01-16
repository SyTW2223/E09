import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index'
import './axios'


const app = createApp(App)
//Vue.use(BootstrapVue)
app.use(router)
app.use(store)
app.mount('#app')

