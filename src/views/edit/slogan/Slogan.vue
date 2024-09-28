<template>
  <div class="page-title">
    <div v-show="showElement == 'slogan'">
      <v-text-field
        label="Name"
        outlined
        dense
        v-model="slogan.sloganText"
        @input="NewTitle()"
      ></v-text-field>

      <template v-if="slogan.sloganText">
        <v-btn-toggle v-model="slogan.sloganKind" mandatory @change="NewTitle">
          <v-btn>
            <v-icon>mdi-format-text</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-minus</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-palette</v-icon>
          </v-btn>
        </v-btn-toggle>

        <FontSelect
          @changeFont="changeFont"
          @showGoogle="showGoogleFonts"
          :selectTypeFont="slogan.sloganType"
        ></FontSelect>

        <p>color:</p>
        <ColorSelect
          :gradient="slogan.gradient"
          :color="sloganColor"
          :colorIndex="0"
          @setGradient="setColor"
          @changeColor="changeColor"
          @changeGradient="setGradient"
        ></ColorSelect>

        <Slider
          :value="slogan.sloganSpacing"
          name="Spacing"
          :max="30"
          :min="0"
          :step="1"
          @changeValue="handleChangeValue('sloganSpacing', $event)"
        ></Slider>

        <template v-if="slogan.sloganKind === 1">
          <Slider
            :value="slogan.lineWidth"
            name="lineWidth"
            :max="200"
            :min="10"
            :step="5"
            @changeValue="handleChangeValue('lineWidth', $event)"
          ></Slider>
        </template>

        <Slider
          :value="slogan.sloganOpacity"
          name="opacity"
          :max="1"
          :min="0.1"
          :step="0.1"
          @changeValue="handleChangeValue('sloganOpacity', $event)"
        ></Slider>
        <v-subheader class="pl-0"> iconStrokeColor </v-subheader>

        <el-color-picker
          v-model="slogan.sloganStrokeColor"
          show-alpha
          size="mini"
          @change="NewTitle"
        ></el-color-picker>

        <template v-if="slogan.sloganStrokeColor">
          <Slider
            :value="slogan.strokeWidth"
            name="iconstroke"
            :max="2"
            :min="0"
            :step="0.1"
            @changeValue="handleChangeValue('strokeWidth', $event)"
          ></Slider>
        </template>

        <!-- <p>背景色：</p>
      <el-color-picker
        v-model="slogan.sloganBgcColor"
        show-alpha
        size="mini"
        @change="changeSlogan"
      ></el-color-picker> -->

        <p>filter：</p>
        <el-color-picker
          v-model="slogan.filter.color"
          show-alpha
          size="mini"
          @change="NewTitle"
        ></el-color-picker>

        <template v-if="slogan.filter.color">
          <Slider
            :value="slogan.filter.blur"
            name="blur"
            :max="20"
            :min="0"
            :step="1"
            @changeValue="handleChangeValue('filter.blur', $event)"
          ></Slider>
          <Slider
            :value="slogan.filter.x"
            name="x"
            :max="20"
            :min="0"
            :step="1"
            @changeValue="handleChangeValue('filter.x', $event)"
          ></Slider>
          <Slider
            :value="slogan.filter.y"
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
          @click="changeSloganUp"
          >GAPS</v-btn
        >
      </template>
    </div>

    <div v-show="showElement == 'googleFonts'">
      <i class="el-icon-close" @click="showElement = 'slogan'"></i>
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
import { getFont, setGradient, setColor } from "../edit.js";
export default {
  name: "Slogan",
  props: {
    canvas: Object,
  },
  components: {
    GoogleFonts,
    FontSelect,
    ColorSelect,
    Slider,
  },

  data() {
    return {
      showElement: "slogan",
      sloganColor: "",
      slogan: null,
      isUpdateTitle: false,
    };
  },
  created() {
    this.slogan = this.$store.getters.getSlogan;
  },
  mounted() {
    this.getColor();
  },
  watch: {
    slogan: {
      deep: true,
      handler(newVal) {
        let a = this.$store.getters.getLogoInfo;
        a.slogan = newVal;
        let json = JSON.stringify(this.canvas.toJSON());
        a.jsonStr = json;
        this.$store.commit("setLogoInfo", a);
      },
    },
  },
  computed: {
    logoInfo() {
      return this.$store.getters.getLogoInfo;
    },
    haveSlogan() {
      let slogan = this.canvas
        .getObjects()
        .find((obj) => obj.name === "slogan");
      return slogan ? true : false;
    },
  },
  methods: {
    async NewTitle() {
      this.slogan = this.getSloganInfo();
      let that = this;

      if (this.isUpdateTitle) return;
      this.isUpdateTitle = true;

      var targetObject = that.canvas
        .getObjects()
        .find((obj) => obj.name === "slogan");

      //标题为空时删除title
      if (this.slogan.sloganText === "") {
        let a = this.canvas.getObjects().find((obj) => obj.name === "slogan");
        this.canvas.remove(a);
        return;
      }

      // 已经存在时删除标题
      //记录开始宽度
      let s = 1;
      if (targetObject) {
        s = targetObject.multiple ? targetObject.multiple : targetObject.scaleX;
        that.canvas.remove(targetObject);
      }
      let left, top, scaleX, scaleY;
      left = targetObject ? targetObject.left : this.canvas.getCenter().left;
      top = targetObject ? targetObject.top : this.canvas.getCenter().top;

      // 将Path对象添加到canvas上
      let a = await getFont(this.slogan.sloganText, this.slogan.font.url);
      let paths = [];
      let w = 0;

      for (let i = 0; i < a.length; i++) {
        let str = a[i].toPathData();

        let path = new fabric.Path(str);
        path.set({
          left: w,
        });
        w = w + path.width + this.slogan.sloganSpacing;
        paths.push(path);
      }

      let group = new fabric.Group(paths);

      group.set({
        name: "text",
        left: 0,
        top: 0,
      });

      let width = group.getScaledWidth();
      let height = group.getScaledHeight();

      let slogan;
      if (that.slogan.sloganKind === 0) {
        //纯文本

        slogan = new fabric.Group([group]);
      } else if (that.slogan.sloganKind === 1) {
        let line_left = new fabric.Rect({
          width: this.slogan.lineWidth, // 长方形的宽度
          height: 1, // 长方形的高度
          left: -this.slogan.lineWidth - 5,
          top: height / 2,
          fill: "black",
        });
        let line_right = new fabric.Rect({
          width: this.slogan.lineWidth, // 长方形的宽度
          height: 1, // 长方形的高度
          left: width + 5,
          top: height / 2,
          fill: "black",
        });
        slogan = new fabric.Group([line_left, group, line_right]);
      } else if (that.slogan.sloganKind === 2) {
        //带背景文本
        group.set({
          left: 5,
          top: 5,
        });
        let rect = new fabric.Rect({
          width: width + 10, // 长方形的宽度
          height: height + 10, // 长方形的高度
          fill: "black",
        });

        // 将圆形路径应用到矩形上作为裁剪路径

        //白色字体

        let a = group.getObjects();

        a.forEach((obj, i) => {
          obj.set({
            fill: "white",
          });
        });

        slogan = new fabric.Group([rect, group]);
      }
      slogan.set({
        name: "slogan",
        left: left,
        top: top,
      });

      slogan.scale(s);

      that.canvas.add(slogan);
      if (targetObject) {
        that.changeSlogan();
        that.changeColor();
      }

      //是否为渐变色
      if (that.slogan.gradient.isGradient) {
        that.setGradient();
      }
      that.canvas.renderAll();

      this.isUpdateTitle = false;
    },
    getSloganInfo() {
      return this.$store.getters.getSlogan;
    },
    getColor() {
      let a = this.canvas.getObjects().find((obj) => obj.name === "slogan");
      if (a) {
        let slogan = a.getObjects().find((obj) => obj.name === "text");
        let list = slogan.getObjects();

        this.sloganColor = list[0].fill;
      }
    },
    changeColor(e) {
      this.sloganColor = this.sloganColor ? this.sloganColor : "#000000";
      if (e) {
        this.sloganColor = e.value;
      }

      let a = this.canvas.getObjects().find((obj) => obj.name === "slogan");
      let slogan = a.getObjects().find((obj) => obj.name === "text");
      let list = slogan.getObjects();

      list.forEach((element) => {
        element.set({
          fill: this.sloganColor,
        });
      });
      this.canvas.renderAll();
    },
    changeGoogleFont(e) {
      this.slogan = this.getSloganInfo();
      this.slogan.font.url = e.url;
      this.NewTitle();
    },
    showGoogleFonts() {
      this.slogan = this.getSloganInfo();
      this.showElement = "googleFonts";
      this.$refs.GoogleFonts.fetchFonts(this.slogan.sloganText);
    },

    changeFont(item) {
      this.slogan = this.getSloganInfo();
      this.slogan.font.url = item.url;
      this.slogan.sloganType = item.name;
      this.NewTitle();
    },

    changeSlogan() {
      this.slogan = this.getSloganInfo();
      let slogan = this.canvas
        .getObjects()
        .find((obj) => obj.name === "slogan");

      if (slogan) {
        let group = slogan.getObjects().find((obj) => obj.name === "text");
        let a = group.getObjects();

        a.forEach((obj, i) => {
          obj.set({
            strokeWidth: this.slogan.strokeWidth,
            stroke: this.slogan.sloganStrokeColor,
            opacity: this.slogan.sloganOpacity,
          });
          if (this.slogan.filter.color) {
            obj.set({
              shadow: {
                color: this.slogan.filter.color, // 阴影颜色，使用RGBA格式
                blur: this.slogan.filter.blur, // 模糊半径
                offsetX: this.slogan.filter.x, // 阴影在X轴上的偏移量
                offsetY: this.slogan.filter.y, // 阴影在Y轴上的偏移量
              },
            });
          }
        });
        this.canvas.renderAll();
      }
    },
    changeSloganUp() {
      this.slogan = this.getSloganInfo();
      let big = this.slogan.sloganText === this.slogan.sloganText.toUpperCase();
      let small =
        this.slogan.sloganText === this.slogan.sloganText.toLowerCase();
      if (small) {
        const uppercaseText = this.slogan.sloganText.toUpperCase();
        this.slogan.sloganText = uppercaseText;
        this.NewTitle();
      }
      if (big) {
        const smallText = this.slogan.sloganText.toLowerCase();
        this.slogan.sloganText = smallText;
        this.NewTitle();
      }
    },

    setGradient() {
      this.slogan = this.getSloganInfo();
      //非渐变色

      if (!this.slogan.gradient.isGradient) {
        this.NewTitle();
        return;
      }
      let title = this.canvas.getObjects().find((obj) => obj.name === "slogan");
      let a = setGradient(title, "slogan");
      this.canvas.remove(title);
      this.canvas.add(a);
      setColor(a, this.slogan.gradient);
    },
    setColor(gradient) {
      let title = this.canvas.getObjects().find((obj) => obj.name === "slogan");
      setColor(title, gradient);
      this.canvas.renderAll();
    },
    handleChangeValue(path, newValue) {
      // 根据路径更新数据
      const keys = path.split("."); // 将路径分割成键数组
      let currentObject = this.slogan;

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
</style>
