import Vue from "vue";
import Vuex from "vuex";

import { getters } from "./getters"; // 引入 getters
import { mutations } from "./mutations";
import { state } from "./state";
import user from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
  },
  getters,
  mutations,
  state,
});

export default store;
