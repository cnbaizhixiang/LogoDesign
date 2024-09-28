<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    document.dispatchEvent(new Event("render-event"));
  },
};
</script>
<style scope>
body {
  min-width: 320px;
}
</style>
