<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="comImage" alt="" @load="imgLoaded">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'GoodListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      itemClick() {
          this.$router.push('/detail/'+this.goodsItem.iid);
          // 这里的推荐图，点进去，没有数据
          // this.$router.push('/detail/'+this.goodsItem.shop_id);
      },
      imgLoaded() {
        this.$bus.$emit('imgLoaded')
      },
    },
    computed: {
      comImage() {
        return this.goodsItem.image || this.goodsItem.show.img;
      }
    }

  }
</script>

<style>
  .goods-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    text-align: center;
    overflow: hidden;
    font-size: 12px;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>