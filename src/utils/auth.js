import Cookies from "js-cookie";

const TokenKey = "token";
const AvatarUrl = "avatar";

let oneDay = new Date();
oneDay.setDate(oneDay.getDate() + 7); // 设置过期时间为明天

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token,time) {
  let HoursLater = new Date(); // 获取当前时间

  if (time) {
    HoursLater.setHours(HoursLater.getHours() + time); // 设置为当前时间的两小时后
  }
  let day = time ? HoursLater : oneDay;
  
  return Cookies.set(TokenKey, token, {
    expires: day,
  });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getAvatarUrl() {
  return Cookies.get(AvatarUrl);
}

export function setAvatarUrl(url) {
  return Cookies.set(AvatarUrl, url, { expires: oneDay });
}

export function removeAvatarUrl() {
  return Cookies.remove(AvatarUrl);
}
