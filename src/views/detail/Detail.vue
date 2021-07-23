<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>

    <scroll class="content" 
    :pullUpLoad="true"
    :probeType="3"
    ref="detail">
      <detail-swiper :top-images="topImages"></detail-swiper>

      <detail-basic-info :goods="this.goods"></detail-basic-info>

      <detail-shop-info :shop="this.shop"></detail-shop-info>
      
      <detail-goods-info :goods-info="this.goodsInfo" @imageLoad="getRefresh"></detail-goods-info>

      <detail-param-info :param-info="this.paramInfo"></detail-param-info>

      <detail-comment :comment="this.commentInfo" @LoadFinished="getRefresh"></detail-comment>
    </scroll>

  </div>
</template>

<script>
  // 引用的组件
  import Scroll from 'components/common/scroll/Scroll.vue'

  // 子组件
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBasicInfo from './childComps/DetailBasicInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailComment from './childComps/DetailComment.vue'
  // 数据请求
  import {getDetailMultidata,Goods,Shop,GoodsParam} from 'network/detail.js'


  export default {
    name:'Detail',
    data() {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        goodsInfo:{},
        paramInfo:{},
        commentInfo:{},

      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBasicInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,

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
        // 店铺信息
        this.shop = new Shop(t.shopInfo);
        // 商品的详情数据
        this.goodsInfo = t.detailInfo;
        // 商品参数信息
        this.paramInfo = new GoodsParam(t.itemParams.info,t.itemParams.rule);
        // 评论
        if(t.rate.cRate!==0)this.commentInfo = t.rate.list[0];
      });
    },
    methods: {
      getRefresh() {
        this.$refs.detail.scroll.refresh();
      }
    },

  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
  .content {
    height: calc(100vh - 44px);
  }

</style>