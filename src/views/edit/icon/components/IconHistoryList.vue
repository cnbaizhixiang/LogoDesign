<template>
  <div>
    <p v-if="changeIconList.length>0">History List:</p>
 
  <v-sheet
  data-app
    class="mx-auto custom-bg-color"
    max-width="700"
  >
    <v-slide-group
      multiple
      show-arrows
      color='rgba(157, 104, 104, 1)'
    >
      <v-slide-item
      v-for="(item, index) in changeIconList"
        :key="index"
        v-slot="{ active, toggle }"
      >
      
      <v-img
  max-height="30"
  max-width="30"
  :src="item.url"
  class="img-item"
  @click="changIcon(item)"
></v-img>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>

</div>

</template>

<script>

export default {
  name: "IconHistoryList",
  props: {
    
  },
  components: {},

  data() {
    return {
      changeIconList:[]
      
    };
  },
  created() {
    this.changeIconList=this.$store.getters.getIconHistoryList;

  },
  
  methods: {
    changIcon(item){

      this.$emit("changeIcon",item)
    }
  },
};
</script>

<style scoped>
.img-item{
  margin:5px;
  cursor:pointer;
}
.custom-bg-color{
  background-color:rgb(0,0,0,0);
}

</style>
