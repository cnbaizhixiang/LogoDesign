import request from "@/utils/request";


export function getLogoType() {
  return request({
    url: `/pay/price/getInitialPrice`,
    method: "get",
    messageType: "get",
    token: true,
  });
}

//获取临时密钥
export function getStripePay(data) {
  return request({
    url: `/pay/stripe/getStripePay`,
    method: "post",
    data,
    token: true,
    messageType: "get",
  });
}

export function getDiscount(data) {
  return request({
    url: `/pay/price/applyCoupon/${data.code}/${data.type}`,
    method: "get",
    isPage: true,
    token: true,
    messageType: "get",
  });
}

export function getTypeDiscount() {
  return request({
    url: `pay/price/getDiscount`,
    method: "get",
    isPage: true,
    token: true,
    messageType: "get",
  });
}

//获取套餐价格
export function getDinnerCost() {
  return request({
    url: `pay/price/getDinnerCost`,
    method: "get",
    messageType: "get",
  });
}
