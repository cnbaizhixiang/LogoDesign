<template>
  <div class="page">
    <h1>Select your industry</h1>
    <p>This helps the AI to generate logos that are match to your business</p>
    <div class="category-list">
      <div
        class="category-item"
        v-for="(i, index) in list"
        :key="i.id"
        @click="selectType(index)"
        :class="{ selectType: selectedItem === index }"
      >
        <v-img
          :max-width="width"
          :max-height="width"
          contain
          :src="i.url"
          class="img"
        ></v-img>
        <p>{{ i.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryList } from "@/api/index";
export default {
  name: "LogoIndustry",

  components: {},

  data() {
    return {
      list: [],
      selectedItem: null,
    };
  },
  created() {
    this.fechData();
  },

  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 39;
        case "sm":
          return 39;
        case "md":
          return 69;
        case "lg":
          return 69;
        case "xl":
          return 69;
      }
    },
  },

  methods: {
    fechData() {
      getCategoryList().then((response) => {
        const a = response.data;
        if (a) {
          this.list = a.map((i) => {
            return {
              id: i.blcId,
              name: i.categoryName,
              url: i.categoryUrl,
            };
          });
        }
      });
    },
    selectType(e) {
      this.selectedItem = e; // 设置当前选中的 item
      const storedData = JSON.parse(sessionStorage.getItem("logoParmeter"));
      storedData.categoryName = this.list[e].name;
      sessionStorage.setItem("logoParmeter", JSON.stringify(storedData));

      this.$emit("changType", "color");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";
.page {
  text-align: center;
}
.category-list {
  @include flex();
  flex-wrap: wrap;
}
.category-item {
  width: 170px;
  height: 170px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  .img {
    margin: auto;
    width: 69px;
    height: 69px;
  }
}
.category-item:hover {
  @include border(#5e56f6);
  border-radius: 10px;
}
.selectType {
  @include border(#5e56f6);
  border-radius: 10px;
}
@media (max-width: 768px) {
  .category-item {
    width: 100px;
    height: 100px;
  }
}
</style>
