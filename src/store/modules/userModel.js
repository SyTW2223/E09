import axios from "axios"
const proxyIP = '10.6.130.29';

export const userModel = {
  state: () => ({
    must: {
      name: '',
      email: '',
      password: '',
    },
    id: 0,
    description: '',
    following: 0,
    followers: 0,
    likes: 0,
    age: 0
  }),
  mutations: {
    CH_NAME(state, name) {
      state.must.name = name
    },
    CH_EMAIL(state, email) {
      state.must.email = email
    },
    CH_PASSWORD(state, password) {
      state.must.password = password
    },
    CH_DESC(state, description) {
      state.must.description = description
    },
    SIGN_IN(state, name, password) {
      state.must.name = name
      state.must.password = password
    },
    SIGN_UP(state, must) {
      state.must = must
    },
  },
  actions: {
    async postUsers({ getters }) {
      try {
        await axios.post(`http://${proxyIP}/api/users`, {
          name: getters.must.name,
          email: getters.must.email,
          password: getters.must.password,
          description: getters.description,
          following: getters.following,
          followers: getters.followers,
          likes: getters.likes,
          age: getters.age,
        })
      } catch (error) {
        alert(error);
        console.log(error);
      }
      console.log("ENVIE POST");
    },
    signUp({commit}, must) {
      commit('SIGN_UP', must)
    },
    signIn({commit}, must) {
      commit('SIGN_IN', must)
    },
    changeName({commit}, name) {
      commit('CH_NAME', name)
    },
    changeEmail({commit}, email) {
      commit('CH_EMAIL', email)
    },
    changePassword({commit}, password) {
      commit('CH_PASSWORD', password)
    },
    changeDesc({commit}, description) {
      commit('CH_DESC', description)
    },
  },
  getters: {
    must: state => state.must,
    id: state => state.id,
    description: state => state.description,
    following: state => state.following,
    followers: state => state.followers,
    likes: state => state.likes,
    age: state => state.age,
  }
}