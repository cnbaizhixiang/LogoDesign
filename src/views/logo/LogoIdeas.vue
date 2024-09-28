<template>
  <div class="page">
    <div class="page-info">
      <Menu></Menu>
      <div class="logo-ideas div-width">
        <div class="logo-ideas-left">
          <v-img
            :src="require(`@/assets/static/img/index/Design.svg`)"
            max-width="400"
            max-height="400"
          ></v-img>
        </div>
        <div class="logo-ideas-right">
          <PageInfo :pageInfo="pageInfo"></PageInfo>
        </div>
      </div>
    </div>

    <div class="logo-list-bgc">
      <div class="logo-list div-width">
        <div class="list-center">
          <LogoCarousel
            @fetchLogo="fetchLogo"
            @closeTimer="closeTimer"
            ref="logoCarousel"
            :showLogoList="showLogoList"
          ></LogoCarousel>
        </div>
      </div>
    </div>
    <div class="logo-category-second-bgc">
      <div class="logo-category-second div-width">
        <LogoCategorySecond
          @getFirstLogoList="getFirstLogoList"
          @changeIndex="changeIndex"
          ref="LogoCategorySecond"
          :activeClass="activeClass"
        ></LogoCategorySecond>
      </div>
    </div>
    <div class="logo-category-bgc">
      <div class="logo-category div-width">
        <LogoCategory></LogoCategory>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { getLogoList } from "@/api/logoSearch";
import LogoCarousel from "./components/LogoCarousel";
import Menu from "@/components/main/Menu";
import Footer from "@/components/main/Footer.vue";
import MakeBtn from "@/components/main/MakeBtn.vue";
import LogoCategory from "./components/LogoCategory";
import LogoCategorySecond from "./components/LogoCategorySecond";
import PageInfo from "./components/PageInfo";
export default {
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate: "Logo ideas for every industries-LogoAIDesign.com",
  },
  props: {},
  components: {
    LogoCarousel,
    LogoCategory,
    LogoCategorySecond,
    Menu,
    Footer,
    MakeBtn,
    PageInfo,
  },
  data() {
    return {
      showLogoList: [{ id: 0, url: "" }, {}, {}, {}, {}, {}, {}, {}, {}],
      logoList: {},
      logoCategory: [],
      loading: false,
      count: 0,
      index: 0,

      pageInfo: {
        title: "Logo ideas for every industries",
        describe:
          "Search for logo templates and click on design you like to customize your own",
      },
      activeClass: 0,
      timer: null, // 用于存储定时器的引用
      timerIsActive: false, // 用于跟踪定时器是否正在运行
    };
  },
  created() {},
  mounted() {
    
    this.startTimer(); // 组件挂载后启动定时器
  },
  beforeDestroy() {
    this.stopTimer(); // 组件销毁前清除定时器，防止内存泄漏
  },
  computed: {},

  methods: {
    fetchLogo(num) {
      if (this.loading) {
        return;
      }

      //关闭定时器
      // this.$refs.LogoCategorySecond.closeTimer();

      this.index += num;
      if (this.index < 0) {
        this.index = 0;
      }

      //轮换完，轮换category
      if (this.index > this.logoCategory.length - 1) {
        this.$refs.LogoCategorySecond.fetchCategory();
        return;
      }

      this.activeClass = this.logoCategory[this.index].id;
      this.showLogoList = this.logoList[this.activeClass];

      this.showLogoList = this.logoList[this.activeClass];

      let ids = [];

      this.count += 1;
      if (this.count >= this.logoCategory.length) {
        this.count = this.logoCategory.length;
        return;
      }

      ids.push(this.logoCategory[this.count].id);

      this.$nextTick(() => {
        this.loading = true;
        let a = document.getElementsByClassName("right-btn");

        a[0].style.cursor = "wait";
        getLogoList(ids).then((response) => {
          const a = response.data;
          for (const key in a) {
            if (a.hasOwnProperty(key)) {
              // 使用hasOwnProperty确保属性是对象自身的，而不是原型链上的
              let value = a[key];
              value = value.map((i) => {
                return {
                  id: i.bliId,
                  url: i.logoAddress,
                };
              });

              this.logoList[key] = value;
            }
          }
          let b = document.getElementsByClassName("right-btn");
          b[0].style.cursor = "pointer";
          this.loading = false;
        });
      });
    },

    async getFirstLogoList(list) {
      this.$refs.logoCarousel.changeLoading(true);
      this.logoCategory = list;
      let ids = [];
      ids.push(this.logoCategory[0].id);
      ids.push(this.logoCategory[1].id);
      ids.push(this.logoCategory[2].id);

      this.logoList = {};

      const response = await getLogoList(ids);

      const a = response.data;

      for (const key in a) {
        if (a.hasOwnProperty(key)) {
          // 使用hasOwnProperty确保属性是对象自身的，而不是原型链上的
          let value = a[key];
          value = value.map((i) => {
            return {
              id: i.bliId,
              url: i.logoAddress,
            };
          });

          this.logoList[key] = value;
        }
      }
      this.activeClass = this.logoCategory[0].id;
      this.showLogoList = this.logoList[this.activeClass];

      this.index = 0;
      this.count = 2;

      this.$refs.logoCarousel.changeLoading(false);
    },
    closeTimer() {
      this.toggleTimer();
    },

    startTimer() {
      this.timer = setInterval(() => {
        this.fetchLogo(1);
        // 在这里执行你需要的操作
      }, 5000); // 每5秒执行一次
      this.timerIsActive = true;
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.timerIsActive = false;
    },
    toggleTimer() {
      if (this.timerIsActive) {
        this.stopTimer();
        setTimeout(() => {
          if (!this.timerIsActive) {
            this.startTimer();
          }
        }, 5000); // 如果定时器被关闭，5秒后重新启动它
      } else {
        this.startTimer();
      }
    },
    changeIndex() {
      this.index = this.logoCategory.length - 1;
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
  display: flex;
  min-height: 600px;

  text-align: center;
  justify-content: space-between;
  align-items: center;
}
.v-btn {
  text-transform: none;
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
.logo-category-second-bgc {
  background-color: $main-bgc-color;
}
.logo-category-bgc {
  background-color: #ffffff;
}
@media screen and (max-width: 768px) {
  .logo-ideas {
    flex-direction: column;
  }
}
</style>
