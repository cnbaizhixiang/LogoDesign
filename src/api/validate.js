//参数效验
import Vue from "vue";
//邮箱验证
export function isValidEmail(email) {
  // 电子邮箱的正则表达式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let a = emailRegex.test(email);
  if (!a) {
    sendMessage("邮箱格式有误!");
  }

  return a;
}

//id为正整数
export function isValidID(id) {
  // 正整数的正则表达式
  const positiveIntegerRegex = /^[1-9]\d*$/;
  let a = positiveIntegerRegex.test(id) && parseInt(id, 10) > 0;
  if (!a) {
    sendMessage("id为正整数!");
  }
  return a;
}

export function isValidSpace(str) {
  // 正则表达式检测字符串中是否包含空格
  const spaceRegex = /\s/;
  let a = spaceRegex.test(str);
  if (a) {
    sendMessage("参数不能存在空格!");
  }
  return a;
}
export function isValidEmpty(paramsArray) {
  // 遍历数组中的每个参数

  for (let i = 0; i < paramsArray.length; i++) {
    // 检查参数是否为空字符串、空数组或者空对象
    if (
      (typeof paramsArray[i] === "string" && paramsArray[i] === "") ||
      (Array.isArray(paramsArray[i]) && paramsArray[i].length === 0) ||
      (typeof paramsArray[i] === "object" &&
        Object.keys(paramsArray[i]).length === 0) ||
      paramsArray[i] === undefined
    ) {
      sendMessage(`参数不能为空!`);
      return true;
    }
  }

  return false;
}
export function sendMessage(message) {
  Vue.prototype.$my_message({
    content: message,
    type: "warning",
  });
}
