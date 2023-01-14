import { createStore } from 'vuex'
import { userModel } from './modules/userModel'
import { juiceModel } from './modules/juiceModel'

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
    juice: juiceModel
  }
})
