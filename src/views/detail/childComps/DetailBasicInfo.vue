<template>
  <div class="detail-wrapper">
    <!-- 名字和价格 -->
    <div class="detail-title">{{goods.title}}</div>
    <div class="detail-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>    
    </div>
    <!-- 销量 收藏 运费 -->
    <div class="detail-sell">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <!-- 发货 退货 -->
    <div class="detail-cargo">
      <span class="detail-cargo-info" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>    

  </div>
  
</template>

<script>
  export default {
    name:'DetailBasicInfo',
    data() {
      return {

      }
    },
    props: {
      goods:{
        type:Object,
        default() {
          return null
        }
      }
    }

  }
</script>

<style>

  .detail-wrapper {
    font-size: 15px;
    padding: 2px 10px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;    
    height: 1000px;
  }

  /* 名字和价格  */
  .detail-title {
    color: #222;
  }
  .detail-price {
    margin-top: 10px;
  }
  .detail-price .new-price {
    font-size: 24px;
    color: var(--color-high-text);    
  }
  .detail-price .old-price {
    font-size: 12px;
    margin-left: 6px;
    text-decoration: line-through;
  }
  .detail-price .discount {
    position: relative;
    top: -5px;
    
    border-radius: 8px;
    padding: 2px 5px;
    margin-left: 5px;
    background-color: var(--color-high-text);
    font-size: 12px;
    color: #fff;
  }

  /* 销量 收藏 运费*/
  .detail-sell {
    margin-top: 8px;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    line-height: 25px;
    display: flex;
    justify-content: space-between;
  }

  /* 发货 退货  */
  .detail-cargo {
    display: flex;
    justify-content: space-between;

    line-height: 36px;
  }
  .detail-cargo-info img {
    position: relative;
    top: 2px;

    width: 14px;
    height: 14px;
  }
  .detail-cargo-info span {
    font-size: 13px;
    color: #333;
  }
</style>