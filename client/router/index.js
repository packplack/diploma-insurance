import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import Index from '../views/Index.vue';
import Customer from '../views/Customer.vue';

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
            path: '/customer',
            name: 'customer',
            component: Customer,
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
    next();
});

export default router;
