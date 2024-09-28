<template>
  <div class="page">
    <div class="parent">
      <div
        :class="`div${index + 1} div-item`"
        v-for="(i, index) in showLogoList"
        :key="i.id"
      >
        <template v-if="!loading">
          <a :href="'/logo/' + i.id">
            <el-image
              :src="i.url"
              class="img"
              alt="logo design"
              style="width: 100%; height: 100%"
              fit="contain"
            ></el-image>
          </a>

          <div class="category-name">
            <router-link
              :to="{
                name: 'logo-ideas/keyword',
                params: { category: i.categoryName },
              }"
            >
              <v-chip filter label small link outlined>
                <span> {{ i.categoryName }}</span>
              </v-chip>
            </router-link>
          </div>
        </template>
        <template v-else>
          <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
        </template>
      </div>
    </div>
    <div class="more-btn">
      <a href="/logo-ideas/more">
        <div class="btn">
          <v-btn rounded color="#5E56F6" dark large width="290" height="73">
            More logo templates
          </v-btn>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { getFeaturedLogo } from "@/api/index";
import axios from "axios";
export default {
  props: {},
  data() {
    return {
      // showLogoList: [
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      //   {},
      // ],
      showLogoList: [],
      loading: true,
    };
  },
  async created() {
    await this.fechData();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    async fechData() {
      this.loading = true;
      const response = await getFeaturedLogo(); // 使用 await 等待异步操作完成
      let a = response.data;
      if (a) {
        this.showLogoList = response.data.map((i) => {
          return {
            id: i.bliId,
            url: i.logoAddress,
            categoryName: i.categoryName,
          };
        });
        let element = document.querySelector(".parent");
        if (0 < this.showLogoList.length <= 5) {
          element.style.gridTemplateRows = "repeat(2, 1fr)";
        } else if (5 < this.showLogoList.length <= 9) {
          element.style.gridTemplateRows = "repeat(3, 1fr)";
        } else if (9 < this.showLogoList.length <= 14) {
          element.style.gridTemplateRows = "repeat(5, 1fr)";
        }
      } else {
        this.showLogoList = [];
      }

      this.loading = false;
    },
    async getSvgCode() {
      let that = this;
      for (let i = 0; i < this.showLogoList.length; i++) {
        await Snap.load(this.showLogoList[i].url, function (loadedSvg) {
          let icon = Snap(loadedSvg.node);
          const a = Snap();
          a.append(icon);
          let str = a.toString();
          str = str.replace('width="700"', 'width="100%"');
          str = str.replace('height="500"', 'height="100%"');
          that.showLogoList[i].code = str;
          that.$forceUpdate();
        });
      }
    },
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
.page {
  overflow: hidden;
  text-align: center;
  max-width: 1150px;
  margin: auto;
  padding-top: 10px;
  padding-bottom: 10px;
}

.category-name {
  display: none;
  transition: visibility 0.3s, opacity 0.3s; /* 添加过渡效果 */
  position: absolute;
  top: 1px;
  right: 1px;
  z-index: 10;
  span {
    color: #000000;
  }
}
.more-btn {
  margin: 30px;
  .v-btn--rounded {
    border-radius: 50px;
  }
}

.div-item:hover {
  .category-name {
    display: block;
  }
  .img {
    transform: scale(1.02);
  }
}
.parent {
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
}

.img {
  cursor: pointer;
}
.v-btn {
  text-transform: none;
}
.btn {
  button {
    width: 290px;
    height: 73px;
  }
}
.div-item {
  position: relative;
  border-radius: 15px;
  box-shadow: $shadow-default;
  overflow: hidden;

  aspect-ratio: 7/5;
}
.div1 {
  grid-area: 1 / 1 / 2 / 2;
}
.div2 {
  grid-area: 1 / 2 / 2 / 3;
}
.div3 {
  grid-area: 2 / 1 / 3 / 2;
}
.div4 {
  grid-area: 2 / 2 / 3 / 3;
}
.div5 {
  grid-area: 1 / 3 / 3 / 5;
}
.div6 {
  grid-area: 3 / 1 / 4 / 2;
}
.div7 {
  grid-area: 3 / 2 / 4 / 3;
}
.div8 {
  grid-area: 3 / 3 / 4 / 4;
}
.div9 {
  grid-area: 3 / 4 / 4 / 5;
}

.div10 {
  grid-area: 4 / 1 / 5 / 2;
}
.div11 {
  grid-area: 4 / 2 / 5 / 3;
}
.div12 {
  grid-area: 5 / 1 / 6 / 2;
}
.div13 {
  grid-area: 5 / 2 / 6 / 3;
}
.div14 {
  grid-area: 4 / 3 / 6 / 5;
}
.div15 {
  grid-area: 6 / 1 / 7 / 2;
}
.div16 {
  grid-area: 6 / 2 / 7 / 3;
}
.div17 {
  grid-area: 6 / 3 / 7 / 4;
}
.div18 {
  grid-area: 6 / 4 / 7 / 5;
}

@media screen and (max-width: 768px) {
}
</style>
