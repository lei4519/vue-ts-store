import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartCount: 0
  },
  mutations: {
    updateCartCount(state: any, count: number) {
      state.cartCount = count
    }
  }
});
