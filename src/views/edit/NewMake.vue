<template>
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-right
      clipped-left
      flat
      height="78"
      style="background-color: #fcce5e"
    >
    </v-app-bar>
    <div class="menu-header">
      <Menu></Menu>
    </div>
    <!-- 1263px时会隐藏 -->

    <v-navigation-drawer v-model="leftDrawerOpen" app clipped width="359px">
      <!-- 推荐svg -->

      <MenuLeft v-if="canvas" @refreshData="refreshData" :canvas="canvas"></MenuLeft>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="rightDrawerOpen" width="359px" app clipped right>
      <MenuRight
        v-if="canvas"
        :canvas="canvas"
        :tabRight="tabRight"
        :showElement="showElement"
        :elementKey="elementKey"
      ></MenuRight>
    </v-navigation-drawer>

    <v-main>
      <div class="page-left" @click="leftDrawerOpen = !leftDrawerOpen">
        <span v-if="!leftDrawerOpen" class="mdi mdi-chevron-right-box-outline"></span>
        <span v-else class="mdi mdi-chevron-left-box-outline"></span>
      </div>
      <div class="page-right" @click="rightDrawerOpen = !rightDrawerOpen">
        <span v-if="!rightDrawerOpen" class="mdi mdi-chevron-left-box-outline"></span>
        <span v-else class="mdi mdi-chevron-right-box-outline"></span>
      </div>
      <!-- <v-btn @click="toggleLeftDrawer">Left</v-btn>
      <v-btn @click="toggleRightDrawer">Right</v-btn> -->
      <div class="div-canvas">
        <div class="canvas-color">
          <!-- <el-color-picker
            v-for="(i, index) in colorList"
            v-model="colorList[index]"
            show-alpha
            size="mini"
            @change="changeColor(i, index)"
          ></el-color-picker> -->
        </div>

        <div class="div-center" oncontextmenu="return false">
          <div class="watermark"></div>
          <canvas id="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
          <v-overlay :value="canvasLoading" :absolute="true" color="rgba(0, 0, 0, 0.14)">
            <v-progress-circular
              indeterminate
              color="#0185FF"
              size="32"
            ></v-progress-circular>
          </v-overlay>
          <div class="canvas-header">
            <div class="canvas-bgc">
              <ColorSelect
                :gradient="gradient"
                :color="backgroundColor"
                @changeColor="changeBgc"
                @changeGradient="setGradientBgc"
                @setGradient="setGradientBgc"
                :colorIndex="0"
              ></ColorSelect>
              <!-- <el-color-picker
                v-model="backgroundColor"
                @change="changeBgc"
                show-alpha
                size="mini"
              ></el-color-picker> -->
            </div>
            <div class="canvas-btn">
              <v-btn
                tile
                color="#E1E1E1"
                elevation="2"
                x-small
                class="btn-right"
                @click="showElement = 'title'"
              >
                <v-icon left> mdi-pencil </v-icon>
                title
              </v-btn>
              <v-btn
                tile
                color="#E1E1E1"
                elevation="2"
                x-small
                class="btn-right"
                @click="showElement = 'icon'"
              >
                <v-icon left> mdi-pencil </v-icon>
                icon
              </v-btn>
            </div>
          </div>
        </div>
        <!-- <v-btn @click="save()">下载</v-btn> -->
      </div>

      <!--  -->
    </v-main>

    <v-footer app color="#f5f5f5" height="72" inset>
      <div class="btn-list">
        <div class="btn-item">
          <el-image
            :src="require('@/assets/static/img/edit/preview.svg')"
            width="42"
            alt="preview"
            fit="contain"
          ></el-image>
        </div>
        <div class="btn-item">
          <el-image
            v-if="!isSave"
            :src="require('@/assets/static/img/edit/save.svg')"
            width="42"
            alt="save"
            fit="contain"
            v-throttle="[saveJSON]"
          ></el-image>
        </div>
        <div class="btn-item" v-if="isSave">
          <v-btn @click="isShare = true">分享</v-btn>
        </div>
        <div class="btn-item" v-if="!logoInfo.isBought">
          <el-image
            :src="require('@/assets/static/img/edit/buy.svg')"
            width="42"
            alt="buy"
            v-throttle="[BuyLogo]"
          ></el-image>
        </div>
      </div>
    </v-footer>

    <!-- 删除弹窗 -->
    <v-dialog v-model="isDelete" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> 删除 </v-card-title>
        <v-card-text> 确定删除此元素？ </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="isDelete = false"> 取消 </v-btn>
          <v-btn @click="deleteObject">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 分享弹窗 -->
    <v-dialog v-model="isShare" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> 分享二维码 </v-card-title>
        <v-card-text>
          <el-image :src="shareUrl" width="100"></el-image>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { saveLogoData, uploadLogo, getQRCode } from "@/api/edit";
import { logoList } from "@/views/logo-list/logoList1.js";
import Icon from "./icon/Icon";
import Container from "./container/Container";
import Title from "./title/Title";
import Letter from "./title/Letter";
import Slogan from "./slogan/Slogan";

import Menu from "@/components/main/Menu";
import MenuLeft from "./components/MenuLeft";
import MenuRight from "./components/MenuRight";
import ColorSelect from "./components/ColorSelect";
import {
  recommendFont,
  getColor,
  getRandomColors,
  getIconList,
  getFontList,
  getColorList,
  setGlobalFabric,
  recommendTitle,
} from "./edit.js";

import Editor from "./editor/editor.js";

export default {
  props: {},
  components: {
    Icon,
    Container,
    Title,
    Letter,
    Slogan,
    Menu,
    MenuLeft,
    MenuRight,
    ColorSelect,
  },

  data() {
    return {
      editor: null,
      isSave: false,
      isDelete: false,
      isShare: false,
      drawer: null,
      iconActiveName: "icon",
      canvas: null,
      showElement: "icon",
      titleActiveName: "title",
      svgArray: [{ json: {}, src: "" }],
      backgroundColor: "#ffffff",
      colorList: [],

      btnLoading: false,
      componentKey: 0,
      elementKey: 0,
      recommendType: "",
      query: {
        page: 1,
        limit: 9,
      },
      total: 0,
      id: null,
      leftDrawerOpen: true,
      rightDrawerOpen: true,
      tabLeft: null,
      tabRight: 0,
      shareUrl: "",
      gradient: {
        isGradient: 0,
        type: "linear",
        colors: ["#FF0000", "#FFE500", "#0766FF"],
      },
    };
  },
  computed: {
    logoInfo() {
      return JSON.parse(JSON.stringify(this.$store.getters.getLogoInfo));
    },
    isLeftClipped() {
      return this.$vuetify.breakpoint.mdAndUp && this.leftDrawerOpen;
    },
    isRightClipped() {
      return this.$vuetify.breakpoint.mdAndUp && this.rightDrawerOpen;
    },
    canvasLoading() {
      return this.$store.getters.getCanvasLoading;
    },

    canvasWidth() {
      return 700;
    },
    canvasHeight() {
      return 500;
    },
    isChangeIcon() {
      let a = this.logoInfo.isChangeIcon && this.logoInfo.isChangeIcon === false;
      return a;
    },
  },
  watch: {
    canvas: {
      deep: true,
      handler(newVal) {
        this.isSave = false;
      },
    },
  },
  created() {
    this.closeDrawer();
    this.backgroundColor = this.logoInfo.backgroundColor;
  },
  mounted() {
    const a = JSON.parse(localStorage.getItem("logoInfo")).logoInfo;

    let obj = {
      json: a.jsonStr,
    };

    this.setFabric();
    //渲染画布
    this.getPage(obj);
  },

  beforeDestroy() {
    //刷新前存储json数据
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
    //小尺寸关闭左右栏
    closeDrawer() {
      var pageWidth = window.innerWidth;

      if (pageWidth <= 1263) {
        this.leftDrawerOpen = false;
        this.rightDrawerOpen = false;
      }
    },
    //设置fabric.js属性
    setFabric() {
      // 创建 canvas 对象
      let that = this;
      this.canvas = new fabric.Canvas("canvas", {
        // includeDefaultValues: false,//是否包括默认属性
        preserveObjectStacking: true, //撤销，重做
        backgroundColor: this.backgroundColor,
      });
      this.canvas.on("mouse:down", (event) => {
        if (!event.target) return;
        //切换菜单
        if (event.target.name === "icon") {
          this.showElement = "icon";
          this.tabRight = 0;
        } else if (event.target.name === "container") {
          this.showElement = "icon";
          this.tabRight = 1;
        } else if (event.target.name === "title") {
          this.showElement = "title";
          this.tabRight = 0;
        } else if (event.target.name === "slogan") {
          this.showElement = "title";
          this.tabRight = 1;
        }
      });
      this.editor = new Editor();
      this.editor.init(this.canvas); // 初始化编辑器
      //添加删除事件
      fabric.Object.prototype.controls.deleteControl.mouseUpHandler = () => {
        this.isDelete = true;
      };
    },

    save() {
      this.$store.commit("setCanvasLoading", true);
      var svgString = this.canvas.toSVG();

      // 将SVG字符串转换为DOM对象
      var parser = new DOMParser();
      var svgDOM = parser.parseFromString(svgString, "text/xml");

      // 设置SVG的固定宽度和高度
      svgDOM.documentElement.setAttribute("width", "100%"); // 例如设置宽度为500像素
      svgDOM.documentElement.setAttribute("height", "100%"); // 例如设置高度为500像素

      // 将修改后的SVG字符串重新转换回字符串
      var modifiedSvgString = new XMLSerializer().serializeToString(svgDOM);

      // 创建一个下载链接
      var downloadLink = document.createElement("a");
      downloadLink.href = "data:image/svg+xml," + encodeURIComponent(modifiedSvgString);
      downloadLink.download = "canvas.svg";

      // 模拟点击下载链接
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      this.$store.commit("setCanvasLoading", false);
    },
    getJSON(canvas) {
      let json = JSON.stringify(canvas.toJSON());
      const blob = new Blob([json], { type: "text/plain;charset=utf-8" });
      const file = new File([blob], "json.txt", {
        type: "text/plain;charset=utf-8",
      });
      return file;
    },
    async saveJSON() {
      let that = this;
      this.$store.commit("setCanvasLoading", true);
      let logoInfo = this.logoInfo;
      logoInfo.jsonStr = "";
      let id;
      try {
        const result1 = await saveLogoData(logoInfo);

        id = result1.data;

        //分享二维码
        // const res = await getQRCode(id);
        // let reader = new FileReader();
        // reader.readAsDataURL(res.data); // 将Blob对象转换为Base64编码的data URL
        // reader.onloadend = function () {
        //   let base64data = reader.result; // 这里是转换后的Base64编码的data URL
        //   that.shareUrl = base64data;
        // };
        let newCanvas = new fabric.Canvas(null);
        newCanvas.setWidth(this.canvas.getWidth());
        newCanvas.setHeight(this.canvas.getHeight());
        let str = this.canvas.toJSON();

        await new Promise((resolve, reject) => {
          newCanvas.loadFromJSON(str, async () => {
            try {
              // 此处的代码会在 JSON 加载完成后执行

              let formData = new FormData();
              let file = this.getSVGFile(newCanvas.toSVG());
              let jsonFile = this.getJSON(newCanvas);
              newCanvas.dispose();

              formData.append("LogoFile", file);
              formData.append("id", id);
              formData.append("ConVasFile", jsonFile);

              // 等待 uploadLogo 完成
              const result2 = await uploadLogo(formData);
              this.id = result2.data;

              this.isSave = true;
              this.$my_message({
                content: this.logoInfo.id ? "更新成功!" : "保存成功!",
                type: "success",
              });

              //保存后json增加id
              let a = this.logoInfo;
              a.id = id;
              this.$store.commit("setLogoInfo", a);

              resolve();
            } catch (error) {
              reject(error);
            }
          });
        });
      } catch (error) {
        throw error;
      } finally {
        this.$store.commit("setCanvasLoading", false);
      }
    },

    getSVGFile(str) {
      // 创建 Blob 对象
      let a = str;
      a = a.replace('width="700"', 'width="100%"');
      a = a.replace('height="500"', 'height="100%"');
      const blob = new Blob([a], { type: "image/svg+xml" });
      // 创建文件
      const file = new File([blob], "logo.svg", { type: "image/svg+xml" });
      return file;
    },

    refreshData() {
      this.elementKey += 1;
    },

    getPage(e) {
      let that = this;
      let logoInfo = this.logoInfo;
      this.canvas.loadFromJSON(e.json, () => {
        that.canvas.renderAll();
      });
    },
    deleteObject() {
      // 获取画布当前选中的对象

      let activeObjects = this.canvas.getActiveObjects();

      if (activeObjects && activeObjects.length === 1) {
        let activeObject = activeObjects[0];
        let name = activeObject.name;
        if (name === "slogan") {
          let logoInfo = this.logoInfo;
          logoInfo.slogan.sloganText = "";
          this.$store.commit("setLogoInfo", logoInfo);
        }
        if (this.isChangeIcon) {
          let b = name === "icon" || name === "title";
          if (b) {
            this.$my_message({
              content: "禁止修改图标,标题!",
              type: "error",
            });
          }
        }

        this.canvas.remove(activeObject);
        this.canvas.renderAll();
      } else {
        this.$my_message({
          content: "请选择单个元素!",
          type: "error",
        });
      }
      this.isDelete = false;
    },
    //图层上移
    changeIndex() {
      let activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        this.canvas.bringForward(activeObject);
        this.canvas.renderAll();
      }
    },
    changeBgc(obj) {
      this.backgroundColor = obj.value;
      this.canvas.set({
        backgroundColor: this.backgroundColor,
      });
      let logoInfo = this.logoInfo;
      logoInfo.backgroundColor = this.backgroundColor;
      this.$store.commit("setLogoInfo", logoInfo);
      this.canvas.renderAll();
    },

    setGradientBgc(gradient) {
      if (gradient.isGradient === 0) {
        let obj = {
          value: this.backgroundColor,
        };
        this.changeBgc(obj);
        return;
      }
      let linearGradient = new fabric.Gradient({
        type: gradient.type,
        gradientUnits: "pixels",
        coords: {
          x1: 0,
          y1: 0,
          x2: this.canvas.width,
          y2: this.canvas.height,
        },
        colorStops: [
          { offset: 0, color: gradient.colors[0], opacity: 1 },
          { offset: 0.5, color: gradient.colors[1], opacity: 1 },
          { offset: 1, color: gradient.colors[2], opacity: 1 },
        ],
      });
      this.canvas.set({
        backgroundColor: linearGradient,
      });
      this.canvas.renderAll();
    },
    shareQRCode() {
      getQRCode(424).then((res) => {
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(res.data); // 创建下载的链接
        downloadElement.href = href;

        downloadElement.download = `code.jpg`; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
      });
    },
    async BuyLogo() {
      try {
        const result = await this.saveJSON();

        let obj = {
          id: this.id,
          type: "buy",
        };

        this.$emit("updatePageType", obj);
      } catch (error) {
        throw error;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.v-tab {
  text-transform: none;
}
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
  color: #000000;
}

.menu-header {
  width: 100%;
  z-index: 5;
  position: fixed;
  top: 0;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;

  display: flex;
}
.div-canvas {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
}
.btn-list {
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn-item {
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
  }
}
.page-left {
  position: absolute;
  left: 0px;
  z-index: 4;
  span {
    cursor: pointer;
    font-size: 36px;
  }
}
.page-right {
  position: absolute;
  right: 0px;
  z-index: 4;
  span {
    cursor: pointer;
    font-size: 36px;
  }
}
.watermark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/static/img/edit/watermark.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  opacity: 0.5; /* 设置透明度 */
  pointer-events: none; /* 防止遮罩层捕获鼠标事件 */
  z-index: 2; /* 确保遮罩层在 Canvas 上方 */
}
.div-center {
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
}

.canvas-bgc {
  position: absolute;
  top: 10px;
  left: 10px;
}
.canvas-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.btn-right {
  margin-left: 10px;
}

.div-like {
  text-align: center;
}
.load-btn {
  display: flex;
  justify-content: center;
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
@media screen and (max-width: 768px) {
}
@media screen and (max-width: 1200px) {
}
</style>
