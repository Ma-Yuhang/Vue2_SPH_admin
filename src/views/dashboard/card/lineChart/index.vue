<template>
  <div class="chart" ref="chart" style="width:100%;height:100%"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'lineChart',
  mounted() {
    // 使用echarts
    let lineChart = echarts.init(this.$refs.chart)
    lineChart.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      // 系列
      series: [
        {
          type: 'line',
          // 平滑的曲线
          smooth: true,
          data: [23, 45, 35, 46, 45, 76, 36, 29, 34],
          // 拐点的透明度设为0
          itemStyle: {
            opacity: 0
          },
          // 线的颜色
          lineStyle: {
            color: '#9775D8'
          },
          // 填充的颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#9775D8' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }
      ],
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      tooltip: {}
    })
  },
}
</script>

<style>
</style>