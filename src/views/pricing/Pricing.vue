<template>
  <div class="page">
    <PreLoading v-if="pageLoading"></PreLoading>
    <Menu></Menu>
    <div class="page-info div-width">
      <h1>Pay once - no subscription</h1>
      <p>
        It's free to design a logo. Pay one-short when you want to download the logo
        package.
      </p>
      <div class="type-table">
        <div class="table-item">
          <LogoType :typeInfo="basic"></LogoType>
        </div>
        <div class="table-item">
          <LogoType :typeInfo="pro"></LogoType>
        </div>
        <div class="table-item">
          <LogoType :typeInfo="brand"></LogoType>
        </div>
      </div>
    </div>

    <div class="coupon-bgc">
      <div class="coupon-img div-width">
        <div class="coupon-left">
          <div class="coupon-width">
            <h2>AILogo Coupon Code</h2>
            <p>
              If you are new to LogoAI we have a special discount for you. Please click on
              the following button to receive your discount coupon.
            </p>

            <div class="make-btn" @click="dialog = true">
              <MakeBtn :text="'GET COUPON'" :bgc="'#000000'" :color="'#ffffff'"></MakeBtn>
            </div>
          </div>
        </div>
        <div class="coupon-right">
          <v-img
            max-width="380"
            :src="require(`@/assets/static/img/pricing/coupon.svg`)"
            class="img"
          ></v-img>
        </div>
      </div>
    </div>

    <div class="discount">
      <div class="discount-info">
        <h1>Volume Discount Code</h1>
        <p>
          For return customers, get at least 40% discount when you use the code "LOGOPRO".
          The more you buy, the higher the discount
        </p>
      </div>

      <div class="type-table div-width">
        <div class="table-item">
          <DiscountCode :countInfo="count_40"></DiscountCode>
        </div>

        <div class="table-item">
          <DiscountCode :countInfo="count_50"></DiscountCode>
        </div>
        <div class="table-item">
          <DiscountCode :countInfo="count_60"></DiscountCode>
        </div>
      </div>
    </div>

    <div class="questions-bgc">
      <Questions></Questions>
    </div>

    <v-dialog v-model="dialog" max-width="360">
      <template v-slot:activator="{ on, attrs }"> </template>
      <v-card>
        <v-card-title class="text-h8">
          <p>Please enter your email to receive our logo discount code.</p>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-btn
              :loading="loading"
              :disabled="!valid || loading"
              color="secondary"
              elevation="2"
              @click="getDiscount"
              >Email Me</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <Footer></Footer>
  </div>
</template>

<script>
import Menu from "@/components/main/Menu";

import Footer from "@/components/main/Footer.vue";
import Questions from "@/components/main/Questions.vue";
import LogoType from "./components/LogoType.vue";
import DiscountCode from "./components/DiscountCode.vue";
import MakeBtn from "@/components/main/MakeBtn.vue";
import { getDiscountCode } from "@/api/user_email";
import { getDinnerCost, getTypeDiscount } from "@/api/purchase";
import PreLoading from "@/components/main/PreLoading";
export default {
  name: "PricingView",
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate: "pricing & discount code.-LogoAIDesign.com",
  },
  components: {
    Menu,

    Footer,
    Questions,
    LogoType,
    MakeBtn,
    DiscountCode,
    PreLoading,
  },
  data() {
    return {
      dialog: false,
      email: "",
      valid: true,
      loading: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      basic: {
        name: "Basic",
        price: "29",
        color: "#C9C9C9",
        list: [
          {
            title: "3-day unlimited change",
            describe: "",
          },
          {
            title: "Logo resolution",
            describe: "800 x 600 pixles",
          },
          {
            title: "Transparent logo background",
            describe: "",
          },
          {
            title: "Black & white logo",
            describe: "",
          },
        ],
      },
      pro: {
        name: "Pro",
        price: "59",
        color: "#77F0B6",
        list: [
          {
            title: "3-day unlimited change",
            describe: "",
          },
          {
            title: "Logo resolution",
            describe: "high resolution",
          },
          {
            title: "Transparent logo background",
            describe: "",
          },
          {
            title: "Black & white logo",
            describe: "",
          },
          {
            title: "Vector files",
            describe: "",
          },
          {
            title: "Word & deck templates",
            describe: "",
          },
          {
            title: "Brand identity",
            describe: "fonts, colors, mockups, brand guidelines, etc.",
          },
        ],
      },
      brand: {
        name: "Brand",
        price: "99",
        color: "#9E35AD",
        list: [
          {
            title: "3-day unlimited change",
            describe: "",
          },
          {
            title: "Logo resolution",
            describe: "high resolution",
          },
          {
            title: "Transparent logo background",
            describe: "",
          },
          {
            title: "Black & white logo",
            describe: "",
          },
          {
            title: "Vector files",
            describe: "",
          },
          {
            title: "Word & deck templates",
            describe: "",
          },
          {
            title: "Brand identity",
            describe: "fonts, colors, mockups, brand guidelines, etc.",
          },
          {
            title: "Logo animation",
            describe: "",
          },
          {
            title: "Brand center",
            describe: "business cards, posters, social media profiles, etc.",
          },
        ],
      },
      count_40: {
        title: "40",
        describe: "For your 2nd to 5th logo purchase",
      },
      count_50: {
        title: "50",
        describe: "For your 6th to 10th logo purchase",
      },
      count_60: {
        title: "60",
        describe: "For your 11th or more logo purchase",
      },
      pageLoading: false,
    };
  },
  created() {},
  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.pageLoading = true;
      getDinnerCost()
        .then((res) => {
          this.basic.name = res.data[0].ocGrade;
          this.basic.price = res.data[0].ocPrimary;
          this.pro.name = res.data[1].ocGrade;
          this.pro.price = res.data[1].ocPrimary;
          this.brand.name = res.data[2].ocGrade;
          this.brand.price = res.data[2].ocPrimary;
        })
        .finally(() => {
          this.pageLoading = false;
        });
      getTypeDiscount().then((res) => {
        this.count_40.title = res.data[0].Discount;
        this.count_50.title = res.data[1].Discount;
        this.count_60.title = res.data[2].Discount;
      });
    },
    getDiscount() {
      this.$refs.form.validate(); // 可以手动触发验证

      if (this.valid && this.email) {
        this.loading = true;
        getDiscountCode(this.email)
          .then((res) => {
            this.$my_message({
              content: "发送成功!",
              type: "success",
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";
@font-face {
  font-family: "Inika"; /* 你可以自定义这个字体名称 */
  src: url("@/assets/static/fonts/Inika-Bold.ttf") format("truetype"); /* TTF格式，作为备选 */
  font-weight: normal; /* 根据你的字体文件来设置 */
  font-style: normal; /* 根据你的字体文件来设置 */
}

.page {
  background-color: $main-bgc-color;
  text-align: center;
  overflow: hidden;
}
.page-info {
  text-align: center;
  h1 {
    line-height: 2;
  }
  p {
    font-weight: Bold;
    line-height: 2;
  }
}
.type-table {
  display: flex;
  justify-content: center;
}
.table-item {
  margin: 30px;
}
.discount {
  padding: 30px;
  color: #333333;

  .discount-info {
    margin: auto;
    max-width: 644px;
    h1 {
      line-height: 3;
    }
    p {
      font-weight: Bold;
      line-height: 3;
    }
  }
}
.div-width {
  max-width: $max-width-1;
  margin: auto;
  padding: 10px;
}

.questions-bgc {
  background-color: #ffffff;
}
.coupon-bgc {
  background-color: #949599;

  display: flex;
  justify-content: center;

  .coupon-img {
    width: 100%;
    margin: 50px;

    background-color: #ffef69;

    display: flex;
    padding: 20px;

    .coupon-left {
      flex: 6;
      margin: auto;
      .coupon-width {
        max-width: 520px;
        margin: auto;
      }
      h2 {
        font-size: 48px;
        font-weight: 300;
      }
    }
    .coupon-right {
      flex: 4;
      display: flex;
      justify-content: flex-end;
    }
  }
}
.make-btn {
  max-width: 280px;
}
.send-btn {
  text-align: center;
}

@media (max-width: 768px) {
  .coupon-img {
    flex-direction: column;
  }
}
@media (max-width: 1200px) {
  .type-table {
    overflow: auto;
    justify-content: space-between;
  }
}
</style>
