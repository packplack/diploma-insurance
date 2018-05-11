import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);

/* eslint-disable no-unused-vars */
const app = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
});
/* eslint-enable no-unused-vars */
