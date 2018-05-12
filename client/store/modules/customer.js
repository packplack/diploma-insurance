import localStorageHandler from '../../helpers/local-storage-handler';

const SAVE_CUSTOMER = 'SAVE_CUSTOMER';
const RESET_CUSTOMER = 'RESET_CUSTOMER';
const GET_CUSTOMER_FROM_LOCALE_STORAGE = 'GET_CUSTOMER_FROM_LOCALE_STORAGE';

const state = {
    customer: null,
};

const getters = {
    customer: state => state.customer,
    customerFullName: state => `${state.customer.firstName} ${state.customer.lastName}`
};

const mutations = {
    [SAVE_CUSTOMER](state, payload) {
        state.customer = payload;
        localStorageHandler.set('customer', payload);
    },
    [RESET_CUSTOMER](state) {
        state.customer = null;
        localStorageHandler.remove('customer');
    },
    [GET_CUSTOMER_FROM_LOCALE_STORAGE](state) {
        state.customer = localStorageHandler.get('customer');
    }
};

export default {
    state,
    getters,
    mutations,
};
