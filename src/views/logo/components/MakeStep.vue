<template>
  <div class="div-step">
    <div class="step-item">
      <div class="step-left">
        <div class="step-first">
          <v-img
            contain
            :src="require('@/assets/static/img/logo/step-1-1.svg')"
            class="img img-four"
          ></v-img>
          <v-img
            contain
            :src="require('@/assets/static/img/logo/step-1-2.svg')"
            class="img img-four"
          ></v-img>
          <v-img
            contain
            :src="require('@/assets/static/img/logo/step-1-3.svg')"
            class="img img-four"
          ></v-img>
          <v-img
            contain
            :src="require('@/assets/static/img/logo/step-1-4.svg')"
            class="img img-four"
          ></v-img>
        </div>
      </div>
      <div class="step-left">
        <h2>{{ infoList[0].title }}</h2>
        <p>{{ infoList[0].describe }}</p>
      </div>
    </div>

    <div class="div-height"></div>
    <div class="step-item">
      <div class="step-left">
        <h2>{{ infoList[1].title }}</h2>
        <p>{{ infoList[1].describe }}</p>
      </div>

      <v-img
        contain
        :src="require('@/assets/static/img/logo/step-2.svg')"
        class="img img-width"
      ></v-img>
    </div>
    <div class="div-height"></div>
    <div class="step-item">
      <v-img
        contain
        :src="require('@/assets/static/img/logo/step-6.svg')"
        class="img img-width"
      ></v-img>

      <div class="step-left">
        <h2>{{ infoList[2].title }}</h2>
        <p>{{ infoList[2].describe }}</p>
      </div>
    </div>
    <div class="div-height"></div>
    <div class="step-item">
      <div class="step-left">
        <h2>{{ infoList[3].title }}</h2>
        <p>{{ infoList[3].describe }}</p>
      </div>

      <v-img
        contain
        :src="require('@/assets/static/img/logo/step-4.svg')"
        class="img img-width"
      ></v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "MakeStep",

  components: {},
  data() {
    return {
      infoList: [
        {
          title: "1.LOGO TEMPLATES",
          describe:
            "Navigate through our extensive collection of logo design temlates to find your inspiration.Upon discovering a template that captures your interest.click the [Customize] button to start personalizing your logo.",
        },
        {
          title: "2.PERSONALIZING STYLE:",
          describe:
            "Modify the logo's name and slogan to suit your brand identity. Delve into customization by selecting from a variety of fonts and symbols, and experiment with diverse color schemes to achieve your ideal logo design.",
        },
        {
          title: "3.PREVIEWING AND REFINING YOUR LOGO: ",
          describe:
            "Modify the logo's name and slogan to suit your brand identity. Delve into customization by selecting from a variety of fonts and symbols, and experiment with diverse color schemes to achieve your ideal logo design.",
        },
        {
          title: "4.DOWNLOADING YOUR LOGO ASSETS: ",
          describe:
            "Access your personal logo download center, which includes everything needed to begin integrating your logo across various platforms. This encompasses high-resolution JPG, PNG, and vector source files, along with a suite of matching brand identity assets designed to enhance your brand's professional appearance.",
        },
      ],
    };
  },
  created() {},
  mounted() {},

  methods: {},
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";
@font-face {
  font-family: "KOHO"; /* 你可以自定义这个字体名称 */
  src: url("@/assets/static/fonts/KoHo-SemiBold.ttf") format("truetype"); /* TTF格式，作为备选 */
  font-weight: normal; /* 根据你的字体文件来设置 */
  font-style: normal; /* 根据你的字体文件来设置 */
}
.div-height {
  height: 50px;
}
.div-step {
  padding: 20px;

  overflow: hidden;
}
.step-item {
  max-width: $max-width-1;
  padding: 30px;
  @include flex();

  margin: auto;
  background-color: #ffffff;
  @include border(#c9c9c9);
  .step-left {
    flex: 1;
    margin: auto;
    padding: 10px;
    margin-left: 20px;
    margin-right: 20px;
    position: relative;
  }
  .img {
    flex: 1;
  }
}
.img-four {
  max-width: 200px;
}
.step-first {
  display: grid;
  grid-template-rows: repeat(2, 1fr); /* 创建3行，每行高度相等 */
  grid-template-columns: repeat(2, 1fr); /* 创建2列，每列宽度相等 */
  gap: 40px; /* 设置网格间距 */
}
h2 {
  font-family: "KOHO";
  font-size: 48px;
  color: #000000;
  line-height: 1.2;
  margin-bottom: 10px;
}
p {
  font-family: "KOHO";
  font-weight: Bold;
  font-size: $lg-font-size;
  color: #000000;
  line-height: 1.5;
  text-align: center;
}
.img {
  border-radius: 10px;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.2s ease;
}
.img:hover {
  transform: scale(1.02);
}

@media (max-width: 768px) {
  h2 {
    font-size: 16px;
  }
  p {
    font-size: 14px;
  }
  .step-item {
    flex-direction: column;
  }
}
</style>
