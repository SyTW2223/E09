import axios from "axios"
import router from "../../router/index"

export const juiceModel = {
  state: () => ({
    newJuice: false,
    userId: '',
    text: '',
    date: '',
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
      console.log(value);
      state.newJuice = value;
    },
    async postJuice({ getters, dispatch }) {
      try {
        await axios.post('juice', {
          userId: getters.user.element.id,
          text: getters.text,
          date: getters.date,
          likes: 0
        })
        dispatch('setNewJuice', false);
        router.push('/');
      } catch (err) {
        dispatch('setError', err.response.data.error);
      }
    },
  },
  actions: {
    storeJuice({commit}, juice) {
      commit('STORE_JUICE', juice);
    },
    setNewJuice({commit}, value) {
      commit('SET_NEWJUICE', value);
    }
  },
  getters: {
    newJuice: state => state.newJuice,
    userId: state => state.userId,
    text: state => state.text,
    userName: state => state.userName,
    juice_likes: state => state.juice_likes,
  }
}