import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breadText: '',
    cartList: []
  },
  mutations: {
    changeBreadText(state: any, text: string): void {
      state.breadText = text
    },
    setCartList(state, list) {
      state.cartList = list
    }
  },
  getters: {
    count: state => state.cartList.reduce((prev: any, next: any) => {
      return prev + parseInt(next.productNum)
    }, 0)
  }
})
