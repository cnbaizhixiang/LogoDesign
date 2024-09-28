import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
// 在组件文件中引入 vue-lazyload
// import VueLazyload from "vue-lazyload";
import Message from "@/components/SnackBar";
import VueMeta from "vue-meta";
Vue.prototype.$my_message = Message.install;
import Vuetify from "vuetify";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import "vuetify/dist/vuetify.min.css";
import fabric from "fabric";
Vue.use(fabric);
//替换vuetify中的属性
import "@/scss/variables.scss";
Vue.use(Vuetify);
import "element-ui/lib/theme-chalk/index.css";
Vue.use(VueMeta);
// import FontPicker from "font-picker-vue";

// Vue.use(FontPicker);

import Snap from "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg-min.js";
Vue.config.productionTip = false;

//监听代码错误问题
Vue.config.errorHandler = function (err, vm, info) {
  // Vue.prototype.$my_message({
  //   content: "Error",
  //   type: "error",
  // });
  return Promise.reject(err);
  // 可以在这里执行一些错误处理逻辑，比如发送错误报告等
};

/***
 *  节流 每单位时间可触发一次
 *  第一次瞬间触发，最后一次不管是否达到间隔时间依然触发
 * 【考虑到input的change事件】
 *  @param {?Number|300} time - 间隔时间
 *  @param {Function} fn - 执行事件
 *  @param {?String|"click"} event - 事件类型 例："click"
 *  @param {Array} binding.value - [fn,event,time]
 *  例：<el-button v-throttle="[reset,`click`,300]">刷新</el-button>
 *  传递参数则：<el-button v-throttle="[()=>reset(param),`click`,300]">刷新</el-button>
 */
Vue.directive("throttle", {
  inserted: function (el, binding) {
    let [fn, event = "click", time = 500] = binding.value;
    let timer, timer_end;

    el.addEventListener(event, () => {
      if (timer) {
        clearTimeout(timer_end);
        return (timer_end = setTimeout(() => fn(), time));
      }
      fn();
      timer = setTimeout(() => (timer = null), time);
    });
  },
});

Vue.use(ElementUI);

Vue.prototype.Snap = Snap;

// Vue.use(VueLazyload, {});

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  el: "#app",

  render: (h) => h(App),
}).$mount("#app");
