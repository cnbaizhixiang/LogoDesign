<template>
  <div class="page-title">
    <div v-show="showElement == 'title'">
      <v-text-field
        label="Name"
        outlined
        dense
        v-model="title.titleText"
        :disabled="isChangeIcon"
      ></v-text-field>

      <template v-if="title.titleText">
        <FontSelect
          @changeFont="changeFont"
          @showGoogle="showGoogleFonts"
          :selectTypeFont="title.titleType"
        ></FontSelect>
        <v-btn-toggle shaped mandatory v-model="title.layoutType">
          <v-btn>
            <v-icon @click="NewTitle">mdi-format-align-center</v-icon>
          </v-btn>

          <v-btn :disabled="isInsert" @click="NewTitle">
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>
        </v-btn-toggle>

        <div class="color-select">
          <p>color:</p>
          <ColorSelect
            v-for="(i, index) in title.font.colors"
            :gradient="title.gradient"
            :color="i"
            :disabledGradient="icon.layoutType === 2 || title.layoutType === 1"
            :colorIndex="index"
            @setGradient="setColor"
            @changeColor="changeColor"
            @changeGradient="setGradient"
          ></ColorSelect>
        </div>

        <v-card-text v-if="icon.layoutType !== 2 && title.layoutType">
          <p>单元素坐标样式:</p>
          <v-slider
            v-model="title.characterIndex"
            :max="title.titleText.length - 1"
            @change="NewTitle()"
            step="1"
            thumb-label="always"
            ticks="always"
            tick-size="2"
          >
          </v-slider>
        </v-card-text>

        <Slider
          :value="title.titleSpacing"
          name="Spacing"
          :max="30"
          :min="0"
          :step="1"
          @changeValue="handleChangeValue('titleSpacing', $event)"
        ></Slider>
        <Slider
          :value="title.titleOpacity"
          name="opacity"
          :max="1"
          :min="0.1"
          :step="0.1"
          @changeValue="handleChangeValue('titleOpacity', $event)"
        ></Slider>

        <!-- <p>angle：</p>
      <v-slider
        v-model="angle"
        thumb-label="always"
        color="#409EFF"
        :max="360"
        :step="1"
        @change="NewTitle"
      ></v-slider> -->

        <p>iconStrokeColor</p>
        <el-color-picker
          v-model="title.titleStrokeColor"
          show-alpha
          size="mini"
          @change="NewTitle()"
        ></el-color-picker>

        <template v-if="title.titleStrokeColor">
          <Slider
            :value="title.strokeWidth"
            name="iconstroke"
            :max="3"
            :min="0"
            :step="0.1"
            @changeValue="handleChangeValue('strokeWidth', $event)"
          ></Slider>
        </template>

        <p>filter：</p>
        <el-color-picker
          v-model="title.filter.color"
          show-alpha
          size="mini"
          @change="NewTitle()"
        ></el-color-picker>
        <template v-if="title.filter.color">
          <Slider
            :value="title.filter.blur"
            name="blur"
            :max="20"
            :min="0"
            :step="1"
            @changeValue="handleChangeValue('filter.blur', $event)"
          ></Slider>
          <Slider
            :value="title.filter.x"
            name="x"
            :max="20"
            :min="0"
            :step="1"
            @changeValue="handleChangeValue('filter.x', $event)"
          ></Slider>
          <Slider
            :value="title.filter.y"
            name="y"
            :max="20"
            :min="0"
            :step="1"
            @changeValue="handleChangeValue('filter.y', $event)"
          ></Slider>
        </template>

        <v-btn
          class="ma-2"
          elevation="2"
          color="#C4C4C4"
          outlined
          @click="changeTitleUp"
          >GAPS</v-btn
        >
      </template>
    </div>

    <div v-show="showElement == 'googleFonts'">
      <i class="el-icon-close" @click="showElement = 'title'"></i>
      <GoogleFonts
        @changeGoogleFont="changeGoogleFont"
        ref="GoogleFonts"
      ></GoogleFonts>
    </div>
  </div>
</template>

<script>
import GoogleFonts from "../components/GoogleFonts";
import FontSelect from "../components/FontSelect";
import ColorSelect from "../components/ColorSelect";
import Slider from "../components/Slider";
import {
  getFont,
  setGradient,
  setColor,
  changeTitle,
  NewTitle,
} from "../edit.js";
export default {
  name: "Title",
  components: {
    GoogleFonts,
    FontSelect,
    ColorSelect,
    Slider,
  },
  props: {
    canvas: Object,
  },

  data() {
    return {
      showElement: "title",
      isSplit: false,
      fontsList: [],
      title: null,
      colorList: null,
      isUpdateTitle: false,
      titleColor: [],
      fontsOptions: [],
      angle: 0,
    };
  },
  created() {
    this.title = this.getTitleInfo();
  },
  mounted() {
    if (this.haveTitle) {
      this.getColor();
    }
  },
  computed: {
    icon() {
      return JSON.parse(JSON.stringify(this.$store.getters.getIcon));
    },
    logoInfo() {
      return JSON.parse(JSON.stringify(this.$store.getters.getLogoInfo));
    },
    isInsert() {
      let title = this.$store.getters.getTitle;
      let a = this.icon.layoutType === 2 || title.gradient.isGradient;
      return a ? true : false;
    },
    haveTitle() {
      let title = this.canvas.getObjects().find((obj) => obj.name === "title");
      return title ? true : false;
    },
    isChangeIcon() {
      let a =
        this.logoInfo.isChangeIcon && this.logoInfo.isChangeIcon === false;
      return a;
    },
  },
  watch: {
    title: {
      deep: true,
      handler(newVal) {
        let a = this.logoInfo;
        a.title = newVal;
        let json = JSON.stringify(this.canvas.toJSON());
        a.jsonStr = json;
        this.$store.commit("setLogoInfo", a);
      },
    },
    "title.layoutType": {
      deep: true,
      handler(newVal, oldVal) {
        if (oldVal === 0) {
          for (let i = 0; i < this.title.titleText.length; i++) {
            this.title.font.colors[i] = this.title.font.colors[0];
          }
        }
      },
    },
    "title.titleText": {
      deep: true,
      handler(newVal, oldVal) {
        this.NewTitle();
      },
    },
  },

  methods: {
    //修改元素颜色
    changeColor(e) {
      if (e) {
        this.title.font.colors[e.index] = e.value;
      }

      let title = this.canvas.getObjects().find((obj) => obj.name === "title");
      let list = title._objects;

      if (this.title.layoutType === 1) {
        list.forEach((element, index) => {
          element.set({
            fill: this.title.font.colors[index],
          });
        });
      } else {
        this.title.font.colors = [this.title.font.colors[0]];
        list.forEach((element) => {
          element.set({
            fill: this.title.font.colors[0],
          });
        });
      }

      this.canvas.renderAll();
    },

    getColor() {
      let title = this.canvas.getObjects().find((obj) => obj.name === "title");
      let list = title._objects;
      this.title.font.colors = [];
      if (title._objects) {
        if (this.title.layoutType === 1) {
          title._objects.forEach((element) => {
            this.title.font.colors.push(element.fill);
          });
        } else if (this.title.layoutType === 0) {
          this.title.font.colors = [title._objects[0].fill];
        }
      }
      // if (this.title.gradient.isGradient) {
      //   this.title.font.colors = ["rgb(0,0,0)"];
      // }
    },

    async NewTitle() {
      if (this.isUpdateTitle) return;

      this.isUpdateTitle = true;
      let logoInfo = this.logoInfo;
      logoInfo.title = this.title;

      //标题为空时删除title
      if (logoInfo.title.titleText === "") {
        let a = this.canvas.getObjects().find((obj) => obj.name === "title");
        this.canvas.remove(a);
        this.isUpdateTitle = false;
        return;
      }
      // this.$store.commit("setCanvasLoading", true);
      try {
        await NewTitle(this.canvas, logoInfo);
        this.getColor();
      } catch (error) {
        // 处理异常
      } finally {
        this.isUpdateTitle = false;
        // this.$store.commit("setCanvasLoading", false);
      }
    },

    getTitleInfo() {
      return JSON.parse(JSON.stringify(this.$store.getters.getTitle));
    },
    changeTitle() {
      let title = this.getTitleInfo();
      changeTitle(this.canvas, title);
    },

    changeGoogleFont(e) {
      this.title = this.getTitleInfo();
      this.title.font.url = e.url;
      this.NewTitle();
    },
    showGoogleFonts() {
      this.title = this.getTitleInfo();
      this.showElement = "googleFonts";
      this.$refs.GoogleFonts.fetchFonts(this.title.titleText);
    },

    changeTitleUp() {
      this.title = this.getTitleInfo();

      let big = this.title.titleText === this.title.titleText.toUpperCase();
      let small = this.title.titleText === this.title.titleText.toLowerCase();
      if (small) {
        const uppercaseText = this.title.titleText.toUpperCase();
        this.title.titleText = uppercaseText;
        this.NewTitle();
      }
      if (big) {
        const smallText = this.title.titleText.toLowerCase();
        this.title.titleText = smallText;
        this.NewTitle();
      }
    },
    changeFont(item) {
      this.title = this.getTitleInfo();

      this.title.font.url = item.url;
      this.title.titleType = item.name;
      this.NewTitle();
    },

    setGradient() {
      this.title = this.getTitleInfo();
      //非渐变色
      if (!this.title.gradient.isGradient) {
        this.NewTitle();
        return;
      }
      let title = this.canvas.getObjects().find((obj) => obj.name === "title");
      let a = setGradient(title, "title");
      this.canvas.remove(title);
      this.canvas.add(a);
      setColor(a, this.title.gradient);
    },
    setColor(gradient) {
      let title = this.canvas.getObjects().find((obj) => obj.name === "title");
      setColor(title, gradient);
      this.canvas.renderAll();
    },

    range(title) {
      let angleStep = this.angle / title._objects.length;
      let a = 0;
      var radius = 30;
      title._objects.forEach((path, index) => {
        var angle = index * angleStep * (Math.PI / 180);
        // 计算元素到中心点的向量
        // 根据向量长度和弯曲角度计算新位置
        var newX = radius * Math.cos(angle);
        var newY = radius * Math.sin(angle);
        // 设置新位置和旋转角度
        path.set({
          left: newX,
          top: newY,
          angle: a, // 转换为度
        });
        a = a + angleStep;
      });
      title.setCoords();
      this.canvas.renderAll();
    },
    handleChangeValue(path, newValue) {
      // 根据路径更新数据
      const keys = path.split("."); // 将路径分割成键数组
      let currentObject = this.title;

      keys.forEach((key, index) => {
        if (index < keys.length - 1) {
          // 如果不是最后一个键，继续深入到下一个对象
          currentObject = currentObject[key];
        } else {
          // 最后一个键，更新值
          currentObject[key] = newValue;
        }
      });
      this.NewTitle();
    },
  },
};
</script>

<style scoped lang="scss">
.page-title {
}
.el-icon-close {
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  right: 10px;
}
.color-select {
  display: flex;
}
p {
  margin: 0;
}
</style>
