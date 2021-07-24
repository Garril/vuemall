<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name:'Scroll',
    data() {
      return {
        scroll:{}
      }
    },
    props:{
      probeType:{
        type: Number,
        default: 1
      },
      pullUpLoad: {
        type:Boolean,
        default: false
      },
    },
  
    mounted() {

      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      // 2.将监听事件回调
      this.scroll.on('scroll', pos => {
        this.$emit('scroll', pos)
      })

      // 3.监听上拉到底部
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    
    methods: {
      scrollTo(x,y,time) {
        this.scroll.scrollTo(x,y,time);
      },
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh();
      },
    },
  }
</script>

<style>

</style>