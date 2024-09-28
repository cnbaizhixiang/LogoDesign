<template>
  <div class="page">
    <Menu></Menu>
    <div class="contact">
      <div class="div-width">
        <div class="page-info">
          <h1>What do you need assistance with?</h1>

          <div class="search-btn">
            <input
              type="text"
              placeholder="Search logos"
              v-model="searchText"
              @keyup.enter="goToSearch(searchText)"
            />

            <v-img
              max-width="30"
              max-height="30"
              @click="goToSearch(searchText)"
              class="search-img"
              :src="require('@/assets/static/img/logo/search.svg')"
            ></v-img>
          </div>

          <p v-if="keywords">
            Popular：<span v-for="i in keywords" @click="goToSearch(i)">{{
              i
            }}</span>
          </p>
        </div>
        <el-image
          :src="require(`@/assets/static/img/contact-us/help.svg`)"
          fit="contain"
          class="help"
        ></el-image>
        <el-image
          :src="require(`@/assets/static/img/contact-us/help-bgc.svg`)"
          fit="contain"
          class="help-bgc"
        ></el-image>
        <el-image
          :src="require(`@/assets/static/img/contact-us/help-text.svg`)"
          fit="contain"
          class="help-text"
        ></el-image>
      </div>

      <div class="contact-icon-bgc">
        <ContactIcon></ContactIcon>
      </div>

      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/main/Menu";

import Footer from "@/components/main/Footer";
import ContactIcon from "./components/ContactIcon";
import { getSearchKeyword } from "@/api/logoSearch";
export default {
  name: "ContactUs",
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate: "%s | What do you need assistance with?-LogoAIDesign.com",
  },
  components: {
    Menu,
    Footer,
    ContactIcon,
  },
  data() {
    return {
      keywords: [],
      searchText: "",
    };
  },
  created() {},
  mounted() {
    this.getKeyword();
  },

  methods: {
    getKeyword() {
      getSearchKeyword().then((response) => {
        this.keywords = response.data.slice(0, 4);
      });
    },
    goToSearch(text) {
      this.$store.commit("updateSearchText", text);
      this.$router
        .push({
          path: "/logo-ideas/search",
        })
        .then(() => {
          window.scrollTo(0, 0);
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";

.page {
  text-align: center;
  overflow: hidden;
  background-color: $main-bgc-color;
}
.contact {
  overflow: hidden;
}
p {
  font-size: 20px;
}
span {
  margin: 5px;
  text-decoration: underline;
  cursor: pointer;
}
a {
  text-decoration: none;
}
h1 {
  font-family: "Inter";
  line-height: 1.5;
  font-size: 46px;
  font-weight: Bold;
}
.page-info {
  z-index: 100;
  text-align: center;
  margin-top: 100px;
  max-width: 832px;
  height: 500px;
}
.div-width {
  max-width: $max-width-1;
  margin: auto;
  padding: 20px;
  position: relative;
}
.help {
  position: absolute;

  right: -500px;
  top: -69px;
}
.help-bgc {
  position: absolute;
  z-index: 1;
  right: 270px;
  top: 380px;
}
.help-text {
  position: absolute;
  right: -50px;
  top: 200px;
}
.contact-icon-bgc {
  background-color: #ffffff;
}
.search-btn {
  margin: auto;
  margin-top: 80px;
  margin-bottom: 80px;
  max-width: 516px;
  height: 60px;
  padding: 10px;
  display: flex;
  border: 2px solid #000000;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  input {
    height: 100%;
    outline: none;
  }
}
@media (max-width: 768px) {
  h1 {
    font-size: 32px;
  }
}
@media (max-width: 1200px) {
  .help,
  .help-bgc,
  .help-text {
    display: none;
  }
}
</style>
