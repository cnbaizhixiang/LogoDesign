<template>
  <div class="page">
    <Page404 v-if="error"></Page404>
    <template v-else>
      <PreLoading v-if="pageLoading"></PreLoading>
      <Menu></Menu>
      <div class="logo-info div-width">
        <div class="logo-carousel">
          <div class="logo-carousel-1"></div>
          <div class="logo-carousel-2">
            <div class="logo-carousel-2-1"></div>
            <div class="logo-carousel-2-2"></div>
          </div>
        </div>
        <div class="logo-describe">
          <p>
            Logo AI Design is an online logo maker with smart AI technology.
            Just type in your brand name to design your logo, create matching
            business cards, and build a brand you love.
          </p>
        </div>
        <div class="logo-like">
          <div class="heart">
            <span
              class="mdi mdi-heart-outline like-btn"
              v-if="!isLike"
              @click="changeLike"
            ></span>
            <span
              class="mdi mdi-cards-heart forbid"
              v-else
              style="color: red"
            ></span>
            <span class="num">{{ user_list ? user_list.length : 0 }}</span>
          </div>

          <div class="make-btn" @click="goToMake">
            <MakeBtn
              :text="'Make a logo'"
              :bgc="'#000000'"
              :color="'#ffffff'"
            ></MakeBtn>
          </div>
        </div>
        <div class="user-list">
          <div class="user-item" v-for="i in user_list">
            <v-avatar color="#ababab" size="56">
              <img :src="i" alt="user" />
            </v-avatar>
          </div>
        </div>
        <div class="recomment">
          <h2>Various other delivery logo styles</h2>
          <div class="recomment-list-1">
            <div class="recomment-item-1"></div>
            <div class="recomment-item-1"></div>
            <div class="recomment-item-1"></div>
          </div>
          <div class="recomment-list-2">
            <div class="recomment-item-2"></div>
            <div class="recomment-item-2"></div>
            <div class="recomment-item-2"></div>
            <div class="recomment-item-2"></div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </template>
  </div>
</template>
<script>
import Menu from "@/components/main/Menu.vue";
import Footer from "@/components/main/Footer.vue";
import MakeBtn from "@/components/main/MakeBtn";
import PreLoading from "@/components/main/PreLoading";
import Page404 from "@/views/error-page/View404";
import { getTxt } from "@/utils/tool";

import { getLogoDetail, getLogoLikeUser, likeLogo } from "@/api/logoSearch";
export default {
  name: "LogoDetail",
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate: "Logo Design-LogoAIDesign.com",
  },
  components: {
    Menu,
    Footer,
    MakeBtn,
    PreLoading,
    Page404,
  },
  data() {
    return {
      isLike: false,
      loading: false,
      pageLoading: false,
      likeNum: 0,
      json: null,
      canvas: null,
      canvas1: null,
      canvas2: null,
      codeList: [],
      user_list: [],
      error: false,
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  watch: {
    isLogin() {
      this.getUser();
    },
  },
  created() {
    this.id = this.$route.params.id;

    this.getLogoInfo();
    this.getUser();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    async getLogoInfo() {
      this.pageLoading = true;
      getLogoDetail(this.id)
        .then((res) => {
          if (!res.data) {
            this.error = true;
            return;
          }
          this.json = res.data.jsonStr;
          getTxt(this.json)
            .then((res) => {
              this.error = false;
              this.json = res;
              this.getPage(this.json);
            })
            .catch(() => {
              this.error = true;
            })
            .finally(() => {
              this.pageLoading = false;
            });
        })
        .catch(() => {
          this.error = true;
        });
    },
    goToMake() {
      this.$router.push(`/generate`);
    },
    changeLike() {
      //防止连续点击
      if (this.loading) return;
      this.loading = true;
      likeLogo(this.id)
        .then((res) => {
          this.getUser();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getPage(e) {
      let that = this;

      this.canvas = new fabric.Canvas("canvas-1");

      this.canvas.loadFromJSON(e, function () {
        that.canvas.backgroundColor = "transparent";
        that.canvas.renderAll();
      });

      let str = this.canvas.toSVG();

      let a = str;
      a = a.replace('width="300"', 'width="100%"');
      a = a.replace('height="150"', 'height="100%"');
      const regex = /viewBox="0 0 300 150"/;

      // 使用replace方法替换第一个匹配项
      a = a.replace(regex, 'viewBox="0 0 700 500"');

      const svgDiv = document.querySelector(".logo-carousel-1");
      svgDiv.innerHTML = a;

      const svgDiv1 = document.querySelector(".logo-carousel-2-1");
      svgDiv1.innerHTML = a;

      const svgDiv2 = document.querySelector(".logo-carousel-2-2");
      svgDiv2.innerHTML = a;

      const svgDiv3 = document.querySelectorAll(".recomment-item-1");
      svgDiv3.forEach((element) => {
        element.innerHTML = a;
      });

      const svgDiv4 = document.querySelectorAll(".recomment-item-2");
      svgDiv4.forEach((element) => {
        element.innerHTML = a;
      });
    },
    getUser() {
      getLogoLikeUser(this.id).then((res) => {
        if (res.data) {
          this.user_list = res.data.list;
          this.isLike = res.data.isLike;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/css/variables";
.page {
  overflow: hidden;
  background-color: $main-bgc-color;
}
.logo-info {
  @include flex();
  flex-direction: column;
}
.div-width {
  max-width: $max-width-1;
  padding: 20px;
  margin: auto;
}
.logo-carousel {
  margin-top: 50px;
  width: 100%;
  max-width: 1368px;
  aspect-ratio: 1.38;
  .logo-carousel-1 {
    height: 50%;
    background-color: #ffffff;
  }
  .logo-carousel-2 {
    display: flex;
    height: 50%;
    .logo-carousel-2-1,
    .logo-carousel-2-2 {
      flex: 1;
    }
    .logo-carousel-2-1 {
      background-color: #000000;
    }
    .logo-carousel-2-2 {
      background-color: #2496b5;
    }
  }
}
.logo-describe {
  max-width: 1629px;

  border: 1px solid #898989;
  margin: 30px;
  padding: 20px;
  font-size: 22px;
}
.like-btn {
  cursor: pointer;
}
.logo-like {
  display: flex;
  gap: 50px;
  align-items: center;

  .mdi {
    font-size: 60px;
  }
  .num {
    font-size: 22px;
  }
  .heart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1;
  }
}
.make-btn {
  width: 266px;
}
.recomment {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%;
  text-align: center;
}
.recomment-list-1,
.recomment-list-2 {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
  margin-bottom: 40px;
}
.recomment-item-1 {
  flex: 1;
  max-width: 600px;
  aspect-ratio: 1;
  background-color: #ffffff;
}
.recomment-item-2 {
  flex: 1;
  max-width: 400px;
  aspect-ratio: 1;
  background-color: #ffffff;
}
h2 {
  font-size: 42px;
}
.user-list {
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .user-item {
    margin-left: -20px;
  }
}
.forbid {
  cursor: not-allowed;
}
@media screen and (max-width: 768px) {
  .logo-like {
    flex-direction: column;
  }
  p {
    font-size: 14px;
  }
  h2 {
    font-size: 24px;
  }
  .make-btn {
    width: 90vw;
  }
}
</style>
