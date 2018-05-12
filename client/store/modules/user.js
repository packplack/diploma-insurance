import localStorageHandler from '../../helpers/local-storage-handler';

const SAVE_USER = 'SAVE_USER';
const RESET_USER = 'RESET_USER';
const GET_USER_FROM_LOCALE_STORAGE = 'GET_USER_FROM_LOCALE_STORAGE';

const state = {
    user: null,
};

const getters = {
    user: state => state.user,
};

const mutations = {
    [SAVE_USER](state, payload) {
        state.user = payload;
        localStorageHandler.set('user', payload);
    },
    [RESET_USER](state) {
        state.user = null;
        localStorageHandler.remove('user');
    },
    [GET_USER_FROM_LOCALE_STORAGE](state) {
        state.user = localStorageHandler.get('user');
    }
};

export default {
    state,
    getters,
    mutations,
};
