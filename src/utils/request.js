import axios from "axios";
import store from "@/store";
import { getToken, setToken } from "@/utils/auth";
import Vue from "vue";
import { handleResponseCode } from "./code";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url

  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
});

//处理接口未查询到数据返回code值为40100问题
let isPage = false;
let messageType = "";
// response interceptor
service.interceptors.request.use(
  (config) => {
    console.log(process.env.VUE_APP_BASE_API);
    isPage = config.isPage ? config.isPage : false;
    messageType = config.messageType ? config.messageType : "";
    if (config.token) {
      config.headers["token"] = getToken();
    }

    return config;
  },
  (error) => {
    // do something with request error

    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    //接口请求头中携带token，重置token
    if (response.headers.token) {
      let token = response.headers.token;
      setToken(token, 2);
      store.commit("user/SET_TOKEN", token);
    }

    // console.log(res);
    if (res.code === 40100 && isPage) {
      return res;
    }

    if (res.code !== 200) {
      handleResponseCode(res, messageType);

      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    if (error.code === "ERR_NETWORK" || error.code === "ECONNABORTED") {
      Vue.prototype.$my_message({
        content: "网络错误",
        type: "error",
      });
    } else {
      // Vue.prototype.$my_message({
      //   content: "Error",
      //   type: "error",
      // });
    }

    return Promise.reject(error);
  }
);

export default service;
