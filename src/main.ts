import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import infiniteScroll from 'vue-infinite-scroll'
import VueLazyload from 'vue-lazyload'
import '@/assets/css/base.css'
import '@/assets/css/checkout.css'
import '@/assets/css/login.css'
import '@/assets/css/product.css'

Vue.use(VueAxios, Axios)
Vue.use(VueLazyload, {
  loading: '/loading/loading-bars.svg'
})
Vue.use(infiniteScroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

