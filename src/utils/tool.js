import Vue from "vue";

export async function getTxt(url) {
  try {
    // 使用await等待fetch请求完成
    const response = await fetch(url);
    // 确保响应是成功的
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // 使用await等待响应文本
    const content = await response.text();
    // 返回content
    return content;
  } catch (error) {
    sendMessage("Error!");
    // 根据需要处理错误，例如重新抛出错误或返回特定的错误信息
    throw error; // 重新抛出错误，调用者可以捕获这个错误
  }
}

//弹窗消息
export function sendMessage(message) {
  Vue.prototype.$my_message({
    content: message,
    type: "error",
  });
}
