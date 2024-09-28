//code码值表
import Vue from "vue";
import store from "@/store";
import router from "@/router";
//接口异常除信息效验，其他异常外，统一码值为6364.在接收到此码值时，判断接口是获取，更新等，给出对应消息。
export function handleResponseCode(res, messageType) {
  let message = res.message || "Error";
  let code = res.code;
  if (code === 6364) {
    switch (messageType) {
      case "add":
        sendMessage("新增失败！");
        break;
      case "update":
        sendMessage("更新失败!");
        break;
      case "delete":
        sendMessage("删除失败!");
        break;
      case "get":
        sendMessage("获取失败!");
        break;
      default:
        sendMessage("Error!");
        break;
    }
    return;
  }
  switch (code) {
    //token
    case 50500:
    case 50400:
    case 50200:
    case 50700:
    case 50300:
      goToLogin(); // 使用函数来处理登录逻辑
      break;
    case 50100:
      sendMessage("用户不存在!");
      break;

    //数据更新
    case 40100:
      sendMessage("未找到!");
      break;
    case 40200:
      sendMessage("更新失败!");
      break;
    case 40300:
      sendMessage("新增失败!");
      break;
    case 40400:
      sendMessage("删除失败!");
      break;
    case 40500:
      sendMessage("请检测数据格式!");
      break;
    case 40600:
      sendMessage("参数有误!");
      break;

    //登录异常码值提示信息
    case 10100:
      store.commit("user/SET_LoginMessage", "密码有误!");

      break;
    case 10200:
      store.commit("user/SET_LoginMessage", "两次密码不一致,请重新输入!");
      sendMessage("两次密码不一致,请重新输入!");
      break;
    case 10300:
      store.commit(
        "user/SET_LoginMessage",
        "姓名不能为空或大于20位,请重新输入!"
      );

      break;
    case 10400:
      store.commit("user/SET_LoginMessage", "邮箱或密码输入有误!");

      break;
    case 10500:
      store.commit("user/SET_LoginMessage", "邮箱格式不正确,请重新输入!");
      break;
    case 10600:
      store.commit("user/SET_LoginMessage", "账号或密码为空,请重新输入!");

      break;
    case 10700:
      store.commit("user/SET_LoginMessage", "密码格式有误,请重新输入!");
      break;
    case 10800:
      store.commit("user/SET_LoginMessage", "发送失败!");

      break;
    case 10900:
      store.commit("user/SET_LoginMessage", "邮箱不允许为空!");

      break;
    case 11000:
      store.commit("user/SET_LoginMessage", "表单填写完整!");

      break;
    case 11100:
      store.commit("user/SET_LoginMessage", "验证码已失效，请重新获取验证码!");

      break;
    case 11200:
      sendMessage("验证码已发送,请查看邮箱!");
      break;
    case 11300:
      store.commit("user/SET_LoginMessage", "密码或确认密码不能为空!");
      break;

    //logo
    case 31500:
      sendMessage("数据量缺少!");
      break;

    case 31800:
      sendMessage("优惠码有误!");
      break;
    case 32900:
      sendMessage("保持logo不能超过15个!");
      break;
    case 33000:
      sendMessage("已购买logo不能删除!");
      break;
    case 33600:
      sendMessage("该邮箱已注册!");
      break;
    case 33700:
      sendMessage("请先前往认证用户信息!");
      setTimeout(() => {
        router.push("/home");
      }, 3000); // 3000毫秒 = 3秒
    case 33800:
      sendMessage("优惠券已失效!");
      break;

      break;
    // case 6364:
    //   sendMessage("Error!");
    //   break;
    default:
      // 默认错误处理
      Vue.prototype.$my_message({
        content: "Error",
        type: "error",
      });
      break;
  }

  return res;
}
//弹窗消息
export function sendMessage(message) {
  Vue.prototype.$my_message({
    content: message,
    type: "error",
  });
}

//重新登录
export function goToLogin() {
  store.dispatch("user/resetToken");
}
