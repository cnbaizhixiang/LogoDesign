<template>
  <div class="page">
    <div class="parent">
      <div v-for="(i, index) in logoCategory.slice(0, 13)" class="item">
        <a :href="goToPage(i.name)">
          <v-btn
            elevation="2"
            small
            rounded
            :color="activeClass === i.id ? '#0134FF' : ''"
            ><div class="item-name">{{ i.name }}</div></v-btn
          >
        </a>
      </div>
    </div>
    <div class="parent">
      <div v-for="(i, index) in logoCategory.slice(13, 26)" class="item">
        <a :href="goToPage(i.name)">
          <v-btn
            elevation="2"
            small
            rounded
            :color="activeClass === i.id ? '#0134FF' : ''"
            ><div class="item-name">{{ i.name }}</div></v-btn
          >
        </a>
      </div>
    </div>
    <!-- <div class="parent">
      <div v-for="(i, index) in logoCategory" class="item">
        <a :href="goToPage(i.name)">
          <v-btn
            elevation="2"
            small
            rounded
            :class="{ btn: activeClass === index }"
            ><div class="item-name">{{ i.name }}</div></v-btn
          >
        </a>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getLogoCategorySecond } from "@/api/logoSearch";
export default {
  props: {
    activeClass: Number,
  },
  data() {
    return {
      query: {
        page: 1,
        limit: 6,
      },
      logoCategory: [],
    };
  },
  async created() {
    await this.fetchCategory();
  },

  methods: {
    async fetchCategory() {
      const response = await getLogoCategorySecond(this.query);

      let list = [];
      if (response.data) {
        list = response.data.list.map((i) => {
          return {
            id: i.blcId,
            name: i.categoryName,
          };
        });

        //category返回空
        if (list.length === 0) {
          this.$emit("changeIndex");
          return;
        }

        this.query.page += list.length;

        //个数不够时从第一页补
        if (
          list.length < this.query.limit &&
          response.data.total > this.query.limit
        ) {
          let b = this.query.limit - list.length;
          let a = {
            page: 1,
            limit: b,
          };

          const res = await getLogoCategorySecond(a);
          let c = res.data.list.map((i) => {
            return {
              id: i.blcId,
              name: i.categoryName,
            };
          });

          list = list.concat(c);

          this.query.page = b;
        }
        //目录刚好轮换完
        if (this.query.page - 1 === response.data.total) {
          this.query.page = 1;
        }
        this.logoCategory = list;

        if(this.logoCategory.length>=3){
          this.$emit("getFirstLogoList", this.logoCategory);
        }
        
      }
    },

    goToPage(name) {
      return `/logo-ideas/keyword/${name}`;
    },
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page {
  overflow: hidden;
}
.parent {
  // display: grid;
  // grid-template-columns: repeat(7, 1fr); /* 创建2列，每列等宽 */
  // grid-template-rows: repeat(4, 1fr); /* 创建2行，每行等高 */
  // gap: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .item {
    height: 40px;
    margin: 5px;
  }
  .item-name {
    width: 125px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.v-btn {
  text-transform: none;
}

@media screen and (max-width: 768px) {
}
</style>
