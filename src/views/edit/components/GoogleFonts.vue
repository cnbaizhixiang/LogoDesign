<template>
  <div class="header">
    <div class="div-height"></div>
    <div
      class="google-font"
      v-show="list.length > 0"
      v-for="(font, index) in list"
      :key="index"
      @click="changeGoogleFont(font)"
      style="cursor: pointer"
    >
      <v-card elevation="4" class="box-card">
        <v-card-title>
          {{ font.family }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p :style="{ fontFamily: font.family }" class="googleFonts">
            {{ titleText }}
          </p>
        </v-card-text>
      </v-card>
    </div>
    <div v-show="!list.length > 0">
      <el-empty :image-size="200"></el-empty>
    </div>

    <div class="load-btn">
      <v-btn
        class="ma-2"
        :loading="loading"
        :disabled="loading"
        v-if="list.length < fonts.length"
        small
        outlined
        color="#0185FF"
        @click="loadMoreFonts"
      >
        Load More
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-cached</v-icon>
          </span>
        </template>
      </v-btn>
      <v-btn class="ma-2" elevation="2" disabled small v-if="list.length === fonts.length"
        >暂无更多数据...</v-btn
      >
    </div>
  </div>
</template>

<script>
import WebFont from "webfontloader";

export default {
  name: "GoogleFonts",
  props: {},
  data() {
    return {
      titleText: "",
      fonts: [],
      list: [],
      loading: false,
      loadedCount: 0,
      itemsPage: 10,
    };
  },

  mounted() {},
  watch: {},

  computed: {},

  methods: {
    handleCommand(command) {
      const url = command.replace("http://", "https://");
      let object = { url: url };
      this.$emit("changeGoogleFont", object);
    },
    async fetchFonts(text) {
      this.loading = true;
      this.titleText = text;
      const apiUrl =
        "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB7WQ7cqynTCRqJ2S_VjORZLbRYu2uwnjk"; // 替换为您的API密钥

      try {
        const response = await fetch(apiUrl);

        const data = await response.json();

        let a = data.items;

        this.fonts = a.map((font_obj) => {
          return {
            family: font_obj.family,
            category: font_obj.category, // Add category property
            url: font_obj.files.regular,
            childFamily: font_obj.files,
          };
        });

        this.loadMoreFonts();
      } catch (error) {
        console.error("Error fetching Google Fonts API:", error);
      }

      this.loading = false;
    },

    async loadMoreFonts() {
      let a = this.fonts.slice(this.loadedCount, this.loadedCount + this.itemsPage);
      await this.loadFonts(a);
      this.list = [...this.list, ...a];

      this.loadedCount = this.loadedCount + a.length;
    },

    async loadFonts(a) {
      this.loading = true; // Set the loadingFonts flag to true before starting font loading
      let newFonts;

      newFonts = a.map((font_obj) => font_obj.family);

      try {
        await new Promise((resolve, reject) => {
          WebFont.load({
            google: {
              families: newFonts,
            },
            active: () => {
              // All fonts loaded successfully
              // Set the loadingFonts flag to false
              resolve(); // Resolve the Promise after fonts are loaded
              this.$forceUpdate();
              this.loading = false;
            },
          });
        });
      } catch (error) {
        console.error("Error loading fonts:", error);
        this.loading = false;
      }
    },

    changeGoogleFont(font) {
      font.url = font.url.replace("http://", "https://");
      this.$emit("changeGoogleFont", font);
    },
  },
};
</script>

<style scoped>
.div-height {
  height: 20px;
}
.box-card {
  width: 100%;
  margin-top: 10px;
}

.box-card:hover {
  transform: scale(1.03);
}

.googleFonts {
  font-size: 28px;
}

.load-icon {
  margin-top: 20px;
  text-align: center;
}

.el-icon-loading {
  font-size: 36px;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
.load-btn {
  display: flex;
  justify-content: center;
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
