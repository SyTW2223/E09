import { createStore } from 'vuex'
import { userModel } from './modules/userModel'
import { juicesModel } from './modules/juicesModel'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: userModel,
    juice: juicesModel
  }
})
