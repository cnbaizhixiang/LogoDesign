<template>
  <div class="select-fonts">
    <v-select
      dense
      v-model="selectFont"
      :items="fontsOptions"
      :item-text="(item) => item.name"
      label="fonts style"
      outlined
    >
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item :class="" @click="changeFont(item)">
            <v-list-item-title>
              <div class="div-font">
                <el-image
                  :src="item.imgUrl"
                  class="font-img"
                  :alt="item.name"
                  fit="contain"
                ></el-image>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-content>
      </template>
    </v-select>

    <el-image
      :src="require('@/assets/static/img/edit/Google.svg')"
      style="width: 35px; height: 42px"
      class="google"
      @click="showGoogle"
    ></el-image>
  </div>
</template>
<script>
import { getFontsGroup } from "@/api/edit";
export default {
  name: "FontSelect",
  props: {
    selectTypeFont: String,
  },

  data() {
    return {
      fontsOptions: [],
      selectedFruits: [],
      fruits: ["Apples", "Apricots", "Avocado"],
      selectFont: "font2",
    };
  },
  computed: {
    fontList() {
      return this.$store.getters.getFontList;
    },
  },
  watch: {
    selectFont(newVal, oldVal) {
      if (newVal !== this.selectTypeFont) {
        let a = this.fontsOptions.filter((i) => i.name === newVal);
        this.$emit("changeFont", a[0]);
      }
    },
  },
  mounted() {
    this.fechData();
    this.selectFont = this.selectTypeFont;
  },
  methods: {
    fechData() {
      if (this.fontList.length > 0) {
        this.fontsOptions = this.fontList;
      } else {
        //第一次获取

        getFontsGroup(null).then((response) => {
          let a = response.data;
          if (a) {
            this.fontsOptions = response.data.map((i) => {
              return {
                id: i.bfgId,
                name: i.fontGroupTitle,
                imgUrl: i.fontAddress,
                url: i.defaultFont,
              };
            });
          } else {
            this.fontsOptions = [];
          }
          this.$store.commit("setFontList", this.fontsOptions);
        });
      }
    },

    async getImg(item) {
      const url = item.url;

      const opentype = require("opentype.js");
      if (!url) {
        return;
      }
      let font = await opentype.load(url);
      let path = font.getPath(item.name, 0, 0, 42);

      let img = Snap(
        Snap.parse(
          `<svg  xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid meet"></svg>`
        ).node
      );
      let a = img.path(path.toPathData());
      let pathBBox = path.getBoundingBox();
      // 计算调整坐标，以使左上角为起点
      let adjustX = -pathBBox.x1;
      let adjustY = -pathBBox.y1;
      a.transform("t" + adjustX + "," + adjustY);
      img.attr({
        viewBox: `0 0 ${a.getBBox().width} ${a.getBBox().height}`,
      });
      const blob = new Blob([img.toString()], { type: "image/svg+xml" });
      // 使用FileReader将Blob转换为Base64编码的字符串
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
          resolve(event.target.result); // 这里得到的就是Base64编码的字符串
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.readAsDataURL(blob);
      });
    },
    changeFont(item) {
      this.selectFont = item.name;
    },
    showGoogle() {
      this.$emit("showGoogle");
    },
  },
};
</script>
<style scoped lang="scss">
.select-fonts {
  display: flex;

  .google {
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.div-font {
  text-align: center;
}

.font-img {
  max-width: 200px;
  height: 20px;
}
</style>
