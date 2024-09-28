<template>
  <div class="icon-page">
    <template>
      <v-col cols="12" sm="6" class="py-2" data-app>
        <p>布局</p>

        <v-btn-toggle shaped mandatory v-model="icon.layoutType">
          <v-btn @click="changeLayout('left')">
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>

          <v-btn @click="changeLayout('top')">
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>

          <!-- <v-menu
            :close-on-content-click="true"
            bottom
            offset-y
            :nudge-width="200"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                :disabled="getTitleGradient"
                @click="insertIcon"
              >
                <v-icon>mdi-angular</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-switch
                v-model="icon.isInsert"
                inset
                :label="icon.isInsert ? '插入' : '替换'"
                @change="insertIcon"
              ></v-switch>

              <v-card-text>
                <p>替代:</p>
                <v-slider
                  v-model="icon.insertIndex"
                  :max="title.titleText.length - 1"
                  @change="replaceIcon"
                  step="1"
                  thumb-label="always"
                  ticks="always"
                  tick-size="2"
                ></v-slider>
              </v-card-text>
            </v-card>
          </v-menu> -->
        </v-btn-toggle>
      </v-col>
    </template>
    <IconHistoryList @changeIcon="selectContainer"></IconHistoryList>

    <template v-if="haveIcon">
      <template v-if="colorList">
        <div class="color-select">
          <p>Color:</p>
          <div v-for="(i, index) in colorList" :key="index">
            <ColorSelect
              :gradient="icon.gradient"
              :color="colorList[index]"
              :colorIndex="index"
              @setGradient="setColor"
              @changeColor="changeIconColor"
              @changeGradient="setGradient"
              :key="colorKey"
            ></ColorSelect>
          </div>
        </div>
      </template>
      <template v-if="icon.layoutType !== 2">
        <Slider
          :value="icon.iconOpacity"
          name="opacity"
          :max="1"
          :min="0.1"
          :step="0.1"
          @changeValue="changeIcon($event, 'iconOpacity')"
        ></Slider>

        <!-- <p>filter：</p>
        <el-color-picker
          v-model="icon.filter.color"
          show-alpha
          size="mini"
          @change="changeIcon"
        ></el-color-picker> -->

        <!-- <template v-if="icon.filter.color">
          <Slider
            :value="icon.filter.blur"
            name="blur"
            :max="20"
            :min="0"
            :step="1"
            @changeValue="changeIcon($event, 'filter.blur')"
          ></Slider>
          <Slider
            :value="icon.filter.x"
            name="x"
            :max="20"
            :min="0"
            :step="1"
            @changeValue="changeIcon($event, 'filter.x')"
          ></Slider>
          <Slider
            :value="icon.filter.y"
            name="y"
            :max="20"
            :min="0"
            :step="1"
            @changeValue="changeIcon($event, 'filter.y')"
          ></Slider>
        </template> -->
      </template>
    </template>
  </div>
</template>

<script>
import ConvertApi from "convertapi-js";
import imagetracer from "imagetracerjs";

import {
  getFont,
  getColor,
  changeColor,
  setGradient,
  setColor,
  replaceIcon,
  selectContainer,
  changeIcon,
} from "../edit.js";
import IconHistoryList from "./components/IconHistoryList";
import IconList from "./components/IconList";
import ColorSelect from "../components/ColorSelect";
import Slider from "../components/Slider";

export default {
  name: "Icon",
  props: {
    canvas: Object,
  },
  components: {
    IconHistoryList,
    IconList,
    ColorSelect,
    Slider,
  },

  data() {
    return {
      icons: [],
      iconTags: [],
      searchTag: "",
      icon: null,
      colorList: null,
      colorKey: 0,
    };
  },
  created() {
    this.icon = this.$store.getters.getIcon;
  },
  mounted() {
    this.getIconColor();
  },
  computed: {
    canvasLoading() {
      return this.$store.getters.getCanvasLoading;
    },
    getTitleGradient() {
      let a = this.$store.getters.getTitle;
      let c = this.$store.getters.getIcon;
      let b = a.gradient.isGradient || a.layoutType === 1 || c.gradient.isGradient;
      return b ? true : false;
    },
    haveIcon() {
      let icon = this.canvas.getObjects().find((obj) => obj.name === "icon");
      let a = this.canvas.getObjects().find((obj) => obj.name === "title");
      let icon1;
      if (a) {
        icon1 = a.getObjects().find((obj) => obj.name === "icon");
      }
      return icon || icon1 ? true : false;
    },
    title() {
      return this.$store.getters.getTitle;
    },
  },
  watch: {
    icon: {
      deep: true,
      handler(newVal) {
        let a = this.$store.getters.getLogoInfo;

        a.icon = newVal;
        let json = JSON.stringify(this.canvas.toJSON());
        a.jsonStr = json;
        this.$store.commit("setLogoInfo", a);
      },
    },
    // "icon.layoutType": {
    //   deep: true,
    //   handler(newVal, oldVal) {
    //     if (oldVal === 2) {
    //       this.showIcon(newVal);
    //       return;
    //     }
    //   },
    // },
  },
  methods: {
    getIconInfo() {
      return this.$store.getters.getIcon;
    },

    async selectContainer(icon) {
      this.$store.commit("setCanvasLoading", true);
      let a = this.$store.getters.getLogoInfo;
      await selectContainer(this.canvas, icon, a);

      this.icon.iconInfo.url = icon.url;
      this.getIconColor();
      this.canvas.renderAll();
      this.$store.commit("setCanvasLoading", false);
    },

    changeIcon(newValue, path) {
      if (path) {
        // 根据路径更新数据
        const keys = path.split("."); // 将路径分割成键数组
        let currentObject = this.icon;

        keys.forEach((key, index) => {
          if (index < keys.length - 1) {
            // 如果不是最后一个键，继续深入到下一个对象
            currentObject = currentObject[key];
          } else {
            // 最后一个键，更新值
            currentObject[key] = newValue;
          }
        });
      }

      let icon = this.getIconInfo();
      changeIcon(this.canvas, icon);
    },
    async setGradient() {
      this.icon = this.getIconInfo();
      //非渐变色
      if (!this.icon.gradient.isGradient) {
        let icon = {
          url: this.icon.iconInfo.url,
        };
        this.selectContainer(icon);
        return;
      }

      let targetObject = this.canvas.getObjects().find((obj) => obj.name === "icon");

      let a = setGradient(targetObject, "icon");
      this.canvas.remove(targetObject);
      this.canvas.add(a);
      setColor(a, this.icon.gradient);
      this.canvas.renderAll();
    },
    setColor(gradient) {
      let icon = this.canvas.getObjects().find((obj) => obj.name === "icon");
      setColor(icon, gradient);
      this.canvas.renderAll();
    },

    changeLayout(str) {
      let icon = this.canvas.getObjects().find((obj) => obj.name === "icon");
      let title = this.canvas.getObjects().find((obj) => obj.name === "title");

      if (!icon || !title) return;

      let icon_border = icon.getBoundingRect();
      let title_border = title.getBoundingRect();
      let w = icon_border.width + title_border.width;
      let h = icon_border.height + title_border.height;
      if (str === "left") {
        icon.set({
          left: (700 - w) / 2 - 10,
          top: (500 - icon_border.height) / 2,
        });
        title.set({
          left: (700 - w) / 2 + icon_border.width + 10,
          top: (500 - title_border.height) / 2,
        });
      }
      if (str === "top") {
        icon.set({
          left: (700 - icon_border.width) / 2,
          top: (500 - h) / 2 - 10,
        });
        title.set({
          left: (700 - title_border.width) / 2,
          top: (500 - h) / 2 + icon_border.height + 10,
        });
      }

      // 手动更新控制器位置
      icon.setCoords();
      title.setCoords();
      this.canvas.renderAll();
    },

    //获取颜色
    getIconColor() {
      let activeObject = this.canvas.getObjects().find((obj) => obj.name === "icon");

      let icon = this.getIconInfo();
      //插入图标
      // if (icon.layoutType === 2) {
      //   let a = this.canvas.getObjects().find((obj) => obj.name === "title");

      //   let b = a.getObjects().find((obj) => obj.name === "icon");

      //   this.colorList = getColor(b);
      //   this.colorKey++;
      //   return;
      // }

      if (activeObject) {
        this.colorList = getColor(activeObject);

        this.colorKey++;
      }
    },

    changeIconColor(obj) {
      let index = obj.index;
      let color = obj.value;
      let value = this.colorList[index];
      this.colorList[index] = color;

      this.changeColor(value, index);
    },
    //改变颜色
    changeColor(value, index) {
      let activeObject = this.canvas.getObjects().find((obj) => obj.name === "icon");

      let icon = this.getIconInfo();
      //插入图标
      // if (icon.layoutType === 2) {
      //   let a = this.canvas.getObjects().find((obj) => obj.name === "title");

      //   activeObject = a.getObjects().find((obj) => obj.name === "icon");
      // }

      changeColor(activeObject, this.colorList, value, index);

      this.canvas.renderAll();
    },

    // //插入图标
    // insertIcon() {
    //   this.replaceIcon(this.icon.insertIndex);
    // },

    // async replaceIcon(index) {
    //   let a = this.$store.getters.getLogoInfo;
    //   replaceIcon(this.canvas, a, index);
    // },
    // async showIcon(index) {
    //   let title = this.canvas.getObjects().find((obj) => obj.name === "title");

    //   let a = title.getObjects().find((obj) => obj.name === "icon");

    //   await this.replaceIcon(null);

    //   let str = a.toSVG();

    //   //将图标移出后需重新选择图标
    //   // if (this.icon.gradient.isGradient) {
    //   let icon = {
    //     url: this.icon.iconInfo.url,
    //   };
    //   await this.selectContainer(icon);

    //   if (index === 0) {
    //     this.changeLayout("left");
    //   } else if (index === 1) {
    //     this.changeLayout("top");
    //   }
    // },
    checkElement() {
      //取消选中元素
      this.canvas.discardActiveObject().renderAll();
    },
  },
};
</script>

<style scoped lang="scss">
.icon-page {
}
.v-btn {
  text-transform: none;
}

p {
  margin: 0;
}
.div-line {
  width: 100%;
  border: 1px rgba(168, 160, 160, 0.91) solid;
}

.avatar-uploader .el-upload {
  border: 1px dashed #ffffff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #ffffff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}

.color-select {
  display: flex;
}
</style>
