import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Vuetable from 'vuetable-2/src/components/Vuetable.vue';

import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue2-animate/dist/vue2-animate.min.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.component('vuetable', Vuetable);

/* eslint-disable no-unused-vars */
const app = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
});
/* eslint-enable no-unused-vars */
