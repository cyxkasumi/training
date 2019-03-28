<!--下雨效果 用canvas实现-->
<style lang="less" scoped>
.main{
  width: 100%;
  height: 100%;
  background: #000;
  position: relative;
}
</style>
<template>
  <div class="main">
    <canvas id="rain" ref="rainCanvas"></canvas>
  </div>
</template>
<script>
import Rain from '../utils/Rain'
export default{
  data () {
    return {
      c: '',
      ctx: '',
      speed: 5,
      num: 2,
      index: 1,
      size: 3,
      rainArr: []
    }
  },
  mounted () {
    this.c = this.$refs.rainCanvas
    this.ctx = this.c.getContext('2d')
    this.c.width = window.innerWidth
    this.c.height = window.innerHeight
    // 每一帧
    this.anim()
  },
  methods: {
    anim () {
      const self = this
      if (self.index <= self.num) {
        // 参数分别为 画布  雨滴颜色  下落速度 大小
        let r = new Rain(self.ctx, '#fff', 10, this.size)
        self.rainArr.push(r)
        self.index++
      }
      self.rainArr.map((item) => {
        item.draw()
      })
      self.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      self.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      requestAnimationFrame(self.anim)
    }
  }
  // beforeDestroy () {
  //   clearInterval(this.time)
  // }
}
</script>
