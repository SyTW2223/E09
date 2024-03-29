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
    following: [],
    followers: 0
  }),
  mutations: {
    SET_USER(state, user) {
      state.name = user.name;
      state.email = user.email;
      state.password = user.password;
      state.id = user._id;
      state.following = user.following;
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
    SET_FOLLOWERS(state, followers) {
      state.followers = followers;
    },
    SET_ID(state, id) {
      state.id = id;
    },
    SET_FOLLOWING(state, following) {
      state.following = following;
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
    SET_DEFAULT_USER(state) {
      state.loggedUser = null,
      state.error = null,
      state.success = null,
      state.name = '',
      state.email = '',
      state.password = '',
      state.id = '',
      state.following = [],
      state.followers = 0
    }
  },
  actions: {
    async postSignUp({ getters, dispatch }) {
      try {
        await axios.post('signup', {
          name: getters.name,
          email: getters.email,
          password: getters.password,
          following: getters.following,
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
        router.push('/');
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
        if(response.data.length !== 0) {
          dispatch('setLoggedUser', response.data);
        }
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    },
    async sendResetPasswordEmail({ getters, dispatch }) {
      try {
        const response = await axios.post('password-reset', {
          email: getters.email
        });
        dispatch('setError', null);
        dispatch('setSuccess', response.data);
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    },
    async resetPassword({ getters, dispatch }, token) {
      try {
        console.log(getters.password);
        await axios.patch('password-reset',{
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
    async getUser({ dispatch }, name) {
      try {
        const response = await axios.get(`users?name=${name}`);
        dispatch('setUser', response.data[0]);
      } catch (err) {
        dispatch('setError', err.message);
      }
    },
    async followUser({ dispatch, getters }, updated_following) {
      try {
        await axios.patch(`users?id=${getters.loggedUser._id}`, {
          following: updated_following
        },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    },
    async getFollowers({ dispatch }, userName) {
      try {
        const response = await axios.get(`followers?userName=${userName}`);
        dispatch('setFollowers', response.data.followers);
      } catch (err) {
        dispatch('setError', err.response.data.error);
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
    setFollowers({commit}, followers) {
      commit('SET_FOLLOWERS', followers);
    },
    setFollowing({commit}, following) {
      commit('SET_FOLLOWING', following);
    },
    setId({commit}, id) {
      commit('SET_ID', id);
    },
    setDefaultUser({commit}) {
      commit('SET_DEFAULT_USER');
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
    following: state => state.following,
    followers: state => state.followers,
  }
}