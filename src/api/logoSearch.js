import request from "@/utils/request";

export function getLogoCategorySecond(query) {
  return request({
    url: `/search/getSecondCategoryName/${query.page}/${query.limit}`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}
export function getLogoList(data) {
  return request({
    url: `/search/getLogoByCategoryId`,
    method: "post",
    data,
    messageType: "get",
  });
}

export function getAllLogoList(query) {
  return request({
    url: `/search/getChoiceLogo/${query.page}/${query.limit}`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}

export function getSearchKeyword() {
  return request({
    url: `/search/getKeyword`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}

export function getSearchLogo(query) {
  return request({
    url: `/search/searchLikeCode/${query.name}/${query.page}`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}

export function getCategoryInfo(name) {
  return request({
    url: `/search/getCategoryByName/${name}`,
    method: "get",
    messageType: "get",
  });
}

export function getCategoryLogo(query) {
  return request({
    url: `/search/getPageLogoByCategoryName/${query.name}/${query.page}/${query.limit}`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}

export function getLogoDetail(id) {
  return request({
    url: `/search/getDetailsById/${id}`,
    method: "get",
    messageType: "get",
  });
}
export function getLogoLikeUser(id) {
  return request({
    url: `/search/getLogoLikeById/${id}`,
    method: "get",
    isPage: true,
    token: true,
    messageType: "get",
  });
}

export function likeLogo(id) {
  return request({
    url: `/search/likeLogo/${id}`,
    method: "get",
    token: true,
    messageType: "update",
  });
}
