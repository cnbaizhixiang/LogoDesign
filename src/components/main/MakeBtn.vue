<template>
  <div class="btn" :style="getBackgroundStyle()">
    <span>{{ text }}</span>
    <span class="mdi mdi-arrow-right-thin" style="font-size: 36px"></span>
  </div>
</template>

<script>
export default {
  name: "MakeBtn",
  props: {
    bgc: String,
    color: String,
    text: String,
  },
  data() {
    return {};
  },
  methods: {
    getBackgroundStyle() {
      return {
        backgroundColor: this.bgc,
        color: this.color,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn {
  cursor: pointer;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;

  span {
    font-size: 21px;
    font-family: Inter;
  }
}
</style>
