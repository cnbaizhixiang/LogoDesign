import request from "@/utils/request";

import { isValidEmpty, isValidEmail } from "./validate";
export function sendCaptcha(data) {
  return request({
    url: `/user/captcha`,
    method: "post",
    data,
  });
}
export function userRegister(data) {
  if (!isValidEmail(data.uiEmail) || isValidEmpty(data)) {
    return Promise.reject("Error");
  }
  return request({
    url: `/user/register`,
    method: "post",
    data,
  });
}

export function userLogin(data) {
  
  return request({
    url: `/user/Login`,
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/user/Logout",
    method: "get",
    token: true,
  });
}

export function getInfo() {
  return request({
    url: `/user/getUserInfo`,
    method: "get",
    token: true,
  });
}
