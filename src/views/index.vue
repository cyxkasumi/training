<style scoped lang="less">
  .item{
    height: 100px;
  }
  .icon{
    font-size: 60px;
    color: red;
  }
</style>
<template>
  <div>
    <i class="icon icon-touxiang5 iconfont"></i>
    <p>11111</p>
    <div class="item" v-for="(item, index) in list" :key="index">
      <lazyload-img :data-src="item.img"></lazyload-img>
    </div>
  </div>
</template>
<script>
import lazyloadImg from '../components/lazyloadImg'
export default {
  components: {
    lazyloadImg
  },
  data () {
    return {
      list: [
        {img: require('../assets/img/hot.png')},
        {img: require('../assets/img/hot.png')},
        {img: require('../assets/img/hot.png')},
        {img: require('../assets/img/hot.png')},
        {img: require('../assets/img/hot.png')},
        {img: require('../assets/img/hot.png')},
        {img: require('../assets/img/hot.png')},
        {img: require('../assets/img/hot.png')},
        {img: require('../assets/img/hot.png')}
      ]
    }
  }
}
</script>
