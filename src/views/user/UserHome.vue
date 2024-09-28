<template>
  <div class="page">
    <template v-if="type === 'home'">
      <v-app id="inspire">
        <v-app-bar
          app
          clipped-right
          clipped-left
          flat
          height="78"
          style="background-color: #fcce5e"
        >
        </v-app-bar>
        <div class="menu-header">
          <Menu></Menu>
        </div>

        <!-- 1263px时会隐藏 -->
        <v-navigation-drawer app clipped width="299px">
          <div class="menu-left-bgc">
            <div style="height: 50px"></div>
            <v-list-item
              v-for="(i, index) in getLogoList"
              :key="i.id"
              @click="setActive('logoList', index, i.path)"
            >
              <v-list-item-content>
                <v-list-item-subtitle>
                  <div
                    class="list-item"
                    :class="{
                      'active-item': activeList === 'logoList' && activeIndex === index,
                    }"
                  >
                    {{ i.title }}
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="!isShow">
              <div class="more-logo" @click="isShow = true">
                <span class="mdi mdi-dots-horizontal"></span>
              </div>
            </v-list-item>

            <div style="height: 50px"></div>
            <v-list-item
              v-for="(i, index) in userInfo"
              @click="setActive('userInfo', index, i.path)"
            >
              <v-list-item-content>
                <v-list-item-subtitle>
                  <div
                    class="list-item"
                    :class="{
                      'active-item': activeList === 'userInfo' && activeIndex === index,
                    }"
                  >
                    {{ i.title }}
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-navigation-drawer>

        <v-main>
          <component :is="showComponent" @getData="getData"></component>
        </v-main>
      </v-app>
    </template>
    <template v-if="type === 'buy'">
      <div class="animated-element">
        <Purchase :id="id" @goBack="type = 'home'"></Purchase>
      </div>
    </template>
  </div>
</template>

<script>
import LogoList from "./components/LogoList";
import Menu from "@/components/main/Menu";
import MyCenter from "./components/MyCenter";
import Purchase from "../edit/Purchase";

export default {
  name: "UserHome",

  props: {},
  components: {
    LogoList,
    Menu,
    MyCenter,
    Purchase,
  },

  data() {
    return {
      loading: false,
      logoList: [
        { id: 0, title: "My Center", path: "MyCenter" },
        { id: 1, title: "logo1", path: "LogoList" },
        { id: 2, title: "logo2", path: "LogoList" },
        { id: 3, title: "logo3", path: "LogoList" },
        { id: 4, title: "logo4", path: "LogoList" },
        { id: 5, title: "logo5", path: "LogoList" },
        { id: 6, title: "logo6", path: "LogoList" },
        { id: 7, title: "logo7", path: "LogoList" },
        { id: 8, title: "logo8", path: "LogoList" },
        { id: 9, title: "logo9", path: "LogoList" },
      ],
      userInfo: [
        { title: "My Designs" },
        { title: "My Affiliate Link" },
        { title: "Help" },
        { title: "Account" },
        { title: "Logout", path: "logout" },
      ],
      activeList: "logoList", // 当前激活的列表，可以是 'logoList' 或 'userInfo'
      activeIndex: 0, // 在激活列表中的激活项的索引
      showComponent: "MyCenter",
      isShow: false,
      type: "home",
      id: null,
    };
  },
  mounted() {
    if (!this.isLogin) {
      this.$router.push("/");
    }
  },
  computed: {
    getLogoList() {
      return this.isShow ? this.logoList : this.logoList.slice(0, 5);
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  watch: {
    isLogin() {
      if (!this.$store.getters.isLogin) {
        //未登录时退回首页
        this.$router.push("/");
      }
    },
  },
  methods: {
    setActive(listName, index, path) {
      this.activeList = listName;
      this.activeIndex = index;

      if (path === "logout") {
        this.loginOut();
        return;
      }

      this.showComponent = path;
    },
    getData(id) {
      this.id = id;
      this.type = "buy";
    },
    loginOut() {
      this.$store.dispatch("user/logout").then(() => {
        this.$my_message({
          content: "已退出!",
          type: "success",
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
.list-item {
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  @include border(#000000);
  cursor: pointer;
}
.active-item {
  @include border(#ba5cf7);
}
.menu-header {
  width: 100%;
  z-index: 5;
  position: fixed;
  top: 0;
}
.v-list-item__content {
  padding: 0px;
}
.menu-left-bgc {
}
.more-logo {
  margin: auto;
  font-size: 30px;
  cursor: pointer;
}
</style>
