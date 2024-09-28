<template>
  <div>
    <!-- <el-color-picker
      v-for="(i, index) in colorList"
      v-model="colorList[index]"
      show-alpha
      size="mini"
      @change="changeColor(i, index)"
    ></el-color-picker> -->
    <template v-if="haveContainer">
      <template v-if="colorList">
        <div class="color-select">
          <p>Color:</p>
          <div v-for="(i, index) in colorList" :key="index">
            <ColorSelect
              :gradient="container.gradient"
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
      <Slider
        :value="container.iconOpacity"
        name="opacity"
        :max="1"
        :min="0.1"
        :step="0.1"
        @changeValue="changeIcon($event, 'iconOpacity')"
      ></Slider>

      <p>filter：</p>
      <el-color-picker
        v-model="container.filter.color"
        show-alpha
        size="mini"
        @change="changeIcon"
      ></el-color-picker>

      <template v-if="container.filter.color">
        <Slider
          :value="container.filter.blur"
          name="blur"
          :max="20"
          :min="0"
          :step="1"
          @changeValue="changeIcon($event, 'filter.blur')"
        ></Slider>
        <Slider
          :value="container.filter.x"
          name="x"
          :max="20"
          :min="0"
          :step="1"
          @changeValue="changeIcon($event, 'filter.x')"
        ></Slider>
        <Slider
          :value="container.filter.y"
          name="y"
          :max="20"
          :min="0"
          :step="1"
          @changeValue="changeIcon($event, 'filter.y')"
        ></Slider>
      </template>
    </template>
    <!-- <v-text-field solo label="Container">
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-progress-circular
            v-if="loading"
            size="24"
            color="info"
            indeterminate
          ></v-progress-circular>
          <img
            v-else
            width="45"
            height="45"
            :src="require('@/assets/static/img/edit/search.svg')"
            alt=""
          />
        </v-fade-transition>
      </template>
    </v-text-field> -->

    <div class="container-list">
      <div v-for="(item, index) in containerList" :key="item.id" class="container-item">
        <el-image
          :src="item.url"
          class="div_img"
          @click="selectContainer(item)"
        ></el-image>
      </div>
    </div>
  </div>
</template>

<script>
import { getContainerList } from "@/api/edit";
import {
  getColor,
  changeColor,
  setGradient,
  setColor,
  loadSVGFromURLPromise,
  getCenterPointer,
} from "../edit.js";
import ColorSelect from "../components/ColorSelect";
import Slider from "../components/Slider";
export default {
  name: "Container",
  props: {
    canvas: Object,
  },
  components: {
    ColorSelect,
    Slider,
  },
  data() {
    return {
      containerList: [],
      changeIconList: [],
      container: null,
      colorList: [],
      loading: false,
      colorKey: 0,
    };
  },
  created() {
    this.container = this.$store.getters.getContainer;
    this.fechData();
  },
  mounted() {
    //获取颜色
    this.getIconColor();
  },
  computed: {
    haveContainer() {
      let container = this.canvas.getObjects().find((obj) => obj.name === "container");
      return container ? true : false;
    },
    getContainerList() {
      return this.$store.getters.getContainerList;
    },
  },
  watch: {
    container: {
      deep: true,
      handler(newVal) {
        let a = this.$store.getters.getLogoInfo;
        a.container = newVal;
        let json = JSON.stringify(this.canvas.toJSON());
        a.jsonStr = json;
        this.$store.commit("setLogoInfo", a);
      },
    },
  },
  methods: {
    fechData() {
      if (this.getContainerList.length > 0) {
        this.containerList = this.getContainerList;
      } else {
        //第一次获取

        getContainerList().then((response) => {
          let a = response.data;
          if (a) {
            this.containerList = a.map((i) => {
              return {
                id: i.biId,
                display: i.iconPresentation,
                url: i.iconAddress,
              };
            });
          } else {
            this.containerList = [];
          }

          this.$store.commit("setContainerList", this.containerList);
        });
      }
    },
    getContainerInfo() {
      return this.$store.getters.getContainer;
    },
    async selectContainer(icon) {
      let that = this;

      // 插入图片
      this.container.iconInfo.url = icon.url;

      let { objects, options } = await loadSVGFromURLPromise(icon.url);
      let img = fabric.util.groupSVGElements(objects, {
        ...options,
      });
      var targetObject = this.canvas.getObjects().find((obj) => obj.name === "container");
      // 已经存在时删除图标

      let center;
      if (targetObject) {
        let s = (targetObject.width * targetObject.scaleX) / img.width;
        img.scale(s);
        this.canvas.remove(targetObject);
        center = getCenterPointer(targetObject);
      } else {
        img.scaleToWidth(this.canvas.getWidth() * 0.5);
      }
      let left, top;
      left = targetObject ? center.x : 0;
      top = targetObject ? center.y : 0;

      //修改图标位置,最初位于中心
      let width = img.getScaledWidth();
      let height = img.getScaledHeight();

      img.set({
        name: "container",
        left: left ? left - width / 2 : this.canvas.getCenter().left - width / 2,
        top: top ? top - height / 2 : this.canvas.getCenter().top - height / 2,
      });
      this.canvas.add(img);
      img.sendToBack();
      if (targetObject) {
        that.changeIcon();
      }
      //获取颜色
      this.getIconColor();
      //是否为渐变色
      // if (that.container.gradient.isGradient) {
      //   that.setGradient();
      // }
    },
    changeIcon(newValue, path) {
      if (path) {
        // 根据路径更新数据
        const keys = path.split("."); // 将路径分割成键数组
        let currentObject = this.container;

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
      this.container = this.getContainerInfo();
      var targetObject = this.canvas.getObjects().find((obj) => obj.name === "container");
      if (targetObject) {
        targetObject.set({
          opacity: this.container.iconOpacity,
          shadow: {
            color: this.container.filter.color, // 阴影颜色，使用RGBA格式
            blur: this.container.filter.blur, // 模糊半径
            offsetX: this.container.filter.x, // 阴影在X轴上的偏移量
            offsetY: this.container.filter.y, // 阴影在Y轴上的偏移量
          },
        });
        if (this.container.filter.color) {
          targetObject.set({
            shadow: {
              color: this.container.filter.color, // 阴影颜色，使用RGBA格式
              blur: this.container.filter.blur, // 模糊半径
              offsetX: this.container.filter.x, // 阴影在X轴上的偏移量
              offsetY: this.container.filter.y, // 阴影在Y轴上的偏移量
            },
          });
        }
        this.canvas.renderAll();
      }
    },
    //获取颜色
    getIconColor() {
      let activeObject = this.canvas.getObjects().find((obj) => obj.name === "container");
      if (activeObject) {
        this.colorList = getColor(activeObject);
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
      let activeObject = this.canvas.getObjects().find((obj) => obj.name === "container");

      changeColor(activeObject, this.colorList, value, index);
      this.canvas.renderAll();
    },

    setGradient() {
      this.container = this.getContainerInfo();
      //非渐变色
      if (!this.container.gradient.isGradient) {
        let icon = {
          url:
            "http://101.133.150.186:9000/ai-icon/2024/05/06/12aafffd332945ccb524fa2d308ddd32.svg",
        };
        this.selectContainer(icon);
        return;
      }
      let targetObject = this.canvas.getObjects().find((obj) => obj.name === "container");

      let a = setGradient(targetObject, "container");
      this.canvas.remove(targetObject);
      this.canvas.add(a);
      setColor(a, this.container.gradient);
    },
    setColor() {
      this.container = this.getContainerInfo();
      let icon = this.canvas.getObjects().find((obj) => obj.name === "container");
      setColor(icon, this.container.gradient);
      this.canvas.renderAll();
      this.colorList = [""];
    },
  },
};
</script>

<style scoped>
.container-list {
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  align-items: center;
}
.container-item {
  width: 60px;
  height: 60px;
  justify-content: center;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}
.color-select {
  display: flex;
}
.container-item:hover {
  border: 1px #20a0ff solid;
  border-radius: 10px;
  transform: scale(1.1);
}
.div-line {
  width: 100%;
  border: 1px rgba(168, 160, 160, 0.91) solid;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
