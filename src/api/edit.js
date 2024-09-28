import request from "@/utils/request";
import request_file from "@/utils/request_file";

//获取字体组默认字体
export function getFontsGroup(tag) {
  return request({
    url: `/search/getFontList/${tag}`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}

//获取随机颜色
export function getColors(type) {
  return request({
    url: `/search/SearchColorList/${type}`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}

//获取所有图标标签名称
export function getIconTagsName() {
  return request({
    url: `/search/getIconLabelNameList`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}

//根据标签获取分页图标

export function getIcons(query) {
  return request({
    url: `/search/getIconByLabelName/${query.page}/${query.limit}/${query.tag}`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}

//获取随机图标
export function getRandomIcons(num) {
  return request({
    url: `search/GetRandomIcon/${num}`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}

//获取所有容器
export function getContainerList() {
  return request({
    url: `/search/getContainerList`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}

//保存logo数据
export function saveLogoData(data) {
  return request({
    url: `/makelogo/logo/uploadLogoData`,
    method: "post",
    data: data,
    token: true,
    messageType: "update",
  });
}

export function uploadLogo(data) {
  return request({
    url: `/makelogo/logo/uploadLogoFile`,
    method: "post",
    data,
    token: true,
    messageType: "add",
  });
}

//获取模板logo
export function getTemplateLogo(data) {
  return request({
    url: `/makelogo/logo/RandomLogo`,
    method: "post",
    data,
    isPage: true,
    messageType: "get",
  });
}

//获取保存二维码
export function getQRCode(id) {
  return request_file({
    url: `/makelogo/logo/getQRCode/${id}`,
    method: "get",
    messageType: "get",
  });
}

//编辑logo
export function getLogoDetail(id) {
  return request({
    url: `/user/logo/getLogoData/${id}`,
    method: "get",
    token: true,
    messageType: "get",
  });
}

//获取字母
export function getLetterList() {
  return request({
    url: `/search/getLetterIcon`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}
