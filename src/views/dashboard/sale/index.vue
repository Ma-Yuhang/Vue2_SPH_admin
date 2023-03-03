<template>
  <el-card class="box-card">
    <!-- 头部 -->
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName">
        <!--  @tab-click="handleClick" -->
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="traffic"></el-tab-pane>
      </el-tabs>
      <div class="date">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker style="width:250px;margin:0 10px" type="daterange" range-separator="-" start-placeholder="开始日期"
          end-placeholder="结束日期" size="mini" v-model="date" value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
    </div>
    <!-- 主体 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 主体柱状图 -->
          <barChart :activeName='activeName' />
        </el-col>
        <el-col :span="6" class="right">
          <h4 style="margin:0">门店{{title}}排名</h4>
          <ul>
            <li>
              <span class="index">1</span>
              <span>苹果</span>
              <span>323,234</span>
            </li>
            <li>
              <span class="index">2</span>
              <span>华为</span>
              <span>299,132</span>
            </li>
            <li>
              <span class="index">3</span>
              <span>三星</span>
              <span>283,998</span>
            </li>
            <li>
              <span>4</span>
              <span>小米</span>
              <span>266,223</span>
            </li>
            <li>
              <span>5</span>
              <span>OPPO</span>
              <span>223,445</span>
            </li>
            <li>
              <span>6</span>
              <span>vivo</span>
              <span>219,663</span>
            </li>
            <li>
              <span>7</span>
              <span>魅族</span>
              <span>203,234</span>
            </li>
          </ul>
        </el-col>
      </el-row>

    </div>
  </el-card>
</template>

<script>
import dayjs from 'dayjs'
import barChart from './barChart'
export default {
  name: 'Sale',
  components: { barChart },
  data() {
    return {
      activeName: 'sale',
      // 收集日历数据
      date: []
    }
  },
  methods: {
    // 本天
    setDay() {
      let day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    },
    // 本周
    setWeek() {
      let start = dayjs().day(1).format('YYYY-MM-DD')
      let end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
    },
    // 本月
    setMonth() {
      let start = dayjs().startOf('month').format('YYYY-MM-DD')
      let end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    // 本年
    setYear() {
      let start = dayjs().startOf('year').format('YYYY-MM-DD')
      let end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    }
  },
  computed: {
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    }
  }
}
</script>

<style scoped>
.clearfix {
  position: relative;
}
.date {
  position: absolute;
  top: 0;
  right: 0;
}
.date span {
  margin: 0 10px;
  font-size: 14px;
  cursor: pointer;
}
.date span:hover {
  color: #409eff;
}
.right {
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  /* height: 300px; */
  margin-bottom: 0;
  padding: 0;
}
ul li {
  height: 38px;
}
ul li span:nth-child(1) {
  float: left;
  margin: 0 10px;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  margin-right: 30px;
}
.index {
  border-radius: 50%;
  background-color: black;
  color: #fff;
}
ul li span:nth-child(3) {
  float: right;
}
</style>