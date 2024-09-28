<template>
  <div class="makeLogo">
    <Menu></Menu>
    <!-- <transition-group name="fade" tag="div" > -->
    <div class="svg-list">
      <div v-for="(item, index) in List" :key="index" class="svg-item">
        <div v-html="item.svgCode"></div>

        <div class="logoButton">
          <el-button round @click="editLogo(item)">edit</el-button>
          <!-- <el-button round>preview</el-button>
          <el-button round>Buy</el-button> -->
        </div>
      </div>
    </div>
    <v-btn v-throttle="[getLogoList]" :loading="loading">加载更多</v-btn>
    <!-- </transition-group> -->
  </div>
</template>

<script>
import interact from "interactjs";
import { test } from "./logoList1.js";
import Menu from "@/components/main/Menu";
import { getTemplateLogo } from "@/api/edit";
import {
  recommendFont,
  getRandomColors,
  getColor,
  setGlobalFabric,
  selectContainer,
  changeColor,
  getFont,
} from "../edit/edit.js";
import { getTxt } from "@/utils/tool";
export default {
  name: "LogoModelList",
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate: "online logo generator-LogoAIDesign.com",
  },
  props: {},
  components: {
    Menu,
  },
  data() {
    return {
      List: [],
      logoParmeter: {},
      logoList: [],
      redirectTimeout: null, // 用于存储setTimeout返回的ID，以便稍后清除
      loading: false,
    };
  },
  created() {
    this.logoParmeter = JSON.parse(sessionStorage.getItem("logoParmeter"));

    //需设置自带的fabric.js的toSVG方法添加自带属性
    setGlobalFabric();
    this.getLogoList();
  },
  mounted() {
    //一小时后返回首页
    this.startRedirectTimer(); // 在组件挂载后启动定时器
  },
  beforeDestroy() {
    this.clearRedirectTimer(); // 在组件销毁前清除定时器
  },
  computed: {},
  watch: {},
  methods: {
    async getSvg() {
      let that = this;

      let promises = this.logoList.map(async (logo, i) => {
        let newCanvas;
        try {
          newCanvas = new fabric.Canvas(null);
          newCanvas.setWidth(700);
          newCanvas.setHeight(500);

          // 等待loadFromJSON的异步操作完成
          await newCanvas.loadFromJSON(logo.jsonStr, () => {
            newCanvas.renderAll();
          });

          // 接下来的操作都是异步的，使用await等待它们完成
          newCanvas = await that.changeIcon(newCanvas, logo);
          newCanvas = await recommendFont(newCanvas, logo);
          newCanvas = that.changeLongTitle(newCanvas);
          newCanvas = that.changeIconSize(newCanvas);

          newCanvas = that.deleteContainer(newCanvas);

          newCanvas = await that.changeColors(newCanvas, logo);
          newCanvas = await that.addSlogan(newCanvas, logo.slogan);
          let object = await that.changeLayout(newCanvas);
          newCanvas = object.newCanvas;

          var svgString = newCanvas.toSVG();
          var parser = new DOMParser();
          var svgDOM = parser.parseFromString(svgString, "text/xml");
          svgDOM.documentElement.setAttribute("width", "100%");
          svgDOM.documentElement.setAttribute("height", "100%");
          var modifiedSvgString = new XMLSerializer().serializeToString(svgDOM);

          logo.isBought = false;
          logo.isChangeIcon = true;
          let obj = {
            svgCode: modifiedSvgString,
            logoInfo: logo,
            json: newCanvas.toJSON(),
          };

          newCanvas.dispose();
          that.List.push(obj);

          return obj;
        } catch (error) {
          return null;
        }
      });

      let results = await Promise.all(promises);
    },
    async getLogoList() {
      if (this.loading) return;
      this.loading = true;
      getTemplateLogo(this.logoParmeter)
        .then(async (response) => {
          let a = response.data;
          if (a) {
            this.logoList = response.data;
            let promises = this.logoList.map((i) => {
              // 返回一个promise，它将由getTxt函数解决
              return getTxt(i.jsonStr);
            });
            try {
              // 等待所有的promise解决
              let results = await Promise.all(promises);

              // 所有异步操作完成后，更新logoList中的jsonStr
              this.logoList.forEach((i, index) => {
                i.jsonStr = results[index];
              });

              // 执行下一步操作

              await this.getSvg();
            } catch (error) {}
          } else {
            this.logoList = [];
          }
        })
        .catch((error) => {
          //获取失败跳转页面重新获取数据
          this.$router.push("/generate");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    editLogo(item) {
      let logoInfo = item.logoInfo;
      const storedData = JSON.parse(sessionStorage.getItem("logoParmeter"));
      logoInfo.jsonStr = JSON.stringify(item.json);

      localStorage.setItem("logoInfo", JSON.stringify({ logoInfo }));

      const childWindow = window.open("/edit", "_blank");
    },
    async changeIcon(newCanvas, obj) {
      await selectContainer(newCanvas, obj.icon.iconInfo, obj);

      return newCanvas;
    },
    async changeColors(newCanvas, logoInfo) {
      let that = this;
      let bgcColor = logoInfo.backgroundColor.split("|");
      let colors = logoInfo.icon.iconColors.split("|");
      logoInfo.backgroundColor = bgcColor[0];

      newCanvas.set({
        backgroundColor: bgcColor[0],
      });
      newCanvas.renderAll();

      let icon;
      if (logoInfo.icon.layoutType === 2) {
        let a = newCanvas.getObjects().find((obj) => obj.name === "title");
        icon = a.getObjects().find((obj) => obj.name === "icon");
      } else {
        icon = newCanvas.getObjects().find((obj) => obj.name === "icon");
      }

      let oldColor = getColor(icon);
      let newColor = getRandomColors(
        colors,
        oldColor.length ? oldColor.length : 1
      );

      for (let i = 0; i < newColor.length; i++) {
        changeColor(icon, newColor, oldColor[i], i);
      }

      newCanvas.renderAll();

      return newCanvas;
    },
    async addSlogan(newCanvas, slogan) {
      let that = this;
      let targetObject = newCanvas
        .getObjects()
        .find((obj) => obj.name === "slogan");
      if (targetObject) {
        newCanvas.remove(targetObject);
      }

      //存在口号
      if (slogan.sloganText) {
        // 将Path对象添加到canvas上
        let a = await getFont(slogan.sloganText, slogan.font.url);
        let paths = [];
        let w = 0;
        for (let i = 0; i < a.length; i++) {
          let str = a[i].toPathData();
          let path = new fabric.Path(str);
          path.set({
            left: w,
          });
          w = w + path.width + slogan.sloganSpacing;
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
        let g = new fabric.Group([group]);
        g.set({
          name: "slogan",
          left: 300,
          top: 450,
        });

        newCanvas.add(g);
      }

      return newCanvas;
    },
    changeLayout(newCanvas) {
      let icon = newCanvas.getObjects().find((obj) => obj.name === "icon");
      let title = newCanvas.getObjects().find((obj) => obj.name === "title");
      let icon_border = icon.getBoundingRect();
      let title_border = title.getBoundingRect();
      let w = icon_border.width + title_border.width;
      let h = icon_border.height + title_border.height;
      let randomIndex = Math.floor(Math.random() * 2);
      let layout = {
        icon: {
          left: null,
          top: null,
        },
        title: {
          left: null,
          top: null,
        },
      };
      if (icon && title) {
        if (randomIndex === 0) {
          layout.icon = {
            left: (700 - w) / 2 - 10,
            top: (500 - icon_border.height) / 2,
          };
          layout.title = {
            left: (700 - w) / 2 + icon_border.width + 10,
            top: (500 - title_border.height) / 2,
          };
          icon.set({
            left: layout.icon.left,
            top: layout.icon.top,
          });
          title.set({
            left: layout.title.left,
            top: layout.title.top,
          });
        }
        if (randomIndex === 1) {
          layout.icon = {
            left: (700 - icon_border.width) / 2,
            top: (500 - h) / 2 - 10,
          };
          layout.title = {
            left: (700 - title_border.width) / 2,
            top: (500 - h) / 2 + icon_border.height + 10,
          };
          icon.set({
            left: layout.icon.left,
            top: layout.icon.top,
          });
          title.set({
            left: layout.title.left,
            top: layout.title.top,
          });
        }
      }

      let obj = {
        newCanvas: newCanvas,
        layout: layout,
      };
      return obj;
    },
    //限制标题长度
    changeLongTitle(newCanvas) {
      let title = newCanvas.getObjects().find((obj) => obj.name === "title");

      let scale = 700 * 0.6;
      let width = title.getBoundingRect().width;
      if (width > scale) {
        title.scaleToWidth(scale);
      }
      return newCanvas;
    },
    //限制图标大小
    changeIconSize(newCanvas) {
      let icon = newCanvas.getObjects().find((obj) => obj.name === "icon");

      let scale = 700 * 0.4;
      let scale1 = 500 * 0.4;
      let width = icon.getBoundingRect().width;
      let height = icon.getBoundingRect().height;
      if (width > scale || height > scale1) {
        if (width > height) {
          icon.scaleToWidth(scale);
        } else {
          icon.scaleToHeight(scale1);
        }
      }

      return newCanvas;
    },
    startRedirectTimer() {
      // 半小时后执行跳转
      this.redirectTimeout = setTimeout(() => {
        this.$router.push("/"); // 跳转到首页
      }, 60 * 60 * 1000); // 半小时是30分钟，即30 * 60 * 1000毫秒
    },
    clearRedirectTimer() {
      // 清除定时器
      if (this.redirectTimeout) {
        clearTimeout(this.redirectTimeout);
        this.redirectTimeout = null;
      }
    },
    deleteContainer(newCanvas) {
      let targetObject = newCanvas
        .getObjects()
        .find((obj) => obj.name === "container");
      if (targetObject) {
        newCanvas.remove(targetObject);
      }
      return newCanvas;
    },
  },
};
</script>
<style scoped>
.makeLogo {
  text-align: center;
}
.svg-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  max-width: 1280px;
  margin: auto;
}
.svg-item {
  width: calc(100% - 20px);
  max-width: 380px;
  aspect-ratio: 14 / 10;
  /* max-height: 271px; */
  overflow: hidden;
  margin: 10px;
  position: relative;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.svg-item-load {
  width: 100%;
  height: 271px;
}

.svg-item:hover {
  transform: scale(1.03);
  cursor: pointer;
}
.svg-item:hover .logoButton {
  display: block;
}
.logoButton {
  width: 100%;
  position: absolute;
  bottom: 10px;
  z-index: 5;
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s;
}

.fade-enter,
.fade-leave-to {
  transform: scale(0.5);
}
#div-svg {
  position: absolute;
  opacity: 0;
}
</style>
