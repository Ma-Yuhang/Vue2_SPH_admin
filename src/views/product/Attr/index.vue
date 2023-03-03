<template>
  <div>
    <el-card style="margin:20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable" />
    </el-card>
    <el-card>
      <!-- 表格的显示与隐藏 -->
      <div v-show="isShowTable">
        <!-- 添加属性按钮 -->
        <el-button style="margin-bottom: 20px;" type="primary" icon="el-icon-plus" :disabled="!category3Id"
          @click="addAttr">添加属性
        </el-button>
        <!-- 平台属性表格 -->
        <el-table :data="attrList" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="" label="属性值列表" width="width">
            <template slot-scope="{row}">
              <el-tag type="success" v-for="attr in row.attrValueList" :key="attr.id" style="margin-right:20px">
                {{attr.valueName}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="150">
            <template slot-scope="{row}">
              <el-button type="warning" size="mini" icon="el-icon-edit" @click="updateAttr(row)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性和修改属性 -->
      <div v-show="!isShowTable">
        <el-form width="80" :inline="true" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">
          添加属性值</el-button>
        <el-table border style="margin:20px 0" :data="attrInfo.attrValueList">
          <!-- 第一列 -->
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <!-- 第二列 -->
          <el-table-column prop="" label="属性值名称" width="width">
            <template slot-scope="{row,$index}">
              <el-input :ref="$index" v-if="row.flag" @blur="loseFocus(row,$index)" @keyup.native.enter="loseFocus(row)"
                v-model="row.valueName" placeholder="请输入属性值名称" size="mini"></el-input>
              <span v-else @click="clickSpan(row,$index)" style="display:block">{{row.valueName}}</span>
            </template>
          </el-table-column>
          <!-- 第三列 -->
          <el-table-column prop="" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <!-- 气泡确认框 -->
              <el-popconfirm :title="`确定删除${row.valueName}吗?`" @onConfirm="deleteAttrValue($index)">
                <el-button type="danger" slot="reference" size="mini" icon="el-icon-delete"></el-button>
              </el-popconfirm>
            </template>

          </el-table-column>

        </el-table>
        <el-button type="primary" @click="addOrupdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入lodash中的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 存储请求过来的平台属性的数据
      attrList: [],
      // 控制显示表格
      isShowTable: true,
      // 判断是添加属性的方式添加属性值还是修改属性的方式添加属性值
      isAdd: true,
      // 收集新增属性|修改属性使用
      attrInfo: {
        attrName: '', // 属性名
        attrValueList: [], // 属性值，因为属性值可以有多个 因此用数组
        categoryId: 0, // 三级分类的id
        categoryLevel: 3 // 一定是3 代表三级id
      }
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
        // 有了三级id就发请求
        this.getAttrList()
      }
    },
    // 获取平台属性的方法
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this
      let result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
      if (result.code === 200) {
        this.attrList = result.data
      }
    },
    // 添加属性的方法
    addAttr() {
      // 隐藏平台属性列表
      this.isShowTable = false
      this.isAdd = true
      // 清空上一次的数据 收集三级id
      this.attrInfo = {
        attrName: '', // 属性名
        attrValueList: [], // 属性值，因为属性值可以有多个 因此用数组
        categoryId: this.category3Id, // 三级分类的id
        categoryLevel: 3 // 一定是3 代表三级id
      }
    },
    // 添加属性值的方法
    addAttrValue() {
      let repeat = this.attrList.some(item => {
        return item.attrName == this.attrInfo.attrName
      })
      // 如果添加属性的方式添加属性值,并且有了这个属性名 就不能在这个属性上添加属性值了
      if (this.isAdd && repeat) {
        this.$message('已有此属性，不能继续添加,只能对此属性进行修改!')
      } else {
        this.attrInfo.attrValueList.push({
          // 修改属性的时候添加属性值,需要把服务器返回来的id赋给attrId(通过添加属性的方式添加属性值是为undefined)
          attrId: this.attrInfo.id,
          // 属性值
          valueName: '',
          // 控制显示input还是span true为显示input false显示span
          flag: true
        })
        // 点击添加属性值 最后一项自动聚焦
        this.$nextTick(() => {
          this.$refs[this.attrInfo.attrValueList.length - 1].focus()
        })
      }
    },
    // 修改属性的方法 
    updateAttr(row) {
      this.isShowTable = false
      this.isAdd = false
      // 深拷贝
      this.attrInfo = cloneDeep(row)
      // 点击修改属性后 给原来的属性值身上添加flag属性
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })
    },
    // 点击span
    clickSpan(row, index) {
      row.flag = true
      // 点击span自动聚焦
      // 点击span后不能立马获取到input节点 因为重绘是需要时间的 所以要用到$nextTick(等待节点重绘重排完毕后执行一次) 
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 文本框失去焦点 
    loseFocus(row, index) {
      if (!row.valueName.trim()) {
        this.$message('请输入非空属性值。')
        return
      }
      let repeat = this.attrInfo.attrValueList.some(item => {
        if (row !== item) {
          return row.valueName == item.valueName
        }
      })
      // 如果属性值有重复
      if (repeat) return
      row.flag = false
    },
    // 删除属性值 
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 点击保存按钮 发请求
    async addOrupdateAttr() {
      // 删除flag属性(因为服务器不需要flag这个属性)
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName !== '') {
          delete item.flag
          return true
        }
      })
      // 发请求 
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.isShowTable = true
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        // 保存成功 重新获得属性列表
        this.getAttrList()
      } catch (error) {
        this.$message('保存失败！')
      }
    }
  },
}
</script>

<style>
</style>