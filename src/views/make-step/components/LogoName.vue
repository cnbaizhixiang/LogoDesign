<template>
  <div class="page">
    <div class="page-left">
      <h1>Create a professional logo for free</h1>

      <p>Ready to bring your brand to life? Click here to start your logo!</p>
      <div class="input-width">
        <v-text-field
          label="Name"
          v-model="name"
          :rules="nameRules"
          placeholder="Enter your logo name"
          outlined
          @keyup.enter="goToMake"
          class="input-height"
          ref="nameField"
          required
        ></v-text-field>
        <v-text-field
          label="Slogan"
          @keyup.enter="goToMake"
          v-model="slogan"
          placeholder="Enter your logo Slogan"
          outlined
          class="input-height"
        ></v-text-field>
        <div class="make-btn" @click="goToMake">
          <MakeBtn :text="'Make a logo'" :bgc="'#000000'" :color="'#ffffff'"></MakeBtn>
        </div>
      </div>
    </div>
    <div class="page-right">
      <v-img
        max-width="500"
        contain
        :src="require('@/assets/static/img/index/make-step.svg')"
      ></v-img>
    </div>
  </div>
</template>

<script>
import MakeBtn from "@/components/main/MakeBtn";
export default {
  name: "LogoName",
  components: {
    MakeBtn,
  },
  mounted() {},
  watch: {
    name: {
      deep: true,

      handler() {
        this.onSubmit();
      },
    },
    slogan: {
      deep: true,

      handler() {
        this.onSubmit();
      },
    },
  },
  data() {
    return {
      name: "",
      slogan: "",
      nameRules: [
        (v) => !!v || "name is required",
        (v) => (v && !/^\s*$/.test(v)) || "Name cannot be all spaces",
      ],
    };
  },

  methods: {
    onSubmit() {
      const obj = {
        titleText: this.name,
        sloganText: this.slogan ? this.slogan : null,
      };
      sessionStorage.setItem("logoParmeter", JSON.stringify(obj));
      this.$emit("getInfo", JSON.parse(sessionStorage.getItem("logoParmeter")));
    },
    goToMake() {
      this.$refs.nameField.focus();
      this.$refs.nameField.blur();
      this.$refs.nameField.validate();
      if (!this.$refs.nameField.valid) {
      } else {
        this.$emit("goToMake");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";
.page {
  display: flex;
  margin: 20px;
  justify-content: center;
  .page-left,
  .page-right {
    margin: 20px;
    flex: 1;
  }
}
.input-width {
  max-width: 300px;
}
.input-height {
  height: 56px;
  background: #ffffff;
  margin-bottom: 30px;
}
.make-btn {
  width: 260px;
}
h1 {
  font-size: 32px;
}
p {
  font-size: 20px;
}
@media (max-width: 768px) {
  .page {
    flex-direction: column;
  }
}
</style>
