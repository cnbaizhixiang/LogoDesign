<template>
  <div class="home">
    <Menu></Menu>

    <div class="bgc">
      <div class="home-info">
        <div class="home-text">
          <div class="home-describe">
            <div class="ai-title">
              <v-img
                  :src="require(`@/assets/static/img/index/AI.svg`)"
                  class="img"
                  contain
              >
              </v-img>
            </div>

            <div class="ai-info">
              <h2>AI Logo Maker</h2>
              <p>
                streamlines the logo creation process, making it faster and easier than
                ever. Design your perfect logo and manage all your branding assets –
                seamlessly.
              </p>
            </div>
          </div>

          <!-- <v-img
            :src="require(`@/assets/static/img/index/LOGOTEXT.svg`)"
            max-width="507"
          ></v-img> -->
          <p class="logo-title">LOGO</p>
        </div>

        <div class="home-btn">
          <a href="/generate">
            <div class="make-btn">
              <MakeBtn
                  :text="'Make a logo'"
                  :bgc="'#000000'"
                  :color="'#ffffff'"
              ></MakeBtn>
            </div>
          </a>
        </div>
      </div>

      <div class="bgc-gradient"></div>
    </div>

    <div class="carousel-bgc">
      <div class="div-carousel div-width">
        <Carousel></Carousel>
      </div>
    </div>

    <div class="bgc-icon">
      <div class="div-icon">
        <IconInfo></IconInfo>
      </div>
    </div>

    <div class="step-bgc">
      <div class="div-step div-width">
        <div class="step-left">
          <h2>Design Your Logo for Free: Unleash Your Creativity!</h2>
          <div class="step-item">
            <p>1.</p>
            <p>
              Explore and Inspire: Delve into our extensive collection of logo design
              templates or ignite your creativity by starting from a blank canvas.
              Discover the perfect foundation for your brand's visual journey.
            </p>
          </div>
          <div class="step-item">
            <p>2.</p>
            <p>
              Tailor with Precision: Immerse yourself in our design dashboard, where you
              can infuse your logo with the essence of your brand. Select from a palette
              of colors that speak to your brand's identity and make it uniquely yours.
            </p>
          </div>

          <div class="step-item">
            <p>3.</p>
            <p>
              Enrich Your Story: Add depth to your logo by incorporating icons and text
              that resonate with your brand’s narrative. Each element you introduce is a
              brushstroke in the masterpiece that is your brand's visual identity.
            </p>
          </div>

          <div class="step-item">
            <p>4.</p>
            <p>
              Manifest and Materialize: Save your innovative design, visualize it with
              product mockups, or bring it into the tangible world with prints. With Logo
              AI design, your creation can leap off the screen and into reality, ready to
              make a lasting impression.
            </p>
          </div>

          <p class="p-footer">
            Embark on your design journey and transform your vision into a logo that not
            only defines but also elevates your brand.
          </p>
        </div>
        <div class="step-right">
          <v-img
              :src="require(`@/assets/static/img/index/Design.svg`)"
              max-width="400"
              max-height="337"
              class="img"
          ></v-img>
        </div>
      </div>
    </div>

    <div class="gradient-bgc">
      <div class="gradient-info">
        <h2>Try AI Logo for Free</h2>
        <p>Try it for free, pay only when you're completely happy</p>
        <a href="/generate">
          <div class="make-btn-1">
            <MakeBtn :text="'Try now'" :bgc="'#FFE43C'" :color="'#5E56F6'"></MakeBtn>
          </div>
        </a>
      </div>
    </div>

    <div class="questions-bgc">
      <Questions></Questions>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Menu from "@/components/main/Menu";
import Carousel from "./components/Carousel";

import IconInfo from "./components/IconInfo";
import Footer from "@/components/main/Footer.vue";
import Questions from "@/components/main/Questions.vue";
import MakeBtn from "@/components/main/MakeBtn.vue";

export default {
  name: "HomeView",

  metaInfo: {
    title: "Logo AI Design",
    titleTemplate:
        "Design your perfect logo and manage all your branding assets – seamlessly.-LogoAIDesign.com",
  },

  components: {
    Menu,
    IconInfo,
    Footer,
    Questions,
    Carousel,
    MakeBtn,
  },
  data() {
    return {
      infoList: [
        {
          title: "1.Logo Templates",
          describe:
              "Navigate through our extensive collection of logo design temlates to find your inspiration.Upon discovering a template that captures your interest.click the [Customize] button to start personalizing your logo.",
        },
        {
          title: "2.Personalizing Logo Text and Style: ",
          describe:
              "Modify the logo's name and slogan to suit your brand identity. Delve into customization by selecting from a variety of fonts and symbols, and experiment with diverse color schemes to achieve your ideal logo design.",
        },
        {
          title: "3.Previewing and Refining Your Logo: ",
          describe:
              "Modify the logo's name and slogan to suit your brand identity. Delve into customization by selecting from a variety of fonts and symbols, and experiment with diverse color schemes to achieve your ideal logo design.",
        },
        {
          title: "4.Downloading Your Logo Assets: ",
          describe:
              "Access your personal logo download center, which includes everything needed to begin integrating your logo across various platforms. This encompasses high-resolution JPG, PNG, and vector source files, along with a suite of matching brand identity assets designed to enhance your brand's professional appearance.",
        },
      ],
    };
  },
  created() {
  },
  mounted() {
    console.log('Message event listener added');
    // 在组件挂载时添加 message 事件监听器
    window.addEventListener('message', this.handleMessage);
  },

  methods: {
    handleMessage(event) {
      // 检查消息来源
      if (event.origin === 'http://wp.online') {
        console.log('接收到的数据:', event.data);
        // 向Page A发送响应消息
        event.source.postMessage('收到token了', event.origin);
      }
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";

@font-face {
  font-family: "Inika"; /* 你可以自定义这个字体名称 */
  src: url("@/assets/static/fonts/Inika-Bold.ttf") format("truetype"); /* TTF格式，作为备选 */
  font-weight: normal; /* 根据你的字体文件来设置 */
  font-style: normal; /* 根据你的字体文件来设置 */
}

@font-face {
  font-family: "KOHO"; /* 你可以自定义这个字体名称 */
  src: url("@/assets/static/fonts/KoHo-SemiBold.ttf") format("truetype"); /* TTF格式，作为备选 */
  font-weight: normal; /* 根据你的字体文件来设置 */
  font-style: normal; /* 根据你的字体文件来设置 */
}

.home {
  background-color: $main-bgc-color;
  overflow: hidden;
}

p {
  font-family: Inter;
  font-size: $md-font-size;
  line-height: 1.5;
}

h1 {
  font-size: 48px;
  font-weight: Bold;
  margin-right: 80px;
}

a {
  text-decoration: none;
}

.bgc {
  height: 692px;
  margin: auto;
  margin-top: 50px;
  position: relative;

  .home-info {
    max-width: $max-width;
    margin: auto;
    padding: 50px;
    display: flex;
    justify-content: space-between;

    .home-describe {
      max-width: 560px;
      @include flex();

      .ai-info {
        padding: 20px;
      }

      h2 {
      }

      p {
        text-align: left;
        color: #7d7878;
      }
    }

    .home-text {
      flex: 1;
    }

    .home-btn {
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }

  .bgc-gradient {
    position: absolute;
    bottom: 0px;

    width: 100%;
    height: 182px;
    background: linear-gradient(to right, white, transparent);
  }
}

.div-width {
  max-width: $max-width;
  margin: auto;
  padding: 20px;
}

.div-step {
  @include flex();
  text-align: left;

  .step-left {
    margin: 30px;
    max-width: 759px;
    line-height: 2;

    h2 {
      font-family: "KOHO";
      padding-bottom: 20px;
      font-size: 32px;
    }

    p {
      margin: 0;
      font-family: "KOHO";
      font-size: 18px;
      color: #000000;
    }

    .step-item {
      display: flex;
    }

    .p-footer {
      margin-top: 20px;
    }
  }
}

.logo-title {
  font-size: 164px;
  line-height: 1;

  font-weight: Bold;
}

.div-height {
  height: 50px;
}

.bgc-icon {
  background-color: $main-bgc-color;
}

.div-icon {
  max-width: $max-width-1;
  margin: auto;
  padding-top: 60px;
  padding-bottom: 60px;
}

.gradient-bgc {
  @include flex-center();
  height: 377px;

  background-image: url("@/assets/static/img/index/gradient background.svg");
  background-size: cover;
  background-repeat: no-repeat;
  color: #ffffff;

  .gradient-info {
    @include flex-center();

    h2,
    p {
      padding: 10px;
    }
  }
}

.questions-bgc,
.step-bgc {
  background-color: #ffffff;
}

.carousel-bgc {
  background-color: $bgc-color-3;
}

.make-btn {
  width: 266px;
}

.make-btn-1 {
  width: 250px;
}

@media (max-width: 768px) {
  p {
    font-size: 12px;
  }
  h1 {
    font-size: 36px;
  }
  .home-info {
    flex-direction: column;

    .home-btn {
      margin: 50px;
    }
  }
  .img {
    width: 50vw;
  }
  .ai-info {
    display: none;
  }
  .logo-title {
    font-size: 64px;
  }
}

@media (max-width: 1100px) {
  .div-step {
    flex-direction: column;
  }
}
</style>
