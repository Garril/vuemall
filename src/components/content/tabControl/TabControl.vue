<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" 
    class="tab-control-item" 
    :class="{active:index === currentIndex}" 
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick',index);
      },
      
    }

  }
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    background-color: rgb(248, 246, 246);
    z-index: 9;
  }
  .tab-control .tab-control-item{
    flex: 1;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    padding: 4px;
    border-bottom: 2px solid var(--color-tint);
  }

</style>