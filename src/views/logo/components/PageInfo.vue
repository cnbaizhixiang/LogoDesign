<template>
  <div class="page">
    <h1>{{ pageInfo.title }}</h1>
    <p>{{ pageInfo.describe }}</p>
    <div class="search-btn-list">
      <div class="search-btn">
        <input
          type="text"
          placeholder="Search logos"
          v-model="searchText"
          @keyup.enter="goToSearch"
        />

        <v-img
          max-width="30"
          max-height="30"
          v-throttle="[goToSearch]"
          class="search-img"
          :src="require('@/assets/static/img/logo/search.svg')"
        ></v-img>
      </div>
      <p>or</p>

      <a href="/generate">
        <div class="make-btn">
          <MakeBtn
            :text="'GENERATE LOGOS'"
            :bgc="'#000000'"
            :color="'#ffffff'"
          ></MakeBtn>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import MakeBtn from "@/components/main/MakeBtn.vue";
export default {
  name: "PageInfo",

  props: {
    pageInfo: Object,
  },
  components: {
    MakeBtn,
  },
  data() {
    return {
      searchText: "",
    };
  },
  created() {},
  mounted() {
    this.searchText = this.$store.getters.getSearchText;
  },
  watch: {
    searchText(newVal, oldVal) {
      this.$store.commit("updateSearchText", newVal);
    },
  },
  methods: {
    goToSearch() {
      let str = this.searchText;
      if (!/^[A-Za-z0-9]+$/.test(str)) {
        this.$my_message({
          content: "请输入字母与数字!",
          type: "warning",
        });
        return;
      }
      if (this.$route.path === "/logo-ideas/search") {
        this.$emit("getSearchList");
      } else {
        this.$router
          .push({
            path: "/logo-ideas/search",
          })
          .then(() => {
            window.scrollTo(0, 0);
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";
@font-face {
  font-family: "Irish"; /* 你可以自定义这个字体名称 */
  src: url("@/assets/static/fonts/IrishGrover-Regular.ttf") format("truetype"); /* TTF格式，作为备选 */
  font-weight: normal; /* 根据你的字体文件来设置 */
  font-style: normal; /* 根据你的字体文件来设置 */
}
.page {
  margin-top: 100px;
}
a {
  text-decoration: none;
}
h1 {
  font-size: 42px;
}
p {
  font-size: 20px;
  margin: 30px;
}
.search-btn-list {
  display: flex;
  justify-content: center;
  align-items: center;

  .search-btn {
    width: 280px;
    height: 60px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    input {
      height: 100%;
      outline: none;
    }
  }

  p {
    font-size: 2rem;
    padding: 10px;
    font-family: "Irish";
  }
}
.make-btn {
  width: 280px;
  height: 60px;
}
.search-img {
  cursor: pointer;
}
@media (max-width: 768px) {
  .search-btn-list {
    flex-direction: column;
    p {
      display: none;
    }
    .search-btn {
      margin: 10px;
    }
  }
  h1 {
    font-size: 32px;
  }
  p {
    font-size: 16px;
  }
}
</style>
