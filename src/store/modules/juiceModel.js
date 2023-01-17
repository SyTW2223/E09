import axios from "axios"
import router from "../../router/index"

export const juiceModel = {
  state: () => ({
    newJuice: false,
    juicePage: false,
    juices: [],
    userName: '',
    text: '',
    date: '',
    juice_id: '',
    likes: [],
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
    SET_JUICE_PAGE(state, value) {
      state.juicePage = value;
    },
    SET_JUICES(state, juices) {
      state.juices = juices.reverse();
    }
  },
  actions: {
    setJuice({commit}, juice) {
      commit('SET_JUICE', juice);
    },
    setNewJuice({commit}, value) {
      commit('SET_NEW_JUICE', value);
    },
    setJuicePage({commit}, value) {
      commit('SET_JUICE_PAGE', value);
    },
    setJuices({commit}, juices) {
      commit('SET_JUICES', juices);
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
        dispatch('getJuices');
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
        dispatch('getJuices');
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
          dispatch('setError', err.response.data.error);
        }
      }
    },
  },
  getters: {
    newJuice: state => state.newJuice,
    juicePage: state => state.juicePage,
    juices: state => state.juices,
    userName: state => state.userName,
    text: state => state.text,
    date: state => state.date,
    juice_id: state => state.juice_id,
    likes: state => state.likes,
  }
}