<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handler1" :disabled="show">
          <el-option :label="c1.name" :value="c1.id" v-for="c1 in list1" :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="cForm.category2Id" @change="handler2" :disabled="show">
          <el-option :label="c2.name" :value="c2.id" v-for="c2 in list2" :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handler3" :disabled="show">
          <el-option :label="c3.name" :value="c3.id" v-for="c3 in list3" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['show'],
  data() {
    return {
      // 1级分类的数据
      list1: [],
      // 2级分类的数据
      list2: [],
      // 3级分类的数据
      list3: [],
      // 收集一级、二级、三级的id
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    // 获取一级商品分类的数据
    this.getCategory1List()
  },
  methods: {
    // 获取一级商品分类的数据
    async getCategory1List() {
      let result = await this.$API.attr.reqCategory1List()
      if (result.code === 200) {
        this.list1 = result.data.slice(0, 16)
      }
    },
    // 当一级分类的id发生变化时触发
    async handler1() {
      // 先清除上一次选择的二级和三级数据
      this.list2 = []
      this.list3 = []
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      this.$emit('getCategoryId', { level: 1, categoryId: this.cForm.category1Id })
      let result = await this.$API.attr.reqCategory2List(this.cForm.category1Id)
      if (result.code === 200) {
        this.list2 = result.data
      }
    },
    // 当二级分类的id发生变化时触发
    async handler2() {
      // 先清除三级分类的数据
      this.list3 = []
      this.cForm.category3Id = ''
      this.$emit('getCategoryId', { level: 2, categoryId: this.cForm.category2Id })
      let result = await this.$API.attr.reqCategory3List(this.cForm.category2Id)
      if (result.code === 200) {
        this.list3 = result.data
      }
    },
    // 当三级分类的id发生变化时触发
    handler3() {
      this.$emit('getCategoryId', { level: 3, categoryId: this.cForm.category3Id })
    }
  }
}
</script>

<style>
</style>