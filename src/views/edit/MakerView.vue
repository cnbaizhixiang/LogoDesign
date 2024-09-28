<template>
  <div class="page">
    <keep-alive>
      <template v-if="type === 'edit'">
        <NewMake @updatePageType="updatePageType"></NewMake>
      </template>
    </keep-alive>
    <template v-if="type === 'buy'">
      <div class="animated-element">
        <Purchase :id="id" @goBack="type = 'edit'"></Purchase>
      </div>
    </template>
  </div>
</template>

<script>
import Purchase from "./Purchase";
import NewMake from "./NewMake";

export default {
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate: "Edit your own logo-LogoAIDesign.com",
  },
  props: {},
  components: {
    Purchase,
    NewMake,
  },
  data() {
    return {
      type: "edit",
      id: null,
      snackbar: false,
      text: `Hello, I'm a snackbar`,
    };
  },
  computed: {},
  created() {
    let a = localStorage.getItem("logoInfo");

    if (!a) {
      this.$router.push("/");
    } else {
      let b = JSON.parse(a).logoInfo;

      this.$store.commit("setLogoInfo", b);
    }
  },
  mounted() {},

  methods: {
    updatePageType(e) {
      this.id = e.id;
      this.type = e.type;
    },
  },
};
</script>
<style scoped>
.page {
}
.animated-element {
  opacity: 0; /* 初始状态为透明 */
  animation: fadeIn 2s ease-in-out forwards; /* 应用动画 */
}

@keyframes fadeIn {
  0% {
    opacity: 0; /* 动画开始时完全透明 */
  }
  100% {
    opacity: 1; /* 动画结束时完全不透明 */
  }
}
</style>
