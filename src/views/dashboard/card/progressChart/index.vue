<template>
  <div class="chart" ref="chart" style="width:100%;height:100%"></div>
</template>
  
  <script>
import * as echarts from 'echarts'
export default {
  name: 'barChart',
  mounted() {
    // 使用echarts
    let lineChart = echarts.init(this.$refs.chart)
    lineChart.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      // 系列
      series: [
        {
          type: 'bar',
          data: [78],
          // 柱状条的宽度
          barWidth: 10,
          color: 'skyblue',
          // 背景颜色的设置
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          },
          //   文本显示
          label: {
            show: true,
            // 文本内容
            formatter: '|',
            // 文本位置
            position: 'right'
          }
        }
      ],
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
    })
  },
}
  </script>
  
  <style>
</style>