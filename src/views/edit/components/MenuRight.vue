<template>
  <div>
    <template v-if="showElement === 'title'">
      <!-- title类组件 -->
      <v-tabs v-model="tabValue">
        <v-tab>Edit Name</v-tab>
        <v-tab>Edit Slogan</v-tab>
        <!-- <v-tab v-if="logoInfo.letter.id">Edit Letter</v-tab> -->
      </v-tabs>
    </template>
    <template v-if="showElement === 'icon'">
      <v-tabs v-model="tabValue">
        <v-tab key="symbol">Symbol</v-tab>
        <v-tab key="container">Container</v-tab>
      </v-tabs>
    </template>
    <v-card flat>
      <v-card-text>
        <component
          :is="showComponent"
          :canvas="canvas"
          ref="IconComponent"
          :key="elementKey"
        ></component>

        <keep-alive>
          <template v-if="showComponent === 'Icon'">
            <IconList @changeIcon="changeIcon"></IconList>
          </template>
        </keep-alive>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Icon from "../icon/Icon";
import Container from "../container/Container";
import Title from "../title/Title";
import Letter from "../title/Letter";
import Slogan from "../slogan/Slogan";
import IconList from "../icon/components/IconList";
export default {
  name: "MenuRight",
  props: {
    canvas: Object,
    showElement: String,
    elementKey: Number,
    tabRight: Number,
  },
  components: {
    Icon,
    Container,
    Title,
    Slogan,
    Letter,
    IconList,
  },
  computed: {
    showComponent() {
      let value;
      if (this.showElement === "title") {
        if (this.tabValue === 0) {
          value = "Title";
        } else if (this.tabValue === 1) {
          value = "Slogan";
        } else if (this.tabValue === 2) {
          value = "Letter";
        }
      } else if (this.showElement === "icon") {
        if (this.tabValue === 0) {
          value = "Icon";
        } else if (this.tabValue === 1) {
          value = "Container";
        }
      }
      return value;
    },
  },
  mounted() {
    this.tabValue = this.tabRight;
  },
  watch: {
    tabValue: {
      deep: true,
      handler(newVal) {},
    },
  },
  data() {
    return {
      tabValue: 0,
      icons: [],
    };
  },

  methods: {
    changeIcon(e) {
      this.$refs.IconComponent.selectContainer(e);
    },
  },
};
</script>
<style scoped lang="scss">
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
</style>
