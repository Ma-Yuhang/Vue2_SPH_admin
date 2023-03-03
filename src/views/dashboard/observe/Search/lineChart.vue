<template>
  <div>
    <div class="header">
      <span style="margin-right:20px;color: #666;">用户搜索数</span>
      <svg t="1662280625018" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2635" width="16" height="16">
        <path
          d="M512 0a512 512 0 1 0 0 1024A512 512 0 0 0 512 0z m0 896A384 384 0 0 1 512 128a384 384 0 0 1 0 768z m29.696-194.88c-11.136 10.112-24.96 17.344-31.488 15.36-6.08-1.792-9.536-7.424-8.384-13.056l89.344-248c7.424-31.488-12.736-60.16-55.424-63.872-44.8 0-110.976 40.128-151.232 90.944 0 6.08-1.344 21.12 0.128 30.208l53.632-54.208c11.008-10.176 23.808-17.344 30.336-15.424 6.592 1.92 10.112 8.384 8 14.464l-88.704 246.848c-10.176 28.864 9.152 57.152 56.192 63.616 68.928 0 109.888-39.168 150.208-89.984 0-6.08 2.368-22.08 0.96-31.104l-53.568 54.208zM575.744 192c-35.584 0-64.448 25.728-64.448 63.808 0 37.952 28.864 63.744 64.448 63.744 35.648 0 64.448-25.728 64.448-63.744 0-38.08-28.8-63.808-64.448-63.808z"
          p-id="2636" fill="#bfbfbf"></path>
      </svg>
    </div>
    <div class="main" style="margin-bottom:10px">
      <div>
        <span style="font-size: 20px;margin-right: 20px;">12331</span>
        <span>17.1</span>
        <span>
          <svg t="1662283307322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="3991" width="16" height="16">
            <path
              d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
              p-id="3992" fill="#1afa29"></path>
          </svg>
        </span>
        <span>
          <svg t="1662283391648" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="6619" width="16" height="16">
            <path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="6620" fill="#d81e06">
            </path>
          </svg>
        </span>
      </div>
    </div>
    <div class="footer">
      <div class="chart" ref="chart"></div>
    </div>
  </div>
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
        left: -15,
        right: 0,
        bottom: 0
      },
      tooltip: {}
    })
  },
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.chart {
  width: 100%;
  height: 50px;
}
</style>