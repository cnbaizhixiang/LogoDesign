<template>
  <div>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> Payment </v-card-title>

      <v-card-text>
        <div class="pay-form">
          <template v-if="!overlay"> 正在加载中... </template>
          <div id="payment-element"></div>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" text @click="closePayment"> close </v-btn>
        <v-btn
          color="primary"
          text
          @click="payPrice"
          v-if="overlay"
          :loading="loading"
        >
          Payment
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
export default {
  name: "PayForm",
  props: {
    clientSecret: String,
  },
  components: {},
  mounted() {
    this.getData();
  },
  data() {
    return {
      stripe: null,
      elements: null,
      paymentElement: null,
      overlay: false,
      loading: false,
    };
  },
  computed: {},
  methods: {
    async getData() {
      let that = this;

      try {
        that.stripe = await loadStripe(
          "pk_test_51Oa8HKAJ5DZ5Fc1viSW4ZHn81eQhfpVpSb0Tww8v5SGerLT3r85K8ciHSnl6To2NWzCWOc1kJUNblaS1SwcgA1Ri00OfbuBKhe"
        );

        let clientSecret = that.clientSecret;
        const appearance = {
          theme: "flat",
          variables: { colorPrimaryText: "#262626" },
        };

        that.elements = that.stripe.elements({ clientSecret, appearance });

        that.paymentElement = that.elements.create("payment");

        that.paymentElement.mount("#payment-element");
        that.paymentElement.on("ready", () => {
          that.overlay = true;
          // 在这里，您可以开始收集付款信息
        });
      } catch (error) {
        this.$my_message({
          content: "网络错误!",
          type: "error",
        });
      }
      //限制时间关闭支付
      // setTimeout(() => {
      //   this.closePayment();
      //   this.$my_message({
      //     content: "超时关闭!",
      //     type: "error",
      //   });
      // }, 5 * 60 * 1000);
    },
    async payPrice() {
      // 使用Stripe.js确认支付
      let elements = this.elements;
      let that = this;
      this.loading = true;
      this.stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/home`,
            payment_method_data: {
              // billing_details: {
              //   name: 'Jenny Rosen',
              //   email: 'jenny.rosen@example.com',
              // }
            },
          },
        })
        .then(function (result) {
          if (result.error) {
            // Inform the customer that there was an error.
            that.$my_message({
              content: result.error.message,
              type: "error",
            });
          }
        })
        .catch((error) => {
          that.$my_message({
            content: "支付失败",
            type: "error",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    closePayment() {
      if (this.paymentElement) {
        // this.paymentElement.unmount(); // 卸载支付元素
        this.paymentElement = null; // 清空引用
      }

      this.$emit("closePayment");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pay-form {
  margin: 10px;
}
</style>
