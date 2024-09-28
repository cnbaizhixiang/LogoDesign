import request from "@/utils/request";

export function getFeaturedLogo() {
  return request({
    url: `/search/getMoreChoice`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}

export function getCategoryDetail(category) {
  return request({
    url: `/search/getSearchDetails/${category}`,
    method: "get",
    messageType: "get",
  });
}
// export function getSearchMoreLogo(data) {
//   return request({
//     url: `/search/getMoreLogo/${data.id}/${data.page}/${data.limit}`,
//     method: "get",
//     isPage: true,
//   });
// }

export function getLogoId(id) {
  return request({
    url: `/search/getDetails/${id}`,
    method: "get",
    messageType: "get",
  });
}

export function getCategoryList() {
  return request({
    url: `/search/SearchCategoryList`,
    method: "get",
    isPage: true,
    messageType: "get",
  });
}
