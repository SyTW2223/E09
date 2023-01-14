import axios from "axios"
import router from "../../router/index"

export const juiceModel = {
  state: () => ({
    newJuice: false,
    userId: '',
    text: '',
    date: '',
    juice_id: '',
    juice_likes: 0,
  }),
  mutations: {
    STORE_JUICE(state, juice) {
      state.userId = juice.userId;
      state.text = juice.text;
      state.date = juice.date;
      state.juice_likes = juice.likes;
    },
    SET_NEWJUICE(state, value) {
      state.newJuice = value;
    }
  },
  actions: {
    storeJuice({commit}, juice) {
      commit('STORE_JUICE', juice);
    },
    setNewJuice({commit}, value) {
      commit('SET_NEWJUICE', value);
    },
    async postJuice({ getters, dispatch }) {
      try {
        await axios.post('juice', {
          userId: getters.userId,
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
        dispatch('setError', err.response.data.error);
      }
    },
  },
  getters: {
    newJuice: state => state.newJuice,
    userId: state => state.userId,
    text: state => state.text,
    date: state => state.date,
    juice_likes: state => state.juice_likes,
  }
}