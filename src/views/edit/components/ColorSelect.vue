<template>
  <div class="color-page">
    <slot></slot>
    <div class="color-item">
      <div class="color-bgc" :style="{ backgroundColor: colorValue }">
        <v-menu
          :close-on-content-click="false"
          offset-y
          origin="center center"
          :nudge-width="200"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="color-item" v-bind="attrs" v-on="on"></div>
          </template>
          <v-list>
            <v-tabs>
              <v-tab>Solid</v-tab>
            </v-tabs>

            <v-card flat>
              <v-card-text>
                <v-color-picker
                  v-model="colorValue"
                  @input="changeColor"
                  show-swatches
                  show-alpha="false"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorSelect",
  props: {
    color: String,
    gradient: Object,
    colorIndex: Number,
  },
  computed: {},
  data() {
    return {
      colorValue: "#FF00FF",
      newColor: "",
      colors: ["#FF00FF", "#FF00FF", "#FF00FF"],
      menu: false,

      gradientIndex: 0,
      gradientTypeList: ["linear", "radial"],
    };
  },
  watch: {},
  mounted() {
    let color = new fabric.Color(this.color);
    this.colorValue = "#" + color.toHex();
  },
  methods: {
    changeColor() {
      let obj = {
        value: this.colorValue,
        index: this.colorIndex,
      };

      this.$emit("changeColor", obj);
    },
  },
};
</script>
<style scoped lang="scss">
.color-page {
}
.color-list {
  display: flex;
  align-items: center;
}
.color-item {
  width: 18px;
  height: 18px;
  margin: 5px;

  cursor: pointer;
}
.color-bgc {
  border-radius: 20px;
  border: 1px solid #000000;
  height: 100%;
}
</style>
