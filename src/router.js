import Vue from 'vue';
import Router from 'vue-router';
import GoodsList from '@/views/GoodsList.vue';
import Cart from '@/views/Cart.vue';
Vue.use(Router);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: GoodsList
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        }
    ]
});
//# sourceMappingURL=router.js.map