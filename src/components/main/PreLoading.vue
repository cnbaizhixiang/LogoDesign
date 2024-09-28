<template>
  <div class="full-screen-loader">
    <img
      class="loader-icon"
      :src="require('@/assets/static/img/home/loading.svg')"
    />
  </div>
</template>

<script>
export default {
  name: "PreLoading",

  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},

  methods: {},
};
</script>

<style scoped lang="scss">
.full-screen-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255); /* 半透明背景 */
  z-index: 9999; /* 确保遮罩层在最上层 */
}

.loader-icon {
  width: 20vmin; /* 使用视口宽度的50%，可以根据需要调整 */
  height: auto; /* 高度自动调整 */
  /* 可以添加其他样式，如动画等 */
}
</style>
