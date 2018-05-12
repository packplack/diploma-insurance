const SAVE_USER = 'SAVE_USER';
const RESET_USER = 'RESET_USER';

const state = {
    user: null,
};

const getters = {
    user: state => state.user,
};

const mutations = {
    [SAVE_USER](state, payload) {
        state.user = payload;
    },
    [RESET_USER](state) {
        state.user = null;
    },
};

export default {
    state,
    getters,
    mutations,
};
