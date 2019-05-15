<style scoped lang="less">
  .draw-photo{
    display: flex;
  }
  .canvas-photo{
    font-size: 12px;
    display: flex;
    align-items: center;
  }
  .left-photo{
    width: 200px;
    height: 400px;
    border:1px solid #6f6f6f;
    position: relative;
    margin-right: 20px;
    canvas{
      width: 100%;
      height: 100%;
    }
    .obstacle{
      position: absolute;
      border:1px solid #6f6f6f;
      width: 20px;
      height: 20px;
      top: 260px;
      left: 100px;
      text-align: center;
    }
    .obstacle-2{
      top: 200px;
      left: 130px;
    }
    .control{
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .control-2{
      top: 50%;
      bottom: auto;
      left: 0;
      right: auto;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    .control-3{
      top: 0;
      left: 0;
    }
    .control-4{
      top: auto;
      bottom: 0;
      right: 0;
      left: auto;
    }
    .control-5{
      top: 50%;
      bottom: auto;
      right: 0;
      left: auto;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    .control-6{
      top: 0;
      bottom: auto;
      right: 0;
      left: auto;
    }
  }
  .right-photo{
    width: 200px;
    height: 400px;
    border:1px solid #d3d3d3;
  }
  .draw-line{
    width: 600px;
    display: flex;
    flex-wrap: wrap;
    .line{
      width: 280px;
      height: 200px;
      margin-right: 20px;
    }
  }

</style>

<template>
  <div class="emergencyPlan">
    <div>
      <label class="title">应急疏散方案</label>
    </div>
    <div class="draw-photo">
      <div class="canvas-photo">
        <div class="left-photo">
          <div class="obstacle">1</div>
          <div class="obstacle obstacle-2">2</div>
          <!--闸机-->
          <div class="control">闸机1</div>
          <div class="control control-2">闸机2</div>
          <div class="control control-3">闸机3</div>
          <div class="control control-4">闸机4</div>
          <div class="control control-5">闸机5</div>
          <div class="control control-6">闸机6</div>
          <canvas
            id="leftCanvas"
            width="200"
            height="400"
            ref="leftCanvas">
          </canvas>
        </div>
        <div class="right-photo">
          <canvas
            id="rightCanvas"
            width="200"
            height="400"
            ref="rightCanvas">
          </canvas>
        </div>
      </div>
      <div class="draw-line">
        <div id="line-1" class="line"></div>
        <div id="line-2" class="line"></div>
        <div id="line-3" class="line"></div>
        <div id="line-4" class="line"></div>
        <div id="line-5" class="line"></div>
        <div id="line-6" class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import pointList from '../assets/left'
import lineArr from '../assets/line'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入折线
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  data () {
    return {
      time: {},
      leftCanvas: {},
      rightCanvas: {},
      line1: {},
      line1Option: {
        legend: {
          data: ['无流量监控', '有流量监控']
        },
        xAxis: {
          name: '时间',
          nameGap: 4,
          type: 'category',
          axisLine: {
            symbol: ['none', 'arrow'], // 分别表示起始位置和终止位置是否使用箭头，默认不使用
            symbolSize: [5, 10] // 箭头的长宽
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          boundaryGap: false,
          data: []
        },
        yAxis: {
          name: '流量',
          nameGap: 4,
          type: 'value',
          axisLine: {
            symbol: ['none', 'arrow'], // 分别表示起始位置和终止位置是否使用箭头，默认不使用
            symbolSize: [5, 10] // 箭头的长宽
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '无流量监控',
            type: 'line',
            data: []
          },
          {
            name: '有流量监控',
            type: 'line',
            data: []
          }
        ]
      },
      line2: {},
      line2Option: {
        legend: {
          data: ['无流量监控', '有流量监控']
        },
        xAxis: {
          name: '时间',
          nameGap: 4,
          type: 'category',
          axisLine: {
            symbol: ['none', 'arrow'], // 分别表示起始位置和终止位置是否使用箭头，默认不使用
            symbolSize: [5, 10] // 箭头的长宽
          },
          boundaryGap: false,
          data: []
        },
        yAxis: {
          name: '流量',
          nameGap: 4,
          type: 'value',
          axisLine: {
            symbol: ['none', 'arrow'], // 分别表示起始位置和终止位置是否使用箭头，默认不使用
            symbolSize: [5, 10] // 箭头的长宽
          }
        },
        series: [
          {
            name: '无流量监控',
            type: 'line',
            data: []
          },
          {
            name: '有流量监控',
            type: 'line',
            data: []
          }
        ]
      },
      line3: {},
      line3Option: {
        legend: {
          data: ['无流量监控', '有流量监控']
        },
        xAxis: {
          name: '时间',
          nameGap: 4,
          type: 'category',
          axisLine: {
            symbol: ['none', 'arrow'], // 分别表示起始位置和终止位置是否使用箭头，默认不使用
            symbolSize: [5, 10] // 箭头的长宽
          },
          boundaryGap: false,
          data: []
        },
        yAxis: {
          name: '流量',
          nameGap: 4,
          type: 'value',
          axisLine: {
            symbol: ['none', 'arrow'], // 分别表示起始位置和终止位置是否使用箭头，默认不使用
            symbolSize: [5, 10] // 箭头的长宽
          }
        },
        series: [
          {
            name: '无流量监控',
            type: 'line',
            data: []
          },
          {
            name: '有流量监控',
            type: 'line',
            data: []
          }
        ]
      },
      line4: {},
      line4Option: {
        legend: {
          data: ['无流量监控', '有流量监控']
        },
        xAxis: {
          name: '时间',
          nameGap: 4,
          type: 'category',
          axisLine: {
            symbol: ['none', 'arrow'], // 分别表示起始位置和终止位置是否使用箭头，默认不使用
            symbolSize: [5, 10] // 箭头的长宽
          },
          boundaryGap: false,
          data: []
        },
        yAxis: {
          name: '流量',
          nameGap: 4,
          type: 'value',
          axisLine: {
            symbol: ['none', 'arrow'], // 分别表示起始位置和终止位置是否使用箭头，默认不使用
            symbolSize: [5, 10] // 箭头的长宽
          }
        },
        series: [
          {
            name: '无流量监控',
            type: 'line',
            data: []
          },
          {
            name: '有流量监控',
            type: 'line',
            data: []
          }
        ]
      },
      line5: {},
      line5Option: {
        legend: {
          data: ['无流量监控', '有流量监控']
        },
        xAxis: {
          name: '时间',
          nameGap: 4,
          type: 'category',
          axisLine: {
            symbol: ['none', 'arrow'], // 分别表示起始位置和终止位置是否使用箭头，默认不使用
            symbolSize: [5, 10] // 箭头的长宽
          },
          boundaryGap: false,
          data: []
        },
        yAxis: {
          name: '流量',
          nameGap: 4,
          type: 'value',
          axisLine: {
            symbol: ['none', 'arrow'], // 分别表示起始位置和终止位置是否使用箭头，默认不使用
            symbolSize: [5, 10] // 箭头的长宽
          }
        },
        series: [
          {
            name: '无流量监控',
            type: 'line',
            data: []
          },
          {
            name: '有流量监控',
            type: 'line',
            data: []
          }
        ]
      },
      line6: {},
      line6Option: {
        legend: {
          data: ['无流量监控', '有流量监控']
        },
        xAxis: {
          name: '时间',
          nameGap: 4,
          type: 'category',
          axisLine: {
            symbol: ['none', 'arrow'], // 分别表示起始位置和终止位置是否使用箭头，默认不使用
            symbolSize: [5, 10] // 箭头的长宽
          },
          boundaryGap: false,
          data: []
        },
        yAxis: {
          name: '流量',
          nameGap: 4,
          type: 'value',
          axisLine: {
            symbol: ['none', 'arrow'], // 分别表示起始位置和终止位置是否使用箭头，默认不使用
            symbolSize: [5, 10] // 箭头的长宽
          }
        },
        series: [
          {
            name: '无流量监控',
            type: 'line',
            data: []
          },
          {
            name: '有流量监控',
            type: 'line',
            data: []
          }
        ]
      },
      second: 0
    }
  },
  mounted () {
    let c1 = document.getElementById('leftCanvas')
    let c2 = document.getElementById('rightCanvas')
    this.leftCanvas = c1.getContext('2d')
    this.line1 = echarts.init(document.getElementById('line-1'))
    this.line1.setOption(this.line1Option)
    this.line2 = echarts.init(document.getElementById('line-2'))
    this.line2.setOption(this.line2Option)
    this.line3 = echarts.init(document.getElementById('line-3'))
    this.line3.setOption(this.line3Option)
    this.line4 = echarts.init(document.getElementById('line-4'))
    this.line4.setOption(this.line4Option)
    this.line5 = echarts.init(document.getElementById('line-5'))
    this.line5.setOption(this.line5Option)
    this.line6 = echarts.init(document.getElementById('line-6'))
    this.line6.setOption(this.line6Option)
    this.rightCanvas = c2.getContext('2d')
    const _this = this
    _this.max = pointList.length
    this.time = setInterval(_this.setData, 2000)
    // _this.setData()
  },
  methods: {
    setData () {
      this.setLeftPoint()
      this.setLineFun(1)
      this.setLineFun(2)
      this.setLineFun(3)
      this.setLineFun(4)
      this.setLineFun(5)
      this.setLineFun(6)
      this.second++
      if(this.second.length > this.max) {
        clearInterval(this.time)
      }
    },
    setLineFun (index) {
      console.log(this[`line${index}Option`], 'this[`line${index}Option`]')
      this[`line${index}Option`].xAxis.data.push(this.second)
      this[`line${index}Option`].series[0].data.push(lineArr[this.second][index - 1])
      this[`line${index}Option`].series[1].data.push(lineArr[this.second][6 + index])
      this[`line${index}`].setOption(this[`line${index}Option`])
    },
    setLeftPoint () {
      const _this = this
      _this.leftCanvas.clearRect(0, 0, 200, 400)
      pointList[_this.second].forEach(point => {
        _this.leftCanvas.beginPath()
        let pointArr = point.split(',')
        let x = parseInt(pointArr[0])
        let y = 400 - 2 * parseInt(pointArr[1])
        console.log(x, y, 111)
        _this.leftCanvas.arc(x, y, 4, 0, 2 * Math.PI)
        _this.leftCanvas.fill()
        _this.leftCanvas.stroke()
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.time)
  }
}
</script>
                        
