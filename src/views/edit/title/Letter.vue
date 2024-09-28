<template>
  <div class="page-title">
    <v-text-field
      label="Name"
      outlined
      dense
      v-model="title.titleText"
      @input="getList"
    ></v-text-field>
    <p>Spacing：</p>
    <v-slider
      v-model="letterSpacing"
      color="#409EFF"
      step="1"
      max="200"
      min="0"
      @change="NewTitle()"
    ></v-slider>
    
  </div>
</template>

<script>
export default {
  name: "Letter",
  components: {},
  props: {
    canvas: Object,
  },

  data() {
    return {
      letterSpacing: 0,
      isLoading: false,
      title:null,
      list: [
        {
          text: "a",
          url: "https://logoaidesign.com/upload/ai-icon/2024/04/16/3460dfa5f86246c4bf9ae4559de1dbab.svg",
        },
        {
          text: "b",
          url: "https://logoaidesign.com/upload/ai-icon/2024/04/16/d43284dd6d3e46a284bcdab21faf151e.svg",
        },
        {
          text: "c",
          url: "https://logoaidesign.com/upload/ai-icon/2024/04/16/b378307ff1b7466ca68fc015f4a248b2.svg",
        },
        {
          text: "d",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/f758262977a64b3596c924e8ee6f28a9.svg",
        },
        {
          text: "e",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/856c283b83794abe81627ed1de88e260.svg",
        },
        {
          text: "f",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/d66b3cb377fa4b61b4bc976ad5333065.svg",
        },
        {
          text: "g",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/f50f21950dbb466f870018ed2822ef63.svg",
        },
        {
          text: "h",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/76484928f3a54648831b04fb9d615609.svg",
        },
        {
          text: "i",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/58709c55435542599b50ab0ed3b45735.svg",
        },
        {
          text: "j",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/6b6b0054f60348db9222d7362d17ae90.svg",
        },
        {
          text: "k",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/b75c7f7542284c7e9b1d34419a18c150.svg",
        },
        {
          text: "l",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/279184c4429d4941b21a9d1eb408d89e.svg",
        },
        {
          text: "m",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/d155c18a50064926b1a8dbb314fb6585.svg",
        },
        {
          text: "n",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/e2adc1c348d74d6985ee863760bc3441.svg",
        },
        {
          text: "o",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/b89da4dbd93c4151baf2bdf9f0f2ff84.svg",
        },
        {
          text: "p",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/66e886ee7e8e4322a6b443a9477c05e3.svg",
        },
        {
          text: "q",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/c1d66ec6154547cb88ec47642abb313f.svg",
        },
        {
          text: "r",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/29819a235cba4c65bccc85c141b31f9d.svg",
        },
        {
          text: "s",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/fa65260855a64ea49d6e0d4519da5d56.svg",
        },
        {
          text: "t",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/ab1185210681415187d5074e065a4eff.svg",
        },
        {
          text: "u",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/cc369e8331a847d4901c66b1e932f7dc.svg",
        },
        {
          text: "v",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/d1508955f2c2425bb00e1a4a906cae7f.svg",
        },
        {
          text: "w",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/6a48d727a7b04b4e9e6ec2311a348ec5.svg",
        },
        {
          text: "x",
          url: "https://logoaidesign.com/upload/ai-icon/2024/05/08/1cb36cb3098a4be98cb64d7aab2682bd.svg",
        },
        {
          text: "y",
          url: "	https://logoaidesign.com/upload/ai-icon/2024/05/08/b58413aac574427f971294b767bd772f.svg",
        },
        {
          text: "z",
          url: "	https://logoaidesign.com/upload/ai-icon/2024/05/08/f379a8256732479fbce7e3787cd0467b.svg",
        },
      ],
      showList: [],
    };
  },
  created() {
    this.title=this.getTitle
  },
  watch: {
    title: {
      deep: true,
      handler(newVal) {
        this.$store.commit("setTitle", newVal);
      },
    },
  },
  computed: {
    getTitle(){
      return this.$store.getters.getTitle
    },
    getLetterList(){
      return this.$store.getters.getLetterList
    },
    
  },
  watch: {},
  methods: {
    async NewTitle() {
      let that = this;
      if (this.isLoading) return;
      this.isLoading = true;
      let targetObject = that.canvas
        .getObjects()
        .find((obj) => obj.name === "letter");

      // 已经存在时删除标题
      if (targetObject) {
        that.canvas.remove(targetObject);
      }

      // 使用Promise来等待所有SVG加载完成
      let svgLoadingPromises = this.showList.map((item) => {
        return new Promise((resolve) => {
          fabric.loadSVGFromURL(item.address, (objects, options) => {
            const group = fabric.util.groupSVGElements(objects, options);
            
            resolve(group);
          });
        });
      });

      // 等待所有SVG加载完成
      let svgObjects = await Promise.all(svgLoadingPromises);

      // 计算并设置每个SVG对象的位置
      let width = 0;
      for (let i = 0; i < svgObjects.length; i++) {
        if (i !== 0) {
          width +=
            svgObjects[i - 1].getBoundingRect().width + that.letterSpacing;
        }
        svgObjects[i].set({
          left: width,
        });
      }

      // 创建包含所有SVG对象的group
      const group = new fabric.Group(svgObjects, {
        name: "letter",
        left: that.canvas.getWidth() / 2,
        top: that.canvas.getHeight() / 2,
        originX: "center",
        originY: "center",
      });

      // 将group添加到canvas
      that.canvas.add(group);

      // 渲染canvas以显示group和其中的SVG对象
      that.canvas.renderAll();
      this.isLoading = false;
    },
    getList() {
      const strList = this.title.titleText.split("");
      this.showList = [];
     
      strList.forEach((obj) => {
        let a = this.getLetterList.find((item) => {
          return item.letter === obj;
        });
        this.showList.push(a);
      });

      this.NewTitle();
    },
    getColor() {
      let targetObject = this.canvas
        .getObjects()
        .find((obj) => obj.name === "letter");
      
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
p {
  margin: 0;
}
</style>
