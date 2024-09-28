<template>
  <div>
    <v-text-field
      v-model="searchTag"
      solo
      label="Keyword"
      @keyup.enter="changeTag(searchTag)"
    >
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <img
            width="45"
            height="45"
            class="search-btn"
            v-throttle="[() => changeTag(searchTag)]"
            :src="require('@/assets/static/img/edit/search.svg')"
            alt="search"
          />
        </v-fade-transition>
      </template>
    </v-text-field>
    <v-sheet data-app class="mx-auto custom-bg-color" max-width="700">
      <v-slide-group multiple show-arrows color="rgba(157, 104, 104, 1)">
        <div class="icon-tags">
          <v-slide-item>
            <v-btn
              class="ma-2 tag-item"
              outlined
              color="#C4C4C4"
              x-small
              @click="changeTag(null)"
            >
              Generic
            </v-btn>
          </v-slide-item>
          <v-slide-item
            v-for="(item, index) in iconTags"
            :key="index"
            v-slot="{ active, toggle }"
          >
            <v-btn
              class="ma-2 tag-item"
              outlined
              color="#C4C4C4"
              x-small
              @click="changeTag(item.name)"
            >
              {{ item.name }}
            </v-btn>
          </v-slide-item>
        </div>
      </v-slide-group>
    </v-sheet>

    <div class="container-list" v-loading="searchLoading">
      <div v-for="(item, index) in icons" :key="item.id" class="container-item">
        <el-image
          :src="item.url"
          class="div_img"
          :alt="item.name"
          @click="selectContainer(item)"
        ></el-image>
      </div>
    </div>

    <div class="load-btn">
      <v-btn
        class="ma-2"
        :loading="loading"
        :disabled="loading"
        v-if="icons.length < total"
        small
        outlined
        color="#0185FF"
        @click="getMoreIcon()"
      >
        Load More
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-cached</v-icon>
          </span>
        </template>
      </v-btn>
      <v-btn class="ma-2" elevation="2" disabled small v-if="icons.length === total"
        >暂无更多数据...</v-btn
      >
    </div>
  </div>
</template>

<script>
import { getIconTagsName } from "@/api/edit";
import { getIconList } from "../../edit";
export default {
  name: "IconList",
  props: {},
  components: {},

  data() {
    return {
      searchTag: "",

      iconTags: [],
      loading: false,
      searchLoading: false,
      query: {
        page: 1,
        limit: 10,
      },
      icons: [],
      total: 0,
    };
  },
  mounted() {
    this.fechTags();
  },
  computed: {
    logoInfo() {
      return JSON.parse(JSON.stringify(this.$store.getters.getLogoInfo));
    },
    isChangeIcon() {
      let a = this.logoInfo.isChangeIcon && this.logoInfo.isChangeIcon === false;
      return a;
    },
  },
  methods: {
    fechTags() {
      getIconTagsName().then((response) => {
        let a = response.data;
        if (a) {
          this.iconTags = response.data.map((i) => {
            return {
              id: i.blId,
              name: i.labelName,
            };
          });
        } else {
          this.iconTags = [];
        }
      });
      this.changeTag();
    },
    async changeTag(name) {
      if (this.searchLoading) return;
      this.query.page = 1;
      this.searchLoading = true;
      let obj = {
        page: this.query.page,
        limit: this.query.limit,
        tag: name || null,
      };
      this.tagName = name || null;

      getIconList(obj)
        .then((response) => {
          this.icons = response.icons;
          this.total = response.total;
        })
        .finally(() => {
          this.searchLoading = false;
        });
    },
    getMoreIcon() {
      let obj = {
        page: ++this.query.page,
        limit: this.query.limit,
        tag: this.tagName,
      };
      this.loading = true;

      getIconList(obj)
        .then((response) => {
          let a = response.icons;
          this.icons = [...this.icons, ...a];
          this.total = response.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    selectContainer(item) {
      if (this.isChangeIcon) {
        this.$my_message({
          content: "禁止修改!",
          type: "error",
        });
        return;
      }
      this.$emit("changeIcon", item);
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
.div_img {
  width: 40px;
  height: 40px;
}
.container-item:hover {
  border: 1px #20a0ff solid;
  border-radius: 10px;
  transform: scale(1.1);
}
.icon-tags {
  .tag-item {
    cursor: pointer;
  }
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
.load-btn {
  display: flex;
  justify-content: center;
}
.search-btn:hover {
  cursor: pointer;
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
