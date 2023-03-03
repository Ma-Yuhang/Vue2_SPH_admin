<template>
  <div>
    <el-row :gutter="10" style="margin-bottom:10px">
      <!-- 第一个 -->
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="¥ 126560">
            <template slot="charts">
              <span>周同比 56.67%
                <!-- 上箭头 -->
                <svg t="1662283307322" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="3991" width="16" height="16">
                  <path
                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                    p-id="3992" fill="#1afa29"></path>
                </svg>
              </span>
              <span>日同比 13.67%
                <!-- 下箭头 -->
                <svg t="1662283391648" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="6619" width="16" height="16">
                  <path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="6620" fill="#d81e06">
                  </path>
                </svg>
              </span>
            </template>
            <template slot="footer">
              <span>日销售额:¥14423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <!-- 第二个 -->
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="footer">
              <span>日访问量:1443</span>
            </template>
            <template slot="charts">
              <lineChart />
            </template>
          </Detail>
        </el-card>
      </el-col>
      <!-- 第三个 -->
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <barChart />
            </template>
            <template slot="footer">
              <span>转化率:76.89%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <!-- 第四个 -->
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <progressChart />
            </template>
            <template slot="footer">
              <span>周同比 56.67%
                <!-- 上箭头 -->
                <svg t="1662283307322" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="3991" width="16" height="16">
                  <path
                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                    p-id="3992" fill="#1afa29"></path>
                </svg>
              </span>
              <span>日同比 13.67%
                <!-- 下箭头 -->
                <svg t="1662283391648" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="6619" width="16" height="16">
                  <path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="6620" fill="#d81e06">
                  </path>
                </svg>
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import lineChart from './lineChart'
import barChart from './barChart'
import progressChart from './progressChart'
export default {
  name: 'Card',
  components: { Detail, lineChart, barChart, progressChart }
}
</script>

<style>
.icon {
  padding: 0;
  margin: 0;
}
</style>