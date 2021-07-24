<template>
  <div class="shop-info">
    <!-- 商家图标和名字 -->
    <div class="shop-top">
      <img :src="shop.logo">
      <span class="title">{{shop.name}}</span>
    </div>
    <!-- 商家销量和评分信息 -->
    <div class="shop-middle">
      <!-- 左边的总销量信息 -->
      <div class="shop-middle-left">
          
          <div class="sell-count">
            {{shop.sells | sellCountFilter}}
            <div class="sell-count-text">总销量</div>   
          </div>
          
          <div class="all-sell">
            {{shop.goodsCount}}
            <div class="all-sell-text">全部宝贝</div>
          </div>

      </div>

      <!-- 右边的评分信息 -->
      <div class="shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>

    </div>

    <!-- 下面的进入商店 -->
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>

  </div>
</template>

<script>
  export default {
    name:'DetailShopInfo',
    props: {
      shop:{
        type:Object,
        default() {
          return {}
        }
      },
    },
    methods:{
      
    },
    filters: {
      sellCountFilter:(value)=>{
        if (value < 10000) return value;
        return (value/10000).toFixed(1) + '万'
      }
    }
  }
</script>

<style>
  .shop-info {
    padding: 15px 10px;
    border-bottom: 5px solid #f2f5f8;
  }
    /* 商家图标和名字 */
  .shop-top {
    line-height: 44px;
    display: flex;
    align-items: center;
  }
  .shop-top img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
  }
  .shop-top .title {
    margin-left: 10px;
    vertical-align: center;
  }
  /* 商家销量和评分信息 */
  .shop-middle {
    display: flex;
  }
  /* 左边： */
  .shop-middle-left {
    flex: 1;
    padding-top: 27px;
    display: flex;
    border-right: 1px solid rgba(0,0,0,.1);
  }
  .sell-count {
    flex: 1;
    text-align: center;
    font-size: 19px;
  }
  .sell-count-text {
    margin-top: 6px;
    font-size: 13px;
  }
  .all-sell {
    flex: 1;
    text-align: center;
    font-size: 19px;
  }
  .all-sell-text {
    margin-top: 6px;
    font-size: 13px;
  }

  /* 右边： */
  .shop-middle-right {
    flex: 1;
    font-size: 13px;
    color: #333;
    display: flex;
  }
  .shop-middle-right table {
    flex: 1;
    margin-left: 10px;
    text-align: center;
  }

  .shop-middle-right table td {
    padding: 5px 3px;
  }
  /* 默认评分和评价为：绿色 */
  .shop-middle-right .score {
    color: #5ea732;
    font-size: 14px;
  }
  .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
    font-size: 14px;
  }
    /* 高分红色 */
  .shop-middle-right .score-better {
    color: #f13e3a;
  }
  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }

  /* 底部进入商店  */
  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    display: inline-block;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    width: 150px;
    font-size: 14px;
    background-color: #f2f5f8;
  }  
</style>