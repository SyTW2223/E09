import axios from "axios"
import router from "../../router/index"

export const juiceModel = {
  state: () => ({
    newJuice: false,
    juices: [],
    userName: '',
    text: '',
    date: '',
    juice_id: '',
    juice_likes: 0,
  }),
  mutations: {
    SET_JUICE(state, juice) {
      state.userName = juice.userName;
      state.text = juice.text;
      state.date = juice.date;
      state.juice_likes = juice.likes;
    },
    SET_NEWJUICE(state, value) {
      state.newJuice = value;
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
      commit('SET_NEWJUICE', value);
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
          likes: getters.juice_likes
        },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        dispatch('setNewJuice', false);
        router.push('/');
      } catch (err) {
        dispatch('setError', err.message);
      }
    },
    async getJuices({ dispatch }) {
      try {
        const response = await axios.get('juices');
        dispatch('setJuices', response.data);
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    },
    async getJuicesByUserId({ dispatch }, userId) {
      try {
        const response = await axios.get(`juices/${userId}`);
        dispatch('setJuices', response.data);
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    }
  },
  getters: {
    newJuice: state => state.newJuice,
    juices: state => state.juices,
    userName: state => state.userName,
    text: state => state.text,
    date: state => state.date,
    juice_likes: state => state.juice_likes,
  }
}