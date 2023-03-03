<template>
  <div class="chart" ref="chart" style="width:100%;height:300px"></div>

</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'barChart',
  props: ['activeName'],
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
    this.chart.setOption({
      title: {
        text: '销售额趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220, 12, 56, 45, 67, 46],
          color: 'skyblue'
        }
      ]
    })
  },
  watch: {
    activeName() {
      this.chart.setOption({
        title: {
          text: this.activeName === 'sale' ? '销售额趋势' : '访问量趋势'
        }
      })
    }
  }
}
</script>

