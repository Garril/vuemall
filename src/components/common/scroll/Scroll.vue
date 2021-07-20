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
        scroll: null
      }
    },
    props:{
      probeType:{
        type: Number,
        default: 0
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType: this.probeType,
      })
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position);
      })
    },
    methods: {
      scrollTo(x,y,time) {
        this.scroll.scrollTo(x,y,time);
      }
    }

  }
</script>

<style>

</style>