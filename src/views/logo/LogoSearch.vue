<template>
  <div class="page">
    <div class="page-info">
      <Menu></Menu>
      <div class="logo-ideas div-width">
        <PageInfo
          :pageInfo="pageInfo"
          @getSearchList="getSearchList"
        ></PageInfo>
        <h2>Key Word Search resut</h2>
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
    <div class="logo-category div-width">
      <LogoCategory></LogoCategory>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import { getSearchLogo } from "@/api/logoSearch";
import LogoList from "./components/LogoList";
import Menu from "@/components/main/Menu";
import Footer from "@/components/main/Footer.vue";
import MakeBtn from "@/components/main/MakeBtn.vue";
import LogoCategorySecond from "./components/LogoCategorySecond";
import LogoCategory from "./components/LogoCategory";
import PageInfo from "./components/PageInfo";
export default {
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate:
      "Search for logo templates and click on design you like to customize your own",
  },
  props: {},
  components: {
    LogoList,
    LogoCategorySecond,
    Menu,
    Footer,
    MakeBtn,
    LogoCategory,
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
  created() {},
  mounted() {
    this.fechData();
  },
  computed: {
    searchText() {
      return this.$store.getters.getSearchText;
    },
  },
  beforeDestroy() {},
  methods: {
    fechData(query) {
      let a = {};
      (a.page = query ? query.page : 1),
        (a.name = this.searchText ? this.searchText : "logo");
      getSearchLogo(a).then((response) => {
        let list=[]
        if(response.data){
          list = response.data.list.map((i) => {
          return {
            id: i.bliId,
            url: i.logoAddress,
          };
        });
        this.total = response.data.total;
        }else{
          this.total = 0;
        }
        
        this.logoList = [...this.logoList, ...list];
        // //重复点击会导致重复。去重
        this.logoList = this.logoList.reduce((acc, current) => {
          if (!acc.some((item) => item.id === current.id)) {
            acc.push(current);
          }
          return acc;
        }, []);
        this.$refs.logoListComponent.closeLoading();
      });
    },
    getSearchList() {
      this.logoList = [];
      this.fechData();
    },
  },
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
  h2 {
    text-align: left;
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
