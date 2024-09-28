<template>
  <div class="page">
    <h2>Create stunning, customizable logos with our AI assistant.</h2>

    <div class="list">
      <div class="list-left">
        <v-img
          class="left-btn"
          @click="getMoreLogo(-1)"
          :src="require('@/assets/static/img/logo/Left Vector.svg')"
        >
        </v-img>
      </div>
      <div class="parent">
        <div
          :class="`div${index + 1} div-item`"
          v-for="(i, index) in showLogoList"
          :key="i.id"
          @click="goToDetail(i.id)"
        >
          <el-image
            :src="i.url"
            fit="contain"
            style="width: 100%; height: 100%"
            @load="handleImageLoad(index)"
            v-show="!loading"
            class="fade-in"
          >
          </el-image>

          <!-- <v-img :src="i.url" v-if="!loading" contain> </v-img> -->
          <v-skeleton-loader
            v-show="loading"
            class="mx-auto"
            type="image"
          ></v-skeleton-loader>
        </div>
      </div>
      <div class="list-right">
        <v-img
          @click="getMoreLogo(1)"
          :src="require('@/assets/static/img/logo/Right Vector.svg')"
          class="right-btn"
        ></v-img>
      </div>
    </div>

    <div class="more-logo">
      <a href="/logo-ideas/more">
        <v-btn elevation="2" x-large width="280" height="60" color="F5F5F5"
          ><span>See all</span></v-btn
        ></a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showLogoList: Array,
  },
  data() {
    return {
      loading: false,
      loadedImages: 0, // 已加载的图片数量
      totalImages: 9, // 总图片数量
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    getMoreLogo(index) {
      this.$emit("fetchLogo", index);
      this.$emit("closeTimer");
    },
    changeLoading(value) {
      this.loading = value;
    },
    handleImageLoad(index) {
      this.loading = true;
      this.loadedImages++; // 图片加载完成，增加计数器

      if (this.loadedImages === this.totalImages) {
        // 所有图片都已加载完成
        this.loadedImages = 0;
        this.loading = false;
      }
    },
    goToDetail(id) {
      const childWindow = window.open(`/logo/${id}`, "_blank");
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
}
/* styles.css */

.fade-in {
  animation: fadeIn 0.2s ease-in-out forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
a {
  text-decoration: none;
  color: #666666;
}
h2 {
  font-size: 36px;
  font-family: Inter;

  padding: 10px;
  color: #ffffff;
}
.list {
  display: flex;
  align-items: center;
}
.left-btn,
.right-btn {
  margin: 30px;
  cursor: pointer;
}
.v-btn {
  text-transform: none;
}
.parent {
  width: 100%;
  max-width: 1150px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
}
.more-logo {
  padding: 40px;
  span {
    color: #666666;
    font-size: 36px;
  }
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.div-item {
  border-radius: 15px;
  box-shadow: $shadow-default;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 7/5;
}
.div-item:hover {
  transform: scale(1.02);
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
@media screen and (max-width: 768px) {
  .left-btn,
  .right-btn {
    width: 20px;
    height: 20px;
  }
  h2 {
    font-size: 1.5rem;
  }
}
</style>
