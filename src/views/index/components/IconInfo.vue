<template>
  <div class="icon-list">
    <div class="icon-item" v-for="(i, index) in iconList" :key="index">
      <div class="div-img">
        <el-image
          :src="require(`@/assets/static/img/index/${i.url}`)"
          fit="contain"
          alt="logo-info"
          class="img"
        ></el-image>
      </div>

      <p>{{ i.describe }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "IconInfo",

  components: {},
  data() {
    return {
      iconList: [
        {
          url: "icon-info-1.svg",
          describe:
            "Instantly generate unique logos for free with our AI-powered logo maker, and pay only when fully satisfied.",
        },
        {
          url: "icon-info-2.svg",
          describe:
            "Fully customizable designs with thousands of fonts, colors, symbols, and layouts to perfectly match your vision.",
        },
        {
          url: "icon-info-3.svg",
          describe:
            "User-friendly interface allows for the creation of professional logos with just a few clicks, aligning with your brand identity.",
        },
        {
          url: "icon-info-4.svg",
          describe:
            "Beyond templates: Produce logos tailored to your industry and preferences, ensuring a unique representation of your brand.",
        },
        {
          url: "icon-info-5.svg",
          describe:
            "Comprehensive brand kits offer everything from business cards to social media posts, ensuring consistency across all marketing materials.",
        },
        {
          url: "icon-info-6.svg",
          describe:
            "Access expert design assistance and a suite of visual identity tools, including logo mockups and business card designs, all from your personal brand center.",
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
.icon-list {
  text-align: center;
  display: grid;
  grid-template-rows: repeat(2, 1fr); /* 创建3行，每行高度相等 */
  grid-template-columns: repeat(3, 1fr); /* 创建2列，每列宽度相等 */
  gap: 10px; /* 设置网格间距 */

  .icon-item {
    max-width: 329px;
    margin: auto;
  }
}
.div-img {
  width: 118px;
  height: 118px;
  margin: auto;

  cursor: pointer;
  transform: scale(1);
  transition: transform 0.2s ease;
}
.div-img:hover {
  transform: scale(1.02);
}
p {
  font-family: Inter;
  font-weight: Bold;
  color: #000000;
  line-height: 25px;
  font-size: $md-font-size;
}
@media (max-width: 768px) {
  .icon-list {
    grid-template-rows: repeat(3, 1fr); /* 创建3行，每行高度相等 */
    grid-template-columns: repeat(2, 1fr); /* 创建2列，每列宽度相等 */
  }
}
@include small-screen();
</style>
