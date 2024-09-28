<template>
  <div class="page">
    <Page404 v-if="error"></Page404>
    <template v-else>
      <PreLoading v-if="pageLoading"></PreLoading>
      <div class="page-info">
        <Menu></Menu>
        <div class="logo-ideas div-width">
          <PageInfo :pageInfo="pageInfo"></PageInfo>
          <p v-if="keywords">
            Related Search：<span v-for="i in keywords" @click="goToSearch(i)">{{
              i
            }}</span>
          </p>
        </div>
      </div>

      <div class="logo-list-bgc">
        <div class="logo-list">
          <LogoList
            :logoList="logoList"
            :total="total"
            @fetchLogo="fechData"
            ref="logoListComponent"
          ></LogoList>
        </div>
      </div>
      <div class="logo-category-second-bgc">
        <div class="logo-category-second div-width">
          <LogoCategorySecond></LogoCategorySecond>
        </div>
      </div>
      <MakeStep></MakeStep>
      <div class="describe div-width">
        <p>
          Our logo creation tool is an innovative solution to streamline the logo design
          process, combining your personal design preferences with cutting-edge technology
          to generate a unique logo for your brand quickly. You can have a distinctive and
          creative logo with just a few clicks. This tool aims to simplify the design
          process, enabling even those with no design experience to craft
          professional-level logos easily, adding a unique visual identity to your brand.
        </p>
      </div>
      <Footer></Footer>
    </template>
  </div>
</template>

<script>
import { getCategoryLogo, getCategoryInfo } from "@/api/logoSearch";
import LogoList from "./components/LogoList";
import Menu from "@/components/main/Menu";
import Footer from "@/components/main/Footer.vue";
import MakeBtn from "@/components/main/MakeBtn.vue";
import LogoCategorySecond from "./components/LogoCategorySecond";
import MakeStep from "./components/MakeStep";
import PageInfo from "./components/PageInfo";
import PreLoading from "@/components/main/PreLoading";
import Page404 from "@/views/error-page/View404";
export default {
  props: {},
  metaInfo() {
    return {
      title: "Logo AI Design",
      titleTemplate: `${this.$route.params.category} Logo ideas-LogoAIDesign.com`,
    };
  },
  components: {
    LogoList,
    LogoCategorySecond,
    Menu,
    Footer,
    MakeBtn,
    MakeStep,
    PageInfo,
    PreLoading,
    Page404,
  },
  data() {
    return {
      logoList: [],
      total: 0,
      keywords: [],
      pageInfo: {
        title: "Logo ideas for every industries",
        describe:
          "Search for logo templates and click on design you like to customize your own",
      },
      pageLoading: false,
      error: false,
    };
  },
  created() {
    this.pageInfo.title = this.$route.params.category;
  },
  mounted() {
    this.getKeyword();
    this.fechData();
  },

  beforeDestroy() {},
  methods: {
    fechData(query) {
      let a = {};
      (a.page = query ? query.page : 1),
        (a.limit = query ? query.limit : 12),
        (a.name = this.pageInfo.title);
      getCategoryLogo(a).then((response) => {
        let list = [];
        if (response.data) {
          list = response.data.list.map((i) => {
            return {
              id: i.bliId,
              url: i.logoAddress,
            };
          });

          this.total = response.data.total;
        } else {
          this.total = 0;
        }

        this.logoList = [...this.logoList, ...list];
        this.$refs.logoListComponent.closeLoading();
      });
    },
    getKeyword() {
      this.pageLoading = true;
      getCategoryInfo(this.pageInfo.title)
        .then((response) => {
          this.error = false;
          this.pageInfo.title = response.data.categoryName;
          this.pageInfo.describe = response.data.currentImageFlag;
          this.keywords = response.data.keywordsList;
        })
        .catch((error) => {
          this.error = true;
        })
        .finally(() => {
          this.pageLoading = false;
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
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
@font-face {
  font-family: "KOHO"; /* 你可以自定义这个字体名称 */
  src: url("@/assets/static/fonts/KoHo-SemiBold.ttf") format("truetype"); /* TTF格式，作为备选 */
  font-weight: normal; /* 根据你的字体文件来设置 */
  font-style: normal; /* 根据你的字体文件来设置 */
}
.page {
  overflow: hidden;
}
.page-info {
  background-color: $main-bgc-color;
}
.logo-ideas {
  height: 680px;

  text-align: center;
  p {
    font-size: 20px;
  }
  span {
    margin: 5px;
    text-decoration: underline;
    cursor: pointer;
  }
}

.div-width {
  max-width: $max-width;
  padding: 20px;
  margin: auto;
}
.describe {
  font-size: 24px;
  font-family: "KOHO";
}
.logo-list-bgc {
  background-color: $bgc-color-3;
  text-align: center;
}
.logo-list {
  transform: translate(0, -220px);
}
.logo-category-second-bgc {
  background-color: $main-bgc-color;
}
.logo-category-bgc {
  background-color: #e5e5e5;
}
@media screen and (max-width: 768px) {
  .logo-ideas {
    flex-direction: column;
  }
  P {
    font-size: 14px;
  }
  .logo-list {
    transform: translate(0, 0);
  }
}
</style>
