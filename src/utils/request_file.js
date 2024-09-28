import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  responseType: "blob",
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
});

service.interceptors.response.use(
  (response) => {
    return response;

    // if the custom code is not 20000, it is judged as an error.
  },
  (error) => {
    console.log("err" + error); // for debug
    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000,
    // });
    return Promise.reject(error);
  }
);

export default service;
