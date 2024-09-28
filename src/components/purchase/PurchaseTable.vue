<template>
  <div class="content">
    <div class="div-table">
      <div class="most-popular">
        <el-image
          :src="require('@/assets/static/images/Frame.png')"
          class="most-img"
        ></el-image>
      </div>
      <div class="price-table">
        <div class="table-1">
          <div class="table-1-1">
            <div class="div-svg" v-if="svgValue" v-html="svgValue"></div>
            <el-image
              :src="require('@/assets/static/images/Group.png')"
            ></el-image>
          </div>
          <div v-for="item in table_list1" class="table-1-2">
            <p class="color-p">{{ item.title }}</p>
            <span>{{ item.describe }}</span>
            <el-tooltip effect="dark" class="tooltio" placement="top">
              <div slot="content">
                {{ item.content }}
              </div>
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div>
        </div>

        <div
          class="table-2"
          :class="{ 'select-active': selectType === 'BASIC' }"
        >
          <div class="table-2-1" style="background-color: #7c7c7c">
            <h2>{{ logoType[0].ocGrade }}</h2>
            <h2>${{ logoType[0].ocPrimary }}</h2>
            <el-button round class="select-button" @click="switchType('BASIC')"
              >Select</el-button
            >
          </div>
          <div v-for="(item, index) in table_list2" class="table-1-2">
            <p v-if="item.dec">{{ item.dec }}</p>
            <i
              v-if="!item.dec"
              :class="{
                'el-icon-close': !item.isInclude,
                'el-icon-check': item.isInclude,
              }"
            ></i>
          </div>
        </div>
        <div class="table-3" :class="{ 'select-active': selectType === 'PRO' }">
          <div class="table-2-1" style="background-color: #0fb778">
            <h2>{{ logoType[1].ocGrade }}</h2>
            <h2>${{ logoType[1].ocPrimary }}</h2>
            <el-button round class="select-button" @click="switchType('PRO')"
              >Select</el-button
            >
          </div>
          <div v-for="item in table_list3" class="table-1-2">
            <p v-if="item.dec">{{ item.dec }}</p>
            <i
              v-if="!item.dec"
              :class="{
                'el-icon-close': !item.isInclude,
                'el-icon-check': item.isInclude,
              }"
            ></i>
          </div>
        </div>
        <div
          class="table-4"
          :class="{ 'select-active': selectType === 'BRAND' }"
        >
          <div class="table-2-1" style="background-color: #5e56f6">
            <h2>{{ logoType[2].ocGrade }}</h2>
            <h2>${{ logoType[2].ocPrimary }}</h2>
            <el-button round class="select-button" @click="switchType('BRAND')"
              >Select</el-button
            >
          </div>
          <div v-for="item in table_list4" class="table-1-2">
            <p v-if="item.dec">{{ item.dec }}</p>
            <i
              v-if="!item.dec"
              :class="{
                'el-icon-close': !item.isInclude,
                'el-icon-check': item.isInclude,
              }"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogoType } from "@/api/purchase";
export default {
  name: "PurchaseTable",
  props: {},
  created() {
    this.getPriceType();
  },
  data() {
    return {
      svgValue: "",
      table_list1: [
        {
          title: "3-day unlimited change",
          describe: "",
          content:
            "Click to edit this logo.You can change logo name and symbol within 3 days of your purchase. Everything else can be changed freely forever.",
        },
        {
          title: "Logo resolution",
          describe: "",
          content:
            "Click to edit this logo.You can change logo name and symbol within 3 days of your purchase. Everything else can be changed freely forever.",
        },
        {
          title: "Transparent logo background",
          describe: "",
          content:
            "Click to edit this logo.You can change logo name and symbol within 3 days of your purchase. Everything else can be changed freely forever.",
        },
        {
          title: "Black & white logo",
          describe: "",
          content:
            "Click to edit this logo.You can change logo name and symbol within 3 days of your purchase. Everything else can be changed freely forever.",
        },
        {
          title: "Vector files",
          describe: "",
          content:
            "Click to edit this logo.You can change logo name and symbol within 3 days of your purchase. Everything else can be changed freely forever.",
        },
        {
          title: "Word & deck templates",
          describe: "",
          content:
            "Click to edit this logo.You can change logo name and symbol within 3 days of your purchase. Everything else can be changed freely forever.",
        },
        {
          title: "Brand identity",
          describe: "fonts, colors, mockups, brand guidelines, etc.",
          content:
            "Click to edit this logo.You can change logo name and symbol within 3 days of your purchase. Everything else can be changed freely forever.",
        },
        {
          title: "Logo animation",
          describe: "",
          content:
            "Click to edit this logo.You can change logo name and symbol within 3 days of your purchase. Everything else can be changed freely forever.",
        },
        {
          title: "Brand center",
          describe: "business cards, posters, social media profiles, etc.",
          content:
            "Click to edit this logo.You can change logo name and symbol within 3 days of your purchase. Everything else can be changed freely forever.",
        },
      ],
      table_list2: [
        { isInclude: true },
        { dec: "800 x 600 pixles" },
        { isInclude: true },
        { isInclude: true },
        { isInclude: false },
        { isInclude: false },
        { isInclude: false },
        { isInclude: false },
        { isInclude: false },
      ],
      table_list3: [
        { isInclude: true },
        { dec: "high resolution" },
        { isInclude: true },
        { isInclude: true },
        { isInclude: true },
        { isInclude: true },
        { isInclude: true },
        { isInclude: false },
        { isInclude: false },
      ],
      table_list4: [
        { isInclude: true },
        { dec: "high resolution" },
        { isInclude: true },
        { isInclude: true },
        { isInclude: true },
        { isInclude: true },
        { isInclude: true },
        { isInclude: true },
        { isInclude: true },
      ],
      selectType: "PRO",
      logoType: [
        {
          ocGrade: "BASIC",
          ocPrimary: 29,
        },
        {
          ocGrade: "PRO",
          ocPrimary: 49,
        },
        {
          ocGrade: "BRAND",
          ocPrimary: 99,
        },
      ],
    };
  },
  methods: {
    switchType(value) {
      this.selectType = value;
      this.$emit("getType", value);
    },
    getPriceType() {
      let type = localStorage.getItem("defaultType");
      this.selectType = type ? type : "PRO";
      getLogoType().then((response) => {
        this.logoType = response.data.list;
        this.$emit("getPriceType", this.logoType);
        this.$emit("getType", this.selectType);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
  text-align: center;
  overflow: hidden;
}
.select-active {
  border: 3px solid #5e56f6;
}
.price-table {
  display: flex;
  position: relative;
  justify-content: center;
}
.div-table {
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: relative;
}
.div-svg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  z-index: 10;
}

.most-popular {
  width: 1136px;
  margin: 0 auto;
  position: relative;
  height: 40px;
  z-index: 10;
}
.most-img {
  position: absolute;
  left: 660px;
  top: 12px;
}
.table-1 {
  width: 308px;
  min-width: 308px;
  // height: 629px;
  margin: 5px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
}
.table-2,
.table-3,
.table-4 {
  width: 238px;
  min-width: 238px;
  // height: 629px;
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  border-radius: 10px;
}
.table-1-1 {
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.table-1-2 {
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  border-top: 1px solid #888888;
}
.table-1-2 p {
  margin: 0px;
}
.table-2-1 {
  height: 178px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}
.select-button {
  margin-top: 30px;

  width: 150px;
}
.el-icon-check {
  color: #21bf73;
  font-weight: 900;
}
.el-icon-close {
  color: #ff003d;
  font-weight: 900;
}
h2 {
  margin: 10px;
}
.color-p {
  color: #5e56f6;
}
.el-icon-question {
  position: absolute;
  right: 2px;
  top: 25px;
  color: #888888;
  transform: translate(0, -50%);
}
span {
  font-size: 12px;
}
@media screen and (max-width: 1200px) {
  .price-table {
    justify-content: left;
  }
}
</style>
