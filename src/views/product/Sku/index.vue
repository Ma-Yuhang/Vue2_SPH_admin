<template>
  <div>
    <el-table border :data="records">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
      <el-table-column label="默认图片" width="140" align="center">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="100"></el-table-column>
      <el-table-column prop="price" label="价格(元)" width="100"></el-table-column>
      <el-table-column label="操作" width="width" align="center">
        <template slot-scope="{row}">
          <el-button type="success" icon="el-icon-top" size="mini" v-if="row.isSale == 0" @click="Sale(row)">
          </el-button>
          <el-button type="info" icon="el-icon-bottom" size="mini" v-else @click="cancel(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="$message('正在开发中...')"></el-button>
          <el-button type="info" size="mini" icon="el-icon-info" @click="getSkuInfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination @size-change="sizeChange" @current-change="getSkuList" style="text-align:center" :current-page="page"
      :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
    </el-pagination>
    <el-drawer :visible.sync="show" direction="rtl" size="50%" :show-close="false">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag type="success" style="margin-right:10px" v-for="attr in skuInfo.skuAttrValueList" :key="attr.id">
            {{attr.attrId}}-{{attr.valueId}}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel style="height:450px;width: 450px;">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" style="height:450px;width: 450px;">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>

  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1, // 当前第几页
      limit: 10, // 一页展示多少条数据
      records: [], // sku列表数据
      total: 0, // 一共有多少条数据
      skuInfo: {},
      // 是否展示抽屉
      show: false
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    // 获得sku列表数据的方法
    async getSkuList(pages = 1) {
      this.page = pages
      let result = await this.$API.sku.reqSkuList(this.page, this.limit)
      if (result.code === 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    // 改变每一页展示多少条数据
    sizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    // 点击上架按钮
    async Sale(row) {
      let result = await this.$API.sku.reqSale(row.id)
      if (result.code === 200) {
        row.isSale = 1
        this.$message({ type: 'success', message: '上架成功' })
      }
    },
    // 点击下架按钮
    async cancel(row) {
      let result = await this.$API.sku.reqCancel(row.id)
      if (result.code === 200) {
        row.isSale = 0
        this.$message({ type: 'success', message: '下架成功' })
      }
    },
    // 查看sku列表
    async getSkuInfo(row) {
      // 展示抽屉
      this.show = true
      let result = await this.$API.sku.reqSkuById(row.id)
      if (result.code === 200) {
        this.skuInfo = result.data
      }
    }
  },
}
</script>
<style>
.el-carousel__button {
  width: 20px;
  height: 20px;
  background-color: pink;
  border-radius: 50%;
}
</style>
<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
  font-weight: 700;
}
.el-col {
  margin: 10px 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>