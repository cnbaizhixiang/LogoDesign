<template>
  <div class="page">
    <div class="page-info">
      <h1>Last step. Select the font style</h1>
      <p>This helps the AI to generate logos that are match to your business</p>
    </div>

    <div class="content">
      <div
        v-for="(item, index) in FontOptions"
        ref="myElement"
        class="font-item"
        @click="onSubmit(item.label, index)"
        :class="{ selectType: selectedItem === index }"
      >
        <div class="item-title">
          <div>
            <el-image
              :src="require(`@/assets/static/images/${item.titleFileName}`)"
              :alt="`${item.label}`"
            ></el-image>
          </div>
        </div>
        <div class="item-describe">
          <div class="line"></div>
          <div>
            <el-image
              :src="require(`@/assets/static/images/${item.describeFileName}`)"
              :alt="`${item.label}`"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogoFont",
  mounted() {},
  data() {
    return {
      font: "Modern",
      FontOptions: [
        {
          label: "Modern",
          titleFileName: "fonts-modern.svg",
          describeFileName: "modern-example.svg",
        },
        {
          label: "Elegant",
          titleFileName: "fonts-elegant.svg",
          describeFileName: "elegant-example.svg",
        },
        {
          label: "Slab",
          titleFileName: "fonts-slab.svg",
          describeFileName: "slab-example.svg",
        },
        {
          label: "Handwritten",
          titleFileName: "fonts-handwritten.svg",
          describeFileName: "handwritten-example.svg",
        },
        {
          label: "Playful",
          titleFileName: "fonts-playful.svg",
          describeFileName: "playful-example.svg",
        },
        {
          label: "Futuristic",
          titleFileName: "fonts-futuristic.svg",
          describeFileName: "futuristic-example.svg",
        },
      ],
      selectedItem: null,
    };
  },
  watch: {
    color: {
      deep: true,

      handler() {
        this.onSubmit();
      },
    },
  },
  computed: {},
  methods: {
    onSubmit(label, index) {
      this.selectedItem = index;
      const storedData = JSON.parse(sessionStorage.getItem("logoParmeter"));
      storedData.fontType = label;
      sessionStorage.setItem("logoParmeter", JSON.stringify(storedData));
      this.$emit("changType", "make");
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  margin: auto;
  text-align: center;
}
.page-info {
  margin: 30px;
}
.content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  place-items: center;
  max-width: 924px;
  text-align: center;
  margin: auto;
}
.selectType {
  border: 2px solid #5e56f6;
}
.font-item {
  overflow: hidden;
  max-height: 192px;
  aspect-ratio: 14 / 10;
  opacity: 0;
  animation: fade-in-title 0.5s ease-in-out forwards;
  border-radius: 5px;
  box-shadow: 0.5px 0.5px 1px rgb(188, 188, 188, 0.5);
  cursor: pointer;
  background: #fff;
}
.item-title {
  height: 100%;
  display: flex;
  align-items: center;
  transition: height 0.3s ease;
  justify-content: center;
}
.font-item:hover .item-title {
  height: 30%;
}
.item-describe {
  opacity: 0;
  animation: fade-in-title 0.5s ease-in-out forwards;
}
.line {
  border: 1px solid rgba(242, 242, 242, 1);
}
@keyframes fade-in-title {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr 1fr;
  }
  .font-item:hover .item-title {
    height: 100%;
  }
}
</style>
