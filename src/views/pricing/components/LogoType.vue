<template>
  <div class="logo-type">
    <div class="type-title" :style="{ backgroundColor: typeInfo.color }">
      <h2 class="title-item">{{ typeInfo.name }}</h2>
      <span class="title-item">${{ typeInfo.price }}</span>
      <a href="/generate">
        <div class="btn title-item" @click="changePurchaseType">
          <span>Select</span>
        </div>
      </a>
    </div>
    <div class="type-list">
      <div v-for="i in typeInfo.list" class="type-item">
        <v-img
          max-width="18"
          max-height="14"
          class="img"
          :src="require(`@/assets/static/img/pricing/Vector.svg`)"
        ></v-img>
        <div>
          <span>{{ i.title }}</span
          ><br />
          <span class="describe">{{ i.describe }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/main/Menu";

import Footer from "@/components/main/Footer.vue";
import Questions from "@/components/main/Questions.vue";

export default {
  name: "PricingView",
  metaInfo: {
    title: "Logo AI DESIGN",
  },
  components: {
    Menu,

    Footer,
    Questions,
  },
  props: {
    typeInfo: Object,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},

  methods: {
    changePurchaseType() {
      localStorage.setItem("defaultType", this.typeInfo.name);
    },
  },
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
a {
  text-decoration: none;
}
.logo-type {
  width: 343px;
  height: 705px;
}
.type-title {
  width: 343px;
  height: 211px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  span {
    font-size: 22px;
    font-weight: Bold;
  }
}
.type-list {
  background-color: #ffffff;
  width: 100%;
  height: 494px;
  padding: 10px;
}
.type-item {
  display: flex;
  align-items: center;
  text-align: left;
  margin: 10px;
  .img {
    margin-right: 10px;
  }
  span {
    font-family: Inter;
    color: #5e56f6;
  }
  .describe {
    color: #666666;
    font-size: 11px;
  }
}
.btn {
  width: 135px;
  height: 34px;
  background-color: #ffffff;
  border: 1px solid #848484;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  span {
    font-size: 13px;
    color: #000000;
  }
}
.title-item {
  margin: 5px;
}
@media (max-width: 768px) {
}
</style>
