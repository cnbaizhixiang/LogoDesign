<template>
  <div class="page-color">
    <div class="page-info">
      <h1>Select color scheme for your brand</h1>
      <p>This helps the AI to generate logos that are match to your business</p>
    </div>

    <div class="content">
      <div
        v-for="(item, index) in colorOptions"
        ref="myElement"
        class="color-item"
        @click="onSubmit(item.label, index)"
        :class="{ selectType: selectedItem === index }"
      >
        <div class="bgc">
          <div
            class="bgc-item"
            :class="{ 'bgc-item1': item.colors.length }"
            v-for="i in item.colors"
            :style="{ background: i }"
          ></div>
        </div>
        <div class="item-title">
          <div>
            <strong>{{ item.label }}</strong>
          </div>
        </div>
        <div class="item-describe">
          <div>
            <strong>{{ item.describe }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogoColor",
  mounted() {},
  data() {
    return {
      color: "random",
      colorOptions: [
        {
          colors: [
            "rgb(246, 225, 225)",
            "rgb(248, 128, 32)",
            "rgb(209, 40, 76)",
            "rgb(62, 14, 31)",
          ],
          label: "Random",
          describe:
            "Joy, enthusiasm, happiness, creativity, determination, and stimulation",
        },
        {
          colors: [
            "rgb(192, 253, 252)",
            "rgb(63, 219, 240)",
            "rgb(120, 172, 241)",
            "rgb(16, 2, 154)",
          ],
          label: "Cold",
          describe:
            "Depth, trust, loyalty, confidence, intelligence, and calmness",
        },
        {
          colors: [
            "rgb(255, 57, 146)",
            "rgb(255, 212, 37)",
            "rgb(63, 0, 255)",
            "rgb(176, 0, 255)",
          ],
          label: "Contrast",
          describe:
            "Power, energy, passion, desire, speed, strength, love, and intensity",
        },
        {
          colors: [
            "rgb(255, 182, 185)",
            "rgb(250, 227, 217)",
            "rgb(187, 222, 214)",
            "rgb(138, 198, 209)",
          ],
          label: "Pastel",
          describe: "Sweet, harmony, loving, playful, safety, and healing",
        },
        {
          colors: [
            "rgb(255, 255, 255)",
            "rgb(188, 188, 188)",
            "rgb(121, 121, 121)",
            "rgb(51, 51, 51)",
          ],
          label: "Mono",
          describe:
            "Elegance, reliability, intelligence, modesty, and maturity",
        },
        {
          colors: [
            "linear-gradient(45deg, #0000ff, #ff69b4, #ff0000, #ffff00)",
          ],
          label: "Nature",
          describe:
            "Elegance, reliability, intelligence, modesty, and maturity",
        },
      ],
      height: null,
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
      storedData.backgroundColor = label;
      sessionStorage.setItem("logoParmeter", JSON.stringify(storedData));

      this.$emit("changType", "font");
    },
  },
};
</script>

<style scoped lang="scss">
.page-color {
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
  margin: 0 auto;
  text-align: center;
}

.color-item {
  width: auto;
  max-height: 192px;
  aspect-ratio: 14 / 10;
  overflow: hidden;
  opacity: 0;
  animation: fade-in-title 0.5s ease-in-out forwards;
  border-radius: 5px;
  box-shadow: 0.5px 0.5px 1px rgb(188, 188, 188, 0.5);
  cursor: pointer;
  background: #fff;
}
.color-item:hover .bgc {
  height: 60%;
}
.selectType {
  border: 2px solid #5e56f6;
}
.bgc {
  display: flex;
  height: 85%;
  transition: height 0.3s ease;
}

.bgc-item {
  width: 25%;
}
.bgc-item1 {
  width: 100%;
}
.item-title {
  display: flex;
  height: 15%;
  align-items: center;
  justify-content: center;
}
.item-describe {
  height: 20%;
  font-family: Regular;
  font-weight: 200;
  margin: 5px;
  color: rgb(121, 121, 121);
  font-size: 14px;
  line-height: 20px;
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
  .color-item:hover .bgc {
    height: 85%;
  }
}
</style>
