import axios from "axios"
import router from "../../router/index"

export const juiceModel = {
  state: () => ({
    userName: '',
    text: '',
    date: '',
    juice_id: '',
    likes: [],
    juices: [],
    newJuice: false,
    juicePage: false,
    deleteMsg: false,
    likedPage: false,
    number_of_juices: 0,
  }),
  mutations: {
    SET_JUICE(state, juice) {
      state.juice_id = juice._id;
      state.userName = juice.userName;
      state.text = juice.text;
      state.date = juice.date;
      state.likes = juice.likes;
    },
    SET_NEW_JUICE(state, value) {
      state.newJuice = value;
    },
    SET_DELETE_MSG(state, value) {
      state.deleteMsg = value;
    },
    SET_JUICE_PAGE(state, value) {
      state.juicePage = value;
    },
    SET_JUICES(state, juices) {
      state.juices = juices.reverse();
    },
    SET_LIKED_PAGE(state, value) {
      state.likedPage = value;
    },
    SET_NUMBER_OF_JUICES(state, value) {
      state.number_of_juices = value;
    }
  },
  actions: {
    setJuice({commit}, juice) {
      commit('SET_JUICE', juice);
    },
    setNewJuice({commit}, value) {
      commit('SET_NEW_JUICE', value);
    },
    setDeleteMsg({commit}, value) {
      commit('SET_DELETE_MSG', value);
    },
    setJuicePage({commit}, value) {
      commit('SET_JUICE_PAGE', value);
    },
    setJuices({commit}, juices) {
      commit('SET_JUICES', juices);
    },
    setLikedPage({commit}, value) {
      commit('SET_LIKED_PAGE', value);
    },
    setNumberOfJuices({commit}, value) {
      commit('SET_NUMBER_OF_JUICES', value);
    },
    async postJuice({ getters, dispatch }) {
      try {
        await axios.post('juice', {
          userName: getters.userName,
          text: getters.text,
          date: getters.date,
          likes: getters.likes
        },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        dispatch('getJuices');
        dispatch('setNewJuice', false);
        router.push('/');
      } catch (err) {
        dispatch('setError', err.message);
      }
    },
    async deleteJuice({ dispatch, getters}) {
      try {
        await axios.delete(`juices?id=${getters.juice_id}`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        if(router.currentRoute.value.path === '/') {
          dispatch('getJuices');
        } else {
          if(getters.likedPage) {
            dispatch('getJuicesLikedByUserName', router.currentRoute.value.params.userName);
          } else {
            dispatch('getJuicesByUserName', router.currentRoute.value.params.userName);
          }
        }
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    },
    async likeJuice({ dispatch, getters }, updated_likes) {
      try {
        await axios.patch(`juice/like?id=${getters.juice_id}`, {
          likes: updated_likes
        },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        if(router.currentRoute.value.path === '/') {
          dispatch('getJuices');
        } else {
          if(getters.likedPage) {
            dispatch('getJuicesLikedByUserName', router.currentRoute.value.params.userName);
          } else {
            dispatch('getJuicesByUserName', router.currentRoute.value.params.userName);
          }
        }
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    },
    async getJuices({ dispatch }) {
      try {
        const response = await axios.get('juices');
        dispatch('setJuices', response.data);
      } catch (err) {
        if(err.response.status === 404) {
          dispatch('setJuices', []);
        } else {
          if(err.response.status === 404) {
            dispatch('setJuices', []);
          } else {
            dispatch('setError', err.response.data.error);
          }
        }
      }
    },
    async getJuicesByUserName({ dispatch }, userName) {
      try {
        const response = await axios.get(`juices/user?userName=${userName}`);
        dispatch('setJuices', response.data);
        dispatch('setNumberOfJuices', response.data.length);
      } catch (err) {
        if(err.response.status === 404) {
          dispatch('setJuices', []);
        } else {
          dispatch('setError', err.response.data.error);
        }
      }
    },
    async getJuicesLikedByUserName({ dispatch }, userName) {
      try {
        const response = await axios.get(`juices/user/liked?userName=${userName}`);
        dispatch('setJuices', response.data);
      } catch (err) {
        if(err.response.status === 404) {
          dispatch('setJuices', []);
        } else {
          dispatch('setError', err.response.data.error);
        }
      }
    }
  },
  getters: {
    newJuice: state => state.newJuice,
    juicePage: state => state.juicePage,
    deleteMsg: state => state.deleteMsg,
    juices: state => state.juices,
    userName: state => state.userName,
    text: state => state.text,
    date: state => state.date,
    juice_id: state => state.juice_id,
    likes: state => state.likes,
    likedPage: state => state.likedPage,
    number_of_juices: state => state.number_of_juices,
  }
}