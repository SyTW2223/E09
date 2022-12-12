import axios from "axios"
import router from '../../router/index'

export const userModel = {
  state: () => ({
    user : null,
    name: '',
    email: '',
    password: '',
    id: 0,
    description: '',
    following: 0,
    followers: 0,
    likes: 0,
    age: 0
  }),
  mutations: {
    CH_NAME(state, name) {
      state.name = name;
    },
    CH_EMAIL(state, email) {
      state.email = email;
    },
    CH_PASSWORD(state, password) {
      state.password = password;
    },
    CH_DESC(state, description) {
      state.description = description;
    },
    SIGN_IN(state, user) {
      state.email = user.email;
      state.password = user.password;
    },
    SIGN_UP(state, user) {
      state.name = user.name;
      state.email = user.email;
      state.password = user.password;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    async postSignUp({ getters }) {
      try {
        await axios.post('signup', {
          name: getters.name,
          email: getters.email,
          password: getters.password,
          description: getters.description,
          following: getters.following,
          followers: getters.followers,
          likes: getters.likes,
          age: getters.age,
        })
        router.push('/signin');
      } catch (error) {
        alert(error);
      }
    },
    async postSignIn({ getters, dispatch }) {
      try {
        const response = await axios.post('signin', {
          email: getters.email,
          password: getters.password,
        })
        localStorage.setItem('token', response.data.token);
        dispatch('getUser');
      } catch (error) {
        alert(error);
      }
    },
    async getUser({ dispatch }) {
      try {
        const response = await axios.get('user', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        dispatch('setUser', response.data);
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    signUp({commit}, user) {
      commit('SIGN_UP', user);
    },
    signIn({commit}, user) {
      commit('SIGN_IN', user);
    },
    setUser({commit}, user) {
      commit('SET_USER', user);
    },
    changeName({commit}, name) {
      commit('CH_NAME', name);
    },
    changeEmail({commit}, email) {
      commit('CH_EMAIL', email);
    },
    changePassword({commit}, password) {
      commit('CH_PASSWORD', password);
    },
    changeDesc({commit}, description) {
      commit('CH_DESC', description);
    },
  },
  getters: {
    user: state => state.user,
    name: state => state.name,
    email: state => state.email,
    password: state => state.password,
    id: state => state.id,
    description: state => state.description,
    following: state => state.following,
    followers: state => state.followers,
    likes: state => state.likes,
    age: state => state.age,
  }
}