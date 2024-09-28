<template>
  <div class="count-type">
    <div class="count-info">
      <h3 class="info-item">{{ countInfo.title }}% Off</h3>
      <span class="info-item">{{ countInfo.describe }}</span>
    </div>
    <a href="/generate">
      <div class="btn">
        <span>Use Code</span>
      </div>
    </a>
  </div>
</template>

<script>
import Menu from "@/components/main/Menu";

import Footer from "@/components/main/Footer.vue";
import Questions from "@/components/main/Questions.vue";

export default {
  name: "DiscountCode",
  metaInfo: {
    title: "Logo AI DESIGN",
  },
  components: {
    Menu,

    Footer,
    Questions,
  },
  props: {
    countInfo: Object,
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
a {
  text-decoration: none;
}
.count-type {
  width: 343px;
  height: 333px;
  background-color: #ffffff;
}
.count-info {
  width: 343px;
  height: 211px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  span {
    font-size: 22px;
    font-weight: Bold;
    line-height: 2;
  }
  h3 {
    font-size: 36px;
    line-height: 3;
  }
}
.info-item {
}
.btn {
  margin: auto;
  width: 135px;
  height: 34px;
  background-color: #ffffff;
  border: 1px solid #848484;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50px;
  span {
    font-size: 13px;
    color: #000000;
  }
}

@media (max-width: 768px) {
}
</style>
