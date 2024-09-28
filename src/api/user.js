import request from "@/utils/request";

//获取字体组默认字体
export function getUserLogoList() {
  return request({
    url: `/user/logo/getUserLogo`,
    method: "get",
    isPage: true,
    token: true,
    messageType: "get",
  });
}

//删除LOGO数据
export function deleteUserLogo(id) {
  return request({
    url: `/user/logo/removeLogoById/${id}`,
    method: "delete",
    token: true,
    messageType: "delete",
  });
}

export function updateUserAvatar(data) {
  return request({
    url: `/user/UpUserImage`,
    method: "post",
    token: true,
    data,
    messageType: "update",
  });
}
export function updateUserName(name) {
  return request({
    url: `/user/UpdateUserName/${name}`,
    method: "put",
    token: true,
    messageType: "update",
  });
}

export function UpdateUserPassword(password) {
  return request({
    url: `/user/UpdateUserPassword`,
    method: "put",
    token: true,
    headers: { password: password },
    messageType: "update",
  });
}

export function UpdateUserMessage(message) {
  return request({
    url: `/user/UpdateUserRemark/${message}`,
    method: "put",
    token: true,
    messageType: "update",
  });
}

export function UpdateUserEmail(email) {
  return request({
    url: `/user/UpdateUserEmail/${email}`,
    method: "put",
    token: true,
    messageType: "update",
  });
}

//认证发送邮箱
export function getUserAuthen() {
  return request({
    url: `/user/ReAuthen`,
    method: "get",
    token: true,
    messageType: "get",
  });
}

export function validEmail(query) {
  return request({
    url: `/user/Callback/${query.str}/${query.email}`,
    method: "get",
    messageType: "get",
  });
}

export function deleteUser() {
  return request({
    url: `/user/CancelUser`,
    method: "delete",
    token: true,
    messageType: "delete",
  });
}