<template>
  <div>
    <el-form label-width="80px" :model="spu">
      <!-- 一 -->
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <!-- 二 -->
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="tm in tradeMarkList" :key="tm.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 三 -->
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="SPU描述" rows="4" v-model="spu.description"></el-input>
      </el-form-item>
      <!-- 四 -->
      <el-form-item label="SPU图片">
        <!-- list-type="picture-card"代表为照片墙  -->
        <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess"
          :file-list="spuImageList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <!-- 五 -->
      <el-form-item label="销售属性">
        <el-select v-model="attrIdAndName"
          :placeholder='`${unSelectSaleAttr.length}`>0?`还有${unSelectSaleAttr.length}项未选择`:"没有啦！！！"'>
          <el-option :label="unSelect.name" :value="`${unSelect.id}:${unSelect.name}`"
            v-for="unSelect in unSelectSaleAttr" :key="unSelect.id">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="" label="属性名称列表" width="600">
            <template slot-scope="{row}">
              <el-tag v-for="(tag,index) in row.spuSaleAttrValueList" :key="tag.id" closable
                :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index,1)">
                {{tag.saleAttrValueName}}
              </el-tag>
              <!-- @keyup.enter.native="handleInputConfirm"  -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue"
                :ref="row.spuSaleAttrValueList.length" size="small" @blur="handleInputConfirm(row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="col.id" label="操作" width="100">
            <template slot-scope="{$index}">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="spu.spuSaleAttrList.splice($index, 1)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 六 -->
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // 初始化spu
      spu: {
        // 三级id
        category3Id: 0,
        // 描述
        description: "",
        // 品牌的id
        tmId: '',
        // spu名称
        spuName: "",
        // 图片的信息
        spuImageList: [],
        // 平台属性与属性值的收集
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 1,
          //     id: 14790,
          //     saleAttrName: "颜色",
          //     spuId: 6034,
          //     spuSaleAttrValueList: Array[2]
          //   }
        ],
      }, // 存储spu信息的数据
      tradeMarkList: [], // 存储品牌的信息
      spuImageList: [], // 存储spu图片
      saleAttrList: [], // 平台销售属性的列表
      attrIdAndName: '', // 收集销售属性未选择的id和name
    };
  },
  methods: {
    // 删除图片的回调
    handleRemove(file, fileList) {
      // file是你删除的那张图片  fileList是剩余的几个图片的信息
      //  收集照片墙图片的数据，但是里边的name和url是照片墙需要的，是我们自己添加的，
      //  但是服务器是不需要的，当保存提交给服务器的时候需要删掉
      this.spuImageList = fileList
    },
    // 照片墙图片预览的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 照片墙上传图片成功的回调
    handleSuccess(response, file, fileList) {
      // fileList是添加成功后的图片列表
      this.spuImageList = fileList
    },
    // 初始化Spu的数据 点击修改按钮
    async initSpuData(spu) {
      // 获取spu信息的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id)
      if (spuResult.code === 200) {
        this.spu = spuResult.data
      }
      // 获取品牌信息的数据
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      // 获取spu图片
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
      if (spuImageResult.code === 200) {
        // 需要往返回回来的数组中添加name和url属性(照片墙展示时要用)
        let arr = spuImageResult.data
        arr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = arr
      }
      // 获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if (saleResult.code === 200) {
        this.saleAttrList = saleResult.data
      }
    },
    // 初始化Spu的数据 点击添加按钮
    async addSpuData(category3Id) {
      // 先清空之前的数据
      Object.assign(this._data, this.$options.data())
      this.spu.category3Id = category3Id
      // 获取品牌信息的数据
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      // 获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if (saleResult.code === 200) {
        this.saleAttrList = saleResult.data
      }
    },
    // 点击添加销售属性按钮
    addSaleAttr() {
      // 整理参数 结构出id和name
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':')
      this.spu.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      })
      this.attrIdAndName = ''
    },
    // 点击添加属性值的小按钮
    addSaleAttrValue(row) {
      // 变为input输入框
      this.$set(row, 'inputVisible', true)
      //  添加一个响应式的属性inputValue用来收集input的内容
      this.$set(row, 'inputValue', '')
      //   自动获得焦点
      this.$nextTick(() => {
        this.$refs[row.spuSaleAttrValueList.length].focus()
      })
    },
    // 点击添加后的文本框失去焦点
    handleInputConfirm(row) {
      // 变为添加按钮
      row.inputVisible = false
      const { baseSaleAttrId, inputValue } = row
      // 不能输入空的属性值 
      if (inputValue.trim() == '') {
        this.$message('属性值不能为空')
        return
      }
      // 属性值不能重复
      if (row.spuSaleAttrValueList.some(item => item.saleAttrValueName == inputValue.trim())) {
        this.$message('已有此属性！')
        return
      }
      row.spuSaleAttrValueList.push({
        baseSaleAttrId,
        saleAttrValueName: inputValue.trim()
      })
    },
    // 点击保存按钮的回调
    async addOrUpdateSpu() {
      this.spu.spuImageList = this.spuImageList.map(item => {
        return {
          imgName: item.name,
          imgUrl: item.response ? item.response.data : item.imgUrl
        }
      })
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      if (result.code === 200) {
        this.$message({ type: 'success', message: '保存成功' })
        this.$emit('changeScene', { scene: 0, flag: this.spu.id ? '修改' : '添加' })
      }
    },
    // 取消按钮的回调
    cancel() {
      this.$emit('changeScene', { scene: 0 })
    }
  },
  computed: {
    // 计算出未选择的平台销售属性
    unSelectSaleAttr() {
      // 整个平台的销售属性一共三个：尺寸、颜色、版本 -----saleAttrList是一个数组
      // 当前spu拥有的销售属性spu.spuSaleAttrList  -----尺寸、颜色 也是一个数组
      // 需要从saleAttrList数组中筛选出spu.spuSaleAttrList数组中没有的元素
      let result = this.saleAttrList.filter(item => {
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName
        })
      })
      return result
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>