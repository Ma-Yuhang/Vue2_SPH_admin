<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{spu.spuName}}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`"
                v-for="attrValue in attr.attrValueList" :key="attrValue.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`"
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" prop="col.id" width="60">
          </el-table-column>
          <el-table-column label="图片" width="width">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{row}">
              <el-button type="primary" v-if="row.isDefault == 0" @click="changeDefault(row)">设为默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      // 存储服务器返回的图片的信息
      spuImageList: [],
      // 存储销售属性
      spuSaleAttrList: [],
      // 存储平台属性的数组 
      attrInfoList: [],
      // 存储sku的数据 
      skuInfo: {
        // 第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类 通过v-model收集
        skuName: '',
        price: 0,
        weight: '',
        skuDesc: '',
        // 第三类 自己书写代码收集
        // 收集图片
        skuImageList: [],
        // 设置的默认图片
        skuDefaultImg: '',
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0
          // }
        ],
        // 销售属性
        skuSaleAttrValueList: [],

      },
      spu: {},
      // 存储收集的图片
      imageList: [],
    }
  },
  methods: {
    // 获取skuForm的数据
    async getData(category1Id, category2Id, category3Id, spu) {
      this.skuInfo.category3Id = category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
      // 获取图片的信息
      let imgResult = await this.$API.spu.reqSpuImageList(spu.id)
      if (imgResult.code === 200) {
        let list = imgResult.data
        // 给服务器返回的图片数据中的每一个图片添加isDefault属性
        list.forEach(item => {
          item.isDefault = 0
        })
        this.spuImageList = list
      }
      // 获取销售属性的信息
      let saleAttrResult = await this.$API.spu.reqSpuSaleAttrList(spu.id)
      if (saleAttrResult.code === 200) {
        this.spuSaleAttrList = saleAttrResult.data
      }
      // 获取平台属性的信息
      let result = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, category3Id)
      if (result.code === 200) {
        this.attrInfoList = result.data
      }
    },
    // table第一列复选框的回调 
    handleSelectionChange(params) {
      // params数据中缺少isDefault属性
      this.imageList = params
    },
    // 设置默认按钮的回调 排他思想
    changeDefault(row) {
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      // 然后收集默认图片的图片地址
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 取消按钮
    cancel() {
      this.$emit('changeScenes', 0)
      // 清除数据
      Object.assign(this._data, this.$options.data())
    },
    // 保存按钮
    async save() {
      const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this
      // 整理平台属性参数(第一种方法)
      let arr = []
      attrInfoList.forEach(item => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          let obj = {
            attrId,
            valueId
          }
          arr.push(obj)
        }
      })
      skuInfo.skuAttrValueList = arr
      // 整理销售属性参数(采用方法二)
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      // 整理图片的参数
      skuInfo.skuImageList = imageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      // 发请求
      let result = await this.$API.spu.reqAddSku(skuInfo)
      console.log(result);
      if (result.code === 200) {
        this.$message({ type: 'success', message: '添加SKU成功' })
        this.$emit('changeScenes', 0)
      }
      Object.assign(this._data, this.$options.data())
    }
  },
}
</script>

<style>
</style>