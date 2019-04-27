<style scoped lang="less">
  .item{
    height: 100px;
  }
  .icon{
    font-size: 60px;
    color: red;
  }
  .myContainer{
    height: 600px;
  }
</style>
<template>
  <div>
    <i class="icon icon-touxiang5 iconfont"></i>
    <div class="myContainer"></div>
    <!--<div class="item" v-for="(item, index) in list" :key="index">-->
      <!--<lazyload-img :data-src="item.img"></lazyload-img>-->
    <!--</div>-->
  </div>
</template>
<script>
import lazyloadImg from '../components/lazyloadImg'
import zrender from 'zrender'
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
  },
  mounted () {
    var container = document.getElementsByClassName('myContainer')[0]
    var zr = zrender.init(container)
    var w = zr.getWidth()
    var h = zr.getHeight()
    var isMouseDown = false;
    zr.on('mousedown', function () {
      isMouseDown = true;
    });
    zr.on('mouseup', function () {
      isMouseDown = false;
    });

    var elementStyle = {
      stroke: '#ccc',
      fill: 'white'
    };

    var group = new zrender.Group();
    for (var i = 0; i < 10; ++i) {
      var r = 50 * Math.random() + 20;
      var circle = new zrender.Circle({
        shape: {
          cx: 0,
          cy: 0,
          r: r
        },
        position: [
          (w * 0.6 - r * 2) * Math.random() + r + w * 0.2,
          (h * 0.6 - r * 2) * Math.random() + r + h * 0.2
        ],
        style: elementStyle,
        draggable: true
      })
        .on('mousemove', function () {
          console.log(this, 'this')
          if (isMouseDown) {
            var rect = group.getBoundingRect();
            boundingRect.setShape({
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height
            });
          }
        });
      group.add(circle);
    }
    zr.add(group);

    var rect = group.getBoundingRect();
    var boundingRect = new zrender.Rect({
      shape: {
        cx: 0,
        cy: 0,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      },
      style: {
        fill: 'none',
        stroke: '#14f1ff'
      }
    });
    zr.add(boundingRect);
  }
}
</script>
