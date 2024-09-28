import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",

    component: () => import("../views/index/HomeView.vue"),
  },
  {
    path: "/404",

    component: () => import("@/views/error-page/View404.vue"),
    hidden: true,
  },

  {
    path: "/make",
    name: "make",

    component: () => import("../views/logo-list/LogoList.vue"),
  },

  {
    path: "/generate",

    name: "generate",
    component: () => import("../views/make-step/MakeStep.vue"),
  },
  {
    path: "/terms-of-use",
    name: "terms-of-use",
    component: () => import("../views/terms-of-use/TermsOfUse.vue"),
  },

  {
    path: "/logo/:id",
    name: "logo",
    component: () => import("../views/logo/LogoDetail.vue"),
  },

  {
    path: "/pricing",

    name: "pricing",
    component: () => import("../views/pricing/Pricing.vue"),
  },
  {
    path: "/process",

    name: "process",
    component: () => import("../views/process/Process.vue"),
  },
  {
    path: "/contact-us",

    name: "contact-us",
    component: () => import("../views/contact-us/ContactUs.vue"),
  },
  {
    path: "/edit",

    name: "edit",
    component: () => import("../views/edit/MakerView.vue"),
  },

  {
    path: "/logo-ideas",

    name: "logo-ideas",
    component: () => import("../views/logo/LogoIdeas.vue"),
  },

  {
    path: "/logo-ideas/more",

    name: "logo-ideas/more",
    component: () => import("../views/logo/LogoMoreIdeas.vue"),
  },
  {
    path: "/logo-ideas/keyword/:category",

    name: "logo-ideas/keyword",
    component: () => import("../views/logo/LogoKeyword.vue"),
  },
  {
    path: "/logo-ideas/search",

    name: "logo-ideas/search",
    component: () => import("../views/logo/LogoSearch.vue"),
  },
  {
    path: "/home",

    name: "home",
    component: () => import("../views/user/UserHome.vue"),
  },
  {
    path: "/download",

    name: "download",
    component: () => import("../views/download/Download.vue"),
  },

  {
    path: "/email/:code/:email",
    name: "email",
    component: () => import("../views/email/Email.vue"),
  },

  // { path: "*", redirect: "/404", hidden: true },
  {
    path: "*",
    component: () => import("@/views/error-page/View404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 解决vue页面之间跳转，页面不是在顶部的问题
    return { x: 0, y: 0 };
  },
});

export default router;
