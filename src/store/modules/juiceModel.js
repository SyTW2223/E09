import axios from "axios"
import router from "../../router/index"

export const JuiceModel = {
  state: () => ({
    id: 0,
    text: 'Texto de ejemplo',
    userName: '',
    likes: 0,
  }),
  mutations: {

  },
  actions: {

  },
  getters: {
    id: state => state.id,
    text: state => state.text,
    userName: state => state.userName,
    likes: state => state.likes,
  }
}