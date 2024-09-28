<template>
  <div class="page">
    <Menu></Menu>

    <div class="page-info">
      <h1>Terms of Use</h1>
      <el-image
        :src="require(`@/assets/static/img/terms/Vector.svg`)"
        alt="lock"
        fit="contain"
        class="img"
      ></el-image>
    </div>
    <div class="info-bgc">
      <Info></Info>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Menu from "@/components/main/Menu";

import Footer from "@/components/main/Footer.vue";
import Info from "./components/Info.vue";
export default {
  name: "TermsOfUse",
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate: "Terms & Privacy & Refund.-LogoAIDesign.com",
  },
  components: {
    Menu,
    Info,
    Footer,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},

  methods: {},
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";
@font-face {
  font-family: "Inika"; /* 你可以自定义这个字体名称 */
  src: url("@/assets/static/fonts/Inika-Bold.ttf") format("truetype"); /* TTF格式，作为备选 */
  font-weight: normal; /* 根据你的字体文件来设置 */
  font-style: normal; /* 根据你的字体文件来设置 */
}

.page {
  background-color: $main-bgc-color;
  text-align: center;
  overflow: hidden;
}
.page-info {
  height: 600px;
  max-width: $max-width-1;
  margin: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.img {
  margin: 20px;
}
.div-width {
  max-width: $max-width-1;
  margin: auto;
  padding: 10px;
}
.info-bgc {
  background-color: #ffffff;
}
h1 {
  font-size: 96px;
}
@media (max-width: 768px) {
  h1 {
    font-size: 48px;
  }
}
@media (max-width: 1200px) {
  .page-info {
    flex-direction: column;
  }
}
</style>
