<template>
  <div class="text-center" data-app>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="slide-x-transition"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar size="56" v-bind="attrs" v-on="on" @click="getInfo">
          <img :src="info.avatar" alt="avatar" />
        </v-avatar>
      </template>

      <v-card>
        <v-list>
          <a href="/home">
            <v-list-item class="div-info">
              <v-list-item-avatar>
                <img :src="info.avatar" alt="avatar" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ info.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ info.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </a>
        </v-list>
      </v-card>

      <v-divider></v-divider>
      <v-list>
        <v-list-item link>
          <v-list-item-title>
            <span class="mdi mdi-lightbulb-on-outline"> My Logos</span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>
            <span class="mdi mdi-link">My Affiliate Link</span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title @click="loginOut">
            <span class="mdi mdi-logout">登出</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="34"></v-progress-circular>
      </v-overlay>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {},
  components: {},
  created() {},
  computed: {
    info() {
      return this.$store.getters.info;
    },
  },
  watch: {},
  data() {
    return {
      menu: false,
      overlay: false,
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/home"); // 字符串路径
    },
    loginOut() {
      this.$store.dispatch("user/logout").then(() => {
        this.$my_message({
          content: "已退出!",
          type: "success",
        });
      });
    },
    getInfo() {
      this.overlay = true;
      this.$store
        .dispatch("user/getInfo")
        .then(() => {})
        .finally(() => {
          this.overlay = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.div-info {
  cursor: pointer;
}
a {
  text-decoration: none;
}
</style>
