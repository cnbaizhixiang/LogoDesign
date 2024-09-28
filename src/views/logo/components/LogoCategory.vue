<template>
  <div class="page">
    <h2>Logo Design Ideas & Inspiration per Industry</h2>

    <div class="category-list">
      <router-link
        v-for="i in list"
        :key="i.id"
        :to="{ name: 'logo-ideas/keyword', params: { category: i.name } }"
      >
        <div class="category-item">
          <div class="category-img">
            <el-image
              :src="i.url"
              class="category-img"
              :alt="i.name"
              fit="contain"
            ></el-image>
          </div>

          <p>{{ i.name }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getCategoryList } from "@/api/index";
export default {
  props: {},
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.fechData();
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
        } else {
          this.list = [];
        }
      });
    },
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
@font-face {
  font-family: "KoHo"; /* 你可以自定义这个字体名称 */
  src: url("@/assets/static/fonts/KoHo-SemiBold.ttf") format("truetype"); /* TTF格式，作为备选 */
  font-weight: normal; /* 根据你的字体文件来设置 */
  font-style: normal; /* 根据你的字体文件来设置 */
}
h2 {
  font-size: 48px;
  padding: 20px;
  font-family: "KoHo";
  font-weight: Bold;
}
.page {
  text-align: center;
  overflow: hidden;
}
a {
  all: unset;
}
.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.category-img {
  width: 118px;
  height: 118px;
}
.category-item {
  width: 280px;
  height: 260px;
  cursor: pointer;
  overflow: hidden;
  background-color: #ffffff;
  margin: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: $shadow-default;

  p {
    font-size: 36px;

    font-family: "KoHo";
  }
}
.category-item:hover {
  transform: scale(1.05);
}
.category-img {
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  .category-item {
    width: 35vw;
    height: 120px;
    p {
      font-size: 1rem;
    }
  }
  .category-img {
    width: 40px;
    height: 40px;
  }
  h2 {
    font-size: 1.5rem;
  }
}
</style>
