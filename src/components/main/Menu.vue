<template>
  <div class="menu">
    <div class="menu-icon">
      <a href="/">
        <el-image
          :src="require('@/assets/static/img/index/logo.svg')"
          width="69"
          alt="LOGO"
          fit="contain"
        ></el-image>
      </a>
      <a href="/">
        <el-image
          :src="require('@/assets/static/img/index/Logo AI Design.svg')"
          width="103"
          height="59"
          alt="Logo AI DESIGN"
          fit="contain"
        ></el-image>
      </a>
    </div>

    <div class="menu-list">
      <div v-for="(i, index) in menu_list" :key="index" class="menu-item">
        <a :href="i.href" :title="i.label"
          ><span>{{ i.label }}</span></a
        >
      </div>

      <div class="menu-right">
        <template v-if="!isLogin">
          <v-btn
            @click="login(`login`)"
            elevation="3"
            width="91"
            height="35"
            outlined
            color="#6CC551"
            style="background-color: #ffffff"
            ><span style="color: #0134ff; font-weight: Bold; font-size: 16px"
              >Log In</span
            ></v-btn
          >
        </template>

        <template v-else>
          <User :key="componentKey"></User>
        </template>
        <Login @closeLogin="closeLogin"></Login>
      </div>
    </div>

    <!-- 小屏幕 -->
    <v-app-bar-nav-icon
      class="menu-drawers"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-navigation-drawer v-model="drawer" absolute>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="i in menu_list">
            <a :href="i.href" :title="i.label"
              ><v-list-item-title>
                <span style="color: #000000de">{{ i.label }}</span></v-list-item-title
              ></a
            >
          </v-list-item>
          <v-list-item @click="login(`login`)">
            <v-list-item-title>login</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Login from "./Login";
import User from "@/components/main/User.vue";
export default {
  name: "Menu",

  components: {
    Login,
    User,
  },
  data() {
    return {
      menu_list: [
        { label: "Logo Maker", href: "/generate" },
        { label: "Logo Ideas", href: "/logo-ideas" },
        { label: "Blog", href: "https://blog.logoaidesign.com" },
        { label: "Process", href: "/process" },
        { label: "Pricing", href: "/pricing" },
      ],
      drawer: false,
      group: null,
      componentKey: 0,
    };
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },

  created() {},
  mounted() {
    this.validInfo();
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    isShowLogin() {
      return this.$store.getters.isShowLogin;
    },
  },
  methods: {
    login(value) {
      this.drawer = false;
      this.$store.commit("user/SET_IsShowLogin", true);
    },
    changeModel(e) {
      this.showModel = e;
    },

    //验证token是否过期
    validInfo() {
      if (this.isLogin) {
        this.$store.dispatch("user/getInfo").then(() => {});
      }
    },
    closeLogin() {
      this.componentKey++;
    },
    goToHref(href) {
      this.$router.push(`${href}`).then(() => {
        window.scrollTo(0, 0);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";
.menu {
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  height: 78px;
  background-color: $main-bgc-color;
  @include flex();
}
a {
  text-decoration: none;
  color: $menu-text-color;
}

.v-navigation-drawer--absolute {
  position: fixed;
}

.menu-icon {
  display: flex;
  cursor: pointer;

  transform: scale(1);
  transition: transform 0.2s ease;
}
.menu-icon:hover {
  transform: scale(1.02);
}
.menu-list {
  width: 680px;
  @include flex();
  .menu-item {
    padding: 10px;
    font-family: Inter;
    color: $menu-text-color;
    line-height: 2;
    font-size: $md-font-size;
    font-weight: Bold;
    cursor: pointer;
  }
  .menu-item:hover {
    background-color: rgba(177, 177, 177, 0.2);
  }
  span {
    color: $menu-text-color;
  }
}
.menu-drawers {
  display: none;
}
.v-btn {
  text-transform: none;
}

@media (max-width: 768px) {
  .menu-icon {
    font-size: 24px;
  }
  .menu-list {
    display: none;
  }
  .menu-drawers {
    display: block;
  }
}
</style>
