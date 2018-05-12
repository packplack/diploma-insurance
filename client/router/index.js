import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import Index from '../views/Index.vue';
import CustomerCabinet from '../views/CustomerCabinet.vue';
import UserLogin from '../views/UserLogin.vue';
import UserCabinet from '../views/UserCabinet.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
        },
        {
            path: '/customer-cabinet',
            name: 'customer-cabinet',
            component: CustomerCabinet,
        },
        {
            path: '/user-login',
            name: 'user-login',
            component: UserLogin,
        },
        {
            path: '/user-cabinet',
            name: 'user-cabinet',
            component: UserCabinet,
        },
        {
            path: '*',
            redirect: {
                name: 'index',
            },
        },
    ],
});

router.beforeEach((to, from, next) => {

    /* 
        CUSTOMER doesn't perform login and tries to enter personal cabinet.
    */
    if (to.path.startsWith('/customer-cabinet') && !store.getters.customer) {
        router.push({ name: 'index' });
        return;
    }

    /* 
        USER doesn't perform login and tries to enter personal cabinet.
    */
    if (to.path.startsWith('/user-cabinet') && !store.getters.user) {
        router.push({ name: 'index' });
        return;
    }

    next();

});

export default router;
