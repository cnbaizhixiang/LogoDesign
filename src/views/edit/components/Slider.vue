<template>
  <div>
    <v-row>
      <v-col class="pr-4">
        <p>{{ name }}：</p>
        <v-slider
          color="#409EFF"
          v-model="internalValue"
          :max="max"
          :step="step"
          :min="min"
          @change="emitChange"
          class="align-center"
          hide-details
        >
          <template v-slot:append>
            <v-text-field
              v-model="internalValue"
              @change="emitChange"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 40px"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    max: Number,
    step: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    name: String,
  },
  components: {},
  data() {
    return {
      internalValue: this.value,
    };
  },
  watch: {
    // 监听props值的变化，并更新内部值
    value(newVal) {
      this.internalValue = newVal;
    },
  },

  created() {},
  mounted() {},

  methods: {
    emitChange() {
      // 通过自定义事件将值的变化通知给父组件
      this.$emit("changeValue", this.internalValue);
    },
  },
};
</script>

<style scoped lang="scss"></style>
