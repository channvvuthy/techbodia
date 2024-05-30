import { createStore } from "vuex";
import ajax from '../network/ajax';

export default createStore({
  state: {
    loading: false,
    countries: []
  },
  getters: {},
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },

    setCountries(state, values) {
      state.countries = values;
    }
  },
  actions: {
    /**
     * Fetches countries from the server and updates the store.
     *
     * @param {Object} commit - The Vuex commit function.
     * @param {Object} props - The props object containing query parameters.
     * @return {Promise} A promise that resolves to the fetched countries data.
     */
    fetchCountries({ commit }, props) {
      commit('setLoading', true);

      return ajax.get('all', props)
        .then(({ data }) => {
          commit('setCountries', data);
          return data;
        })
        .finally(() => {
          commit('setLoading', false);
        });
    }
  },
  modules: {},
});
