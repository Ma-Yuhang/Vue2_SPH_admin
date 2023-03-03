<template>
  <el-card>
    <div slot="header" class="header">
      <span>销售额类别占比</span>
      <el-radio-group v-model="radio" size="mini">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
    </div>
    <!-- card body -->
    <div class="chart" ref="chart"></div>
  </el-card>

</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Category',
  data() {
    return {
      radio: '全部渠道'
    }
  },
  mounted() {
    let chart = echarts.init(this.$refs.chart)
    chart.setOption({
      title: {
        text: '搜索引擎',
        subtext: '1048',
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          // name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          },
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' }
          ]
        }
      ]
    })
    chart.on('mouseover', (params) => {
      const { name, value } = params.data
      chart.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chart {
  width: 100%;
  height: 300px;
}
</style>