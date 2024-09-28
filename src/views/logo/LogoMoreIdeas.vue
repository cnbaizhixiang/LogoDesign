<template>
  <div class="page">
    <div class="page-info">
      <Menu></Menu>
      <div class="logo-ideas div-width">
        <PageInfo :pageInfo="pageInfo"></PageInfo>
        <p v-if="keywords">
          Related Search：<a
            v-for="i in keywords"
            href="/logo-ideas/search"
            @click="goToSearch(i)"
            >{{ i }}</a
          >
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
    <Footer></Footer>
  </div>
</template>

<script>
import { getAllLogoList, getSearchKeyword } from "@/api/logoSearch";
import LogoList from "./components/LogoList";
import Menu from "@/components/main/Menu";
import Footer from "@/components/main/Footer.vue";
import MakeBtn from "@/components/main/MakeBtn.vue";
import LogoCategorySecond from "./components/LogoCategorySecond";
import MakeStep from "./components/MakeStep";
import PageInfo from "./components/PageInfo";
export default {
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate: "Logo ideas for every industries.-LogoAIDesign.com",
  },
  props: {},
  components: {
    LogoList,
    LogoCategorySecond,
    Menu,
    Footer,
    MakeBtn,
    MakeStep,
    PageInfo,
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
    };
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
        getAllLogoList(a).then((response) => {
          let list = [];
          if (response.data) {
            list = response.data.list.map((i) => {
              return {
                id: i.logoId,
                url: i.logoAddress,
                categoryName: i.categoryName,
              };
            });
            this.total = response.data.total;
          }

          this.logoList = [...this.logoList, ...list];

          //关闭加载
          this.$refs.logoListComponent.closeLoading();
        });
    },
    getKeyword() {
      getSearchKeyword().then((response) => {
        this.keywords = response.data ? response.data : [];
      });
    },
    goToSearch(text) {
      this.$store.commit("updateSearchText", text);
    },
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
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
  a {
    all: unset;
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
}
</style>
