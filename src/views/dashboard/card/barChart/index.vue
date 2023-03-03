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
        type: 'category'
      },
      yAxis: {
        show: false
      },
      // 系列
      series: [
        {
          type: 'bar',
          data: [23, 45, 35, 46, 45, 76, 36, 29, 34, 12, 45, 33]
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