<template>
  <div class="div-step">
    <div class="step-bgc-1">
      <div class="step-item">
        <el-image
          :src="require('@/assets/static/img/process/process-icon-1.svg')"
          style="width: 100px"
          fit="contain"
          class="icon-img"
        ></el-image>
        <el-image
          :src="require('@/assets/static/img/process/process1.svg')"
          style="width: 484px"
          fit="contain"
          class="img"
        ></el-image>
        <div class="step-left">
          <h2>It’s free!</h2>
          <p>
            Our AI logo maker generates logos instantly and completely free of
            charge. You only pay when you are 100% satisfied.
          </p>
        </div>
      </div>
    </div>
    <div class="step-bgc-2">
      <div class="step-item">
        <el-image
          :src="require('@/assets/static/img/process/process-icon-2.svg')"
          style="width: 100px"
          fit="contain"
          class="icon-img"
        ></el-image>
        <div class="step-left">
          <h2>100% customizable</h2>
          <p>
            Choose from thousands of fonts, colors, symbols & layouts until it’s
            exactly the way you want it!
          </p>
        </div>
        <el-image
          :src="require('@/assets/static/img/process/process2.svg')"
          style="width: 484px"
          fit="contain"
          class="img"
        ></el-image>
      </div>
    </div>
    <div class="step-bgc-1">
      <div class="step-item">
        <el-image
          :src="require('@/assets/static/img/process/process-icon-3.svg')"
          style="width: 100px"
          fit="contain"
          class="icon-img"
        ></el-image>
        <el-image
          :src="require('@/assets/static/img/process/process3.svg')"
          style="width: 484px"
          fit="contain"
          class="img"
        ></el-image>
        <div class="step-left">
          <h2>Easy to use</h2>
          <p>
            You can generate a professional logo with just a few clicks. Create
            amazing logos that fit your brand identity.
          </p>
        </div>
      </div>
    </div>
    <div class="step-bgc-2">
      <div class="step-item">
        <el-image
          :src="require('@/assets/static/img/process/process-icon-4.svg')"
          style="width: 100px"
          fit="contain"
          class="icon-img"
        ></el-image>
        <div class="step-left">
          <h2>Not just templates</h2>
          <p>
            You don't want to be given a bunch of random options. We will
            generate logos that match your industry and niche.
          </p>
        </div>
        <el-image
          :src="require('@/assets/static/img/process/process4.svg')"
          style="width: 484px"
          fit="contain"
          class="img"
        ></el-image>
      </div>
    </div>
    <div class="step-bgc-1">
      <div class="step-item">
        <el-image
          :src="require('@/assets/static/img/process/process-icon-5.svg')"
          style="width: 100px"
          fit="contain"
          class="icon-img"
        ></el-image>
        <el-image
          :src="require('@/assets/static/img/process/process5.svg')"
          style="width: 484px"
          fit="contain"
          class="img"
        ></el-image>
        <div class="step-left">
          <h2>Full brand kits</h2>
          <p>
            From business cards, to powerpoint templates, or posters - we have
            everything you need from the start of your business.
          </p>
        </div>
      </div>
    </div>
    <div class="step-bgc-2">
      <div class="step-item">
        <el-image
          :src="require('@/assets/static/img/process/process-icon-6.svg')"
          style="width: 100px"
          fit="contain"
          class="icon-img"
        ></el-image>
        <div class="step-left">
          <h2>Designer fix</h2>
          <p>
            If you’re after a perfect logo, it might require some extra
            fine-tuning with our real designers. We have that too!
          </p>
        </div>
        <el-image
          :src="require('@/assets/static/img/process/process6.svg')"
          style="width: 484px"
          fit="contain"
          class="img"
        ></el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StepInfo",

  components: {},
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
  font-family: "KOHO"; /* 你可以自定义这个字体名称 */
  src: url("@/assets/static/fonts/KoHo-SemiBold.ttf") format("truetype"); /* TTF格式，作为备选 */
  font-weight: normal; /* 根据你的字体文件来设置 */
  font-style: normal; /* 根据你的字体文件来设置 */
}

.div-step {
  overflow: hidden;
}
.step-bgc-1 {
  background-color: #ffffff;
}
.step-bgc-2 {
  background-color: #f5f5f5;
}
.step-item {
  max-width: $max-width-1;
  height: 600px;
  padding: 10px;
  position: relative;
  @include flex();

  margin: auto;

  .step-left {
    flex: 1;
    margin: auto;
    text-align: left;
    padding: 10px;
    margin-left: 20px;
    margin-right: 20px;
    position: relative;
  }
}
.icon-img {
  position: absolute;
  top: 0;
  left: 65px;
}
h2 {
  font-family: "Inter";
  font-size: 22px;
  color: #000000;
  line-height: 2.5;
  margin-bottom: 10px;
}
p {
  font-family: "Inter";
  font-size: 16px;
  color: #000000;
  line-height: 1.5;
  text-align: left;
}
.img {
  margin: 50px;
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
    height: 500px;
  }
  .icon-img {
    display: none;
  }
}
</style>
