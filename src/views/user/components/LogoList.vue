<template>
  <div>
    <div>
      <template v-if="!isDownload">
        <div class="logo-list">
          <div class="logo-item" v-for="i in list" :key="i.id">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="200"
              max-width="280"
              class="logo-image"
              :src="i.url"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <div
              class="purchase-type"
              v-if="i.logoType !== 0 && i.logoType !== 4"
              :style="buyType(i.logoType)"
            >
              <span> {{ i.logoType | typeFilter }} </span>
            </div>
            <div class="await-pay">
              <v-chip v-if="i.logoType === 4" label>待支付</v-chip>
            </div>

            <div
              class="item-delete"
              @click="deleteLogoId(i.id)"
              v-if="i.logoType === 0 || i.logoType === 4"
            >
              <span class="mdi mdi-delete-outline"></span>
            </div>

            <div class="item-btn">
              <v-btn elevation="2" @click="editLogo(i)" x-small>edit</v-btn>
              <!-- <v-btn
                elevation="2"
                @click="getImg(i.id)"
                v-if="i.logoType === 0"
                x-small
                >share</v-btn
              > -->

              <v-btn
                elevation="2"
                x-small
                v-if="i.logoType === 0"
                @click="getData(i.id)"
                >buy</v-btn
              >
              <v-btn
                elevation="2"
                x-small
                v-if="i.logoType === 4"
                @click="getPayment(i.id)"
                :loading="loading"
                >支付</v-btn
              >
              <!-- <v-btn elevation="2" @click="downloadLogo(i)" x-small
                >download</v-btn
              > -->
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <DownloadLogo :logoData="logoInfo"></DownloadLogo>
      </template>
    </div>
    <!-- 分享弹窗 -->
    <v-dialog v-model="isShare" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> 分享二维码 </v-card-title>
        <v-card-text>
          <el-image :src="shareUrl" width="100"></el-image>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- 支付弹窗 -->
    <template v-if="paymentDialog">
      <v-dialog v-model="paymentDialog" persistent width="500">
        <PayForm
          :clientSecret="clientSecret"
          @closePayment="closePayment"
        ></PayForm>
      </v-dialog>
    </template>

    <!-- 删除弹窗 -->
    <v-dialog v-model="isDelete" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> 删除 </v-card-title>
        <v-card-text> 确定删除此LOGO？ </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="isDelete = false"> 取消 </v-btn>
          <v-btn @click="deleteLogo">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getUserLogoList, deleteUserLogo } from "@/api/user";
import { getQRCode } from "@/api/edit";
import { getStripePay } from "@/api/purchase";
import { getLogoDetail } from "@/api/edit";
import { loadStripe } from "@stripe/stripe-js";
import DownloadLogo from "./DownloadLogo";
import PayForm from "@/components/main/PayForm";
import { getTxt } from "@/utils/tool";
export default {
  name: "LogoList",
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate: "My Logo-LogoAIDesign.com",
  },
  props: {},
  components: {
    DownloadLogo,
    PayForm,
  },

  data() {
    return {
      list: [],
      isDownload: false,
      logoInfo: null,
      deleteId: null,
      isDelete: false,
      isShare: false,
      paymentDialog: false,

      clientSecret: null,
      loading: false,
      shareUrl: "",
    };
  },
  mounted() {
    this.fechData();
  },
  filters: {
    typeFilter(value) {
      const statusMap = {
        0: "",
        1: "Basic",
        2: "Pro",
        3: "Brand",
      };
      return statusMap[value];
    },
  },
  computed: {},
  methods: {
    buyType(value) {
      // 根据BuyType的值返回不同的样式对象
      if (value === 1) {
        return {
          borderTop: `60px solid #C9C9C9`,
        };
      } else if (value === 2) {
        return {
          borderTop: `60px solid #77F0B6`,
        };
      } else if (value === 3) {
        return {
          borderTop: `60px solid #9E35AD`,
        };
      }
    },
    fechData() {
      getUserLogoList().then((res) => {
        if (res.data) {
          this.list = res.data.map((i) => {
            return {
              id: i.bliId,
              url: i.logoAddress,
              logoType: i.priceType,
            };
          });
        }
      });
    },
    deleteLogoId(id) {
      this.isDelete = true;
      this.deleteId = id;
    },
    deleteLogo() {
      deleteUserLogo(this.deleteId)
        .then(() => {
          this.$my_message({
            content: "删除成功",
            type: "success",
          });
        })
        .finally(() => {
          this.isDelete = false;
          this.fechData();
        });
    },
    editLogo(i) {
      getLogoDetail(i.id).then((res) => {
        let logoInfo = res.data;

        getTxt(logoInfo.jsonStr).then((res) => {
          logoInfo.jsonStr = res;
          localStorage.setItem("logoInfo", JSON.stringify({ logoInfo }));
          this.$store.commit("setLogoInfo", logoInfo);

          const childWindow = window.open("/edit", "_blank");
        });
      });
    },
    downloadLogo(i) {
      getLogoDetail(i.id).then((res) => {
        this.logoInfo = res.data.jsonStr;
        this.isDownload = true;
      });
    },
    getData(id) {
      this.$emit("getData", id);
    },
    getImg(id) {
      //分享二维码
      let that = this;
      getQRCode(id).then((res) => {
        let reader = new FileReader();
        reader.readAsDataURL(res.data); // 将Blob对象转换为Base64编码的data URL
        reader.onloadend = function () {
          let base64data = reader.result; // 这里是转换后的Base64编码的data URL
          that.shareUrl = base64data;
          that.isShare = true;
        };
      });
    },

    async getPayment(id) {
      let data = {
        grade: null,
        logoId: id,
        isDesigner: null,
        coupon: null,
      };

      getStripePay(data)
        .then((res) => {
          this.clientSecret = res.data;
          this.paymentDialog = true;
          //打开支付弹窗
          //限制时间关闭支付
          // setTimeout(() => {
          //   this.closePayment();
          //   this.$my_message({
          //     content: "超时关闭!",
          //     type: "error",
          //   });
          // }, 5 * 60 * 1000);
        })
        .finally(() => {});
    },

    closePayment() {
      this.paymentDialog = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
.user-info {
  display: flex;
  justify-content: center;
}
.logo-list {
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  max-width: 1150px;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 创建2列，每列宽度相等 */
  gap: 10px; /* 设置网格间距 */
}
.logo-item:hover {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}
.logo-item {
  position: relative;
  cursor: pointer;
  transform: scale(1);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
}
.item-btn {
  position: absolute;
  bottom: 5px;
  left: 20%;

  button {
    margin: 5px;
  }
}
.item-delete {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 10;
}
.await-pay {
  position: absolute;
  left: 5px;
  top: 5px;
  z-index: 10;
}

.purchase-type {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border-top: 60px solid #20a0ff;
  border-left: 60px solid transparent;
  z-index: 5;
  span {
    position: absolute;
    top: -48px;
    left: -51px;
    width: 60px;
    text-align: center;
    color: #fff;
    transform: rotate(45deg) scale(0.88);
  }
}
</style>
