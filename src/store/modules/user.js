import { userLogin, logout, getInfo } from "@/api/login";
import Vue from "vue";
import {
  getToken,
  setToken,
  removeToken,
  getAvatarUrl,
  setAvatarUrl,
  removeAvatarUrl,
} from "@/utils/auth";
import { resetRouter } from "@/router";
import { dispatch } from "@svgdotjs/svg.js";
import { message } from "tdesign-vue";

const getDefaultState = () => {
  return {
    token: getToken(),
    info: {
      name: "",
      avatar: "",
      email: "",
      isAuth: false,
      isAdmin: false,
      message: "",
    },
    isLogin: null,
    isShowLogin: false,
    isFreeLogin: false,
    //登录提示信息
    loginMessage: "",
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_Info: (state, info) => {
    state.info = info;
  },

  SET_IsShowLogin: (state, value) => {
    state.isShowLogin = value;
  },
  SET_IsFreeLogin: (state, value) => {
    state.isFreeLogin = value;
  },
  SET_LoginMessage: (state, value) => {
    state.loginMessage = value;
  },
};

const actions = {
  // user login
  userLogin({ commit }, userInfo) {
    // const { uiEmail, uiPassword, free } = userInfo;
    const { emailAddress, password, free } = userInfo;
    return new Promise((resolve, reject) => {
      userLogin({ uiEmail: emailAddress, uiPassword: password, free: free })
        .then((response) => {
          const { data } = response;

          commit("SET_TOKEN", data);
          setToken(data);
          Vue.prototype.$my_message({
            content: "登录成功!",
            type: "success",
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let a = {
        token: state.token,
      };

      getInfo(a)
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject("Verification failed, please Login again.");
          }

          const {
            userName,
            avatarAddress,
            emailAddress,
            adminFlag,
            uiIsAuth,
            uiRemarks,
          } = data;
          let info = {
            name: userName,
            avatar: avatarAddress,
            email: emailAddress,
            isAdmin: adminFlag,
            message: uiRemarks,
            isAuth: uiIsAuth,
          };

          commit("SET_Info", info);
          setAvatarUrl(avatarAddress);

          resolve(data);
        })
        .catch((error) => {
          commit("SET_IsShowLogin", true);
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          removeAvatarUrl();
          // resetRouter();
          commit("RESET_STATE");

          Vue.prototype.$my_message({
            content: "已退出!",
            type: "success",
          });

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      removeAvatarUrl();
      commit("RESET_STATE");
      commit("SET_IsShowLogin", true);
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
