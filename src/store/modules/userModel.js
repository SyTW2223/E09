import axios from "axios"
import router from '../../router/index'

export const userModel = {
  state: () => ({
    loggedUser: null,
    error: null,
    success: null,
    name: '',
    email: '',
    password: '',
    id: '',
    description: '',
    following: 0,
    followers: 0,
    likes: 0,
    age: 0
  }),
  mutations: {
    SET_USER(state, user) {
      state.name = user.name;
      state.email = user.email;
      state.password = user.password;
      state.id = user._id;
      state.description = user.description;
      state.following = user.following;
      state.followers = user.followers;
      state.likes = user.likes;
      state.age = user.age;
    },
    SET_LOGGED_USER(state, user) {
      state.loggedUser = user;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_SUCCESS(state, success) {
      state.success = success;
    },
    SET_NAME(state, name) {
      state.name = name;
    },
    SET_EMAIL(state, email) {
      state.email = email;
    },
    SET_PASSWORD(state, password) {
      state.password = password;
    },
    SET_DESC(state, description) {
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
    }
  },
  actions: {
    async postSignUp({ getters, dispatch }) {
      try {
        await axios.post('juice', {
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
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    },
    async postSignIn({ getters, dispatch }) {
      try {
        const response = await axios.post('signin', {
          email: getters.email,
          password: getters.password,
        })
        localStorage.setItem('token', response.data.token);
        dispatch('getLoggedUser');
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    },
    async getLoggedUser({ dispatch }) {
      try {
        const response = await axios.get('user', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        dispatch('setLoggedUser', response.data.element);
        router.push('/');
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    },
    async sendResetPasswordEmail({ getters, dispatch }) {
      try {
        const response = await axios.post('password-reset', {
          email: getters.email
        })
        dispatch('setError', null);
        dispatch('setSuccess', response.data);
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    },
    async resetPassword({ getters, dispatch }, token) {
      try {
        await axios.patch('users',{
          password: getters.password
        }, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        router.push('/signin');
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    },
    async getUser({ dispatch }, id) {
      try {
        const response = await axios.get(`users?id=${id}`);
        dispatch('setUser', response.data[0]);
      } catch (err) {
        dispatch('setError', err.message);
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
    setLoggedUser({commit}, user) {
      commit('SET_LOGGED_USER', user);
    },
    setError({commit}, error) {
      commit('SET_ERROR', error);
    },
    setSuccess({commit}, success) {
      commit('SET_SUCCESS', success);
    },
    setName({commit}, name) {
      commit('SET_NAME', name);
    },
    setEmail({commit}, email) {
      commit('SET_EMAIL', email);
    },
    setPassword({commit}, password) {
      commit('SET_PASSWORD', password);
    },
    setDesc({commit}, description) {
      commit('SET_DESC', description);
    },
  },
  getters: {
    loggedUser: state => state.loggedUser,
    error: state => state.error,
    success: state => state.success,
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