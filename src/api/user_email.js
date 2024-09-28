import request from "@/utils/request";
import { isValidEmail } from "./validate";
export function sendEmail(data) {
  if (!isValidEmail(data.emailAddress)) {
    return Promise.reject("Error");
  }
  return request({
    url: `/user/contact/submit`,
    method: "post",
    data,
    messageType: "add",
  });
}

export function getDiscountCode(email) {
  if (!isValidEmail(email)) {
    return Promise.reject("Error");
  }
  return request({
    url: `/pay/price/getCoupon/${email}`,
    method: "get",
    messageType: "get",
  });
}
