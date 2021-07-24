<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>

    <scroll class="scroll-content" 
    :pullUpLoad="true"
    :probe-type="3"
    @pullingUp="getRefresh"
    ref="scroll">

      <detail-swiper :top-images="topImages"></detail-swiper>

      <detail-basic-info :goods="this.goods"></detail-basic-info>

      <detail-shop-info :shop="this.shop"></detail-shop-info>
      
      <detail-goods-info :detail-info="this.goodsInfo" class="info"></detail-goods-info>

      <detail-param-info :param-info="this.paramInfo"></detail-param-info>

      <detail-comment :comment="this.commentInfo"></detail-comment>

      <good-list :goods="this.recommends" class="good-list"></good-list>

    </scroll>

  </div>
</template>

<script>
  // 引用的组件
  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodList from 'components/content/goods/GoodList.vue'
  // 子组件
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBasicInfo from './childComps/DetailBasicInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailComment from './childComps/DetailComment.vue'
  // 数据请求
  import {getDetailMultidata,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'


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
        recommends:[],

      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBasicInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,
      Scroll,
      GoodList,

    },
    created() {
      // 拿到点进来的商品对应的iid
      this.iid = this.$route.params.iid;

      getDetailMultidata(this.iid).then(res=>{
        const data = res.result;  
        // 根据iid请求对应的商品轮播图数据
        this.topImages = data.itemInfo.topImages;
        // 拿到详细页全部数据
        this.goods = new Goods(data.columns,data.itemInfo,data.shopInfo.services);
        // 店铺信息
        this.shop = new Shop(data.shopInfo);
        // 商品的详情数据
        this.goodsInfo = data.detailInfo;
        // 商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
        // 评论
        if(data.rate.cRate!==0)this.commentInfo = data.rate.list[0];
        // 获取推荐数据
      });
      getRecommend().then(res=>{
        this.recommends = res.data.list;
      })
    },
    methods: {
      debounce(func, delay) {
        let timer = null
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },
      getRefresh() {
        this.$refs.scroll.refresh();
        console.log("下拉");
      }
    },
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('itemImgLoad',()=>{
        refresh();
      })
    }

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
  .scroll-content {
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .info {
    position: relative;
  }
</style>