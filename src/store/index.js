import Vue from 'vue';
import Vuex from 'vuex';
import account from "./modules/account";

// 持久化
import CreatePersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
const vuexStorage = new CreatePersistedState({
  key: 'neeko',
  storage: window.localStorage
});

const store = new Vuex.Store({
  strict: true,
  modules: {
    account
  },
  plugins: [vuexStorage]
});

export default store;
