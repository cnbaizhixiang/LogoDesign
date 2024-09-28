<template>
  <div class="page">
    <div class="div-width">
      <div class="logo-list">
        <div v-for="i in logoList" :key="i.id" class="logo-item">
          <a :href="'/logo/' + i.id">
            <el-image
              :src="i.url"
              fit="contain"
              class="img"
              style="width: 100%; height: 100%"
            ></el-image>
          </a>
          <div class="category-name" v-if="i.categoryName">
            <router-link
              :to="{
                name: 'logo-ideas/keyword',
                params: { category: i.categoryName },
              }"
            >
              <v-chip filter small label link outlined>
                <span> {{ i.categoryName }}</span>
              </v-chip>
            </router-link>
          </div>
          <div class="footer">
            <!-- <v-btn x-small @click="editLogo(i.id)">编辑</v-btn> -->
          </div>
        </div>
      </div>
    </div>
    <v-btn
      elevation="2"
      @click="fechData"
      class="load-btn"
      v-if="logoList.length !== total"
      :loading="loading"
      :disabled="loading"
      width="280"
      height="60"
      >Load More...<template v-slot:loader>
        <span class="custom-loader">
          <v-icon light>mdi-cached</v-icon>
        </span>
      </template></v-btn
    >

    <v-btn
      elevation="2"
      class="load-btn"
      v-if="logoList.length === total"
      disabled
      width="280"
      height="60"
      >暂无更多数据...</v-btn
    >
  </div>
</template>

<script>
import { getLogoDetail } from "@/api/logoSearch";
export default {
  props: {
    logoList: Array,
    total: Number,
  },
  data() {
    return {
      query: {
        page: 1,
        limit: 12,
      },
      loading: false,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.applyFadeInDelay();
  },
  beforeDestroy() {},
  methods: {
    applyFadeInDelay() {
      const fadeElems = document.querySelectorAll(".fade-in-delay");

      fadeElems.forEach((elem, index) => {
        const fadeDelay = (index + 1) * 0.5; // 设置每个元素的延迟时间，这里示例为每个元素增加0.5秒的延迟
        elem.style.animationDelay = `${fadeDelay}s`;
      });
    },
    fechData() {
      let a = {
        page: ++this.query.page,
        limit: this.query.limit,
      };
      this.loading = true;
      this.$emit("fetchLogo", a);
    },

    closeLoading() {
      this.loading = false;
    },
    editLogo(id) {
      getLogoDetail(id).then((res) => {
        let logoInfo = res.data;

        logoInfo.id = null;

        localStorage.setItem("logoInfo", JSON.stringify({ logoInfo }));

        const childWindow = window.open("/edit", "_blank");
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
.page {
}
.div-width {
  max-width: $max-width-1;
  padding: 20px;
  margin: auto;
}
.v-btn {
  text-transform: none;
}
.img {
  // max-width: 262px;
}
.logo-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .logo-item {
    padding: 5px;
    border-radius: 15px;
    width: 262px;
    aspect-ratio: 7/5;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    opacity: 0;
    animation: fade-in 1s ease-in-out forwards;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.logo-item:hover {
  .category-name,
  .footer {
    display: block;
  }
  .img {
    transform: scale(1.02);
  }
}
.category-name {
  display: none;
  transition: visibility 0.3s, opacity 0.3s; /* 添加过渡效果 */
  position: absolute;
  top: 5px;
  right: 8px;
  z-index: 10;
  span {
    color: #000000;
  }
}
.footer {
  display: none;
  transition: visibility 0.3s, opacity 0.3s; /* 添加过渡效果 */
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.load-btn {
  margin: 20px;

  font-size: 24px;
  color: #666666;
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
  .img {
    // max-width: 40vw;
  }
  .logo-list {
    justify-content: center;
  }
}
</style>
