import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';
import localStorageHandler from '../helpers/local-storage-handler';

import Index from '../views/Index.vue';
import CustomerCabinet from '../views/customer/CustomerCabinet.vue';
import MyInsurances from '../views/customer/children/MyInsurances.vue';
import NewInsurance from '../views/customer/children/NewInsurance.vue';
import CustomerProfile from '../views/customer/children/CustomerProfile.vue';
import UserLogin from '../views/user/UserLogin.vue';
import UserCabinet from '../views/user/UserCabinet.vue';
import Insurances from '../views/user/children/Insurances.vue';
import AddNewUser from '../views/user/children/AddNewUser.vue';
import AllUsers from '../views/user/children/AllUsers.vue';
import Stats from '../views/user/children/Stats.vue';
import UserProfile from '../views/user/children/UserProfile.vue';

Vue.use(VueRouter);

const nameCustomerChildRoute = (name) => `customer-${name}`;
const nameUserChildRoute = (name) => `user-${name}`;

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
            children: [
                {
                    path: 'my-insurances',
                    name: nameCustomerChildRoute('my-insurances'),
                    component: MyInsurances
                },
                {
                    path: 'new-insurance',
                    name: nameCustomerChildRoute('new-insurance'),
                    component: NewInsurance
                },
                {
                    path: 'my-profile',
                    name: nameCustomerChildRoute('my-profile'),
                    component: CustomerProfile
                }
            ]
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
            children: [
                {
                    path: 'insurances',
                    name: 'страховки-все',
                    component: Insurances
                },
                {
                    path: 'add-new-user',
                    name: 'пользователи-создать',
                    component: AddNewUser
                },
                {
                    path: 'all-users',
                    name: 'пользователи-все',
                    component: AllUsers
                },
                {
                    path: 'stats',
                    name: 'страховки-статистика',
                    component: Stats
                },
                {
                    path: 'my-profile',
                    name: 'my-profile',
                    component: UserProfile
                }
            ]
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
    if (to.path.startsWith('/customer-cabinet') && !store.getters.customer && !localStorageHandler.get('customer')) {
        router.push({ name: 'index' });
        return;
    }

    /* 
        USER doesn't perform login and tries to enter personal cabinet.
    */
    if (to.path.startsWith('/user-cabinet') && !store.getters.user && !localStorageHandler.get('user')) {
        router.push({ name: 'index' });
        return;
    }

    next();

});

export default router;
