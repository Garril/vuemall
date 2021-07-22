<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    
    <detail-swiper :topImages="topImages"></detail-swiper>

    <detail-basic-info :goods="this.goods"></detail-basic-info>
  </div>
</template>

<script>
  // 公共组件

  // 子组件
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBasicInfo from './childComps/DetailBasicInfo.vue'

  // 数据请求
  import {getDetailMultidata,Goods} from 'network/detail.js'


  export default {
    name:'Detail',
    data() {
      return {
        iid:null,
        topImages:[],
        goods:null
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBasicInfo,

    },
    created() {
      // 拿到点进来的商品对应的iid
      this.iid = this.$route.params.iid;

      getDetailMultidata(this.iid).then(res=>{
        const t = res.result;  
        // 根据iid请求对应的商品轮播图数据
        this.topImages = t.itemInfo.topImages;
        // 拿到详细页全部数据
        this.goods = new Goods(t.columns,t.itemInfo,t.shopInfo.services);
      });
    },
    methods: {

    },

  }
</script>

<style scoped>

</style>