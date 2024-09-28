<template>
  <div class="page">
    <p>下载</p>
    <div class="logo-list" v-for="(i, index) in list" :key="index">
      <div v-html="i.code"></div>
      <v-btn @click="getJpg(i)">jpg-800-600</v-btn>
      <v-btn @click="downloadPng(i)">png transparent bg</v-btn>
      <v-btn @click="downloadSVG(i)">svg</v-btn>
      <v-btn @click="downloadSVG2(i)">svg transparent bg</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Download",
  props: {
    logoData: String,
  },
  components: {},
  data() {
    return {
      list: [
        { title: "Main Logo", json: "", code: "" },
        { title: "Inverted Color", json: "", code: "" },
        { title: "White logo", json: "", code: "" },
        { title: "Black logo", json: "", code: "" },
        { title: "Logo Symbol", json: "", code: "" },
      ],
    };
  },
  mounted() {
    this.getPage();
  },

  computed: {},

  methods: {
    getPage() {
      let newCanvas = new fabric.Canvas(null);
      newCanvas.setWidth(700);
      newCanvas.setHeight(500);
      newCanvas.loadFromJSON(this.logoData, () => {
        newCanvas.renderAll();
      });
      this.list[0].json = newCanvas.toJSON();
      this.list[0].code = this.getSVG(newCanvas.toSVG());
      newCanvas.dispose();
      this.getInvertedLogo();
      this.getWhiteLogo();
      this.getBlackLogo();
      this.getSymbolLogo();
    },
    getInvertedLogo() {
      let newCanvas = new fabric.Canvas(null);
      newCanvas.setWidth(700);
      newCanvas.setHeight(500);
      newCanvas.loadFromJSON(this.logoData, () => {
        newCanvas.renderAll();
      });

      let bgc = newCanvas.backgroundColor;

      let title = newCanvas.getObjects().find((obj) => obj.name === "title");
      let titleColor;
      if (title) {
        titleColor = title._objects[0].fill;
        //修改标题为背景色
        this.changeTitleColor(newCanvas, bgc);
        //修改背景为标题色
        newCanvas.set({
          backgroundColor: titleColor,
        });
      }

      this.list[1].json = newCanvas.toJSON();
      this.list[1].code = this.getSVG(newCanvas.toSVG());
      newCanvas.dispose();
    },
    getWhiteLogo() {
      //纯白
      let newCanvas = new fabric.Canvas(null);
      newCanvas.setWidth(700);
      newCanvas.setHeight(500);
      newCanvas.loadFromJSON(this.logoData);

      newCanvas.set({
        backgroundColor: "#444",
      });
      this.changeIconColor(newCanvas, "#fff");
      this.changeTitleColor(newCanvas, "#fff");
      this.list[2].json = newCanvas.toJSON();
      this.list[2].code = this.getSVG(newCanvas.toSVG());
      newCanvas.dispose();
    },
    getBlackLogo() {
      //纯黑
      let newCanvas = new fabric.Canvas(null);
      newCanvas.setWidth(700);
      newCanvas.setHeight(500);
      newCanvas.loadFromJSON(this.logoData);

      newCanvas.set({
        backgroundColor: "#fff",
      });
      this.changeIconColor(newCanvas, "#444");
      this.changeTitleColor(newCanvas, "#444");
      this.list[3].json = newCanvas.toJSON();
      this.list[3].code = this.getSVG(newCanvas.toSVG());
      newCanvas.dispose();
    },
    getSymbolLogo() {
      let newCanvas = new fabric.Canvas(null);
      newCanvas.setWidth(700);
      newCanvas.setHeight(500);
      newCanvas.loadFromJSON(this.logoData);
      let a = newCanvas.getObjects();
      a.forEach((obj) => {
        if (obj.name !== "icon") {
          // 如果对象的名称不是 'icon'
          newCanvas.remove(obj); // 删除该对象
        }
      });

      //图标放置中心
      let icon = newCanvas.getObjects().find((obj) => obj.name === "icon");
      let width = icon.getBoundingRect().width;
      let height = icon.getBoundingRect().height;
      icon.set({
        left: newCanvas.getCenter().left - width / 2,
        top: newCanvas.getCenter().top - height / 2,
      });

      this.list[4].json = newCanvas.toJSON();
      this.list[4].code = this.getSVG(newCanvas.toSVG());
      newCanvas.dispose();
    },
    changeTitleColor(newCanvas, color) {
      let title = newCanvas.getObjects().find((obj) => obj.name === "title");
      let list = title._objects;
      if (list) {
        list.forEach((element) => {
          element.set({
            fill: color,
          });
        });
      }

      newCanvas.renderAll();
    },
    changeIconColor(newCanvas, color) {
      let icon = newCanvas.getObjects().find((obj) => obj.name === "icon");
      let list = icon._objects;
      console.log(icon);
      //多元素
      if (list) {
        list.forEach((element) => {
          element.set({
            fill: color,
          });
        });
      } else {
        //单元素
        icon.set({
          fill: color,
        });
      }

      newCanvas.renderAll();
    },

    getSVG(svgString) {
      // 将SVG字符串转换为DOM对象
      var parser = new DOMParser();
      var svgDOM = parser.parseFromString(svgString, "text/xml");

      // 设置SVG的固定宽度和高度
      svgDOM.documentElement.setAttribute("width", "100%"); // 例如设置宽度为500像素
      svgDOM.documentElement.setAttribute("height", "100%"); // 例如设置高度为500像素

      // 将修改后的SVG字符串重新转换回字符串
      var modifiedSvgString = new XMLSerializer().serializeToString(svgDOM);
      return modifiedSvgString;
    },
    getJpg(item) {
      //JPG 800-600
      let newCanvas = new fabric.Canvas(null);
      newCanvas.setWidth(700);
      newCanvas.setHeight(500);
      newCanvas.loadFromJSON(item.json, () => {
        newCanvas.renderAll();
      });
      let dataUrl = newCanvas.toDataURL("image/jpeg");
      newCanvas.dispose();
      let link = document.createElement("a");
      link.href = dataUrl;
      link.download = "logo.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    //下载svg
    downloadSVG(item) {
      let newCanvas = new fabric.Canvas(null);
      newCanvas.setWidth(700);
      newCanvas.setHeight(500);
      newCanvas.loadFromJSON(item.json);
      let code = this.getSVG(newCanvas.toSVG());
      newCanvas.dispose();
      // 创建一个下载链接
      var downloadLink = document.createElement("a");
      downloadLink.href = "data:image/svg+xml," + encodeURIComponent(code);
      downloadLink.download = "logo.svg";

      // 模拟点击下载链接
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
    //下载svg透明背景
    downloadSVG2(item) {
      // SVG透明背景
      let cloneCanvas = document.createElement("canvas");
      cloneCanvas.width = 700; // 设置宽度
      cloneCanvas.height = 500; // 设置高度
      let newCanvas = new fabric.Canvas(cloneCanvas);
      newCanvas.loadFromJSON(item.json, () => {
        newCanvas.renderAll();
      });

      var downloadLink = document.createElement("a");
      newCanvas.set({
        backgroundColor: "transparent",
      });
      let b = this.getSVG(newCanvas.toSVG());
      newCanvas.dispose();
      downloadLink.href = "data:image/svg+xml," + encodeURIComponent(b);
      downloadLink.download = "logo.svg";

      // 模拟点击下载链接
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
    //下载透明png
    downloadPng(item) {
      let newCanvas = new fabric.Canvas(null);
      newCanvas.setWidth(700);
      newCanvas.setHeight(500);
      newCanvas.loadFromJSON(item.json, () => {
        newCanvas.renderAll();
      });
      newCanvas.set({
        backgroundColor: "transparent",
      });
      // var dataUrl = newCanvas.toDataURL("image/png");
      // newCanvas.dispose();
      // var link = document.createElement("a");
      // link.href = dataUrl;
      // link.download = "logo.png";
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      newCanvas.getElement().toBlob((blob, err) => {
        if (err) {
          console.error("Error creating blob");
          return;
        }

        // 创建下载链接
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = "highResImage.png"; // 设置下载文件的名称
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // 清理
      }, "image/png");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
.page {
  margin: 20px;
}
.logo-list {
  width: 300px;

  border: 1px solid #000000;
}
</style>
