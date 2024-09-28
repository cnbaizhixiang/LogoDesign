<template>
  <v-snackbar v-model="visible" top :color="type | TypeFilter">
    {{ content }}

    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="visible = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "MyMessage",
  filters: {
    TypeFilter(type) {
      const statusMap = {
        success: "#00C853",
        error: "#BF360C",
        warning: "#FFCA28",
        info: "#424242",
      };
      return statusMap[type];
    },
  },

  data() {
    return {
      content: "",
      type: "info",
      visible: false,
      time: 3000,
    };
  },
  mounted() {
    this.close();
  },

  methods: {
    close() {
      window.setTimeout(() => {
        this.visible = false;
      }, this.time);
    },
  },
};
</script>
