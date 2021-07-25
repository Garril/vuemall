<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>

    <scroll class="scroll-content" 
    :pullUpLoad="true"
    :probe-type="3"
    @pullingUp="getRefresh"
    @scroll="contentScroll"
    ref="scroll">

      <detail-swiper :top-images="topImages"></detail-swiper>

      <detail-basic-info :goods="this.goods"></detail-basic-info>

      <detail-shop-info :shop="this.shop"></detail-shop-info>
      
      <detail-goods-info :detail-info="this.goodsInfo" class="info" @goodsInfoLoaded="goodsInfoLoaded"></detail-goods-info>

      <detail-param-info :param-info="this.paramInfo" ref="params"></detail-param-info>

      <detail-comment :comment="this.commentInfo" ref="comments"></detail-comment>

      <good-list :goods="this.recommends" class="good-list" ref="recommends"></good-list>

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
        themeTopY:[],
        flag:false,
        getThemeTopY:null,
        curIndex:0,
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
        
        // this.$nextTick(()=>{
          // 运用nextTick。在这里：Dom  this.$refs.params.$el已经被渲染出来了，
          // 但是图片依然没有加载完。即目前offsetTop是不包含图片的，还是错的
          // this.themeTopY = [];
          // this.themeTopY.push(0);
          // this.themeTopY.push(this.$refs.params.$el.offsetTop);
          // this.themeTopY.push(this.$refs.comments.$el.offsetTop);
          // this.themeTopY.push(this.$refs.recommends.$el.offsetTop);
          // console.log(this.themeTopY);          
        // });
        this.getThemeTopY = this.debounce(()=>{
            this.themeTopY = [];
            this.themeTopY.push(0);
            this.themeTopY.push(this.$refs.params.$el.offsetTop);
            this.themeTopY.push(this.$refs.comments.$el.offsetTop);
            this.themeTopY.push(this.$refs.recommends.$el.offsetTop);
        },100);
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
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopY[index],500);
      },
      goodsInfoLoaded() {
        this.getThemeTopY();
      },
      contentScroll(pos) {
        const posY = -pos.y;
        let len = this.themeTopY.length;
        for(let i = 0;i<len;i++) {
          if(this.curIndex!==i)
            if((i===len-1&&posY>=this.themeTopY[i])||(i<len-1&&this.themeTopY[i]<=posY&&posY<=this.themeTopY[i+1])) {
              this.curIndex=i;
              this.$refs.nav.curIndex = this.curIndex;
            }
        }
      }

    },
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh,50);
      this.$bus.$on('imgLoaded',()=>{
        refresh();
        // this.len=(this.goodsInfo.detailImage[0].list.length)*15;
        // if(this.$refs.params) {
        //   if(!this.flag){
        //     setTimeout(()=>{
        //       this.themeTopY = [];
        //       this.themeTopY.push(0);
        //       this.themeTopY.push(this.$refs.params.$el.offsetTop);
        //       this.themeTopY.push(this.$refs.comments.$el.offsetTop);
        //       this.themeTopY.push(this.$refs.recommends.$el.offsetTop);
        //     },(this.len));
        //     this.flag=true;
        //   }
        // }
      })
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