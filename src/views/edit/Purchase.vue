<template>
  <div class="content">
    <div class="header">
      <div class="centered-content">
        <div class="div-header-left">
          <i class="el-icon-back custom-icon" @click="preview()"
            ><span> Preview</span></i
          >
        </div>
        <div class="div-header-center"><p class="custom-icon">Purchase</p></div>
        <div class="div-header-right">
          <i class="el-icon-close custom-icon" @click="goBack()"></i>
        </div>
      </div>
    </div>
    <div class="purchase-table">
      <PurchaseTable
        @getPriceType="getPriceType"
        @getType="getType"
      ></PurchaseTable>
    </div>
    <div class="div-footer">
      <div class="div-footer-left">
        <el-checkbox v-model="isFix"
          ><p>Designer Fix：<span style="color: red">$40</span></p></el-checkbox
        >

        <div class="describe">
          <span>
            If you need to make changes to this logo which are not possible on
            our tool, select this option to have our designer adjust it for you
            manually (up to 3 revisions)
          </span>
        </div>
      </div>
      <div class="div-footer-right">
        <div class="footer-right-1">
          <h3>Total:</h3>
          <h3 style="color: rgb(255, 73, 73)">${{ getTotal }}</h3>
        </div>
        <div class="footer-right-2">
          <p>Coupon/Promo code?</p>
          <div class="demo-input-suffix">
            Coupon/Promo code?：
            <el-input placeholder="请填写优惠券码" v-model="coupon"> </el-input>
            <el-button @click="getDiscountCode">获取</el-button>
          </div>
        </div>
        <div class="footer-right-3">
          <div class="btn-left">
            <el-image
              :src="require(`@/assets/static/images/paypal.svg`)"
              class="btn-img"
            ></el-image>
          </div>

          <div class="text-center">
            <v-btn
              color="red lighten-2"
              dark
              @click="getData"
              :loading="loading"
            >
              Pay With Stripe
            </v-btn>
          </div>

          <!-- <div class="btn-right" @click="goToPay">
            <p>Pay with <strong>Stripe</strong></p>
          </div> -->
        </div>
        <div class="footer-right-4">
          <el-image
            v-for="(i, index) in images"
            :key="index"
            :src="require(`@/assets/static/images/${i.fileName}`)"
            class="div_img"
          ></el-image>
        </div>
      </div>
    </div>

    <!-- 支付弹窗 -->
    <template v-if="dialog">
      <v-dialog v-model="dialog" persistent width="500">
        <PayForme
          :clientSecret="clientSecret"
          @closePayment="closePayment"
        ></PayForme>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import PurchaseTable from "@/components/purchase/PurchaseTable.vue";
import PayForme from "@/components/main/PayForm";
import { loadStripe } from "@stripe/stripe-js";

import { getLogoType, getStripePay, getDiscount } from "@/api/purchase";
export default {
  name: "Purchase",
  props: {
    id: Number,
  },
  components: {
    PurchaseTable: PurchaseTable,
    PayForme: PayForme,
  },
  created() {},
  mounted() {},
  data() {
    return {
      selectType: "PRO",
      typePrice: 0,
      isFix: false,
      coupon: null,
      loading: false,
      confimCoupon: null,
      couponPrice: 0,

      images: [
        { fileName: "credit-1.svg" },
        { fileName: "credit-2.svg" },
        { fileName: "credit-3.svg" },
        { fileName: "credit-4.svg" },
      ],
      dialog: false,
      logoType: null,
      clientSecret: null,
    };
  },
  computed: {
    getTotal() {
      let price;
      price = this.typePrice;
      if (this.couponPrice) {
        price = price - this.couponPrice;
      }
      if (this.isFix) {
        price = price + 40;
      }
      return price;
    },
  },
  methods: {
    preview() {
      this.$emit("showCarousel");
    },
    goBack() {
      this.$emit("goBack");
    },
    getType(e) {
      this.selectType = e;
      let a = this.logoType.filter((item) => item.ocGrade === this.selectType);
      this.typePrice = a[0].ocPrimary;
      this.confimCoupon = "";
      this.couponPrice = 0;
    },
    getPriceType(e) {
      this.logoType = e;
    },

    async getData() {
      let that = this;

      let data = {
        grade: this.selectType,
        logoId: this.id,
        isDesigner: this.isFix,
        coupon: this.confimCoupon,
      };
      this.loading = true;

      getStripePay(data)
        .then((res) => {
          this.clientSecret = res.data;
          //打开支付弹窗
          this.dialog = true;
          //限制时间关闭支付
          // setTimeout(() => {
          //   this.closePayment();
          //   this.$my_message({
          //     content: "超时关闭!",
          //     type: "error",
          //   });
          // }, 5 * 60 * 1000);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getDiscountCode() {
      if (!this.coupon) {
        this.$my_message({
          content: "优惠券码不能为空！",
          type: "warning",
        });
        return;
      }
      let obj = {
        code: this.coupon,
        type: this.selectType,
      };
      getDiscount(obj).then((res) => {
        this.confimCoupon = this.coupon;
        this.couponPrice = res.data;
        this.$my_message({
          content: "获取成功！",
          type: "success",
        });
      });
    },
    closePayment() {
      this.dialog = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
  background: #f8f8f8;

  overflow: hidden;
}
.header {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center; /* 垂直居中 */
  background: #fff;
}
.custom-icon {
  margin-left: 10px;
  font-size: 20px; /* 设置图标的大小 */
  color: #5e56f6; /* 设置图标的颜色 */
  font-weight: Bold;
  cursor: pointer;
}
.div-header-left {
  flex: 1;
  text-align: left;
}
.div-header-center {
  flex: 1;
}
.div-header-right {
  flex: 1;
  text-align: right;
}
.purchase-table {
  margin-top: 50px;
  margin-bottom: 50px;
  position: relative;
}

.centered-content {
  width: 100%;

  padding: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
}

.div-footer {
  display: flex;
  margin: 0 auto;
  padding: 5px;
  max-width: 1136px;
  margin-bottom: 50px;
}
.div-footer-left {
  text-align: left;
  max-height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px;
  background-color: rgb(255, 255, 255);
  flex: 1;
  p {
    font-weight: bold;
    color: #000000;
  }
}
.div-footer-right {
  display: flex;
  flex-direction: column;
  margin-left: 100px;

  flex: 1;
}
p {
  margin: 0;
  font-size: 14px;
}
.describe {
  font-size: 12px;
  padding-top: 5px;
  max-width: 88%;
  color: rgb(102, 102, 102);
  line-height: 1.5;
}

.footer-right-2,
.footer-right-3,
.footer-right-4 {
  justify-content: flex-end;
  margin: 5px;
  align-items: center;
  display: flex;
}
.footer-right-2 p {
  font-size: 12px;
  color: #20a0ff;
}
.footer-right-1 {
  display: flex;

  justify-content: space-between;
  align-items: center;
}
.footer-right-3 {
  padding: 5px;
}
.btn-left,
.btn-right {
  width: 150px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
}
.btn-left {
  background-color: #ffc439;
}
.btn-right {
  margin-left: 10px;
  background-color: #6875e2;
  color: #ffffff;
  font-weight: 600;
}
.btn-img {
  width: 60px;
}
h3 {
  margin: 5px;
}
.div_img {
  margin: 3px;
}

@media screen and (max-width: 768px) {
  .div-footer {
    flex-direction: column;
  }
  .div-footer-right {
    margin-left: 0;
  }
  .div-header-left span {
    display: none;
  }
}
</style>
