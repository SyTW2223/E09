// import axios from "axios"
// import router from "../../router/index"

export const JuiceModel = {
  state: () => ({
    newJuice: true,
    error: null,
    userId: '',
    text: '',
    date: '',
    likes: 0,
  }),
  mutations: {
    STORE_JUICE(state, juice) {
      state.userId = juice.userId;
      state.text = juice.text;
      state.date = juice.date;
      state.likes = juice.likes;
    },
    SET_NEWJUICE(state, value) {
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
    error: state => state.error,
    id: state => state.id,
    text: state => state.text,
    userName: state => state.userName,
    likes: state => state.likes,
  }
}