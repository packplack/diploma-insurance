const SAVE_CUSTOMER = 'SAVE_CUSTOMER';
const RESET_CUSTOMER = 'RESET_CUSTOMER';

const state = {
    customer: null,
};

const getters = {
    customer: state => state.customer,
};

const mutations = {
    [SAVE_CUSTOMER](state, payload) {
        state.customer = payload;
    },
    [RESET_CUSTOMER](state) {
        state.customer = null;
    },
};

export default {
    state,
    getters,
    mutations,
};
