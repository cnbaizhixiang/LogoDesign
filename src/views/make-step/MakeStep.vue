<template>
  <div class="page">
    <Menu></Menu>
    <div class="div-width">
      <template v-if="stepType === 'name'">
        <keep-alive>
          <LogoName @goToMake="goToMake"></LogoName>
        </keep-alive>
      </template>
      <template v-if="stepType === 'industry'">
        <keep-alive>
          <LogoIndustry @changType="changType"></LogoIndustry>
        </keep-alive>
      </template>
      <template v-if="stepType === 'color'">
        <keep-alive>
          <LogoColor @changType="changType"></LogoColor>
        </keep-alive>
      </template>
      <template v-if="stepType === 'font'">
        <keep-alive>
          <LogoFont @changType="changType"></LogoFont>
        </keep-alive>
      </template>
    </div>

    <div class="footer-bgc">
      <div class="footer div-width">
        <div class="back" @click="goBack()">
          <span class="mdi mdi-chevron-left btn"></span>
          <div class="text">back</div>
        </div>
        <div class="skip" @click="goSkip()" v-if="stepType !== 'name'">
          <div class="text">skip</div>
          <span class="mdi mdi-chevron-right btn"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/main/Menu";
import LogoIndustry from "./components/LogoIndustry";
import LogoColor from "./components/LogoColor";
import LogoFont from "./components/LogoFont";
import LogoName from "./components/LogoName";
export default {
  name: "MakeStep",
  title: "Logo Production steps",
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate:
      "You can choose the type and style of logo you want here.-LogoAIDesign.com",
  },
  components: {
    Menu,
    LogoIndustry,
    LogoColor,
    LogoFont,
    LogoName,
  },

  data() {
    return {
      stepType: "name",
    };
  },
  mounted() {},

  computed: {},

  methods: {
    goSkip() {
      if (this.stepType === "industry") {
        const storedData = JSON.parse(sessionStorage.getItem("logoParmeter"));
        storedData.categoryName = null;
        sessionStorage.setItem("logoParmeter", JSON.stringify(storedData));
        this.stepType = "color";
      } else if (this.stepType === "color") {
        const storedData = JSON.parse(sessionStorage.getItem("logoParmeter"));
        storedData.backgroundColor = null;
        sessionStorage.setItem("logoParmeter", JSON.stringify(storedData));
        this.stepType = "font";
      } else if (this.stepType === "font") {
        const storedData = JSON.parse(sessionStorage.getItem("logoParmeter"));
        storedData.fontType = null;
        sessionStorage.setItem("logoParmeter", JSON.stringify(storedData));
        this.$router.push(`/make`).then(() => {
          window.scrollTo(0, 0);
        });
      }
    },
    goBack() {
      if (this.stepType === "name") {
        this.$router.go(-1);
      } else if (this.stepType === "industry") {
        this.stepType = "name";
      } else if (this.stepType === "color") {
        this.stepType = "industry";
      } else if (this.stepType === "font") {
        this.stepType = "color";
      }
    },
    goToMake() {
      this.stepType = "industry";
    },
    changType(type) {
      this.stepType = type;
      if (type === "make") {
        this.$router.push(`/make`).then(() => {
          window.scrollTo(0, 0);
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";
p {
  margin: 0px;
}
.page {
  background-color: $main-bgc-color;
  min-height: 100vh;

  position: relative;
}
.div-width {
  max-width: 1100px;
  padding: 10px;
  margin: auto;
}
.footer-bgc {
  background-color: #000000;
  position: fixed;

  width: 100%;
  bottom: 0px;
}

.footer {
  @include flex();
  align-items: center;
  max-width: 550px;
  span {
    color: #ffffff;
  }
  .btn {
    font-size: 40px;
  }
  .text {
    color: #ffffff;
    font-size: 32px;
  }
  .back,
  .skip {
    @include flex();
    cursor: pointer;
  }
}
</style>
