<style scoped lang="less">
  .cont{
    .item{
      height: 20px;
    }
    .icon{
      position: fixed;
      right: 0;
      top: 100px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: red;
    }
    .icon-show {
      animation: show .5s linear forwards;
    }
    .icon-hiden {
      animation: hiden .5s linear forwards;
    }
    @keyframes show {
      0% {
        opacity: .3;
        right: -20px;
      }
      100% {
        opacity: 1;
        right: 0;
      }
    }
    @keyframes hiden {
      0% {
        opacity: 1;
        right: 0;
      }
      100% {
        opacity: .3;
        right: -20px;
      }
    }
  }
</style>
<template>
  <div class="cont" ref="cont">
    <i :class="['icon', init?'':(show?'icon-show':'icon-hiden')]"></i>
    <p class="item" :ref="'item'+index" v-for="(item, index) in 100" :key="item" :data-item="item"></p>
  </div>
</template>
<script>
import { listener, timer } from '../mixin'
export default {
  data () {
    return {
      show: true, // 小红球的动画控制
      init: true, // 页面初始化时没有动画效果
      top: 0,
      touch: false // 点击是否结束
    }
  },
  mixins: [listener, timer],
  mounted () {
    const self = this
    self.$addEventListener(self.$refs.cont, 'touchstart', () => {
      self.init = false
      self.show = false
      self.touch = true
      self.$clearTimeout('show') // 防抖动
      self.$clearInterval('scroll')
    })
    self.$addEventListener(self.$refs.cont, 'touchend', () => {
      self.touch = false
      self.$setTimeout(() => { // 防抖动
        self.show = true
      }, 500, 'show')
    })
    self.$addEventListener(window, 'scroll', () => {
      self.$clearTimeout('show')
      if (!self.touch) { // 手指已松开 但滚动条未停止
        self.$setInterval(() => {
          if (self.top !== document.body.scrollTop + document.documentElement.scrollTop) {
            self.top = document.body.scrollTop + document.documentElement.scrollTop
            self.show = false
          } else {
            self.show = true
            self.$clearInterval('scroll')
          }
        }, 500, 'scroll')
      }
    })
  }
}
</script>
