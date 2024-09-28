<template>
  <div class="page">
    <Menu></Menu>
    <div class="page-info div-width">
      <h1>Learn about all the features of the Photo app</h1>
      <div class="page-step">
        <el-image
          :src="require('@/assets/static/img/process/step-1.svg')"
          width="64"
          class="step-img"
          fit="contain"
        ></el-image>
        <div>
          <p>Thousands of professionally designed templates</p>
          <div class="step-span">
            <span
              >Bring your branding identity to life. Browse our customizable
              logo templates to find a match.</span
            >
          </div>
        </div>
      </div>
      <div class="page-step">
        <el-image
          :src="require('@/assets/static/img/process/step-2.svg')"
          width="64"
          class="step-img"
          fit="contain"
        ></el-image>
        <div>
          <p>Millions of free icons and illustrations</p>
          <div class="step-span">
            <span
              >Inject uniqueness into your logos with free graphic elements from
              our vast media library.</span
            >
          </div>
        </div>
      </div>
      <div class="page-step">
        <el-image
          :src="require('@/assets/static/img/process/step-3.svg')"
          width="64"
          class="step-img"
          fit="contain"
        ></el-image>
        <div>
          <p>Hundreds of eye-catching font combinations</p>
          <div class="step-span">
            <span
              >Finish off your logo design by using the perfect font
              pairing.</span
            >
          </div>
        </div>
      </div>
      <a href="/generate">
        <div class="make-btn">Create a logo</div>
      </a>
    </div>

    <div class="step-bgc">
      <MakeStep></MakeStep>
    </div>
    <div class="brand-bgc">
      <div class="div-brand div-width">
        <div class="brand-left">
          <el-image
            :src="require('@/assets/static/img/process/coffee brand.svg')"
            width="69"
            alt="LOGO"
            fit="contain"
          ></el-image>
        </div>
        <div class="brand-right">
          <h2>Your brand building starts from here</h2>
          <p>
            We've got your brand covered. With hundreds of templates to choose
            from, you can launch, build and grow your brand with confidence.
            These templates include your logo and other branding elements—you
            don't need to be a designer to edit or modify them!
          </p>
          <div class="brand-btn">
            <span>Start brand bulding</span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <StepInfo></StepInfo>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Menu from "@/components/main/Menu";

import Footer from "@/components/main/Footer.vue";
import MakeStep from "../logo/components/MakeStep";
import StepInfo from "./components/StepInfo";
export default {
  name: "Process",
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate:
      "Learn about all the features of the Photo app.-LogoAIDesign.com",
  },
  components: {
    Menu,
    StepInfo,
    Footer,
    MakeStep,
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
@font-face {
  font-family: "Montserrat-Regular"; /* 你可以自定义这个字体名称 */
  src: url("@/assets/static/fonts/Montserrat-Regular.ttf") format("truetype"); /* TTF格式，作为备选 */
  font-weight: normal; /* 根据你的字体文件来设置 */
  font-style: normal; /* 根据你的字体文件来设置 */
}

.page {
  background-color: $main-bgc-color;
  text-align: center;
  overflow: hidden;
}
p {
  margin: 0;
}
a {
  text-decoration: none;
}
.page-info {
  text-align: left;

  p {
    font-family: "Montserrat-Regular";
    font-weight: Bold;
    line-height: 2;
  }
}
h1 {
  font-family: "Montserrat-Regular";
  max-width: 724px;
  line-height: 1.5;
  font-size: 48px;
}
.div-width {
  max-width: $max-width-1;
  margin: auto;
  padding: 20px;
}
.page-step {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  .step-img {
    margin-right: 20px;
  }
  .step-span {
    max-width: 400px;
  }
  span {
    font-family: "Montserrat-Regular";
  }
}
.step-bgc {
  background-color: #ffffff;
}
.brand-bgc {
  background-color: #949599;
}
.div-brand {
  display: flex;
  justify-content: center;
  align-items: center;
  .brand-left {
    flex: 3;
  }
  .brand-right {
    flex: 2;
    color: #ffffff;
    text-align: left;
    h2 {
      font-size: 42px;
      line-height: 1.2;
      font-weight: Bold;
    }
    p {
      font-size: 15px;
    }
    .brand-btn {
      width: 265px;
      height: 67.26px;
      background-color: #f3da05;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 22px;
      }
    }
  }
}
.make-btn {
  background-color: #000000;
  max-width: 190px;
  height: 63px;
  border-radius: 15px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: Bold;
}
@media (max-width: 768px) {
  .div-brand {
    flex-direction: column;
    .brand-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  h1 {
    font-size: 32px;
  }
}
@media (max-width: 1200px) {
}
</style>
