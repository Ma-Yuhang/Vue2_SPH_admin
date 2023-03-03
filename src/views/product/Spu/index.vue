<template>
  <div>
    <el-card style="margin:20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="scene!=0" />
    </el-card>
    <el-card>
      <!-- 将来这里是三部分进行切换 -->
      <div v-show="scene==0">
        <!-- 展示spu列表的结构 -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加</el-button>
        <el-table border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="" label="操作" width="width">
            <template slot-scope="{row}">
              <!-- 使用自己封装的有提示文字的按钮 -->
              <HintButton type="success" size="mini" icon="el-icon-plus" title="添加sku" @click="addSku(row)">
              </HintButton>
              <HintButton type="warning" size="mini" icon="el-icon-edit" title="修改spu" @click="updateSpu(row)">
              </HintButton>
              <HintButton type="info" size="mini" icon="el-icon-info" title="查看当前spu全部的sku列表" @click="handler(row)">
              </HintButton>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <HintButton type="danger" size="mini" icon="el-icon-delete" title="删除spu" slot="reference">
                </HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="text-align:center" :current-page="page" :page-sizes="[3, 5,10]" :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="getSpuList"
          @size-change="sizeChange">
        </el-pagination>
      </div>
      <!-- 添加|修改spu -->
      <SpuForm v-show="scene==1" @changeScene="changeScene" ref="spu" />
      <!-- 添加sku -->
      <SkuForm v-show="scene==2" @changeScenes="changeScenes" ref="sku" />
    </el-card>
    <!-- 查看sku信息的弹出框 -->
    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table :data="skuList" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
        <el-table-column prop="price" label="价格" width="width"></el-table-column>
        <el-table-column prop="weight" label="重量" width="width"></el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>
  </div>
</template>

<script>
import SkuForm from './SkuForm'
import SpuForm from './SpuForm'
export default {
  name: 'Spu',
  components: { SkuForm, SpuForm },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      page: 1,  // 当前分页器为第几页
      limit: 3, // 一页展示多少条数据
      records: [], // 存储spu列表的数据
      total: 0,
      scene: 0, // 0代表展示spu列表数据 1代表添加|修改spu  2代表添加sku
      // 控制对话框的显示与隐藏
      dialogTableVisible: false,
      // 点击查看sku列表信息的spu的信息
      spu: {},
      // sku的列表数据
      skuList: [],
      loading: true
    }
  },
  methods: {
    // 接收子组件CategorySelect传过来的三个id 
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId
        // 清空上一次的二三级id
        this.category2Id = ''
        this.category3Id = ''
      } else if (level == 2) {
        // 清空上一次的三级id
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        // 有了三级id就发请求Spu
        this.getSpuList()
      }
    },
    // 请求spu列表
    async getSpuList(pages = 1) {
      this.page = pages
      const { category3Id, page, limit } = this
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id)
      if (result.code === 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    // 切换页码 也可以跟请求spu列表函数合并
    //#region 
    // currentChange(page) {
    //   this.page = page
    //   // 发请求 展示新的列表 
    //   this.getSpuList()
    // },
    //#endregion
    // 切换一页展示多少条数据 
    sizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    // 点击添加spu按钮
    addSpu() {
      this.scene = 1
      this.$refs.spu.addSpuData(this.category3Id)
    },
    // 点击修改spu按钮
    updateSpu(row) {
      this.scene = 1
      // 获取子组件SpuForm
      this.$refs.spu.initSpuData(row);

    },
    // 改变场景(SpuForm中的自定义事件)
    changeScene({ scene, flag }) {
      // flag这个形参是为了区分是添加spu的保存还是修改spu的保存
      this.scene = scene
      if (flag == '添加') {
        // 如果是添加 回到第一页
        this.getSpuList()
      } else {
        this.getSpuList(this.page)
      }
    },
    // 删除spu
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code === 200) {
        this.$message({ type: 'success', message: '删除成功' })
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
      }
    },
    // 添加sku
    addSku(row) {
      this.scene = 2
      // 父组件调用子组件的方法 通知子组件发请求-----三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, this.category3Id, row)
    },
    changeScenes(scene) {
      this.scene = scene
    },
    // 查看当前spu全部的sku列表
    async handler(row) {
      this.dialogTableVisible = true
      // 把你点击的这个spu信息存储起来
      this.spu = row
      let result = await this.$API.spu.reqSkuList(row.id)
      if (result.code === 200) {
        this.skuList = result.data
        this.loading = false
      }
    },
    // 对话框关闭前的回调
    close(done) {
      // loading属性变为true
      this.loading = true
      // 清除spuList的数据
      this.spuList = []
      // 关闭对话框
      done()
    }
  }
}
</script>

<style>
</style>