<template>
  <div class="page">
    <Page404 v-if="error"></Page404>
    <template v-else>
      <PreLoading v-if="pageLoading"></PreLoading>
      <Menu></Menu>
      <div class="email-info">
      <div>
      
      </div v-if="!error && !pageLoading">
        <v-chip class="ma-2" color="success" label>
          <v-icon left> mdi-account-circle-outline </v-icon>
          Email verify success
        </v-chip>
        <v-chip>{{ timerSeconds }}</v-chip>
        
      </div>
    </template>
  </div>
</template>
<script>
import Menu from "@/components/main/Menu.vue";

import PreLoading from "@/components/main/PreLoading";
import Page404 from "@/views/error-page/View404";
import { validEmail } from "@/api/user";
import axios from "axios";
export default {
  name: "Email",
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate: "Logo Design-LogoAIDesign.com",
  },
  components: {
    Menu,
    PreLoading,
    Page404,
  },
  data() {
    return {
      pageLoading: false,
      error: false,
      timerSeconds: 5,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.vaildInfo();
  },
  beforeDestroy() {},
  methods: {
    vaildInfo() {
      let a = {
        str: this.$route.params.code,
        email: this.$route.params.email,
      };
      this.pageLoading = true;
      validEmail(a)
        .then(() => {
          let timer = setInterval(() => {
            if (this.timerSeconds > 0) {
              this.timerSeconds--;
            } else {
              clearInterval(timer);
              this.$router.push("/");
            }
          }, 1000);
        })
        .catch((error) => {
          this.error = true;
        })
        .finally(() => {
          this.pageLoading = false;
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/css/variables";
.page {
  overflow: hidden;
  height: 100vh;
}

.div-width {
  max-width: $max-width-1;
  padding: 20px;
  margin: auto;
}
.email-info {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 768px) {
}
</style>
