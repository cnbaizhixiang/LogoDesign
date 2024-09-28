<template>
  <div>
    <v-tabs v-model="tabLeft">
      <v-tab
        key="symbol"
        v-if="!isChangeIcon"
        @click="recommendIcon"
        :disabled="loading"
        >Symbol</v-tab
      >
      <v-tab
        key="fonts"
        @click="recommendTitle(null)"
        v-if="logoInfo.title.titleText"
        :disabled="loading"
        >Fonts</v-tab
      >
      <v-tab
        key="colors"
        v-if="haveIcon"
        @click="recommendColor('Random')"
        :disabled="loading"
        >Colors</v-tab
      >
      <!-- <v-tab key="letter" @click="recommendLetter" :disabled="loading"
        >Letter</v-tab
      > -->
    </v-tabs>
    <v-card flat>
      <v-card-text
        >
        
        <div class="logo-page" @scroll="handleScroll($event)">
    <h2>{{ recommendType }} suggestions</h2>
    
    <div v-for="(i, index) in svgArray" :key="index" class="svg-item">
      
      <img :src="i.src" @click="selectSymbol(i,index)" class="svg-img"></img>
      
    </div>
        
    <div v-show="!svgArray.length > 0"><el-empty :image-size="200"></el-empty></div>
  </div>

        <v-card flat>
          <template v-if="recommendType === 'symbol'">
            <div class="load-btn">
              <v-btn
                class="ma-2"
                :loading="btnLoading"
                :disabled="btnLoading"
                small
                outlined
                color="#0185FF"
                @click="recommendIcon"
              >
                Load More
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
              <!-- <v-btn
                class="ma-2"
                elevation="2"
                disabled
                small
                v-if="total === svgArray.length"
                >暂无更多数据...</v-btn
              > -->
            </div>
          </template>
          <template v-if="recommendType === 'fonts'">
            <v-select
              v-model="fontType"
              :items="fontTypes"
              @input="recommendTitle(fontType)"
              outlined
              label="Suggest more"
            ></v-select>
          </template>
          <template v-if="recommendType === 'colors'">
            <v-select
              v-model="colorType"
              :items="colorTypes"
              @input="recommendColor(colorType)"
              outlined
              label="Suggest more"
            ></v-select>
          </template>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>

import {
  getFontList,
  recommendFont,
  getColorList,
  getRandomColors,
  getColor,
  selectContainer,
  changeColor,
} from "../edit.js";
import { getLetterList, getRandomIcons } from "@/api/edit";
export default {
  name: "MenuLeft",
  props: {
    canvas: Object,
  },
  components: {
    
  },
  computed: {
    logoInfo() {
      return this.$store.getters.getLogoInfo;
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
    showLetter() {
      let a = this.logoInfo;
      let b = a.letter.id ? true : false;
      return b;
    },
    isChangeIcon() {
      let a =
        this.logoInfo.isChangeIcon && this.logoInfo.isChangeIcon === false;
      return a;
    },
  },
  mounted() {
    this.recommendIcon();
  },
  data() {
    return {
      tabLeft: 0,
      svgArray: [],
      recommendType: "symbol",
    
      query: {
        page: 1,
        limit: 10,
      },
      total: 0,
      btnLoading: false,
      loading: false,
      fontType: "Modern",
      colorType: "Random",
      fontTypes: ["Modern", "Elegant", "Slab", "Handwritten"],
      colorTypes: ["Random", "Warm", "Cold"],
      letterList: [],
    };
  },
  watch: {},

  methods: {
    changeLike(e) {
      this.loading = true;
      let that = this;
      let value = JSON.parse(JSON.stringify(e.value));

      this.canvas.loadFromJSON(value.json, () => {
        that.canvas.renderAll();

        that.$store.commit("setLogoInfo", value.info);

        //刷新父元素组件
        that.$emit("refreshData");

        that.loading = false;
      });
      if (this.recommendType === "letter") {
        let a = this.logoInfo;
        a.letter.id = this.letterList[e.index].id;
        that.$store.commit("setLogoInfo", a);
        that.$store.commit("setLetterList", this.letterList[e.index].list);
      }
    },
    selectSymbol(value,index) {
      let obj={
        value:value,
        index:index
      }
      this.changeLike(obj)
    },
    async recommendTitle(type) {
      if (this.loading) return;
      this.loading = true;
      this.svgArray = [];
      this.recommendType = "fonts";
      

      let that = this;
      let str = this.canvas.toJSON();

      let fonts = await getFontList(type).finally(() => {
        this.loading = false;
      });

      for (let i = 0; i < fonts.length; i++) {
        let newCanvas = new fabric.Canvas(null);
        newCanvas.setWidth(this.canvas.getWidth());
        newCanvas.setHeight(this.canvas.getHeight());

        newCanvas.loadFromJSON(str, async () => {
          newCanvas.setBackgroundImage(null);
          newCanvas.renderAll();

          let info = JSON.parse(localStorage.getItem("logoInfo")).logoInfo;
          info.title.font.url = fonts[i].url;
          info.title.titleType = fonts[i].name;
          newCanvas = await recommendFont(newCanvas, info);

          let obj = {
            src: newCanvas.toDataURL({
              format: "jpg",
              width: this.canvas.getWidth(),
              height: this.canvas.getHeight(),
            }),
            json: newCanvas.toJSON(),
            info: info,
          };
          newCanvas.dispose();
          if (this.recommendType === "fonts") {
            this.svgArray.push(obj);
          }
        });
      }
      this.loading = false;
    },

    async recommendColor(type) {
      if (this.loading) return;
      this.loading = true;

      this.svgArray = [];

      this.recommendType = "colors";
      

      let that = this;
      let str = this.canvas.toJSON();

      let b = await getColorList(type).catch(() => {
        this.loading = false;
      });

      for (let i = 0; i < b.length; i++) {
        let newCanvas = new fabric.Canvas(null);
        newCanvas.setWidth(this.canvas.getWidth());
        newCanvas.setHeight(this.canvas.getHeight());
        let bgcColor = getRandomColors(b[i].bgcColor, 1)[0];

        newCanvas.loadFromJSON(str, () => {
          newCanvas.set({
            backgroundColor: bgcColor,
          });
          newCanvas.setBackgroundImage(null);
          newCanvas.renderAll();

          let icon = newCanvas.getObjects().find((obj) => obj.name === "icon");
          let d = this.$store.getters.getIcon;
          //插入图标
          if (d.layoutType === 2) {
            let a = newCanvas.getObjects().find((obj) => obj.name === "title");
            icon = a.getObjects().find((obj) => obj.name === "icon");
          }
          let oldColor = getColor(icon);
          let newColor = getRandomColors(b[i].color, oldColor.length);

          for (let i = 0; i < newColor.length; i++) {
            changeColor(icon, newColor, oldColor[i], i);
          }

          newCanvas.renderAll();
          let info = JSON.parse(localStorage.getItem("logoInfo")).logoInfo;
          info.backgroundColor = bgcColor;
          let obj = {
            src: newCanvas.toDataURL({
              format: "jpg",
              width: this.canvas.getWidth(),
              height: this.canvas.getHeight(),
            }),
            json: newCanvas.toJSON(),
            info: info,
          };
          newCanvas.dispose();
          if (this.recommendType === "colors") {
            this.svgArray.push(obj);
          }
        });
      }
      this.loading = false;
    },
    async recommendIcon() {
      if (this.loading) return;
      this.btnLoading = true;
      this.loading = true;
      if (this.recommendType !== "symbol") {
        this.svgArray = [];
        this.query.page = 1;
      }

      this.recommendType = "symbol";
      let str = this.canvas.toJSON();
   

      let that = this;

      let icons = [];
      await getRandomIcons(this.query.limit)
        .then((res) => {
          icons = res.data.map((i) => {
            return {
              id: i.biId,
              url: i.iconAddress,
            };
          });
        })
        .catch(() => {
          this.loading = false;
        });

      for (let i = 0; i < icons.length; i++) {
        let newCanvas = new fabric.Canvas(null);
        newCanvas.setWidth(this.canvas.getWidth());
        newCanvas.setHeight(this.canvas.getHeight());
        newCanvas.loadFromJSON(str, async () => {
          newCanvas.setBackgroundImage(null);
          newCanvas.renderAll();

          let fileName = icons[i].url;
          // 插入图片
          let a = this.$store.getters.getLogoInfo;

          await selectContainer(newCanvas, icons[i], a);

          //深拷贝
          let info = JSON.parse(localStorage.getItem("logoInfo")).logoInfo;
          info.icon.iconInfo.url = icons[i].url;

          let obj = {
            src: newCanvas.toDataURL({
              format: "jpg",
              width: this.canvas.getWidth(),
              height: this.canvas.getHeight(),
            }),
            json: newCanvas.toJSON(),
            info: info,
          };
          newCanvas.dispose();
          if (this.recommendType === "symbol") {
            this.svgArray.push(obj);
          }
        });
      }
      this.loading = false;
      this.btnLoading = false;
    },

    async recommendLetter() {
      this.svgArray = [];
      this.recommendType = "letter";
      let str = this.canvas.toJSON();
      
      let that = this;
      let obj = {
        page: this.query.page++,
        limit: this.query.limit,
      };

      let title = this.$store.getters.getTitle;

      await getLetterList(obj).then((res) => {
        let a = res.data;
        this.letterList = [];
        if (a) {
          this.letterList = Object.entries(a).map(([key, value]) => {
            return { id: parseInt(key), list: value };
          });
        } else {
          return this.letterList;
        }
      });
      let text = title.titleText.split("");

      for await (const icon of this.letterList) {
        let newCanvas = new fabric.Canvas(null);
        newCanvas.setWidth(this.canvas.getWidth());
        newCanvas.setHeight(this.canvas.getHeight());
        let icons = [];
        for (let j = 0; j < text.length; j++) {
          icons[j] = icon.list.find(
            (item) => item.letter === text[j].toLowerCase()
          );
        }

        let svgObjects = await that.loadSVG(icons);
        newCanvas.loadFromJSON(str, () => {
          let targetObject = newCanvas
            .getObjects()
            .find((obj) => obj.name === "letter");

          // 已经存在时删除标题
          if (targetObject) {
            newCanvas.remove(targetObject);
          }

          // 计算并设置每个SVG对象的位置
          let width = 0;
          for (let h = 0; h < text.length; h++) {
            if (h !== 0) {
              width += svgObjects[h - 1].getBoundingRect().width;
            }
            svgObjects[h].set({
              left: width,
            });
          }

          // 创建包含所有SVG对象的group
          const group = new fabric.Group(svgObjects, {
            name: "letter",
            left: newCanvas.getWidth() / 2,
            top: newCanvas.getHeight() / 2,
            originX: "center",
            originY: "center",
          });

          // 将group添加到canvas
          newCanvas.add(group);
          let info = JSON.parse(localStorage.getItem("logoInfo"));

          let obj = {
            src: newCanvas.toDataURL({
              format: "jpg",
              width: this.canvas.getWidth(),
              height: this.canvas.getHeight(),
            }),
            json: newCanvas.toJSON(),
            info: info.logoInfo,
          };
          newCanvas.dispose();
          if (this.recommendType === "letter") {
            this.svgArray.push(obj);
          }
        });
      }
    },
    async loadSVG(icons) {
      // 使用Promise来等待所有SVG加载完成
      let svgLoadingPromises = icons.map((item) => {
        return new Promise((resolve) => {
          fabric.loadSVGFromURL(item.address, (objects, options) => {
            const group = fabric.util.groupSVGElements(objects, options);
            resolve(group);
          });
        });
      });
      // 等待所有SVG加载完成
      let svgObjects = await Promise.all(svgLoadingPromises);

      return svgObjects;
    },
    handleScroll(){
      console.log(1)
    }
  },
};
</script>
<style scoped lang="scss">
.logo-page{
  height:100%
}
.v-tab {
  text-transform: none;
}
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
  color: #000000;
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

.svg-item {
  width: 98%; /* 设置固定的div框宽度 */
  height: auto;
  overflow: hidden; /* 防止SVG超出边框 */
  margin-bottom: 20px;
  text-align: center;
}
.svg-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border:1px solid #D9D9D9;
  box-shadow: 3px 2px 3px rgba(0, 0, 0, 0.2);
}
.svg-item:hover {
  transform: scale(1.02);
  cursor: pointer;
 
}

h2{
  line-height:2;
}
</style>
